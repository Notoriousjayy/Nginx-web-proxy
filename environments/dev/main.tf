provider "aws" {
  region = var.aws_region
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
  instance_name     = "nginx-proxy"
}