{{- /*
Return the chart’s “name” (defaults to .Chart.Name, overridable via .Values.appName)
*/ -}}
{{- define "react-app.name" -}}
{{- default .Chart.Name .Values.appName -}}
{{- end -}}

{{- /*
Define the chart’s full release name (release + chart), truncated to 63 chars.
*/ -}}
{{- define "react-app.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "react-app.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- /*
Common labels to apply to all resources.
*/ -}}
{{- define "react-app.labels" -}}
app.kubernetes.io/name: {{ include "react-app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- /*
Selector labels for Deployment/Service linkage.
*/ -}}
{{- define "react-app.selectorLabels" -}}
app.kubernetes.io/name: {{ include "react-app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
