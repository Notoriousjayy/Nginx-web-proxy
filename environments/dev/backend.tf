terraform {
  backend "s3" {
    bucket = "866934333672-terraform-state-us-east-2-dev"
    key    = "dev/terraform.tfstate"
    region = "us-east-2"
  }
}
