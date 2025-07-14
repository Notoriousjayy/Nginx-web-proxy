################################################################################
# kube-prometheus-stack
# - Installs Prometheus Operator, Prometheus, Alertmanager, Grafana, exporters
################################################################################
resource "helm_release" "kube_prometheus_stack" {
  name             = "kube-prometheus-stack"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
  # Pin the chart so upgrades are explicit
  version          = "60.2.0"           # ← matches appVersion 0.73

  namespace        = "monitoring"
  create_namespace = true               # first time only

  # === Minimal opinionated overrides ===
  values = [
    yamlencode({
      fullnameOverride = "kps"

      # Prometheus core settings (unchanged)
      prometheus = {
        prometheusSpec = {
          retention       = "15d"
          scrapeInterval  = "30s"
          storageSpec = {
            volumeClaimTemplate = {
              spec = {
                accessModes = ["ReadWriteOnce"]
                resources   = {
                  requests = {
                    storage = "30Gi"
                  }
                }
              }
            }
          }
        }
        # Expose Prometheus via ALB Ingress (HTTP-only)
        ingress = {
          enabled          = true
          ingressClassName = "alb"
          hosts            = ["prometheus.${var.zone_name}"]
          annotations = {
            "alb.ingress.kubernetes.io/scheme"       = "internet-facing"
            "alb.ingress.kubernetes.io/target-type"  = "ip"
            "alb.ingress.kubernetes.io/listen-ports" = jsonencode([{ HTTP = 80 }])
          }
        }
      }

      # Grafana Ingress (HTTP-only)
      grafana = {
        ingress = {
          enabled          = true
          ingressClassName = "alb"
          hosts            = ["grafana.${var.zone_name}"]
          annotations = {
            "alb.ingress.kubernetes.io/scheme"       = "internet-facing"
            "alb.ingress.kubernetes.io/target-type"  = "ip"
            "alb.ingress.kubernetes.io/listen-ports" = jsonencode([{ HTTP = 80 }])
          }
        }
        adminPassword = var.grafana_admin_password
      }

      # Alertmanager Ingress (optional)
      alertmanager = {
        ingress = {
          enabled          = true
          ingressClassName = "alb"
          hosts            = ["alertmanager.${var.zone_name}"]
          annotations = {
            "alb.ingress.kubernetes.io/scheme"       = "internet-facing"
            "alb.ingress.kubernetes.io/target-type"  = "ip"
            "alb.ingress.kubernetes.io/listen-ports" = jsonencode([{ HTTP = 80 }])
          }
        }
      }
    })
  ]
}
