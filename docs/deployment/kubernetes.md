# Kubernetes (Helm)

The FreezerMan server is published as an OCI Helm chart for production Kubernetes deployments.

```
oci://ghcr.io/supporterino/freezer-tracker-chart
```

---

## Prerequisites

- Kubernetes cluster (1.26+)
- Helm 3.12+
- An external PostgreSQL 17 instance (the chart does **not** bundle a database)

---

## Quick Start

### Install

```bash
helm install freezer-tracker oci://ghcr.io/supporterino/freezer-tracker-chart \
  --set env.DATABASE_URL="postgresql://user:pass@db-host:5432/freezer_tracker" \
  --set env.JWT_SECRET="$(openssl rand -base64 32)" \
  --set env.JWT_REFRESH_SECRET="$(openssl rand -base64 32)"
```

### Pull the Chart Locally (Optional)

If you want to inspect or customize the chart before installing:

```bash
helm pull oci://ghcr.io/supporterino/freezer-tracker-chart --version 0.2.2
tar xzf freezer-tracker-chart-0.2.2.tgz
```

### Uninstall

```bash
helm uninstall freezer-tracker
```

---

## Values Reference

### Replica & Image

| Key | Default | Description |
|-----|---------|-------------|
| `replicaCount` | `1` | Number of server replicas |
| `image.repository` | `ghcr.io/supporterino/freezer-tracker` | Container image |
| `image.pullPolicy` | `IfNotPresent` | Image pull policy |
| `image.tag` | Chart `appVersion` | Image tag override |

### Service Account

| Key | Default | Description |
|-----|---------|-------------|
| `serviceAccount.create` | `true` | Create a ServiceAccount |
| `serviceAccount.annotations` | `{}` | Annotations on the ServiceAccount |
| `serviceAccount.name` | `""` | Override the generated name |

### Pod Configuration

| Key | Default | Description |
|-----|---------|-------------|
| `podAnnotations` | `{}` | Extra annotations on pods |
| `podSecurityContext.fsGroup` | `1000` | Filesystem group for volumes |
| `securityContext.runAsNonRoot` | `true` | Enforce non-root |
| `securityContext.runAsUser` | `1000` | UID for the container process |

### Networking

| Key | Default | Description |
|-----|---------|-------------|
| `service.type` | `ClusterIP` | Service type |
| `service.port` | `3000` | Service port |
| `ingress.enabled` | `false` | Enable Ingress resource |
| `ingress.className` | `""` | Ingress class name |
| `ingress.annotations` | `{}` | Ingress annotations |
| `ingress.host` | `""` | Ingress hostname |
| `ingress.tls` | `[]` | TLS configuration |

### Environment Variables

| Key | Required | Description |
|-----|----------|-------------|
| `env.DATABASE_URL` | Yes | PostgreSQL connection string |
| `env.JWT_SECRET` | Yes | Access token signing secret |
| `env.JWT_REFRESH_SECRET` | Yes | Refresh token signing secret |
| `env.ALLOWED_ORIGINS` | No | Comma-separated CORS origins |
| `env.APP_BASE_URL` | No | Public URL of the server |
| `env.PORT` | No | Listen port (default `3000`) |
| `env.NODE_ENV` | No | Set to `production` |
| `env.JWT_ACCESS_EXPIRES_IN` | No | Access token TTL |
| `env.JWT_REFRESH_EXPIRES_IN` | No | Refresh token TTL |

### Resources

| Key | Default | Description |
|-----|---------|-------------|
| `resources` | `{}` | CPU/memory requests and limits |

Example:

```yaml
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

### Health Probes

| Key | Default | Description |
|-----|---------|-------------|
| `livenessProbe.path` | `/api/v1/health` | Liveness endpoint |
| `livenessProbe.initialDelaySeconds` | `15` | Delay before first check |
| `livenessProbe.periodSeconds` | `20` | Check interval |
| `readinessProbe.path` | `/api/v1/health` | Readiness endpoint |
| `readinessProbe.initialDelaySeconds` | `5` | Delay before first check |
| `readinessProbe.periodSeconds` | `10` | Check interval |

### Scheduling

| Key | Default | Description |
|-----|---------|-------------|
| `nodeSelector` | `{}` | Node selector constraints |
| `tolerations` | `[]` | Pod tolerations |
| `affinity` | `{}` | Pod affinity rules |

---

## Secret Management

> **Warning:** By default, `env.*` values are stored in a ConfigMap, which means sensitive values like `JWT_SECRET` are **not encrypted at rest**. For production, use Kubernetes Secrets instead.

### Recommended: External Secret

1. Create a Secret manually:

```bash
kubectl create secret generic freezer-tracker-secrets \
  --from-literal=DATABASE_URL="postgresql://user:pass@db:5432/freezer_tracker" \
  --from-literal=JWT_SECRET="$(openssl rand -base64 32)" \
  --from-literal=JWT_REFRESH_SECRET="$(openssl rand -base64 32)"
```

2. Reference it in your `values.yaml` by adding `envFrom` or individual `secretKeyRef` entries via `podAnnotations` and a custom values override. Alternatively, use a tool like [External Secrets Operator](https://external-secrets.io/) to sync from your secrets manager (Vault, AWS Secrets Manager, etc.).

3. Omit the sensitive `env.*` values from Helm so they are not duplicated in a ConfigMap:

```yaml
# values.yaml
env:
  NODE_ENV: production
  PORT: "3000"
  ALLOWED_ORIGINS: "https://app.example.com"
  # JWT_SECRET, JWT_REFRESH_SECRET, DATABASE_URL come from the Secret
```

---

## Ingress with TLS

Example using `nginx` ingress class with cert-manager and Let's Encrypt:

```yaml
# values.yaml
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  host: api.example.com
  tls:
    - secretName: freezer-tracker-tls
      hosts:
        - api.example.com
```

This assumes you have [cert-manager](https://cert-manager.io/) installed with a `ClusterIssuer` named `letsencrypt-prod`.

---

## Scaling

The FreezerMan server is **stateless** -- all state lives in PostgreSQL. You can safely increase `replicaCount` to handle more traffic:

```bash
helm upgrade freezer-tracker oci://ghcr.io/supporterino/freezer-tracker-chart \
  --reuse-values \
  --set replicaCount=3
```

The database is the scaling bottleneck. For high-traffic deployments, consider PostgreSQL connection pooling (e.g. PgBouncer) and read replicas.

---

## Next Steps

- Review the [security checklist](security.md) for production hardening
- Set up monitoring by scraping the `/api/v1/health` endpoint
