# Design Decisions

This document records the key architectural and technology choices made for FreezerMan, along with the rationale for each decision. These decisions prioritize simplicity, self-hostability, and a small operational footprint.

## Technology Choices

| Decision | Choice | Rationale |
| --- | --- | --- |
| Runtime | Bun 1.3.13 | Fast package install and process start times. Native TypeScript execution without a separate compile step. Fully compatible with the NestJS ecosystem. |
| Monorepo | Bun workspaces | Single repository for client, server, and shared types. Eliminates type duplication and version drift between packages. No additional monorepo tooling (Turborepo, Nx) required. |
| Auth | JWT (access + refresh) | Stateless authentication that works across both desktop and mobile clients without server-side session storage. Token rotation limits the exposure window for compromised refresh tokens. |
| Invites | QR code + short-lived token | Eliminates the need for an email server or SMTP configuration. Works on local networks without internet access. QR scanning provides a frictionless join experience on mobile devices. |
| Database | PostgreSQL 17 via Prisma 7 | Mature relational database with strong integrity guarantees. Prisma provides type-safe queries, declarative schema management, and straightforward migration workflows. PostgreSQL is easy to self-host via Docker or native packages. |
| Backend framework | NestJS 11 + Express | Mature, well-documented framework with a modular architecture that maps cleanly to the domain. Built-in support for guards, interceptors, validation pipes, and Swagger documentation. Express adapter chosen for broad ecosystem compatibility. |
| Frontend framework | Tauri v2 + React 19 | Tauri produces small native binaries (~10 MB vs ~150 MB for Electron) with access to OS-level APIs (keychain, camera). React 19 provides a mature component model with a large ecosystem. Cross-platform support for macOS and iOS from a single codebase. |
| UI library | Mantine 9 | Comprehensive component library covering forms, layout, navigation, modals, and data display. Strong developer experience with consistent APIs and good TypeScript support. Reduces custom UI code significantly. |

## Architectural Choices

| Decision | Choice | Rationale |
| --- | --- | --- |
| API versioning | `/api/v1/` prefix | Provides a clean migration path when breaking changes are needed in the future. Clients can be updated independently of the server by supporting multiple API versions simultaneously. |
| Soft delete | `deletedAt` nullable field on `FreezerItem` | Preserves item history and change logs. Enables an archive view where users can browse and restore accidentally deleted items. Avoids permanent data loss from a single tap. |
| Change log | Service-layer diff + log table | Recording diffs at the service layer (rather than via database triggers or NestJS interceptors) provides transactional safety — the item update and its change log entries are written in the same Prisma transaction. Per-field granularity allows the UI to show exactly which fields changed, by whom, and when. |
| Item querying | Household-level, not deeply nested | Items are accessible at `/households/:hid/items` rather than `/households/:hid/freezers/:fid/compartments/:cid/items`. This makes search, filter, and list views straightforward. Items still reference their freezer and compartment via foreign keys for detail views. |

## Deliberate Omissions

Some features are intentionally excluded to keep the architecture simple and the operational burden low:

| Feature | Status | Rationale |
| --- | --- | --- |
| Offline support | Not supported | Supporting offline mode would require conflict resolution, local database synchronization, and a substantially more complex state management layer. The target deployment (home network with a local server) makes offline scenarios uncommon. |
| Item photos | Not supported | Photo storage would require either a blob store (S3, MinIO) or filesystem management with backup considerations. This adds significant infrastructure complexity for a feature that is not essential to inventory tracking. |
| Push notifications | Not supported | Expiry notifications would require a notification service, background workers, and platform-specific push infrastructure (APNs for iOS, system notifications for macOS). The added infrastructure complexity is not justified for the current scope. |
| Real-time sync | Not supported | WebSocket or SSE-based real-time updates would add server complexity and connection management overhead. TanStack Query's background refetching provides near-real-time freshness with much simpler implementation. |
| Multi-tenancy | Not supported | Each deployment serves a single group of households. There is no tenant isolation, billing, or admin portal. This is by design — FreezerMan is a personal/family tool, not a SaaS product. |

## Trade-offs

### JWT vs. Session-Based Auth

JWT was chosen over server-side sessions for two reasons: it works naturally with mobile clients (no cookie management), and it avoids the need for a session store (Redis, database table). The trade-off is that token revocation is not instant — a compromised access token remains valid until it expires (15 minutes). This is mitigated by the short access token TTL and the refresh token rotation strategy.

### Prisma vs. Raw SQL

Prisma adds a layer of abstraction over PostgreSQL. The trade-off is a small performance overhead compared to hand-written SQL, and occasional limitations in expressing complex queries. The benefits — type-safe queries, declarative schema, automated migrations, and significantly reduced boilerplate — outweigh this cost for FreezerMan's query patterns, which are straightforward CRUD operations.

### Tauri vs. Electron

Tauri was chosen over Electron for its significantly smaller binary size and lower memory footprint. The trade-off is a smaller ecosystem and less mature mobile support compared to Electron (which does not support mobile at all) or React Native (which would require a separate codebase). For FreezerMan's scope — a focused utility app with moderate UI complexity — Tauri's capabilities are more than sufficient.
