# environments/dev/outputs.tf

output "nginx_eip" {
  description = "Elastic IP of the Nginx proxy"
  value       = module.nginx.eip
}

output "private_key_pem" {
  description = "The generated SSH private key; save this securely!"
  value       = tls_private_key.ssh.private_key_pem
  sensitive   = true
}
