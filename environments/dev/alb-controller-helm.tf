// alb-controller-helm.tf

// 1) Apply the ALB Controller CRDs manually (drop the unsupported `set -e`)
resource "null_resource" "aws_lb_controller_crds" {
  provisioner "local-exec" {
    command = <<EOT
kubectl apply -f https://raw.githubusercontent.com/aws/eks-charts/master/stable/aws-load-balancer-controller/crds/crds.yaml
EOT
  }
}

// 2) Install (or upgrade) the AWS Load Balancer Controller itself
resource "helm_release" "aws_load_balancer_controller" {
  name             = "aws-load-balancer-controller"
  repository       = "https://aws.github.io/eks-charts"
  chart            = "aws-load-balancer-controller"
  version          = "1.13.3"
  namespace        = "kube-system"
  create_namespace = false

  // Wait for all pods/webhooks to be ready before proceeding
  wait    = true
  timeout = 600

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
    null_resource.aws_lb_controller_crds,
    kubernetes_service_account.lbc,
    aws_iam_role_policy_attachment.lbc,
  ]
}
