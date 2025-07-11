output "cluster_endpoint" {
  description = "Endpoint for the EKS cluster"
  value       = module.eks.cluster_endpoint
}

output "cluster_ca_certificate" {
  description = "CA certificate data for the EKS cluster"
  value       = module.eks.cluster_certificate_authority_data
}

output "cluster_security_group_id" {
  description = "Security group ID of the EKS cluster"
  value       = module.eks.cluster_security_group_id
}

output "cluster_id" {
  description = "Name of the EKS cluster"
  # point at the cluster_name output (never null)
  value       = module.eks.cluster_name
}
