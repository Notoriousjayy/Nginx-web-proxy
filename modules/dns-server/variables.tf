variable "role" {
  description = "master or slave"
  type        = string
}

variable "zone_name" {
  description = "DNS zone to serve (e.g. example.com)"
  type        = string
}

variable "master_ip" {
  description = "Master DNS IP (used by slaves); empty for master"
  type        = string
  default     = ""
}

variable "vpc_id" {
  description = "VPC ID to launch DNS server into"
  type        = string
}

variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
}

variable "key_name" {
  description = "Existing AWS key pair name"
  type        = string
}

variable "ssh_ingress_cidr" {
  description = "CIDR block allowed to SSH in (defaults to open to the world)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "environment" {
  description = "Deployment environment (e.g. dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "instance_name" {
  description = "Name tag for the DNS EC2 instance"
  type        = string
}

variable "tags" {
  description = "Additional tags to apply to SG & EC2"
  type        = map(string)
  default     = {}
}
