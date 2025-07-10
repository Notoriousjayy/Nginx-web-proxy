# ── 1) Fetch EKS cluster info ───────────────────────
data "aws_eks_cluster" "eks" {
  name = var.eks_cluster_name
}

data "aws_eks_cluster_auth" "eks" {
  name = data.aws_eks_cluster.eks.name
}

# ── 2) Kubernetes provider pointing at EKS ─────────
provider "kubernetes" {
  host                   = data.aws_eks_cluster.eks.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.eks.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.eks.token
}

# ── 3) Helm provider using the same kubeconfig ─────
provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.eks.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.eks.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.eks.token
  }
}

# ── 4) Deploy your chart with overridden image ──────
resource "helm_release" "spa" {
  name       = "react-app"
  chart      = "${path.root}/../chart"      # adjust if your path differs
  namespace  = "default"
  create_namespace = false

  set {
    name  = "image.repository"
    value = var.image_repo
  }
  set {
    name  = "image.tag"
    value = var.image_tag
  }

  # optional: if you enabled ingress in values.yaml
  # set { name = "ingress.enabled"; value = "true" }
}
