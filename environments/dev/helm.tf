provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args = [
      "eks", "get-token",
      "--cluster-name", module.eks.cluster_name,
      "--region",        var.aws_region,
    ]
  }
}

provider "helm" {
  kubernetes = {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

    exec = {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args = [
        "eks", "get-token",
        "--cluster-name", module.eks.cluster_name,
        "--region",        var.aws_region,
      ]
    }
  }
}


resource "helm_release" "react_app" {
  name       = "react-app"
  namespace  = "default"

  # path.module == /…/Nginx-web-proxy/environments/dev
  # ../../chart → /…/Nginx-web-proxy/chart
  chart = "${path.module}/../../chart"

  set = [
    {
      name  = "image.repository"
      value = "866934333672.dkr.ecr.us-east-1.amazonaws.com/jordansuber/react-app"
    },
    {
      name  = "image.tag"
      value = "0.0.3"
    },
    {
      name  = "service.type"
      value = "LoadBalancer"
    },
  ]
}
