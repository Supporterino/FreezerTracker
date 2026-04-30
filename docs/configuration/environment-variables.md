# Environment Variables

All server configuration is done through environment variables. Place them in a `.env` file at the server root or export them in your shell. The server loads `.env` automatically in development.

## Complete Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | -- | PostgreSQL connection string. Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE` |
| `JWT_SECRET` | Yes | -- | Signing secret for access tokens. Use a long random string (32+ chars) |
| `JWT_REFRESH_SECRET` | Yes | -- | Signing secret for refresh tokens. Must differ from `JWT_SECRET` |
| `JWT_ACCESS_EXPIRES_IN` | No | `15m` | Access token lifetime. Supports `ms`/`s`/`m`/`h`/`d` format |
| `JWT_REFRESH_EXPIRES_IN` | No | `30d` | Refresh token lifetime |
| `ALLOWED_ORIGINS` | No | `http://localhost:1420` | Comma-separated CORS allowed origins. Set to your client's URL |
| `NODE_ENV` | No | `development` | Environment mode (`development`/`production`/`test`). Swagger is disabled in production |
| `APP_BASE_URL` | No | `http://localhost:3000` | Base URL for QR invite links |
| `PORT` | No | `3000` | Server listen port |

## `.env.example` Template

Copy this to `.env` and fill in your values:

```bash
# =============================================================================
# FreezerMan Server Configuration
# =============================================================================

# ---------------------
# Database (required)
# ---------------------
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/freezerman"

# ---------------------
# Authentication (required)
# ---------------------
# Generate secrets with: openssl rand -base64 32
# These two values MUST be different from each other.
JWT_SECRET="change-me-access-secret"
JWT_REFRESH_SECRET="change-me-refresh-secret"

# Token lifetimes (optional)
# Supports ms, s, m, h, d suffixes
# JWT_ACCESS_EXPIRES_IN="15m"
# JWT_REFRESH_EXPIRES_IN="30d"

# ---------------------
# CORS (optional)
# ---------------------
# Comma-separated list of allowed origins.
# Must match the exact origin of your client (protocol + host + port).
# ALLOWED_ORIGINS="http://localhost:1420"

# ---------------------
# Server (optional)
# ---------------------
# PORT="3000"
# NODE_ENV="development"

# ---------------------
# Application (optional)
# ---------------------
# Base URL used when generating QR invite links.
# APP_BASE_URL="http://localhost:3000"
```

## Security Notes

### JWT Secrets

Generate cryptographically secure secrets -- never use short or guessable strings:

```bash
# Generate a 32-byte base64-encoded secret
openssl rand -base64 32
```

- `JWT_SECRET` and `JWT_REFRESH_SECRET` **must be different** from each other. If they are the same, a leaked refresh token could be used as an access token (and vice versa).
- Rotate secrets by generating new values and restarting the server. All existing tokens will be invalidated.
- In production, inject secrets from a vault or secret manager rather than committing them to a `.env` file.

> **Warning:** Never commit `.env` files containing real secrets to version control. The repository `.gitignore` already excludes `.env`.

### CORS Configuration

`ALLOWED_ORIGINS` must match the **exact origin** your client sends, including protocol and port:

```bash
# Correct -- matches exactly what the browser sends
ALLOWED_ORIGINS="https://freezerman.example.com"

# Correct -- multiple origins, comma-separated
ALLOWED_ORIGINS="https://freezerman.example.com,https://staging.freezerman.example.com"

# Wrong -- trailing slash will cause CORS failures
ALLOWED_ORIGINS="https://freezerman.example.com/"

# Wrong -- missing port when client runs on a non-standard port
ALLOWED_ORIGINS="http://localhost"
```

In development the default (`http://localhost:1420`) matches the Tauri dev server. In production, set this to your actual client URL.

### Production Mode

Setting `NODE_ENV=production`:

- Disables the Swagger API documentation UI
- Signals the server to apply production-appropriate defaults

```bash
NODE_ENV="production"
```
