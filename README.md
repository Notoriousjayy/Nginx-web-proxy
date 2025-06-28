# Terraform AWS Mono-Repo

## Structure

- **modules/**: reusable building blocks (VPC, EC2, DNS, Nginx)
- **environments/**: per-env configs (dev, staging, prod)
- **terraform.tfvars.example**: sample variable values

## Prerequisites

- Terraform v1.3 or newer
- AWS credentials configured (e.g. via `~/.aws/credentials`)
- An SSH key pair created out-of-band and imported into AWS

## Getting Started

```bash
cd environments/dev
cp terraform.tfvars.example terraform.tfvars    # fill in your values
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
