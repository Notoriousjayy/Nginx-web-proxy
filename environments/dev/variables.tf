# environments/dev/variables.tf

variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR block for dev VPC"
}

variable "public_subnets" {
  type        = list(string)
  description = "Public subnet CIDRs"
}

variable "availability_zones" {
  type        = list(string)
  description = "Availability zones for your subnets"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
}

variable "key_name" {
  type        = string
  description = "Name of the SSH key pair"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
  default     = "dev"
}

variable "zone_name" {
  type        = string
  description = "DNS zone to serve (e.g. example.com)"
}
