# Terraform AWS Mono-Repo

## Structure

- **modules/**: reusable building blocks (VPC, EC2, RDS, S3, IAM)
- **environments/**: per-env configs (dev, staging, prod)
- **global/**: org-wide infra (IAM org roles, SCPs)
- **shared/**: infra shared across environments (VPC peering, etc.)
- **terraform.tfvars.example**: sample variable values

## Getting Started

```bash
cd terraform/environments/dev
cp terraform.tfvars.example terraform.tfvars    # fill in your values
terraform init
terraform apply
