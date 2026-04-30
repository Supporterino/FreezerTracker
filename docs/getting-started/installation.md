# Installation

This guide covers two ways to install the FreezerMan server, plus how to get the client app.

---

## Path 1: Docker Compose (Recommended)

Docker Compose bundles PostgreSQL and the FreezerMan server into a single stack. This is the easiest way to self-host.

### Prerequisites

- Docker Engine 20.10+
- Docker Compose v2.0+

### 1. Clone the Repository

```bash
git clone https://github.com/Supporterino/FreezerTracker.git
cd FreezerTracker
```

### 2. Configure Environment Variables

Create the server environment file from the template:

```bash
cp apps/server/.env.example apps/server/.env
```

Edit `apps/server/.env` with your values:

```dotenv
# Database (matches the postgres service in docker-compose.yml)
DATABASE_URL=postgresql://postgres:password@db:5432/freezer_tracker

# JWT authentication — generate strong random secrets for both
JWT_SECRET=your-access-token-secret-here
JWT_REFRESH_SECRET=your-refresh-token-secret-here

# Token expiration
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

# CORS — comma-separated list of allowed client origins
ALLOWED_ORIGINS=tauri://localhost,http://localhost:1420

# Server
APP_BASE_URL=http://localhost:3000
PORT=3000
NODE_ENV=production
```

!!! warning
    **Change the default secrets.** The `JWT_SECRET` and `JWT_REFRESH_SECRET` values must be long, random strings. You can generate them with:
    ```bash
    openssl rand -base64 48
    ```

### 3. Start the Stack

```bash
docker compose up -d
```

This pulls `postgres:17-alpine`, builds the server image, runs database migrations, and starts both services.

### 4. Verify

```bash
curl http://localhost:3000/api/v1/health
```

You should get a `200 OK` response indicating the server is healthy.

### 5. Install the Client

Download the latest client app for your platform from [GitHub Releases](https://github.com/Supporterino/FreezerTracker/releases):

- **macOS**: Download the `.dmg`, open it, and drag FreezerMan to your Applications folder.
- **iOS**: Follow the TestFlight link in the release notes.

---

## Path 2: Manual Setup

Run the server directly with Bun if you prefer not to use Docker, or if you want a development environment.

### Prerequisites

- [Bun](https://bun.sh) 1.3+
- PostgreSQL 17+

### 1. Clone the Repository

```bash
git clone https://github.com/Supporterino/FreezerTracker.git
cd FreezerTracker
```

### 2. Install Dependencies

From the repository root (Bun workspaces will install everything):

```bash
bun install
```

### 3. Configure Environment Variables

```bash
cp apps/server/.env.example apps/server/.env
```

Edit `apps/server/.env` — note the `DATABASE_URL` points to localhost instead of the Docker service name:

```dotenv
# Database — adjust user, password, host, and database name as needed
DATABASE_URL=postgresql://postgres:password@localhost:5432/freezer_tracker

# JWT authentication
JWT_SECRET=your-access-token-secret-here
JWT_REFRESH_SECRET=your-refresh-token-secret-here

# Token expiration
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

# CORS
ALLOWED_ORIGINS=tauri://localhost,http://localhost:1420

# Server
APP_BASE_URL=http://localhost:3000
PORT=3000
NODE_ENV=development
```

!!! tip
    Make sure the PostgreSQL database exists before running migrations. Create it manually if needed:
    ```bash
    createdb freezer_tracker
    ```

### 4. Run Database Migrations

```bash
cd apps/server
bunx prisma migrate deploy
```

This applies all Prisma migrations and sets up the schema.

### 5. Start the Server

From the repository root:

```bash
bun run dev:server
```

The server starts on `http://localhost:3000`. Verify with:

```bash
curl http://localhost:3000/api/v1/health
```

### 6. Start the Client (Optional — Development)

If you want to run the client from source instead of using a pre-built binary:

```bash
bun run dev:client
```

!!! note
    Building the Tauri client from source requires additional prerequisites:
    - **Rust toolchain** — install via [rustup](https://rustup.rs)
    - **Xcode** (macOS) — install from the Mac App Store, then run `xcode-select --install`
    - See the [Tauri prerequisites guide](https://v2.tauri.app/start/prerequisites/) for full details.

---

## What's Next

Head to the **[Quick Start](quick-start.md)** guide to create your first household and start tracking freezer items.
