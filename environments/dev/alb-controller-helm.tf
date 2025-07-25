############################################
# Install AWS Load Balancer Controller via Helm
############################################

# (1) Apply ALB Controller CRDs
resource "null_resource" "aws_lb_controller_crds" {
  triggers = {
    sha = filesha256("${path.module}/aws-load-balancer-crds.yaml")
  }
}

# (2) Helm release for the controller
resource "helm_release" "aws_load_balancer_controller" {
  name             = "aws-load-balancer-controller"
  repository       = "https://aws.github.io/eks-charts"
  chart            = "aws-load-balancer-controller"
  version          = "1.13.3"
  namespace        = "kube-system"
  create_namespace = false

  wait    = true
  timeout = 600

  depends_on = [
    null_resource.aws_lb_controller_crds,
    kubernetes_service_account.lbc,
    aws_iam_role_policy_attachment.lbc,
  ]

  values = [
    yamlencode({
      clusterName    = var.eks_cluster_name
      serviceAccount = {
        create = false
        name   = kubernetes_service_account.lbc.metadata[0].name
      }
      region       = var.aws_region
      vpcId        = module.vpc.vpc_id
      ingressClass = "alb"
    })
  ]
}
