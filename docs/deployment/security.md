# Security Hardening

Production security checklist and reference for FreezerMan deployments.

---

## Production Checklist

Review each item before exposing your FreezerMan instance to the internet.

### Secrets & Authentication

- [ ] **Change the default PostgreSQL password** -- never use `password` in production. Set a strong, unique password in your compose file or Kubernetes secret.
- [ ] **Generate strong JWT secrets** -- use cryptographically random values:
  ```bash
  openssl rand -base64 32
  ```
  Run this command **twice** to generate separate values for `JWT_SECRET` and `JWT_REFRESH_SECRET`.
- [ ] **Use different secrets for access and refresh tokens** -- `JWT_SECRET` and `JWT_REFRESH_SECRET` must be distinct values. Reusing the same secret weakens the token rotation security model.

### Server Configuration

- [ ] **Set `NODE_ENV=production`** -- this disables Swagger/OpenAPI documentation and enables production optimizations.
- [ ] **Restrict `ALLOWED_ORIGINS`** -- set this to your actual client origin only (e.g. `https://app.example.com`). Do not use `*` in production.
- [ ] **Enable HTTPS via reverse proxy** -- use [Caddy or Nginx](reverse-proxy.md) to terminate TLS. Never expose the raw HTTP server to the internet.

### Database

- [ ] **Bind PostgreSQL to localhost only** -- the default Docker Compose configuration binds to `127.0.0.1:5432`, preventing external access. Verify this if you customized the compose file.
- [ ] **Restrict network access to the database port** -- ensure firewall rules prevent access to port 5432 from untrusted networks.
- [ ] **Set up database backups** -- schedule regular `pg_dump` backups. See [Docker Compose backup instructions](docker-compose.md#database-backup--restore).

### Kubernetes-Specific

- [ ] **Use Kubernetes Secrets, not ConfigMap** -- the Helm chart stores `env.*` values in a ConfigMap by default. Move `DATABASE_URL`, `JWT_SECRET`, and `JWT_REFRESH_SECRET` to a Kubernetes Secret. See the [secret management guide](kubernetes.md#secret-management).
- [ ] **Run containers as non-root** -- the Dockerfile defaults to UID/GID 10001. The Helm chart defaults to UID 1000 with `runAsNonRoot: true`. Do not override these without good reason.

### Monitoring & Maintenance

- [ ] **Review rate limiting** -- the server enforces rate limits: 100 requests/minute globally, 5 requests/minute on auth endpoints. Adjust via throttler configuration if these don't match your usage patterns.
- [ ] **Monitor server logs** -- the server uses Pino for structured JSON logging. Set up log aggregation (Loki, ELK, CloudWatch) to detect anomalies.
- [ ] **Keep dependencies updated** -- regularly update the Docker image (`docker compose pull`), Bun dependencies, and base images.

---

## Built-in Security Features

FreezerMan includes several security measures out of the box. These require no additional configuration.

### HTTP Security Headers

[Helmet](https://github.com/helmetjs/helmet) is enabled by default, setting security headers including:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (when behind HTTPS)
- `X-XSS-Protection`

### Password Hashing

Passwords are hashed with **bcrypt** using 12 salt rounds. Plain-text passwords are never stored or logged.

### JWT Token Rotation

Access tokens are short-lived. When a refresh token is used, the server issues a new token pair and invalidates the old refresh token. This limits the window of exposure if a token is compromised.

### Rate Limiting

The `@nestjs/throttler` module enforces:
- **100 requests/minute** globally
- **5 requests/minute** on authentication endpoints (login, register, refresh)

### Input Validation

All request bodies are validated with `class-validator`:
- **Whitelist mode** -- unknown properties are stripped
- **forbidNonWhitelisted** -- requests with unknown properties are rejected with 400

### Database Error Sanitization

A Prisma exception filter catches database errors and returns sanitized responses. Raw SQL errors, constraint names, and internal details are never exposed to clients.

### Log Redaction

Pino is configured to redact sensitive fields from log output:
- `authorization` headers
- `password` fields
- `token` fields

This prevents secrets from appearing in log files or aggregation systems.

---

## Generating Secrets Reference

```bash
# Generate a 32-byte base64 secret (recommended)
openssl rand -base64 32

# Generate a 64-byte hex secret (alternative)
openssl rand -hex 32

# Example .env with strong secrets
JWT_SECRET="$(openssl rand -base64 32)"
JWT_REFRESH_SECRET="$(openssl rand -base64 32)"
```

> **Tip:** Store generated secrets in a password manager. If you lose them, all existing JWT tokens become invalid and users will need to log in again.

---

## Next Steps

- [Reverse Proxy](reverse-proxy.md) -- set up HTTPS
- [Kubernetes Secrets](kubernetes.md#secret-management) -- secure sensitive values in Helm deployments
