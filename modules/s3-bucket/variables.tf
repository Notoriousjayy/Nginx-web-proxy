variable "name" {
  description = "Base name for the bucket"
  type        = string
}

variable "environment" {
  description = "Environment tag (dev, staging, prod, bootstrap, …)"
  type        = string
}

variable "tags" {
  description = "Extra tags"
  type        = map(string)
  default     = {}
}

variable "force_destroy" {
  description = "Allow deleting bucket with objects"
  type        = bool
  default     = false
}
