# NotoriousJayy NGINX Web Proxy

A Terraform-based AWS mono-repo that provisions an NGINX web proxy backed by S3 (for static assets) and a React+TypeScript+Webpack UI. Ideal for teams who want an end-to-end IaC CI/CD setup for serving and managing static web apps.

## Usage/Examples


### 1) Bootstrap your remote state bucket (once per account)
```bash
cd bootstrap
bash ../environments/dev/bootstrap-backend.sh
```

### 2) Deploy the dev environment
```bash
cd ../environments/dev
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply --auto-approve
```

### 3) Build & deploy the React UI
```bash
cd ../../app
npm ci
npm run build
```

### 4) Sync built assets to S3
```bash
BUCKET=$(terraform -chdir=../environments/dev output -raw assets_bucket_name)
aws s3 sync dist/ s3://$BUCKET/ --delete --acl bucket-owner-full-control
```

## Installation

Install the UI dependencies:

```bash
cd app
npm install
```

Prepare Terraform:

```bash
cd environments/dev
cp terraform.tfvars.example terraform.tfvars
# → edit terraform.tfvars with your values (region, subnets, keys…)
terraform init
```

## Deployment

To deploy the full stack (infrastructure + UI) in one command, use the provided GitHub Actions workflow:

```bash
# Push to main → triggers .github/workflows/deploy.yml
git push origin main
```

Or run manually:

```bash
# Deploy infra
cd environments/dev
terraform apply --auto-approve

# Deploy UI
cd ../../app
npm run build
npm run deploy     # syncs to S3 & invalidates CloudFront
```

## Environment Variables

The following variables must be set in your shell or CI environment:

```bash
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION=us-east-2
CLOUDFRONT_DIST_ID    # for cache invalidation
```

And copy/fill the Terraform example:

```hcl
# environments/dev/terraform.tfvars
aws_region         = "us-east-2"
vpc_cidr           = "10.0.0.0/16"
public_subnets     = ["10.0.1.0/24"]
availability_zones = ["us-east-1a"]
instance_type      = "t3.micro"
instance_name      = "my-nginx-proxy"
key_name           = "my-ssh-key"
```

## Run Locally

Clone and spin up the UI in development mode:

```bash
git clone https://github.com/your-org/notoriousjayy-nginx-web-proxy.git
cd notoriousjayy-nginx-web-proxy/app
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Reference

Terraform outputs serve as the “API” for this repo:

#### List all outputs

```bash
terraform -chdir=environments/dev output
```

| Output Key              | Description                                  |
| :---------------------- | :------------------------------------------- |
| `nginx_eip`             | Elastic IP of the NGINX proxy                |
| `assets_bucket_name`    | S3 bucket name where built assets are stored |
| `bootstrap_bucket_name` | Name of the shared Terraform state bucket    |

#### Get a single output

```bash
terraform -chdir=environments/dev output nginx_eip
```

Export all outputs as JSON:

```bash
terraform -chdir=environments/dev output -json > outputs.json
```
