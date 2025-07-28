############################ Providers #########################################
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name,
                   "--region", var.aws_region]
  }
  
}

provider "helm" {
  kubernetes = {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    exec = {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name,
                     "--region", var.aws_region]
    }
  }
}

############################ React front-end ###################################
resource "helm_release" "react_app" {
  name       = "react-app"
  namespace  = "default"
  chart      = "${path.module}/../../chart"
  depends_on = [ module.eks ]

  values = [
    yamlencode({
      image = {
        repository = "866934333672.dkr.ecr.us-east-1.amazonaws.com/jordansuber/react-app"
        tag        = "0.0.3"
      }
      ingress = {
        enabled          = true
        ingressClassName = "alb"
        annotations = {
          "alb.ingress.kubernetes.io/scheme"      = "internet-facing"
          "alb.ingress.kubernetes.io/target-type" = "ip"
        }
        hosts = [
          {
            host = "app.${var.zone_name}"
            paths = [
              {
                path     = "/"
                pathType = "Prefix"
              }
            ]
          }
        ]
      }
    })
  ]
}
