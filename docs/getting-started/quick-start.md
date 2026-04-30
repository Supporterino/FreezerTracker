# Quick Start

Get FreezerMan running in five steps. This guide assumes you're using Docker Compose — see [Installation](installation.md) for the manual setup path.

---

## 1. Clone and Configure

```bash
git clone https://github.com/Supporterino/FreezerTracker.git
cd FreezerTracker
cp apps/server/.env.example apps/server/.env
```

Edit `apps/server/.env` and set your JWT secrets:

```bash
# Generate secrets
openssl rand -base64 48  # use output for JWT_SECRET
openssl rand -base64 48  # use output for JWT_REFRESH_SECRET
```

See [Installation](installation.md) for the full list of environment variables.

## 2. Start the Server

```bash
docker compose up -d
```

This starts PostgreSQL and the FreezerMan server. First run takes a minute or two to pull images and run migrations.

## 3. Check the Health Endpoint

```bash
curl http://localhost:3000/api/v1/health
```

If you get a `200 OK`, the server is ready.

!!! tip
    If the health check fails, wait 10–15 seconds for the database to finish initializing and try again. See [Troubleshooting](troubleshooting.md) if problems persist.

## 4. Download and Open the Client

1. Go to [GitHub Releases](https://github.com/Supporterino/FreezerTracker/releases) and download the latest client for your platform.
2. Install and open the app.
3. On first launch, configure the **server URL** (e.g., `http://<your-server-ip>:3000`).

!!! note
    If the server is running on the same machine, use `http://localhost:3000`. For other devices on your network, use the server machine's local IP address.

## 5. Start Tracking

1. **Register an account** — create your user with an email and password.
2. **Create a household** — this groups your freezers together (e.g., "Home").
3. **Add a freezer** — give it a name and optional location (e.g., "Garage Chest Freezer").
4. **Add your first item** — enter a name, quantity, and optional expiry date.

That's it — you're up and running.

---

## Next Steps

- **[Installation](installation.md)** — Detailed setup options and full environment variable reference.
- **[Troubleshooting](troubleshooting.md)** — Solutions for common issues.
