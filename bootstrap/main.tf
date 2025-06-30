terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = var.aws_region
}

module "state_bucket" {
  source      = "../modules/s3-bucket"
  name        = var.name
  environment = var.environment
  tags        = var.tags
  force_destroy = true   # optional, but handy in dev
}
