################################################################################
# kube-prometheus-stack  – ALL monitoring UIs on the same ALB
################################################################################
resource "helm_release" "kube_prometheus_stack" {
  name             = "kube-prometheus-stack"
  repository       = "https://prometheus-community.github.io/helm-charts"
  chart            = "kube-prometheus-stack"
  version          = "60.2.0"   # ← matches appVersion 0.73

  namespace        = "monitoring"
  create_namespace = true

  values = [
    yamlencode({

      # ────────────────────────────────────────────────────────────────────────────
      #  Global ALB settings shared by *all* monitoring ingresses
      # ────────────────────────────────────────────────────────────────────────────
      global = {
        ingress = {
          annotations = {
            "alb.ingress.kubernetes.io/group.name"   = "monitoring"
            "alb.ingress.kubernetes.io/listen-ports" = "[{\"HTTP\":80}]"
            "alb.ingress.kubernetes.io/target-type"  = "ip"
            "alb.ingress.kubernetes.io/scheme"       = "internet-facing"
          }
        }
      }

      # ─────────────────────────── Grafana  (/grafana) ───────────────────────────
      grafana = {
        adminPassword = var.grafana_admin_password

        ingress = {
          enabled   = true
          hosts     = []               # no Host match – path alone
          paths     = ["/grafana"]
          annotations = {
            "alb.ingress.kubernetes.io/group.order" = "10"
          }
        }

        # <— here’s the fix: quote the key so it becomes a YAML map key “grafana.ini”
        "grafana.ini" = {
          server = {
            root_url            = "%(protocol)s://%(domain)s/grafana"
            serve_from_sub_path = "true"
          }
        }
      }

      # ───────────────────────── Prometheus  (/prometheus) ───────────────────────
      prometheus = {
        prometheusSpec = {
          retention      = "15d"
          scrapeInterval = "30s"
          routePrefix    = "/prometheus"
          storageSpec = {
            volumeClaimTemplate = {
              spec = {
                accessModes = ["ReadWriteOnce"]
                resources = {
                  requests = { storage = "30Gi" }
                }
              }
            }
          }
        }

        ingress = {
          enabled   = true
          hosts     = []
          paths     = ["/prometheus"]
          annotations = {
            "alb.ingress.kubernetes.io/group.order" = "20"
          }
        }
      }

      # ──────────────────────── Alertmanager  (/alertmanager) ────────────────────
      alertmanager = {
        alertmanagerSpec = {
          routePrefix = "/alertmanager"
        }

        ingress = {
          enabled   = true
          hosts     = []
          paths     = ["/alertmanager"]
          annotations = {
            "alb.ingress.kubernetes.io/group.order" = "30"
          }
        }
      }
    })
  ]
}
