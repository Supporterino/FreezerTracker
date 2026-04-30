# Docker Compose

Docker Compose is the recommended way to run FreezerMan on a home server, NAS, or Raspberry Pi. It bundles the server and PostgreSQL into a single command.

---

## Quick Start

### 1. Create `docker-compose.yml`

```yaml
version: '3.9'

services:
  db:
    image: postgres:17-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password  # CHANGE THIS
      POSTGRES_DB: freezer_tracker
    volumes:
      - pg_data:/var/lib/postgresql/data
    ports:
      - "127.0.0.1:5432:5432"  # Only accessible from localhost
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d freezer_tracker"]
      interval: 5s
      timeout: 5s
      retries: 10

  server:
    build:
      context: .
      dockerfile: apps/server/Dockerfile
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    env_file:
      - apps/server/.env
    ports:
      - "3000:3000"

volumes:
  pg_data:
```

> **Note:** This compose file builds the server from source. If you prefer the pre-built image, see [Using the Pre-built Image](#using-the-pre-built-image) below.

### 2. Using the Pre-built Image

Replace the `build` block with the published multi-arch image:

```yaml
  server:
    image: ghcr.io/supporterino/freezer-tracker:latest
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy
    env_file:
      - .env
    ports:
      - "3000:3000"
```

This pulls from `ghcr.io/supporterino/freezer-tracker` and supports both `amd64` and `arm64` architectures (including Raspberry Pi).

### 3. Create the `.env` File

Create the `.env` file referenced by `env_file` (or `apps/server/.env` if building from source):

```bash
# Database
DATABASE_URL="postgresql://postgres:password@db:5432/freezer_tracker?schema=public"

# JWT secrets -- generate with: openssl rand -base64 32
JWT_SECRET="CHANGE_ME_generate_a_strong_secret"
JWT_REFRESH_SECRET="CHANGE_ME_generate_a_different_secret"

# Optional
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000
APP_BASE_URL=http://localhost:3000
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

> **Warning:** Never use the default `password` or placeholder JWT secrets in production. Generate strong secrets with `openssl rand -base64 32`.

### 4. Start the Stack

```bash
docker compose up -d
```

The server will wait for PostgreSQL to pass its health check before starting. Prisma migrations run automatically on startup.

Verify it's running:

```bash
curl http://localhost:3000/api/v1/health
```

---

## Common Operations

### View Logs

```bash
# Follow all logs
docker compose logs -f

# Server logs only
docker compose logs -f server

# Database logs only
docker compose logs -f db
```

### Update to Latest Version

```bash
# Pull new images and restart
docker compose pull
docker compose up -d
```

If building from source, pull the latest code first:

```bash
git pull
docker compose up -d --build
```

### Stop the Stack

```bash
# Stop containers (data persists in the pg_data volume)
docker compose down

# Stop AND delete all data (destructive!)
docker compose down -v
```

---

## Database Backup & Restore

### Backup

```bash
docker compose exec db pg_dump -U postgres freezer_tracker > backup.sql
```

### Restore

```bash
docker compose exec -T db psql -U postgres freezer_tracker < backup.sql
```

> **Tip:** Schedule backups with a cron job. For example, daily at 2 AM:
> ```
> 0 2 * * * cd /path/to/freezer-tracker && docker compose exec -T db pg_dump -U postgres freezer_tracker > /backups/freezer_$(date +\%F).sql
> ```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Server exits immediately | Database not ready | Check `db` health: `docker compose ps`. Ensure the healthcheck passes. |
| `ECONNREFUSED` on port 5432 | Wrong `DATABASE_URL` host | Use `db` (the service name) as the hostname, not `localhost`. |
| Permission errors on volume | Docker user mismatch | The server runs as UID 10001. Ensure the volume is writable. |
| Slow startup on Raspberry Pi | First-run migration | Prisma migrations take longer on ARM. Wait 30-60 seconds. |

---

## Next Steps

- Set up a [reverse proxy](reverse-proxy.md) for HTTPS access
- Review the [security checklist](security.md) before exposing to the internet
