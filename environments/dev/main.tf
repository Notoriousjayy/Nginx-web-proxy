terraform {
  backend "s3" {
    bucket  = "tf-state-d716b78b"
    key     = "Nginx-web-proxy/environments/dev/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }

  required_version = ">= 1.0"
}

# ——— VPC Module —————————————————————————————————————————————————————
module "vpc" {
  source             = "../../modules/vpc"
  name               = var.name
  cidr_block         = var.vpc_cidr
  public_subnets     = var.public_subnets
  availability_zones = var.availability_zones
  eks_cluster_name   = var.cluster_name

  tags = var.tags
}

# Tag each public subnet so the in-cluster AWS LB controller can see them
resource "aws_ec2_tag" "public_subnet_cluster_shared" {
  count       = length(module.vpc.public_subnet_ids)
  resource_id = module.vpc.public_subnet_ids[count.index]

  key   = "kubernetes.io/cluster/${module.eks.cluster_name}"
  value = "shared"
}

resource "aws_ec2_tag" "public_subnet_role_elb" {
  count       = length(module.vpc.public_subnet_ids)
  resource_id = module.vpc.public_subnet_ids[count.index]

  key   = "kubernetes.io/role/elb"
  value = "1"
}


# ——— EKS Module —————————————————————————————————————————————————————
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

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# ——— Authenticate to the EKS cluster for Kubernetes resources —————————————————————————————————
data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}

# ——— Kubernetes RBAC & ServiceAccount —————————————————————————————————————————————————————
resource "kubernetes_cluster_role_binding" "administrators" {
  metadata { name = "administrators-binding" }

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
