resource "helm_release" "kube_prometheus_stack" {
  name             = "kube-prometheus-stack"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
  version          = "60.2.0"          # pin to your needed version

  namespace        = "monitoring"
  create_namespace = true

  # Disable *all* built‑in ingresses so we don't hit the template bug
  values = [yamlencode({
    grafana = { ingress = { enabled = false } }
    prometheus = { ingress = { enabled = false } }
    alertmanager = { ingress = { enabled = false } }

    # (Optional) any other overrides you still want:
    prometheus = {
      prometheusSpec = {
        retention      = "15d"
        scrapeInterval = "30s"
        externalUrl    = "https://monitoring.example.com/prometheus"
        routePrefix    = "/prometheus"
      }
    }

    grafana = {
      adminPassword = var.grafana_admin_password
      "grafana.ini" = {
        server = {
          root_url            = "https://monitoring.example.com/grafana"
          serve_from_sub_path = true
        }
      }
    }
  })]
}

resource "kubernetes_ingress_v1" "monitoring_ui" {
  metadata {
    name      = "monitoring-ui"
    namespace = "monitoring"
    annotations = {
      "kubernetes.io/ingress.class"            = "alb"
      "alb.ingress.kubernetes.io/group.name"   = "monitoring"
      "alb.ingress.kubernetes.io/group.order"  = "1"
      "alb.ingress.kubernetes.io/listen-ports" = "[{\"HTTP\":80}]"
      "alb.ingress.kubernetes.io/target-type"  = "ip"
      "alb.ingress.kubernetes.io/scheme"       = "internet-facing"
    }
  }

  spec {
    ingress_class_name = "alb"
    rule {
      http {
        path {
          path      = "/grafana"
          path_type = "Prefix"
          backend {
            service {
              name = "kube-prometheus-stack-grafana"
              port { number = 80 }
            }
          }
        }
        path {
          path      = "/prometheus"
          path_type = "Prefix"
          backend {
            service {
              name = "kube-prometheus-stack-prometheus"
              port { number = 9090 }
            }
          }
        }
        path {
          path      = "/alertmanager"
          path_type = "Prefix"
          backend {
            service {
              name = "kube-prometheus-stack-alertmanager"
              port { number = 9093 }
            }
          }
        }
      }
    }
  }
}
