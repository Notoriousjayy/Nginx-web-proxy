# Security Group for Nginx proxy
resource "aws_security_group" "nginx" {
  name        = "${var.instance_name}-sg"
  description = "Allow HTTP, HTTPS, SSH"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_ingress_cidr]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    { Name = "${var.instance_name}-sg" },
    var.tags
  )
}

# Elastic IP for Nginx
resource "aws_eip" "this" {
  instance = module.vm.instance_id
}

# Render Nginx config template (if you want custom vhosts, etc.)
data "template_file" "nginx_conf" {
  template = file("${path.module}/templates/nginx.conf.tpl")
  vars     = {}  # add template vars here if needed
}

# Launch EC2 with Nginx installed in user-data
module "vm" {
  source                   = "../ec2"
  vpc_id                   = var.vpc_id
  public_subnet_ids        = var.public_subnet_ids
  instance_type            = var.instance_type
  key_name                 = var.key_name
  ssh_ingress_cidr         = var.ssh_ingress_cidr
  extra_security_group_ids = [aws_security_group.nginx.id]
  associate_public_ip      = false
  environment              = var.environment
  instance_name            = var.instance_name
  tags                     = var.tags

  user_data = base64encode(join("\n", [
    "#!/bin/bash",
    "apt-get update -y",
    "apt-get install -y nginx",

    # Write out our config
    "cat << 'EOF' > /etc/nginx/nginx.conf",
    data.template_file.nginx_conf.rendered,
    "EOF",

    # Ensure web root exists and serves a default page
    "mkdir -p /var/www/html",
    "cat << 'EOF' > /var/www/html/index.html",
    "<!DOCTYPE html>",
    "<html><head><title>Welcome</title></head>",
    "<body><h1>It works!</h1></body></html>",
    "EOF",

    # Permissions
    "chown -R www-data:www-data /var/www/html",

    # Start nginx
    "systemctl enable nginx",
    "systemctl restart nginx"
  ]))
}
