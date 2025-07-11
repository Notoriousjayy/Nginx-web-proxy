# modules/vpc/variables.tf

variable "name" {
  description = "Name tag prefix for all VPC resources"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "public_subnets" {
  description = "List of CIDR blocks for public subnets"
  type        = list(string)
}

variable "availability_zones" {
  description = "List of availability zones, must align with public_subnets"
  type        = list(string)
}

variable "eks_cluster_name" {
  description = "Exact name of the EKS cluster (used for tagging subnets)"
  type        = string
}

variable "tags" {
  description = "Additional tags to apply to all public subnets"
  type        = map(string)
  default     = {}
}
