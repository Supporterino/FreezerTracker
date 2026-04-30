# Architecture Overview

FreezerMan is a self-hosted freezer inventory management application built on a three-tier architecture. Every component runs on infrastructure you own — there are no cloud dependencies.

## System Diagram

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│  Tauri v2 App (Client)  │     │   NestJS API Server     │     │  PostgreSQL Database    │
│  macOS / iOS            │     │   Bun runtime           │     │  Self-hosted            │
│                         │     │                         │     │                         │
│  React + Mantine UI     │────>│  Auth, Households,      │────>│  Prisma ORM             │
│  TanStack Router/Query  │<────│  Freezers, Items,       │<────│  9 tables               │
│  Zustand state          │     │  Change-log, Invites    │     │  Cascade deletes        │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
        HTTPS / REST                                                  Prisma Client
```

The client communicates with the server over HTTPS using a RESTful API. The server manages all business logic, authentication, and data access through Prisma ORM connected to a PostgreSQL database.

## Architectural Principles

- **Self-hosted.** The entire stack runs on your own hardware — a home server, NAS, Raspberry Pi, or VPS. No accounts with third-party cloud providers are required.
- **Monorepo.** A single repository managed with Bun workspaces contains the client (`apps/client`), server (`apps/server`), and shared types (`packages/shared`).
- **Type-safe API contract.** The `packages/shared` workspace defines all request and response interfaces once. TypeScript catches any mismatch between client and server at compile time.
- **RESTful API versioned under `/api/v1/`.** All endpoints are nested under a versioned prefix to allow non-breaking evolution of the API.
- **JWT authentication with token rotation.** Stateless access tokens (15-minute TTL) paired with rotating refresh tokens provide secure auth that works across desktop and mobile.
- **Items queryable at household level.** Rather than deeply nesting items under freezers and compartments, items are accessible at `/households/:hid/items` for efficient list, search, and filter views.

## Technology Stack

| Layer | Technology | Version | Purpose |
| --- | --- | --- | --- |
| Client shell | Tauri | v2 | Native app container (macOS, iOS) |
| Client UI | React | 19 | Component framework |
| UI library | Mantine | 9 | Pre-built component library |
| Routing | TanStack Router | 1.x | File-based, type-safe routing |
| Server state | TanStack Query | 5.x | Data fetching, caching, invalidation |
| Client state | Zustand | 5.x | Auth tokens, active household/freezer |
| Forms | React Hook Form + Zod | 7.x / 3.x | Form state and validation |
| HTTP client | ky | 2.x | Lightweight fetch wrapper |
| Build tool | Vite | 8.x | Frontend bundler |
| Server framework | NestJS | 11 | Backend application framework |
| Server runtime | Bun | 1.3.13 | TypeScript runtime |
| ORM | Prisma | 7 | Database access and migrations |
| Database | PostgreSQL | 17 | Relational data store |
| Language | TypeScript | 6.x | End-to-end type safety |

## Monorepo Structure

```
freezer-tracker/
├── apps/
│   ├── client/              Tauri v2 app (React frontend + Rust shell)
│   │   ├── src/             React/TypeScript source
│   │   └── src-tauri/       Rust Tauri configuration and plugins
│   └── server/              NestJS API server
│       ├── src/             Application modules
│       └── prisma/          Schema and migrations
├── packages/
│   └── shared/              Shared TypeScript interfaces and Zod schemas
├── docker-compose.yml       PostgreSQL + NestJS containers for self-hosting
├── package.json             Bun workspace root
└── bunfig.toml              Bun configuration
```

## Further Reading

- [Backend Architecture](./backend.md) — NestJS modules, auth flow, middleware stack
- [Frontend Architecture](./frontend.md) — Tauri + React client, routing, state management
- [Data Model](./database.md) — PostgreSQL schema, relationships, constraints
- [Shared Package](./shared-package.md) — Type-safe API contract between client and server
- [Design Decisions](./design-decisions.md) — Technology choices and their rationale
