#!/usr/bin/env bash
set -euo pipefail

: "${BOOTSTRAP_BUCKET_NAME:=""}"
REPO_ROOT="$(git rev-parse --show-toplevel)"
BOOTSTRAP_DIR="${REPO_ROOT}/bootstrap"
ENV="dev"
KEY="${ENV}/terraform.tfstate"

# Make Terraform pick up our vars automatically
export TF_VAR_environment="bootstrap"
export TF_VAR_aws_region="us-east-1"

# 1) Read existing bootstrap outputs (if any)
read_output() {
  terraform -chdir="$BOOTSTRAP_DIR" output -raw "$1" 2>/dev/null || true
}

BUCKET_NAME="$(read_output bucket_name)"
BUCKET_REGION="$(read_output bucket_region)"

# 2) If we didn't get a real bucket_name, create the bucket now
if [[ -z "$BUCKET_NAME" ]]; then
  echo "⚙️  Bootstrapping S3 bucket..."

  # Initialize the bootstrap module
  terraform -chdir="$BOOTSTRAP_DIR" init -input=false

  # Pick a random name if none was provided
  if [[ -z "$BOOTSTRAP_BUCKET_NAME" ]]; then
    RANDHEX="$(openssl rand -hex 4)"
    export TF_VAR_name="tf-state-${RANDHEX}"
    echo "🔑 Generated bootstrap bucket name: ${TF_VAR_name}"
  else
    export TF_VAR_name="$BOOTSTRAP_BUCKET_NAME"
  fi

  # Apply to create the S3 bucket
  terraform -chdir="$BOOTSTRAP_DIR" apply -auto-approve

  # Re-read the newly created outputs
  BUCKET_NAME="$(terraform -chdir="$BOOTSTRAP_DIR" output -raw bucket_name)"
  BUCKET_REGION="$(terraform -chdir="$BOOTSTRAP_DIR" output -raw bucket_region)"
fi

# 3) Fail if still missing
if [[ -z "$BUCKET_NAME" || -z "$BUCKET_REGION" ]]; then
  echo "❌  Unable to create or read the bootstrap bucket." >&2
  exit 1
fi

# 4) Write the dev environment backend configuration
cat > backend.hcl <<EOF
bucket  = "${BUCKET_NAME}"
region  = "${BUCKET_REGION}"
key     = "${KEY}"
encrypt = true
EOF
echo "✅ Wrote backend.hcl → $(pwd)/backend.hcl"

# 5) Write terraform.auto.tfvars so apply is non-interactive
cat > terraform.auto.tfvars <<EOF
bootstrap_bucket = "${BUCKET_NAME}"
EOF
echo "✅ Wrote terraform.auto.tfvars → $(pwd)/terraform.auto.tfvars"
