---
hide:
  - navigation
  - toc
---

# FreezerMan

**Self-hosted freezer inventory tracking for your household.**

FreezerMan helps households keep track of what's in their freezers. Organize items by freezer and compartment, track expiry dates, and share access with your household members -- all without relying on cloud services.

---

## Key Features

<div class="grid cards" markdown>

-   **Multi-Household Support**

    ---

    Create and manage multiple households. Each household has its own freezers, items, and member list with role-based access (owner and member).

-   **Freezer Organization**

    ---

    Organize your freezers with named compartments. Track which items are stored where and quickly find what you need.

-   **Expiry Tracking**

    ---

    Set expiry dates on items and see at a glance what needs to be used soon. Items are color-coded by expiry urgency: ok, soon, imminent, or expired.

-   **QR Code Invites**

    ---

    Invite household members by generating a QR code. They scan it with the app and join instantly -- no email server required.

-   **Change History**

    ---

    Every edit to an item is tracked with a per-field audit trail. See who changed what and when.

-   **Cross-Platform**

    ---

    Native desktop app for macOS and mobile app for iOS, powered by Tauri v2. Self-host the server on any Linux or macOS machine.

</div>

---

## Quick Links

| Section | Description |
|---------|-------------|
| [Getting Started](getting-started/index.md) | System requirements, installation, and your first household |
| [User Guide](user-guide/index.md) | Feature walkthroughs and tutorials |
| [API Reference](api/index.md) | Complete REST API documentation |
| [Architecture](architecture/index.md) | System design, data model, and tech stack |
| [Configuration](configuration/index.md) | Environment variables and settings |
| [Deployment](deployment/index.md) | Docker Compose, Kubernetes, and reverse proxy setup |
| [Contributing](contributing/index.md) | Development setup, code style, and testing |

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Server** | NestJS 11, Prisma 7, PostgreSQL 17, Bun 1.3 |
| **Client** | Tauri v2, React 19, Mantine 9, TanStack Router & Query |
| **Shared** | TypeScript 6, Zod 3 |
| **Infrastructure** | Docker, Helm, GitHub Actions |
