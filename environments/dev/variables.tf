variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "List of public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "availability_zones" {
  description = "List of AZs for the VPC"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "environment" {
  description = "Deployment environment (e.g. dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "eks_cluster_name"   { type = string }
variable "instance_type"      { type = string }
variable "key_name"           { type = string }
variable "zone_name"          { type = string }
variable "ssh_ingress_cidr"   { type = string }
variable "assets_s3_bucket"   { type = string }
variable "assets_s3_prefix"   { type = string }
variable "image_repo"         { type = string }
variable "image_tag"          { type = string }
