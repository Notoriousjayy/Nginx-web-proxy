#!/usr/bin/env bash
set -euo pipefail

: "${BOOTSTRAP_BUCKET_NAME:=}"            # optional override

REPO_ROOT="$(git rev-parse --show-toplevel)"
BOOTSTRAP_DIR="${REPO_ROOT}/bootstrap"
ENV="dev"
KEY="${ENV}/terraform.tfstate"

export TF_VAR_environment="bootstrap"
export TF_VAR_aws_region="us-east-1"

#######################################
# Helpers
#######################################

# Return a value only if it looks like a legal S3 bucket name
read_output() {
  local val
  val="$(terraform -chdir="$BOOTSTRAP_DIR" output -raw "$1" 2>/dev/null || true)"
  # strip whitespace
  val="$(echo "$val" | tr -d '[:space:]')"
  [[ "$val" =~ ^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$ ]] && echo "$val" || echo ""
}

# True ↦ bucket string is syntactically valid **and** actually exists
bucket_exists() {
  local bucket="$1"
  [[ -z "$bucket" ]] && return 1
  aws s3api head-bucket --bucket "$bucket" >/dev/null 2>&1
}

#######################################
# 1 ▷ Try to reuse an existing bucket
#######################################

BUCKET_NAME="$(read_output bucket_name)"
BUCKET_REGION="$(read_output bucket_region)"

if ! bucket_exists "$BUCKET_NAME"; then
  BUCKET_NAME=""
  BUCKET_REGION=""
fi

#######################################
# 2 ▷ Create a bucket if none usable
#######################################

if [[ -z "$BUCKET_NAME" ]]; then
  echo "⚙️  Bootstrapping S3 bucket …"

  terraform -chdir="$BOOTSTRAP_DIR" init -input=false

  if [[ -z "$BOOTSTRAP_BUCKET_NAME" ]]; then
    TF_VAR_name="tf-state-$(openssl rand -hex 4)"
  else
    TF_VAR_name="$BOOTSTRAP_BUCKET_NAME"
  fi
  export TF_VAR_name
  echo "🔑 Using bucket name: $TF_VAR_name"

  terraform -chdir="$BOOTSTRAP_DIR" apply -auto-approve

  BUCKET_NAME="$(terraform -chdir="$BOOTSTRAP_DIR" output -raw bucket_name)"
  BUCKET_REGION="$(terraform -chdir="$BOOTSTRAP_DIR" output -raw bucket_region)"
fi

#######################################
# 3 ▷ Validate and write backend files
#######################################

if [[ -z "$BUCKET_NAME" || -z "$BUCKET_REGION" ]]; then
  echo "❌  Unable to determine a valid bootstrap bucket." >&2
  exit 1
fi

cat > backend.hcl <<EOF
bucket  = "${BUCKET_NAME}"
region  = "${BUCKET_REGION}"
key     = "${KEY}"
encrypt = true
EOF
echo "✅ Wrote backend.hcl → $(pwd)/backend.hcl"

cat > terraform.auto.tfvars <<EOF
bootstrap_bucket = "${BUCKET_NAME}"
EOF
echo "✅ Wrote terraform.auto.tfvars → $(pwd)/terraform.auto.tfvars"
