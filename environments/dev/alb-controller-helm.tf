resource "helm_release" "aws_load_balancer_controller" {
  name             = "aws-load-balancer-controller"
  repository       = "https://aws.github.io/eks-charts"
  chart            = "aws-load-balancer-controller"
  namespace        = "kube-system"
  create_namespace = false
  version          = "1.13.3"

  values = [yamlencode({
    clusterName    = var.eks_cluster_name
    region         = var.aws_region
    vpcId          = module.vpc.vpc_id
    ingressClass   = "alb"
    serviceAccount = {
      create = false
      name   = kubernetes_service_account.lbc.metadata[0].name
    }
  })]

  depends_on = [
    kubernetes_service_account.lbc,
    aws_iam_role_policy_attachment.lbc
  ]
}
