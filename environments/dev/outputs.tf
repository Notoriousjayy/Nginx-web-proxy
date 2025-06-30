output "nginx_eip" {
  description = "Elastic IP of the Nginx proxy"
  value       = module.nginx.eip
}

output "nginx_private_ip" {
  description = "Private IP of the Nginx proxy"
  value       = module.nginx.private_ip
}

output "private_key_pem" {
  description = "The generated SSH private key; save this securely!"
  value       = tls_private_key.ssh.private_key_pem
  sensitive   = true
}

output "assets_bucket_name" {
  description = "Name of the S3 bucket containing webpack build artifacts"
  value       = aws_s3_bucket.assets.bucket
}

output "bootstrap_bucket_name" {
  description = "Name of the shared state bucket (from bootstrap)"
  value       = data.terraform_remote_state.bootstrap.outputs.bucket_name
}

output "bootstrap_bucket_region" {
  description = "Region of the shared state bucket"
  value       = data.terraform_remote_state.bootstrap.outputs.bucket_region
}

output "ssh_public_key" {
  description = "The public key for SSH injected into the instance"
  value       = tls_private_key.ssh.public_key_openssh
}
