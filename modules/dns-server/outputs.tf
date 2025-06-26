output "instance_id" {
  value = module.vm.instance_id
}
output "public_ip" {
  value = module.vm.public_ip
}
output "eip" {
  value = aws_eip.this.public_ip
}
