# environments/dev/outputs.tf

output "dns_name_servers" {
  description = "Elastic IP addresses of the master and slave DNS servers"
  value = concat(
    [ module.dns_master.eip ],
    [ for s in values(module.dns_slave) : s.eip ]
  )
}

output "nginx_eip" {
  description = "Elastic IP of the Nginx proxy"
  value       = module.nginx.eip
}

output "private_key_pem" {
  description = "The generated SSH private key; save this securely!"
  value       = tls_private_key.ssh.private_key_pem
  sensitive   = true
}
