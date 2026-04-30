# Deployment

FreezerMan is split into two components:

- **Server** -- a NestJS 11 API backed by PostgreSQL 17, published as a multi-arch Docker image (`amd64` + `arm64`).
- **Client** -- a Tauri v2 desktop/mobile app distributed as pre-built binaries.

This section covers how to deploy the server and connect clients to it.

---

## Deployment Options

| Option | Best For | Guide |
|--------|----------|-------|
| **Docker Compose** (recommended) | Home servers, NAS devices, Raspberry Pi | [Docker Compose](docker-compose.md) |
| **Kubernetes / Helm** | Production clusters, multi-replica setups | [Kubernetes (Helm)](kubernetes.md) |
| **Manual** | Local development, contributors | [Getting Started](../getting-started/index.md) |

### Which should I choose?

- **Docker Compose** -- the simplest path. One `docker compose up -d` command gives you a fully working server with PostgreSQL. Use this if you're running FreezerMan on a home server, Synology/QNAP NAS, or Raspberry Pi.
- **Kubernetes / Helm** -- use this if you already run a Kubernetes cluster and want proper ingress, scaling, and secret management. The Helm chart is published as an OCI artifact.
- **Manual** -- only recommended for development. You'll need Bun, PostgreSQL, and the source checkout. See the Getting Started guide.

---

## Client Distribution

The Tauri client app is available from:

- **GitHub Releases** -- download the `.dmg` (macOS) from the [Releases page](https://github.com/Supporterino/FreezerTracker/releases).
- **App Store Connect** -- iOS builds are submitted via App Store Connect.
- **Build from source** -- see [Building the Client](client-build.md).

After installing the client, point it at your server's URL (e.g. `https://api.example.com` or `http://192.168.1.50:3000`).

---

## Prerequisites (All Methods)

Regardless of deployment method, you need:

1. **PostgreSQL 17** -- the server requires a PostgreSQL 17 database. Docker Compose bundles one automatically; for Helm you provide an external connection string.
2. **Network access** -- the client must be able to reach the server over HTTP(S). For remote access, set up a [reverse proxy](reverse-proxy.md) with TLS.

---

## Environment Variables

The server is configured via environment variables. See the table below for a quick reference; each deployment guide shows where to set them.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Yes | Secret for signing refresh tokens |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins |
| `APP_BASE_URL` | No | Public URL of the server |
| `PORT` | No | Server listen port (default `3000`) |
| `NODE_ENV` | No | Set to `production` in prod |
| `JWT_ACCESS_EXPIRES_IN` | No | Access token TTL (e.g. `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | No | Refresh token TTL (e.g. `7d`) |

---

## Next Steps

- [Docker Compose](docker-compose.md) -- get running in minutes
- [Kubernetes (Helm)](kubernetes.md) -- production-grade deployment
- [Reverse Proxy](reverse-proxy.md) -- add HTTPS with Caddy or Nginx
- [Building the Client](client-build.md) -- compile the Tauri app from source
- [Security Hardening](security.md) -- production security checklist
