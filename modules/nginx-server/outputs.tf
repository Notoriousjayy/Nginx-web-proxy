output "instance_id" {
  description = "ID of the Nginx EC2 instance"
  value       = module.vm.instance_id
}

output "public_ip" {
  description = "Public IP of the Nginx instance"
  value       = module.vm.public_ip
}

output "private_ip" {
  description = "Private IP of the Nginx instance"
  value       = module.vm.private_ip
}

output "eip" {
  description = "Elastic IP allocated to Nginx"
  value       = aws_eip.this.public_ip
}
