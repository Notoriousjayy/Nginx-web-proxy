terraform {
  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}

# ────────────────────────────────────────────────────────────
# Pull in the bootstrap state‐bucket outputs (local state file)
# ────────────────────────────────────────────────────────────
data "terraform_remote_state" "bootstrap" {
  backend = "local"
  config = {
    path = "${path.module}/../../bootstrap/terraform.tfstate"
  }
}


# ────────────────────────────────────────────────────────────
# Generate & upload SSH key (Terraform-managed)
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
# Dynamically derive AZs to match public_subnets length
# ────────────────────────────────────────────────────────────
data "aws_availability_zones" "available" {
  state = "available"
}

# ────────────────────────────────────────────────────────────
# VPC
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
  dns_slave_roles = ["slave1", "slave2"]
  instance_name   = "nginx-proxy"
}

# ────────────────────────────────────────────────────────────
# Assets bucket for webpack build artifacts
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

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_versioning" "assets" {
  bucket = aws_s3_bucket.assets.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket = aws_s3_bucket.assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ────────────────────────────────────────────────────────────
# Security Group for Nginx proxy
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
    var.tags,
  )
}

# ────────────────────────────────────────────────────────────
# Nginx Web Proxy
# ────────────────────────────────────────────────────────────
module "nginx" {
  source            = "../../modules/nginx-server"
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids

  instance_type     = var.instance_type
  key_name          = aws_key_pair.debian.key_name
  ssh_ingress_cidr  = var.ssh_ingress_cidr
  environment       = var.environment
  instance_name     = local.instance_name
  tags              = var.tags

  assets_s3_bucket  = aws_s3_bucket.assets.bucket
  assets_s3_prefix  = ""

  security_group_ids = [aws_security_group.nginx_proxy.id]
}

# ────────────────────────────────────────────────────────────
# (Optional) Manage a second S3 bucket via module
# ────────────────────────────────────────────────────────────
module "assets_bucket" {
  source      = "../../modules/s3-bucket"
  name        = "nginx-proxy-assets"
  environment = var.environment
  tags        = var.tags
}
