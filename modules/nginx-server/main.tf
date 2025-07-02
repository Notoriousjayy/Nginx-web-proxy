# modules/nginx-server/main.tf

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

  # IAM instance profile for S3 access
  instance_profile         = var.instance_profile

  user_data = base64encode(join("\n", [
    "#!/bin/bash",
    "set -euxo pipefail",

    "# --- 1) System prerequisites & Docker ----------------------------------",
    "apt-get update -y",
    "apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release",
    "apt-get install -y docker.io awscli nginx",
    "systemctl enable docker && systemctl start docker",

    "usermod -aG docker admin || true",

    "# --- 2) Install kubectl via Debian APT repo -----------------------------",
    "mkdir -p /etc/apt/keyrings",
    "curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.33/deb/Release.key | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg",
    "chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg",
    "echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.33/deb/ /' | tee /etc/apt/sources.list.d/kubernetes.list",
    "chmod 644 /etc/apt/sources.list.d/kubernetes.list",
    "apt-get update -y",
    "apt-get install -y kubectl",

    "# --- 3) Install Minikube ------------------------------------------------",
    "apt-get install -y conntrack",
    "curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb",
    "dpkg -i minikube_latest_amd64.deb",
    "rm minikube_latest_amd64.deb",

    "# --- 4) Non-root docker user --------------------------------------------",
    "useradd -m -s /bin/bash kube || true",
    "usermod -aG docker kube || true",

    "# --- 5) Pull static files from S3 (non-fatal) ---------------------------",
    "aws s3 sync s3://${var.assets_s3_bucket}/${var.assets_s3_prefix}/ /var/www/html/ || echo \"[WARNING] S3 sync failed, continuing without static assets.\"",

    "# --- 6) Write the nginx.conf we templated in Terraform ------------------",
    "cat > /etc/nginx/nginx.conf <<'EOF'",
    data.template_file.nginx_conf.rendered,
    "EOF",

    "# --- 7) Permissions & service restart -----------------------------------",
    "chown -R www-data:www-data /var/www/html",
    "systemctl enable nginx",
    "systemctl restart nginx"
  ]))
}

# Elastic IP to keep a stable public address
resource "aws_eip" "this" {
  instance = module.vm.instance_id
}
