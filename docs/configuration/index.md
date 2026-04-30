# Configuration

FreezerMan separates configuration into two layers:

- **Server** -- configured entirely through **environment variables**. There are no config files to manage.
- **Client** -- configured through the **in-app Settings UI**. No manual file editing required.

## Sub-pages

| Page | What it covers |
|------|----------------|
| [Environment Variables](./environment-variables.md) | Complete reference for all server environment variables |
| [Client Settings](./client-settings.md) | Client-side configuration via the Settings / Profile page |

## Quick Reference: Required Variables

The server will not start without these three variables set:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signing secret for access tokens |
| `JWT_REFRESH_SECRET` | Signing secret for refresh tokens |

```bash
# Minimal .env to get running
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/freezerman"
JWT_SECRET="$(openssl rand -base64 32)"
JWT_REFRESH_SECRET="$(openssl rand -base64 32)"
```

## Common Optional Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | Server listen port |
| `ALLOWED_ORIGINS` | `http://localhost:1420` | CORS allowed origins (comma-separated) |
| `NODE_ENV` | `development` | Environment mode (`development` / `production` / `test`) |
| `APP_BASE_URL` | `http://localhost:3000` | Base URL embedded in QR invite links |

See [Environment Variables](./environment-variables.md) for the full reference.
