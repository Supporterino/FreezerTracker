# Troubleshooting

Common issues and how to fix them.

---

## Database Connection Refused

**Symptoms:** Server crashes on startup with `ECONNREFUSED` or `Can't reach database server`.

**Causes and fixes:**

- **PostgreSQL isn't running.** Start it with `docker compose up -d db` (Docker) or `brew services start postgresql@17` / `sudo systemctl start postgresql` (manual).
- **Wrong `DATABASE_URL`.** Double-check the host, port, username, password, and database name in `apps/server/.env`.
  - Docker Compose: host must be `db` (the service name), not `localhost`.
  - Manual setup: host is `localhost` (or your PG host).
- **Docker network issues.** If the server container can't resolve `db`, try `docker compose down && docker compose up -d` to recreate the network.

```bash
# Test the connection directly
docker compose exec db psql -U postgres -d freezer_tracker -c "SELECT 1;"
```

---

## Port 3000 Already in Use

**Symptom:** `Error: listen EADDRINUSE: address already in use :::3000`

**Fix:** Change the `PORT` variable in `apps/server/.env`:

```dotenv
PORT=3001
```

If using Docker Compose, also update the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "3001:3001"
```

Or find and stop the process using port 3000:

```bash
lsof -i :3000
kill -9 <PID>
```

---

## CORS Errors

**Symptom:** Browser console or client shows `CORS policy: No 'Access-Control-Allow-Origin' header`.

**Fix:** Set `ALLOWED_ORIGINS` in `apps/server/.env` to include the exact origin the client uses:

```dotenv
# Tauri desktop app
ALLOWED_ORIGINS=tauri://localhost,http://localhost:1420

# If accessing from another device on the network
ALLOWED_ORIGINS=tauri://localhost,http://localhost:1420,http://192.168.1.50:1420
```

!!! warning
    Origins must match exactly — protocol, host, and port. `http://localhost:1420` and `http://localhost:3000` are different origins. Do not use trailing slashes.

Restart the server after changing this value.

---

## JWT Secret Missing

**Symptom:** Server fails to start with an error about missing JWT configuration.

**Fix:** Both `JWT_SECRET` and `JWT_REFRESH_SECRET` must be set in `apps/server/.env`. Generate strong random values:

```bash
openssl rand -base64 48
```

```dotenv
JWT_SECRET=<first-generated-value>
JWT_REFRESH_SECRET=<second-generated-value>
```

!!! warning
    If you change JWT secrets after users have registered, all existing sessions are invalidated. Users will need to log in again.

---

## Prisma Migration Failures

**Symptom:** `bunx prisma migrate deploy` fails with errors.

**Common causes:**

- **Database doesn't exist.** Create it first:
  ```bash
  createdb freezer_tracker
  # or via psql:
  psql -U postgres -c "CREATE DATABASE freezer_tracker;"
  ```
- **Connection string is wrong.** Verify `DATABASE_URL` in `apps/server/.env` — the database name, user, and password must match your PostgreSQL setup.
- **Migrations out of sync.** If you're on a development branch with migration conflicts:
  ```bash
  cd apps/server
  bunx prisma migrate reset
  ```

!!! warning
    `prisma migrate reset` **drops all data** in the database. Only use this in development.

---

## Client Can't Connect to Server

**Symptom:** The client app shows a connection error or spins indefinitely.

**Fixes:**

- **Wrong server URL.** Open the client settings and verify the server URL. It should be the full base URL (e.g., `http://192.168.1.100:3000`), not just an IP.
- **Server not reachable from the client device.** If the client is on a different device (e.g., iPhone), make sure the server is accessible over the network. Test from the client device:
  ```bash
  curl http://<server-ip>:3000/api/v1/health
  ```
- **Firewall blocking port 3000.** Open the port on the server machine's firewall.
- **HTTPS required in production.** If you've set `NODE_ENV=production` and are connecting over the internet, some clients enforce HTTPS. Use a reverse proxy (e.g., Caddy, nginx) to terminate TLS.

!!! tip
    For local network usage, `http://` is fine. You only need HTTPS if you're exposing the server to the internet.

---

## Docker Compose Build Fails

**Symptom:** `docker compose up -d` fails during the build step.

**Fixes:**

- **Docker not installed or not running.** Verify with:
  ```bash
  docker --version
  docker compose version
  ```
  Make sure Docker Desktop (macOS) or the Docker daemon (Linux) is running.
- **Insufficient disk space.** Docker images need ~1 GB. Check with `docker system df` and clean up with `docker system prune` if needed.
- **Network issues pulling images.** If `postgres:17-alpine` fails to pull, check your internet connection and Docker Hub status.

---

## Tauri Build Prerequisites

If you're building the client from source and the build fails, you likely need to install platform-specific dependencies.

### macOS

1. **Xcode** — install from the Mac App Store.
2. **Xcode Command Line Tools:**
   ```bash
   xcode-select --install
   ```
3. **Rust toolchain:**
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```
4. Verify:
   ```bash
   rustc --version
   cargo --version
   ```

### iOS

All macOS prerequisites above, plus:

1. **iOS simulator or device** configured in Xcode.
2. **Tauri iOS target:**
   ```bash
   rustup target add aarch64-apple-ios
   ```

!!! note
    See the [Tauri v2 prerequisites guide](https://v2.tauri.app/start/prerequisites/) for the full list of system dependencies per platform.

---

## Still Stuck?

- Check the server logs: `docker compose logs -f server` (Docker) or check the terminal output (manual).
- Search [existing issues](https://github.com/Supporterino/FreezerTracker/issues) on GitHub.
- Open a [new issue](https://github.com/Supporterino/FreezerTracker/issues/new) with your error output and environment details.
