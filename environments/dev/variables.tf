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
variable "ssh_ingress_cidr"   { type = string }
variable "assets_s3_bucket"   { type = string }
variable "assets_s3_prefix"   { type = string }
variable "image_repo"         { type = string }
variable "image_tag"          { type = string }

variable "cluster_name" {
  description = "The exact name of your EKS cluster (used by the VPC module to tag subnets)"
  type        = string
}

variable "tags" {
  description = "Additional tags to apply to VPC subnets"
  type        = map(string)
  default     = {}
}

variable "name" {
  description = "Name tag prefix for all VPC resources"
  type        = string
}

# variable "grafana_admin_password" {
#   description = "Initial Grafana admin password"
#   type        = string
# }

variable "zone_name" {
  description = "Public Route53 base DNS zone (e.g. example.com)"
  type        = string
}

variable "app_image_repository" {
  description = "Docker repo for the React app"
  type        = string
}

variable "app_image_tag" {
  description = "Docker image tag for the React app"
  type        = string
}

variable "app_ingress_host" {
  description = "Hostname to expose the React app"
  type        = string
}

# === New variables for Option A ===
variable "grafana_domain" {
  description = "Public FQDN for Grafana (e.g. grafana.example.com) inside the public hosted zone."
  type        = string
}

variable "prometheus_domain" {
  description = "Private FQDN for Prometheus (e.g. prometheus.internal.example.com) in a private hosted zone."
  type        = string
}

variable "prometheus_allowed_cidrs" {
  description = "CIDR blocks allowed to reach the internal Prometheus ALB."
  type        = list(string)
  default     = ["10.0.0.0/8"]
}

variable "private_zone_name" {
  description = "Private Route53 hosted zone name (e.g. internal.example.com)"
  type        = string
}
