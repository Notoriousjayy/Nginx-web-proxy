############################################
# 1. Ensure monitoring namespace exists
############################################
resource "kubernetes_namespace" "monitoring" {
  metadata {
    name = "monitoring"
  }
}

############################################
# 2. Deploy kube-prometheus-stack without built‑in ingresses
############################################
resource "helm_release" "kube_prometheus_stack" {
  name             = "kube-prometheus-stack"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
  version          = "60.2.0"
  namespace        = kubernetes_namespace.monitoring.metadata[0].name
  create_namespace = false

  # ensure AWS LB Controller is ready before deploying Prometheus
  depends_on = [
    helm_release.aws_load_balancer_controller
  ]

    values = [
    templatefile("${path.module}/prometheus-values.yaml", {
      grafana_admin_password = var.grafana_admin_password
    })
  ]

}


############################################
# 3. Security Group for Prometheus ALB (public)
############################################
resource "aws_security_group" "prometheus_internal_alb" {
  name        = "prometheus-internal-alb"
  description = "Public ALB for Prometheus"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.prometheus_allowed_cidrs
    description = "Allow HTTP from trusted networks"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound"
  }

  tags = {
    Name = "prometheus-internal-alb"
  }
}

############################################
# 4. Grafana ‑ public‑facing ALB Ingress (HTTP 80)
############################################
resource "kubernetes_ingress_v1" "grafana_public" {
  metadata {
    name      = "grafana-public"
    namespace = kubernetes_namespace.monitoring.metadata[0].name
  annotations = {
      "kubernetes.io/ingress.class"            = "alb"
      "alb.ingress.kubernetes.io/scheme"       = "internet-facing"
      "alb.ingress.kubernetes.io/target-type"  = "ip"
      "alb.ingress.kubernetes.io/listen-ports" = "[{\"HTTP\":80}]"
    }
  }

  spec {
    rule {
      http {
        path {
          path      = "/"
          path_type = "Prefix"
          backend {
            service {
              name = "kube-prometheus-stack-grafana"
              port { number = 80 }
            }
          }
        }
      }
    }
  }
}

############################################
# 5. Prometheus ‑ public ALB Ingress (HTTP -> 9090)
############################################
resource "kubernetes_ingress_v1" "prometheus_internal" {
  depends_on = [aws_security_group.prometheus_internal_alb]

  metadata {
    name      = "prometheus-internal"
    namespace = kubernetes_namespace.monitoring.metadata[0].name
    annotations = {
      "kubernetes.io/ingress.class"               = "alb"
      "alb.ingress.kubernetes.io/scheme"          = "internet-facing"
      "alb.ingress.kubernetes.io/target-type"     = "ip"
      "alb.ingress.kubernetes.io/listen-ports"    = "[{\"HTTP\":80}]"
      "alb.ingress.kubernetes.io/security-groups" = aws_security_group.prometheus_internal_alb.id
      "alb.ingress.kubernetes.io/healthcheck-port" = "traffic-port"
      "alb.ingress.kubernetes.io/healthcheck-path" = "/-/healthy"
    }
  }

  spec {
    rule {
      http {
        path {
          path      = "/"
          path_type = "Prefix"
          backend {
            service {
              name = "kube-prometheus-stack-prometheus"
              port { number = 9090 }
            }
          }
        }
      }
    }
  }
}

############################################
# 6. (Step B) Allow Prometheus ALB -> EKS node SG on 9090
#    Required because target-type=ip sends traffic to pod IPs
#    enforced by the node ENI security group.
#    If your EKS module name differs, replace `module.eks`
#    with the correct module reference that exposes node_security_group_id.
############################################
resource "aws_security_group_rule" "allow_prom_alb_to_nodes_9090" {
  type                     = "ingress"
  protocol                 = "tcp"
  from_port                = 9090
  to_port                  = 9090

  # EKS worker node security group (from your EKS module)
  security_group_id        = module.eks.node_security_group_id

  # Source is the Prometheus ALB security group defined above
  source_security_group_id = aws_security_group.prometheus_internal_alb.id

  description              = "Allow Prometheus ALB to reach pods on 9090 via node ENIs"
}
