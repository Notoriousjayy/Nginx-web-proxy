# DNS Security Group
resource "aws_security_group" "dns" {
  name        = "${var.instance_name}-dns-sg"
  description = "Allow DNS (TCP/UDP), SSH, HTTP, HTTPS"
  vpc_id      = var.vpc_id

  # DNS UDP
  ingress {
    from_port   = 53
    to_port     = 53
    protocol    = "udp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # DNS TCP
  ingress {
    from_port   = 53
    to_port     = 53
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_ingress_cidr]
  }
  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # Allow all outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    { Name = "${var.instance_name}-dns-sg" },
    var.tags
  )
}

# Elastic IP
resource "aws_eip" "this" {
  instance = module.vm.instance_id
}

# Render BIND config
data "template_file" "bind" {
  template = file("${path.module}/templates/named.conf.${var.role}.tpl")
  vars = {
    zone_name = var.zone_name
    master_ip = var.master_ip
  }
}

# Reuse EC2 module
module "vm" {
  source                   = "../ec2"
  vpc_id                   = var.vpc_id
  public_subnet_ids        = var.public_subnet_ids
  instance_type            = var.instance_type
  key_name                 = var.key_name
  ssh_ingress_cidr         = var.ssh_ingress_cidr
  extra_security_group_ids = [aws_security_group.dns.id]
  user_data                = base64encode(data.template_file.bind.rendered)
  associate_public_ip      = false
  environment              = var.environment
  instance_name            = var.instance_name
  tags                     = var.tags
}
