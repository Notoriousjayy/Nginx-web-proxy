# NotoriousJayy • NGINX Web Proxy Mono-Repo

Terraform-driven AWS infrastructure + a React 19 Single-Page App (SPA) served by
NGINX.  Everything lives in one repo so you can bootstrap cloud resources,
build the UI, and publish it to S3/CloudFront (or a Kubernetes cluster) from a
single CI/CD pipeline.

---

## ✨ Features

| Layer | What you get | Source |
|-------|--------------|--------|
| **IaC** | Re-usable Terraform modules & per-env compositions (VPC, S3, EC2 + NGINX) | `modules/*`, `environments/*` :contentReference[oaicite:0]{index=0} |
| **App** | TypeScript + React 19 + Tailwind + Webpack 5 scaffold | `app/` :contentReference[oaicite:1]{index=1} |
| **Docker** | Multi-stage image that compiles the SPA then serves it with NGINX | `Dockerfile` :contentReference[oaicite:2]{index=2} |
| **Helm chart** | Optional K8s deployment for the same container | `chart/` (Chart v2)  |
| **CI/CD** | GitHub Actions workflow that builds, syncs to S3 and (optionally) invalidates CloudFront | `.github/workflows/deploy.yml` :contentReference[oaicite:3]{index=3} |
| **Helper script** | `scripts/deploy.sh` = one-liner build → S3 → remote NGINX refresh | `scripts/deploy.sh` :contentReference[oaicite:4]{index=4} |

---

## 🖥️ Quick start (dev)

```bash
# 0 · Pre-reqs: Terraform >=1.7, AWS CLI, Node 18, Git

git clone https://github.com/your-org/notoriousjayy-nginx-web-proxy.git
cd notoriousjayy-nginx-web-proxy

# 1 · Bootstrap remote state (once per AWS account)
cd bootstrap
bash ../environments/dev/bootstrap-backend.sh           # creates/validates tf-state bucket
cd ..

# 2 · Provision dev infra
cd environments/dev
cp terraform.tfvars.example terraform.tfvars            # edit region, subnets, key pair…
terraform init
terraform apply --auto-approve
cd ../..

# 3 · Compile the React UI
cd app
npm ci
npm run build
```

The SPA is now on S3 and fronted by an EC2/NGINX instance whose Elastic IP
is printed by:
```terraform
terraform -chdir=environments/dev output nginx_eip
```

---

## 🚀 One-command deploy (CI)
Push to `main` → GitHub Actions triggers the Build & Deploy to S3 workflow,
which:

Checks out code & installs Node deps

Builds the SPA (`npm run build`)

Assumes your deploy role & syncs `app/dist/ → s3://<assets_bucket>`

Optionally invalidates CloudFront for cache-busting 

Set these **repository secrets**:

| Secret                                        | Used by            |
| --------------------------------------------- | ------------------ |
| `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` | bucket sync        |
| `AWS_REGION` (defaults to `us-east-2`)        | bucket sync        |
| `CLOUDFRONT_DIST_ID`                          | cache invalidation |


---

## 🐳 Run locally with Docker

```bash
# build the same image the pipeline uses
docker build -t nginx-web-proxy:dev .

# run it on http://localhost:3000
docker run --rm -p 3000:3000 nginx-web-proxy:dev
```

The image is produced by a multi-stage Dockerfile that compiles the UI then
copies /dist into the NGINX base image 

---

## ☸️ Deploy to Kubernetes (optional)

If you already run a cluster, package the image with a Helm chart located in
`chart/`:

```bash
helm upgrade --install react-app ./chart \
  --set image.repository=<your ECR repo> \
  --set image.tag=<semantic-tag>
```

The chart ships sane defaults: three replicas, NodePort 3000, and an Ingress
stub you can enable when you have a controller.


---

## 🗺️ Repository layout
```
.
├── app/                 # React 19 + Webpack + Tailwind SPA
├── bootstrap/           # remote-state S3 bucket
├── environments/        # dev / (staging) / (prod) Terraform roots
├── modules/             # reusable Terraform modules (vpc, ec2, s3, nginx)
├── chart/               # Helm v3 chart (Kubernetes deployment of SPA)
├── scripts/deploy.sh    # zero-downtime S3 → EC2 sync helper
└── .github/workflows/   # CI/CD pipelines
```

---

## 🔧 Helper scripts

* **`scripts/deploy.sh`** — local “build + S3 sync + remote NGINX refresh”
  wrapper; great for quick fixes outside CI..
* **`app/setup-app-structure.sh`** — scaffolds missing pages/components during
  early prototyping.

---

## 🛠️ Configuration

### Terraform variables

Copy & edit `environments/dev/terraform.tfvars.example`:

```hcl
aws_region         = "us-east-2"
vpc_cidr           = "10.0.0.0/16"
public_subnets     = ["10.0.1.0/24"]
availability_zones = ["us-east-1a"]
instance_type      = "t3.micro"
instance_name      = "my-nginx-proxy"
key_name           = "my-ssh-key"
``` 

### Environment variables (local & CI)

```
AWS_ACCESS_KEY_ID # IAM user/role with S3 + EC2 + CloudFront perms
AWS_SECRET_ACCESS_KEY
AWS_REGION=us-east-2
CLOUDFRONT_DIST_ID # only if you enable invalidation
```

---

## 🧪 Local development

```bash
cd app
npm start                    # webpack-dev-server on http://localhost:3000
```

Hot-reload, TypeScript, ESLint and Tailwind JIT are pre-wired.

---

## 🧹 Tear down (dev)

Destroy all dev resources once you’re done:

```bash
terraform -chdir=environments/dev destroy
```