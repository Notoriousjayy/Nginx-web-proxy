# environments/dev/main.tf

provider "aws" {
  region = var.aws_region
}

# ────────────────────────────────────────────────────────────
# Generate & upload SSH key
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
# VPC
# ────────────────────────────────────────────────────────────
module "vpc" {
  source             = "../../modules/vpc"
  name               = "dev-vpc"
  cidr_block         = var.vpc_cidr
  public_subnets     = var.public_subnets
  availability_zones = var.availability_zones
}

# ────────────────────────────────────────────────────────────
# DNS Servers: master + two slaves
# ────────────────────────────────────────────────────────────

# Master
module "dns_master" {
  source            = "../../modules/dns-server"
  role              = "master"
  zone_name         = var.zone_name
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  instance_type     = var.instance_type
  key_name          = aws_key_pair.debian.key_name
  environment       = var.environment
  instance_name     = "dns-master"
}

# Slave roles
locals {
  dns_slave_roles = ["slave1", "slave2"]
}

# Slaves (each will pull zones from the master)
module "dns_slave" {
  source            = "../../modules/dns-server"
  for_each          = toset(local.dns_slave_roles)

  role              = "slave"
  zone_name         = var.zone_name
  master_ip         = module.dns_master.public_ip

  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  instance_type     = var.instance_type
  key_name          = aws_key_pair.debian.key_name
  environment       = var.environment
  instance_name     = "dns-${each.key}"
}
