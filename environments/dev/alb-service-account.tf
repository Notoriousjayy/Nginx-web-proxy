resource "kubernetes_service_account" "lbc" {
  metadata {
    name      = "aws-load-balancer-controller"
    namespace = "kube-system"

    annotations = {
      # IRSA: link SA to the IAM role we just created
      "eks.amazonaws.com/role-arn" = aws_iam_role.lbc.arn
    }
  }
}
