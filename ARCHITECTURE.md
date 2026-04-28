# Freezer Tracker — Architecture Plan

## 1. High-Level Overview

```
┌─────────────────────────────────┐
│   Tauri v2 App (Client)         │
│   macOS · Linux · iOS · Android │
│                                 │
│  React + Mantine UI             │
│  TypeScript / Bun (build)       │
│  Tauri Rust shell (native APIs) │
└──────────────┬──────────────────┘
               │ HTTPS / REST
┌──────────────▼──────────────────┐
│   NestJS API Server             │
│   TypeScript / Bun runtime      │
│   Self-hosted (home server /    │
│   NAS / Raspberry Pi / VPS)     │
│                                 │
│  Auth module (JWT)              │
│  Household module               │
│  Freezer module                 │
│  Item module                    │
│  Change-log module              │
│  Invite module (QR)             │
└──────────────┬──────────────────┘
               │ Prisma ORM
┌──────────────▼──────────────────┐
│   PostgreSQL Database           │
│   Self-hosted (same machine     │
│   or separate container)        │
└─────────────────────────────────┘
```

---

## 2. Data Model (Prisma schema — conceptual)

```
User
  id, email, passwordHash, name, createdAt

Household
  id, name, createdAt, createdBy (→ User)

HouseholdMember
  id, householdId (→ Household), userId (→ User), role (OWNER | MEMBER), joinedAt

HouseholdInvite
  id, householdId (→ Household), code (unique token), qrPayload, expiresAt, usedAt

Freezer
  id, householdId (→ Household), name, description, createdAt

Compartment
  id, freezerId (→ Freezer), name, position (optional order int)

FreezerItem
  id, householdId (→ Household)
  freezerId  (→ Freezer)
  compartmentId (→ Compartment)
  name, quantity (free-text), notes
  storedAt (when put in), expiresAt (optional)
  deletedAt (soft-delete, nullable)
  createdBy (→ User), updatedBy (→ User)
  createdAt, updatedAt

ItemChangeLog
  id, itemId (→ FreezerItem), changedBy (→ User), changedAt
  fieldName, oldValue, newValue   ← stores individual field changes
```

---

## 3. Backend Architecture (NestJS / Bun)

### Module breakdown

| Module | Responsibility |
|---|---|
| `AuthModule` | Registration, login, JWT issue/refresh, guards |
| `UsersModule` | User profile CRUD |
| `HouseholdsModule` | Create household, list members, update name |
| `InvitesModule` | Generate invite (QR code payload + token), validate & consume invite |
| `FreezersModule` | CRUD for freezers within a household |
| `CompartmentsModule` | CRUD for compartments within a freezer |
| `ItemsModule` | Full CRUD for freezer items, soft-delete, filter/search |
| `ChangeLogModule` | Record per-field diffs to `ItemChangeLog`, called directly from `ItemsService` |
| `PrismaModule` | Global Prisma client provider |

### Auth flow

1. `POST /auth/register` — create user, return JWT pair (access + refresh)
2. `POST /auth/login` — validate credentials, return JWT pair
3. `POST /auth/refresh` — exchange refresh token for new access token
4. All protected routes use a `JwtAuthGuard`; household-scoped routes also use an `HouseholdMemberGuard`

### Invite / QR flow

1. `POST /invites` (owner only) → server generates a short-lived token, encodes it into a URL (`https://your-server/join?code=TOKEN`), and returns it alongside a base64 QR payload
2. App renders the QR code client-side (no server-side image generation needed)
3. Invitee scans → app opens → `POST /invites/:code/accept` → user is added to household as MEMBER

### Change-log strategy

- `ItemsService.update()` diffs old vs new field values directly before and after the Prisma update
- Diffs are passed to `ChangeLogService.recordChanges()` and written to `ItemChangeLog` in the same Prisma transaction as the update
- No separate interceptor is used — all logic lives in the service layer for clarity and transactional safety
- `GET /items/:id/history` returns the full ordered log

### API style

- **REST** with consistent resource nesting: `/households/:hid/freezers/:fid/compartments`, `/households/:hid/items`
- Items are queryable at household level (not buried 3 levels deep) for easier list/search views
- Versioned under `/api/v1/`

---

## 4. Frontend Architecture (Tauri v2 + React + Mantine)

### Tech stack

| Concern | Choice |
|---|---|
| Framework | React **19** (inside Tauri v2 webview) |
| UI library | Mantine **9** |
| Routing | TanStack Router **1.x** (type-safe, file-based) |
| Server state | TanStack Query **5.x** (data fetching, caching, invalidation) |
| Global client state | Zustand **5.x** (auth token, active household/freezer context) |
| Forms | React Hook Form **7.x** + Zod **3.x** validation |
| QR code display | `qrcode.react` **4.x** |
| QR code scanning | Tauri plugin (camera) or `@zxing/browser` **0.2.x** inside webview |
| HTTP client | `ky` **2.x** + `@tauri-apps/plugin-http` **2.x** (Tauri fetch passed into ky for mobile compatibility) |
| Build | Vite **8.x** (bundled by Tauri) |
| Language | TypeScript **6.x** strict mode |

### Page / view structure

```
/login                   Login screen
/register                Registration screen

/households              Household picker (if user belongs to multiple)
/households/new          Create a household

/households/:hid
  /overview              Dashboard: all freezers at a glance
  /freezers/:fid         Single freezer view (compartments + items)
  /items                 Full item list for household (searchable/filterable)
  /items/:iid            Item detail + change history
  /settings              Household settings, members list, invite QR
  /archive               Soft-deleted items (history view)

/profile                 User account settings
```

### Component hierarchy (simplified)

```
<AppShell>                  ← Mantine AppShell (nav + header)
  <Sidebar>                 ← Nested NavLinks: households → freezers
  <Router>
    <FreezerView>
      <ItemFilters>         ← search, compartment filter, expiry filter
      <SimpleGrid>
        <ItemCard>          ← item name, qty, compartment badge, expiry badge
    <ItemDetailDrawer>      ← right-side drawer: item detail + history
      <ChangeHistoryList>
    <ItemModal>             ← centred modal: add / edit item
    <HouseholdSettings>
      <MemberList>
      <InviteQRPanel>       ← generates + shows QR code
```

### State management flow

- Auth token stored in **Tauri secure store** (OS keychain on desktop, Secure Enclave on mobile), not localStorage
- `TanStack Query` handles all API calls; mutations auto-invalidate related queries
- Active household ID persisted in Zustand + Tauri store so it survives app restarts

---

## 5. Project Structure (Monorepo)

```
freezer-tracker/
├── apps/
│   ├── client/          ← Tauri v2 app
│   │   ├── src/         ← React/TS frontend
│   │   └── src-tauri/   ← Rust Tauri shell
│   └── server/          ← NestJS API
│       ├── src/
│       │   ├── auth/
│       │   ├── users/
│       │   ├── households/
│       │   ├── invites/
│       │   ├── freezers/
│       │   ├── compartments/
│       │   ├── items/
│       │   └── change-log/
│       └── prisma/
│           └── schema.prisma
├── packages/
│   └── shared/          ← Shared TypeScript types / Zod schemas
│       └── src/
├── docker-compose.yml   ← PostgreSQL + NestJS for self-hosting
├── package.json         ← Bun workspace root
└── bunfig.toml
```

The `packages/shared` workspace is the **single source of truth for the API contract** between
the server and the client. It is consumed by both `apps/client` and `apps/server`.

It contains three categories of exports:

1. **Request DTO interfaces** — plain TypeScript interfaces (no class-validator decorators)
   mirroring every NestJS DTO shape. The server defines the canonical shape via class-validator
   DTOs; `packages/shared` re-exports the same fields as plain interfaces so the client can
   type API call payloads without depending on NestJS internals.
   Examples: `CreateItemDto`, `UpdateItemDto`, `RegisterDto`, `CreateFreezerDto`.

2. **Response interfaces** — plain TypeScript interfaces matching every controller's return shape.
   Examples: `FreezerItemResponse`, `HouseholdDetailResponse`, `PaginatedResponse<T>`.

3. **Zod schemas** — client-side validation schemas mirroring the DTOs, used by React Hook Form
   via `zodResolver`. The server never imports Zod; it uses class-validator exclusively.
   Examples: `createItemSchema`, `registerSchema`.

**No API type is ever defined twice.** If a field is added or renamed on the backend DTO,
the corresponding interface in `packages/shared` must be updated in the same change, and
TypeScript will surface any mismatch in the frontend at compile time.

---

## 6. Infrastructure / Self-Hosting

- **Docker Compose** ships the server: `postgres` + `nestjs-api` containers
- Tauri client connects to the server via a user-configured base URL (stored in Tauri settings)
- Recommended: user places the server behind a reverse proxy (Caddy or Nginx) with a Let's Encrypt TLS cert for HTTPS — the app enforces HTTPS in production
- A `.env` file on the server holds `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `ALLOWED_ORIGINS`

---

## 7. Key Design Decisions Summary

| Decision | Choice | Rationale |
|---|---|---|
| Runtime | Bun **1.3.13** | Fast install/start, native TypeScript, compatible with NestJS |
| Monorepo | Bun workspaces | Single repo, shared types, no duplication |
| Auth | JWT (access + refresh) | Stateless, works well with mobile + desktop |
| Invite | QR → short-lived token | No email server required, works on local network |
| DB | PostgreSQL **17** via Prisma **7** | Relational integrity, Prisma migrations, easy self-host |
| Backend | NestJS **11** + Express adapter | LTS-aligned, simple Swagger integration |
| Offline | Not required | Simplifies architecture significantly |
| Soft delete | `deletedAt` nullable field | History view possible, no data loss |
| Change log | Service-layer diff + log table | Transactional safety, per-field granularity |
| Item photos | None | Keeps storage simple, no S3/blob store needed |
| Notifications | None | Reduces infrastructure complexity |
