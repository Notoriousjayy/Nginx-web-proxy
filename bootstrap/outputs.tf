output "bucket_name" {
  value       = module.state_bucket.bucket_name  # <─ matches module output
  description = "Name of the bootstrap state bucket"
}

output "bucket_region" {
  value       = var.aws_region
  description = "Region of the bootstrap state bucket"
}
