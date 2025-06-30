# Render your custom nginx.conf
data "template_file" "nginx_conf" {
  template = file("${path.module}/templates/nginx.conf.tpl")
  vars     = {}
}

# Launch EC2 with Nginx, sync assets from S3, write config & restart
module "vm" {
  source                   = "../ec2"
  vpc_id                   = var.vpc_id
  public_subnet_ids        = var.public_subnet_ids
  instance_type            = var.instance_type
  key_name                 = var.key_name

  # attach the security groups passed in from the root module
  extra_security_group_ids = var.security_group_ids

  # give it a public IP so you can SSH in
  associate_public_ip      = true

  environment              = var.environment
  instance_name            = var.instance_name
  tags                     = var.tags

  user_data = base64encode(join("\n", [
    "#!/bin/bash",
    "set -e",

    "apt-get update -y",
    "apt-get install -y awscli nginx",

    "# Sync static assets from S3",
    "aws s3 sync s3://${var.assets_s3_bucket}/${var.assets_s3_prefix}/ /var/www/html/",

    "# Write out the Nginx config",
    "cat << 'EOF' > /etc/nginx/nginx.conf",
    data.template_file.nginx_conf.rendered,
    "EOF",

    "# Ensure correct permissions",
    "chown -R www-data:www-data /var/www/html",

    "# Enable & restart Nginx",
    "systemctl enable nginx",
    "systemctl restart nginx"
  ]))
}

# Elastic IP to keep a stable public address
resource "aws_eip" "this" {
  instance = module.vm.instance_id
}
