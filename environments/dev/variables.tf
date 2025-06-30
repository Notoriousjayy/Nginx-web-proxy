variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "availability_zones" {
  type        = list(string)
  description = "Availability zones for your subnets"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for dev VPC"
}

variable "public_subnets" {
  type        = list(string)
  description = "Public subnet CIDRs"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
}

variable "key_name" {
  type        = string
  description = "Name of the existing AWS key pair"
}

variable "ssh_ingress_cidr" {
  type        = string
  description = "CIDR block allowed to SSH in (e.g. your office IP/32)"
  default     = "0.0.0.0/0"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
  default     = "dev"
}

variable "zone_name" {
  type        = string
  description = "DNS zone name (only needed if you use Route53 or other DNS integrations)"
}

variable "bootstrap_bucket" {
  description = "Name of the S3 bucket that stores the bootstrap state"
  type        = string
}

variable "bootstrap_bucket_region" {
  description = "Region where the bootstrap state bucket lives"
  type        = string
}

variable "tags" {
  description = "Common tags to apply to all dev resources"
  type        = map(string)
  default     = {
    Environment = "dev"
    ManagedBy   = "terraform"
  }
}