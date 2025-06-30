variable "name" {
  description = "Base name for the S3 bucket"
  type        = string
}

variable "environment" {
  description = "Bootstrap environment name"
  type        = string
  default     = "bootstrap"
}

variable "aws_region" {
  description = "AWS region to create the bucket in"
  type        = string
  default     = "us-east-1"
}

variable "tags" {
  description = "Tags to apply to the bucket"
  type        = map(string)
  default     = {
    Environment = "bootstrap"
    ManagedBy   = "terraform"
  }
}
