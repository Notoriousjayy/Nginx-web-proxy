terraform {
  backend "s3" {
    bucket  = "tf-state-d716b78b"
    key     = "Nginx-web-proxy/environments/dev/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }

  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.95.0, < 6.0.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.37"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 3.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = ">= 3.0.0"
    }
    time = {
      source  = "hashicorp/time"
      version = ">= 0.9.0"
    }
    cloudinit = {
      source  = "hashicorp/cloudinit"
      version = ">= 2.0.0"
    }
    null = {
      source  = "hashicorp/null"
      version = ">= 3.0.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source             = "../../modules/vpc"
  name               = var.name
  cidr_block         = var.vpc_cidr
  public_subnets     = var.public_subnets
  availability_zones = var.availability_zones
  eks_cluster_name   = var.cluster_name
  tags               = var.tags
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~>20.37.0"

  cluster_name    = var.eks_cluster_name
  cluster_version = "1.33"

  enable_cluster_creator_admin_permissions = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.public_subnet_ids

  enable_irsa = true

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = false

  cluster_enabled_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler",
  ]

  eks_managed_node_groups = {
    ng-standard = {
      min_size     = 2
      max_size     = 4
      desired_size = 2

      instance_types = [var.instance_type]
      volume_size    = 50

      labels = { role = "worker" }
      tags   = { Project = var.eks_cluster_name }

      additional_iam_policies = [
        "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
        "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
      ]

      capacity_type      = "ON_DEMAND"
      private_networking = true
    }
  }

  # ── no extra access_entries block ──────────────────────────────────────────

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}

resource "kubernetes_cluster_role_binding" "administrators" {
  metadata {
    name = "administrators-binding"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "cluster-admin"
  }

  subject {
    kind = "Group"
    name = "administrators"
  }
}
