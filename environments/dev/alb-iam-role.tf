# Download the AWS Load Balancer Controller IAM policy
data "http" "lbc_policy" {
  url = "https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.13.3/docs/install/iam_policy.json"
}

# Create a managed policy from that document
resource "aws_iam_policy" "lbc" {
  name   = "AWSLoadBalancerControllerIAMPolicy-${var.eks_cluster_name}"
  policy = data.http.lbc_policy.response_body
}

# Look up our cluster’s OIDC provider (requires enable_irsa = true)
data "aws_iam_openid_connect_provider" "eks" {
  arn = module.eks.oidc_provider_arn
}

# Build the assume-role policy so the controller’s SA can assume it
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
      variable = "${replace(data.aws_iam_openid_connect_provider.eks.url, "https://", "")}:sub"
      values   = ["system:serviceaccount:kube-system:aws-load-balancer-controller"]
    }
  }
}

# Create the IAM role for the controller
resource "aws_iam_role" "lbc" {
  name               = "eks-lbc-${var.eks_cluster_name}"
  assume_role_policy = data.aws_iam_policy_document.lbc_assume.json
}

# Attach the managed policy to that role
resource "aws_iam_role_policy_attachment" "lbc" {
  role       = aws_iam_role.lbc.name
  policy_arn = aws_iam_policy.lbc.arn
}
