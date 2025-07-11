provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.cluster.token
}

provider "helm" {
  kubernetes = {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    token                  = data.aws_eks_cluster_auth.cluster.token
  }
}

resource "helm_release" "react_app" {
  name             = "react-app"
  chart            = "${path.module}/../../chart"
  namespace        = "default"
  create_namespace = false

  values = [
    file("${path.module}/../../chart/values.yaml")
  ]

  depends_on = [module.eks]
}
