variable "vpc_id" {
  description = "VPC ID to launch Nginx into"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "instance_type" {
  description = "EC2 instance type for Nginx"
  type        = string
}

variable "key_name" {
  description = "Existing AWS key pair name"
  type        = string
}

variable "ssh_ingress_cidr" {
  description = "CIDR block allowed to SSH in"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "instance_name" {
  description = "Name tag for the Nginx EC2 instance"
  type        = string
}

variable "tags" {
  description = "Additional tags to apply"
  type        = map(string)
  default     = {}
}
