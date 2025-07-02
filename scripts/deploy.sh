#!/usr/bin/env bash
set -euo pipefail

# ────────────────────────────────────────────────────────────
# Locate repo root (one level up from this script)
# ────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$SCRIPT_DIR/.."

# ────────────────────────────────────────────────────────────
# 1) Build the React app
# ────────────────────────────────────────────────────────────
echo "🔨 Building React app…"
pushd "$REPO_ROOT/app" >/dev/null
  npm ci
  npm run build
popd >/dev/null

# ────────────────────────────────────────────────────────────
# 2) Terraform init in dev
# ────────────────────────────────────────────────────────────
echo "🔄 Initializing Terraform in environments/dev…"
terraform -chdir="$REPO_ROOT/environments/dev" init -input=false -backend-config=backend.hcl >/dev/null

# ────────────────────────────────────────────────────────────
# 3) Read outputs: bucket, EIP, PIP
# ────────────────────────────────────────────────────────────
echo "📦 Reading Terraform outputs…"
BUCKET=$(terraform -chdir="$REPO_ROOT/environments/dev" output -raw assets_bucket_name)
EIP=$(terraform -chdir="$REPO_ROOT/environments/dev" output -raw nginx_eip)
PIP=$(terraform -chdir="$REPO_ROOT/environments/dev" output -raw nginx_private_ip)

for var in BUCKET EIP PIP; do
  if [[ -z "${!var}" ]]; then
    echo "❌ '$var' is empty. Run 'terraform apply' in environments/dev." >&2
    exit 1
  fi
done

echo "   → bucket: $BUCKET"
echo "   → EIP:    $EIP"
echo "   → PIP:    $PIP"

# ────────────────────────────────────────────────────────────
# 4) Sync to S3
# ────────────────────────────────────────────────────────────
echo "☁️  Syncing dist/ → s3://$BUCKET/"
aws s3 sync "$REPO_ROOT/app/dist/" "s3://$BUCKET/" \
  --delete \
  --acl bucket-owner-full-control

# ────────────────────────────────────────────────────────────
# 5) Optional CloudFront invalidation
# ────────────────────────────────────────────────────────────
if [[ -n "${CLOUDFRONT_DIST_ID:-}" ]]; then
  echo "🚀 Invalidating CloudFront $CLOUDFRONT_DIST_ID…"
  aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DIST_ID" \
    --paths "/*"
fi

# ────────────────────────────────────────────────────────────
# 6) Fetch the Terraform-generated private key
# ────────────────────────────────────────────────────────────
echo "🔑 Fetching SSH private key from Terraform output…"
KEY_PATH="$(mktemp)"
terraform -chdir="$REPO_ROOT/environments/dev" output -raw private_key_pem > "$KEY_PATH"
chmod 600 "$KEY_PATH"

# ────────────────────────────────────────────────────────────
# 7) Determine SSH target and credentials
# ────────────────────────────────────────────────────────────
SSH_TARGET="$EIP"
if nc -z -w2 "$PIP" 22 &>/dev/null; then
  SSH_TARGET="$PIP"
fi
echo "🔐 Will SSH to $SSH_TARGET"

SSH_USER=""
for USER in admin ubuntu ec2-user; do
  echo "  • Testing SSH user '$USER'…"
  if ssh -q -o BatchMode=yes -o StrictHostKeyChecking=no \
        -i "$KEY_PATH" "$USER@$SSH_TARGET" "exit" 2>/dev/null; then
    SSH_USER=$USER
    break
  fi
done

if [[ -z "$SSH_USER" ]]; then
  echo "❌ Unable to SSH as admin, ubuntu or ec2-user. Check your key and SG." >&2
  exit 1
fi
echo "   → using SSH user '$SSH_USER'"

# ────────────────────────────────────────────────────────────
# 8) Remote sync & nginx restart (with sudo)
# ────────────────────────────────────────────────────────────
ssh -o StrictHostKeyChecking=no -i "$KEY_PATH" "$SSH_USER@$SSH_TARGET" bash -s <<EOF
set -euo pipefail
echo "  • pulling from S3"
sudo aws s3 sync s3://$BUCKET/ /var/www/html/
echo "  • fixing perms"
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R o+r /var/www/html
echo "  • restarting nginx"
sudo systemctl restart nginx
EOF

echo "✅ Deployment complete!"