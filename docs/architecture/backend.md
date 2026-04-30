# Backend Architecture

The FreezerMan server is a NestJS 11 application running on the Bun runtime. It exposes a RESTful API under the `/api/v1/` prefix and manages all authentication, authorization, business logic, and data access.

## Module Breakdown

The server is organized into nine NestJS modules, each with a focused responsibility:

| Module | Responsibility |
| --- | --- |
| `AuthModule` | User registration, login, JWT access/refresh token issuance, token rotation, auth guards |
| `UsersModule` | User profile CRUD operations |
| `HouseholdsModule` | Household CRUD, member management, ownership transfer |
| `InvitesModule` | QR invite code generation, validation, and consumption |
| `FreezersModule` | Freezer CRUD within households |
| `CompartmentsModule` | Compartment CRUD within freezers |
| `ItemsModule` | Item CRUD, soft-delete/restore, filtering, search, and pagination |
| `ChangeLogModule` | Per-field diff recording and history retrieval for items |
| `PrismaModule` | Global Prisma client provider (configured with the PrismaPg adapter) |

Each module follows the standard NestJS pattern: a controller handles HTTP concerns (routing, validation, response shaping), a service contains business logic, and Prisma handles persistence.

## Authentication Flow

FreezerMan uses stateless JWT authentication with a rotating refresh token strategy:

1. **Register or Login.** The client sends credentials to `POST /auth/register` or `POST /auth/login`. On success, the server returns a JWT pair: an access token and a refresh token.
2. **Authenticated requests.** The access token (15-minute TTL) is sent as a `Bearer` token in the `Authorization` header on every subsequent request.
3. **Token refresh.** When the access token expires, the client calls `POST /auth/refresh` with the current refresh token. The server performs token rotation: it issues a new access/refresh pair and revokes the old refresh token. This limits the damage window if a refresh token is compromised.
4. **Authorization guards.** Protected routes use `JwtAuthGuard` to verify the access token. Household-scoped routes additionally apply `HouseholdMemberGuard` (any member) or `HouseholdOwnerGuard` (owner only) to enforce role-based access.

```
Client                          Server
  │                                │
  │  POST /auth/login              │
  │  { email, password }           │
  │ ──────────────────────────────>│
  │                                │── validate credentials
  │                                │── generate access + refresh tokens
  │  { accessToken, refreshToken } │
  │ <──────────────────────────────│
  │                                │
  │  GET /households               │
  │  Authorization: Bearer <access>│
  │ ──────────────────────────────>│
  │                                │── JwtAuthGuard verifies token
  │  200 OK                        │
  │ <──────────────────────────────│
  │                                │
  │  POST /auth/refresh            │
  │  { refreshToken }              │
  │ ──────────────────────────────>│
  │                                │── revoke old refresh token
  │                                │── issue new pair
  │  { accessToken, refreshToken } │
  │ <──────────────────────────────│
```

## Invite and QR Flow

Household invitations work without an email server, making them suitable for local-network deployments:

1. **Generate invite.** A household owner calls `POST /invites`. The server creates a short-lived invite code, constructs a join URL (`https://your-server/join?code=TOKEN`), and returns the code alongside a QR data URI. No server-side image generation is required — the QR is a base64-encoded payload.
2. **Share the invite.** The owner displays the QR code on their device screen, or shares the code directly.
3. **Accept invite.** The invitee scans the QR code (or enters the code manually) and the client calls `POST /invites/accept`. The server validates the code (checking expiration and single-use), then adds the user to the household with the `MEMBER` role.

## Change-Log Strategy

FreezerMan records per-field change history for items using a service-layer diffing approach rather than interceptors or database triggers:

1. **Diff at the service layer.** `ItemsService.update()` loads the current item state, then compares each field against the incoming update payload to identify changed fields.
2. **Transactional write.** The item update and the corresponding `ItemChangeLog` entries are written within the same Prisma transaction. This guarantees that every persisted update has a matching history record.
3. **No interceptor indirection.** Keeping the diff logic in the service (rather than a NestJS interceptor) provides clarity about when and how diffs are computed, and avoids edge cases where interceptors might miss or double-count changes.
4. **History retrieval.** `GET /items/:id/history` returns the full ordered change log for an item, showing which field changed, the old value, the new value, who made the change, and when.

## Middleware and Interceptors

The server applies several cross-cutting concerns through NestJS middleware, guards, filters, and interceptors:

### Security

- **Helmet** — Sets standard security headers (Content-Security-Policy, X-Frame-Options, etc.) on all responses.
- **CORS** — Configured via `ALLOWED_ORIGINS` environment variable to restrict cross-origin access.

### Validation

- **ValidationPipe** — Applied globally with `whitelist: true` and `forbidNonWhitelisted: true`. Unknown properties in request bodies are stripped, and requests with unexpected fields are rejected with a 400 error.

### Error Handling

- **AllExceptionsFilter** — Catches unhandled exceptions and returns sanitized error responses. Internal details (stack traces, query text) are never exposed to the client in production.
- **PrismaExceptionFilter** — Maps common Prisma error codes to appropriate HTTP status codes:
  - `P2025` (record not found) maps to `404 Not Found`
  - `P2002` (unique constraint violation) maps to `409 Conflict`
  - `P2003` (foreign key constraint failure) maps to `400 Bad Request`

### Observability

- **LoggingInterceptor** — Logs the HTTP method, path, status code, and response time for every request. Useful for debugging and performance monitoring.

### Rate Limiting

- **ThrottlerGuard** — Applied globally with tiered limits:
  - General API: 100 requests per minute
  - Auth endpoints (`/auth/login`, `/auth/register`): 5 requests per minute
  - Token refresh (`/auth/refresh`): 10 requests per minute

## API Design

The API follows REST conventions with consistent resource nesting:

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh

GET    /api/v1/users/me
PATCH  /api/v1/users/me

GET    /api/v1/households
POST   /api/v1/households
GET    /api/v1/households/:hid
PATCH  /api/v1/households/:hid
DELETE /api/v1/households/:hid

POST   /api/v1/households/:hid/invites
POST   /api/v1/invites/accept

GET    /api/v1/households/:hid/freezers
POST   /api/v1/households/:hid/freezers
GET    /api/v1/households/:hid/freezers/:fid
PATCH  /api/v1/households/:hid/freezers/:fid
DELETE /api/v1/households/:hid/freezers/:fid

GET    /api/v1/households/:hid/freezers/:fid/compartments
POST   /api/v1/households/:hid/freezers/:fid/compartments

GET    /api/v1/households/:hid/items
POST   /api/v1/households/:hid/items
GET    /api/v1/households/:hid/items/:iid
PATCH  /api/v1/households/:hid/items/:iid
DELETE /api/v1/households/:hid/items/:iid

GET    /api/v1/households/:hid/items/:iid/history
```

Items are accessible at the household level (`/households/:hid/items`) rather than deeply nested under freezers and compartments. This makes list, search, and filter views straightforward while still allowing items to reference their freezer and compartment via foreign keys.
