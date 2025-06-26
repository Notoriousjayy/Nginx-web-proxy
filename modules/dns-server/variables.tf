variable "role" {
  description = "master or slave"
  type        = string
}

variable "zone_name" {
  description = "DNS zone to serve, e.g. example.com"
  type        = string
}

variable "master_ip" {
  description = "Master DNS IP (used by slaves)"
  type        = string
  default     = ""
}

# VPC/network
variable "vpc_id" {
  type = string
}
variable "public_subnet_ids" {
  type = list(string)
}

# Instance settings
variable "instance_type" { type = string }
variable "key_name"      { type = string }
variable "environment"   { type = string }
variable "instance_name" { type = string }

# From ec2 module
variable "ssh_ingress_cidr" {
  type    = string
  default = "0.0.0.0/0"
}
