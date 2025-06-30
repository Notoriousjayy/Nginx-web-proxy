terraform {
  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}

# ────────────────────────────────────────────────────────────
# Pull in the bootstrap-bucket outputs (local state file)
# ────────────────────────────────────────────────────────────
data "terraform_remote_state" "bootstrap" {
  backend = "local"
  config = {
    path = "${path.module}/../../bootstrap/terraform.tfstate"
  }
}

# ────────────────────────────────────────────────────────────
# Generate an SSH key pair (Terraform-managed)
# ────────────────────────────────────────────────────────────
resource "tls_private_key" "ssh" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "debian" {
  key_name   = var.key_name
  public_key = tls_private_key.ssh.public_key_openssh
}

# ────────────────────────────────────────────────────────────
# Availability Zones → match public_subnets length
# ────────────────────────────────────────────────────────────
data "aws_availability_zones" "available" {
  state = "available"
}

# ────────────────────────────────────────────────────────────
# VPC + public subnets
# ────────────────────────────────────────────────────────────
module "vpc" {
  source             = "../../modules/vpc"
  name               = "dev-vpc"
  cidr_block         = var.vpc_cidr
  public_subnets     = var.public_subnets
  availability_zones = slice(
    data.aws_availability_zones.available.names,
    0, length(var.public_subnets)
  )
}

locals {
  instance_name = "nginx-proxy"
}

# ────────────────────────────────────────────────────────────
# S3 bucket for webpack build artefacts
# ────────────────────────────────────────────────────────────
resource "random_pet" "assets_bucket" {
  length    = 2
  separator = "-"
}

resource "aws_s3_bucket" "assets" {
  bucket = "${var.environment}-${local.instance_name}-assets-${random_pet.assets_bucket.id}"
  acl    = null

  tags = merge(
    { Name = "${local.instance_name}-assets", Environment = var.environment },
    var.tags
  )
}

resource "aws_s3_bucket_ownership_controls" "assets" {
  bucket = aws_s3_bucket.assets.id
  rule { object_ownership = "BucketOwnerEnforced" }
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket                  = aws_s3_bucket.assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ────────────────────────────────────────────────────────────
# Security-group allowing SSH/HTTP/HTTPS
# ────────────────────────────────────────────────────────────
resource "aws_security_group" "nginx_proxy" {
  name        = "${var.environment}-${local.instance_name}-sg"
  description = "Allow SSH, HTTP & HTTPS to the Nginx proxy"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_ingress_cidr]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    { Name = "${var.environment}-${local.instance_name}-sg" },
    var.tags
  )
}

# ────────────────────────────────────────────────────────────
# IAM role + instance-profile for S3 read access
# ────────────────────────────────────────────────────────────
resource "aws_iam_role" "nginx" {
  name = "${var.environment}-${local.instance_name}-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "nginx_s3_read" {
  name = "${var.environment}-${local.instance_name}-s3-read"
  role = aws_iam_role.nginx.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["s3:GetObject", "s3:ListBucket"]
      Resource = [
        aws_s3_bucket.assets.arn,
        "${aws_s3_bucket.assets.arn}/*"
      ]
    }]
  })
}

resource "aws_iam_instance_profile" "nginx" {
  name = "${var.environment}-${local.instance_name}-profile"
  role = aws_iam_role.nginx.name
}

# ────────────────────────────────────────────────────────────
# Nginx EC2 module
# ────────────────────────────────────────────────────────────
module "nginx" {
  source            = "../../modules/nginx-server"
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids

  # ── Key-pair and SSH ingress ─────────────────────────────
  key_name         = aws_key_pair.debian.key_name
  ssh_ingress_cidr = var.ssh_ingress_cidr

  # ── Instance sizing & tagging ───────────────────────────
  instance_type = var.instance_type
  environment   = var.environment
  instance_name = local.instance_name
  tags          = var.tags

  # ── S3 assets for Nginx to pull ─────────────────────────
  assets_s3_bucket = aws_s3_bucket.assets.bucket
  assets_s3_prefix = ""

  # ── Networking & security ───────────────────────────────
  security_group_ids = [aws_security_group.nginx_proxy.id]

  # ── IAM profile for S3 read ─────────────────────────────
  instance_profile = aws_iam_instance_profile.nginx.name

  # ── ENSURE THE ABOVE RESOURCES EXIST FIRST ──────────────
  depends_on = [
    aws_key_pair.debian,
    aws_iam_instance_profile.nginx
  ]
}

# ────────────────────────────────────────────────────────────
# (Optional) additional S3 bucket via reusable module
# ────────────────────────────────────────────────────────────
module "assets_bucket" {
  source      = "../../modules/s3-bucket"
  name        = "nginx-proxy-assets"
  environment = var.environment
  tags        = var.tags
}
