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
      fullnameOverride = "kps"          # short names (<63 chars)

      # For small hobby clusters – scrape every 30 s, keep 15 d of data
      prometheus = {
        prometheusSpec = {
          retention = "15d"
          scrapeInterval = "30s"

          # Store TSDB on an EBS gp3 volume; match ALB controller pattern
          storageSpec = {
            volumeClaimTemplate = {
              spec = {
                accessModes = ["ReadWriteOnce"]
                resources   = { requests = { storage = "30Gi" } }
              }
            }
          }
        }
      }

      # Expose Grafana via ALB Ingress
      grafana = {
        ingress = {
          enabled = true
          ingressClassName = "alb"
          hosts            = ["grafana.${var.zone_name}"]
          annotations = {
            "alb.ingress.kubernetes.io/scheme"      = "internet-facing"
            "alb.ingress.kubernetes.io/target-type" = "ip"
          }
        }
        adminPassword = var.grafana_admin_password  # put in TF-vars or AWS SM
      }
    })
  ]

  # Helm provider already knows how to talk to the cluster (see helm.tf)
  depends_on = [module.eks]
}
