# FreezerMan

> Self-hosted freezer inventory tracking for your household.

[![Server Release](https://github.com/Supporterino/FreezerTracker/actions/workflows/server-release.yml/badge.svg)](https://github.com/Supporterino/FreezerTracker/actions/workflows/server-release.yml)
[![Documentation](https://github.com/Supporterino/FreezerTracker/actions/workflows/deploy-docs.yml/badge.svg)](https://supporterino.github.io/FreezerTracker/)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![Server Version](https://img.shields.io/badge/server-v0.1.2-green)](https://github.com/Supporterino/FreezerTracker/releases)
[![Client Version](https://img.shields.io/badge/client-v0.1.4-green)](https://github.com/Supporterino/FreezerTracker/releases)

FreezerMan helps households keep track of what's stored in their freezers. Organize
items by freezer and compartment, track expiry dates, invite household members via
QR codes, and maintain a full change history -- all self-hosted, no cloud required.

## Features

- **Multi-household** -- create and manage multiple households with owner/member roles
- **Freezer organization** -- structure freezers with named compartments (drawers, shelves, etc.)
- **Item tracking** -- add items with quantity, notes, storage date, and optional expiry date
- **Expiry alerts** -- color-coded expiry status (ok, soon, imminent, expired)
- **QR invites** -- generate QR codes to invite household members without email
- **Change history** -- per-field audit trail on every item edit
- **Soft-delete archive** -- deleted items go to an archive before permanent removal
- **Cross-platform** -- native macOS desktop and iOS mobile apps via Tauri v2

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Supporterino/FreezerTracker.git
cd FreezerTracker

# Configure the server
cp apps/server/.env.example apps/server/.env
# Edit .env: set DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET

# Start the server and database
docker compose up -d

# Verify it's running
curl http://localhost:3000/api/v1/health
```

Then download the client app from [GitHub Releases](https://github.com/Supporterino/FreezerTracker/releases),
configure the server URL, and create your first household.

## Documentation

Full documentation is available at **[supporterino.github.io/FreezerTracker](https://supporterino.github.io/FreezerTracker/)**.

| Section | Description |
|---------|-------------|
| [Getting Started](https://supporterino.github.io/FreezerTracker/getting-started/) | Installation and setup |
| [User Guide](https://supporterino.github.io/FreezerTracker/user-guide/) | Feature walkthroughs |
| [API Reference](https://supporterino.github.io/FreezerTracker/api/) | REST API documentation |
| [Deployment](https://supporterino.github.io/FreezerTracker/deployment/) | Docker, Kubernetes, reverse proxy |
| [Contributing](https://supporterino.github.io/FreezerTracker/contributing/) | Development setup and guidelines |

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Server** | [NestJS](https://nestjs.com/) 11 &middot; [Prisma](https://www.prisma.io/) 7 &middot; [PostgreSQL](https://www.postgresql.org/) 17 &middot; [Bun](https://bun.sh/) |
| **Client** | [Tauri](https://tauri.app/) v2 &middot; [React](https://react.dev/) 19 &middot; [Mantine](https://mantine.dev/) 9 &middot; [TanStack](https://tanstack.com/) Router & Query |
| **Shared** | TypeScript 6 &middot; [Zod](https://zod.dev/) 3 |
| **Infra** | Docker &middot; [Helm](https://helm.sh/) &middot; GitHub Actions |

## Project Structure

```
freezer-tracker/
├── apps/
│   ├── client/          # Tauri v2 desktop/mobile app
│   └── server/          # NestJS REST API
├── packages/
│   └── shared/          # Shared TypeScript types & Zod schemas
├── helm/                # Kubernetes Helm chart
├── scripts/             # Release automation
└── docs/                # Documentation source (Zensical)
```

## Contributing

Contributions are welcome. See the [Contributing Guide](https://supporterino.github.io/FreezerTracker/contributing/)
for development setup, code style, and the pull request process.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
