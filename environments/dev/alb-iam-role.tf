############################################
# AWS LB Controller IAM Role & Policy
############################################

# (1) Download the IAM policy document
data "http" "lbc_policy" {
  url = "https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.13.3/docs/install/iam_policy.json"
}

# (2) Create a managed policy
resource "aws_iam_policy" "lbc" {
  name   = "AWSLoadBalancerControllerIAMPolicy-${var.eks_cluster_name}"
  policy = data.http.lbc_policy.response_body
}

# (3) Lookup EKS OIDC provider (IRSA)
data "aws_iam_openid_connect_provider" "eks" {
  arn = module.eks.oidc_provider_arn
}

# (4) Build the assume-role policy
data "aws_iam_policy_document" "lbc_assume" {
  statement {
    effect    = "Allow"
    actions   = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.eks.arn]
    }
    condition {
      test     = "StringEquals"
      variable = "${replace(module.eks.cluster_oidc_issuer_url, "https://", "")}:sub"
      values   = ["system:serviceaccount:kube-system:aws-load-balancer-controller"]
    }
  }
}

# (5) Create the IAM Role for the controller
resource "aws_iam_role" "lbc" {
  name               = "${var.eks_cluster_name}-aws-lb-controller"
  assume_role_policy = data.aws_iam_policy_document.lbc_assume.json
}

# (6) Attach the managed policy
resource "aws_iam_role_policy_attachment" "lbc" {
  role       = aws_iam_role.lbc.name
  policy_arn = aws_iam_policy.lbc.arn
}
