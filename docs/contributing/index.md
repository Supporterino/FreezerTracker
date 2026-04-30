# Contributing

Thank you for your interest in contributing to FreezerMan! Every contribution -- whether it's a bug fix, a new feature, or improved documentation -- helps make the project better for everyone.

## Prerequisites

Make sure you have the following installed before getting started:

| Tool | Version | Install |
|------|---------|---------|
| **Bun** | 1.3+ | `curl -fsSL https://bun.sh/install \| bash` |
| **PostgreSQL** | 17 | Local install or Docker |
| **Rust toolchain** | Latest stable | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| **Xcode** | Latest (macOS) | Required for Tauri client builds |
| **Git** | Any recent version | — |

> **Note:** The Rust toolchain and Xcode are only required if you're working on the client (Tauri) app.

## First-Time Setup

1. **Fork and clone** the repository:

   ```bash
   git clone https://github.com/<your-username>/FreezerTracker.git
   cd FreezerTracker
   ```

2. **Install dependencies** (from the repo root -- this installs all workspaces):

   ```bash
   bun install
   ```

3. **Create the server environment file** at `apps/server/.env`. Copy the template from the docs and set `DATABASE_URL` to point at your local PostgreSQL instance:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/freezerman?schema=public"
   ```

4. **Start PostgreSQL** (Docker is the easiest option):

   ```bash
   docker compose up db -d
   ```

   Or use a locally installed PostgreSQL 17 instance.

5. **Run database migrations** (from `apps/server`):

   ```bash
   bunx prisma migrate deploy
   ```

6. **Generate the Prisma client** (from `apps/server`):

   ```bash
   bunx prisma generate
   ```

7. **Start the server**:

   ```bash
   bun run dev:server
   ```

8. **Start the client** (in a separate terminal):

   ```bash
   bun run dev:client
   ```

## Monorepo Workspace Commands

All commands are run from the repository root unless noted otherwise.

| Command | Description |
|---------|-------------|
| `bun run dev:server` | Start the server with `--watch` |
| `bun run dev:client` | Start the Tauri desktop client in dev mode |
| `bun run dev:client_ios` | Start the Tauri iOS client in dev mode |
| `bun run check` | Run Biome check with auto-fix |
| `bun run ci:check` | Run Biome in CI mode (no auto-fix, fails on errors) |
| `bun run lint` | Lint only (no formatting) |
| `bun run format` | Format only (no linting) |

## Pull Request Process

1. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feat/my-feature main
   ```

2. **Make your changes** -- keep commits focused and incremental.

3. **Ensure Biome passes**:

   ```bash
   bun run check
   ```

4. **Run tests** (server):

   ```bash
   bun run test
   ```

   Run this from `apps/server`, or use the root workspace script if available.

5. **Commit with a clear message** that describes _what_ changed and _why_.

6. **Push and open a PR** against `main`:

   ```bash
   git push origin feat/my-feature
   ```

7. **Describe your changes** in the PR description -- what problem does it solve, how to test it, and any trade-offs you made.

PRs are reviewed by maintainers from the [Supporterino](https://github.com/Supporterino) GitHub org. Please be patient and responsive to feedback.
