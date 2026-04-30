# API Reference

FreezerMan exposes a RESTful JSON API for managing household freezer inventories. All endpoints are prefixed with `/api/v1/`.

## Base URL

```
https://<your-domain>/api/v1/
```

In local development the default is `http://localhost:3000/api/v1/`.

## Authentication

The API uses **JWT Bearer tokens**. Obtain a token pair by calling [POST /auth/login](authentication.md#post-authlogin) or [POST /auth/register](authentication.md#post-authregister), then include the access token in every subsequent request:

```
Authorization: Bearer <accessToken>
```

### Token lifecycle

| Token | Default TTL | Notes |
|-------|-------------|-------|
| Access token | 15 minutes | Short-lived, used for API requests |
| Refresh token | 30 days | Long-lived, used to obtain new token pairs |

When you call [POST /auth/refresh](authentication.md#post-authrefresh), the server issues a **new** access token and a **new** refresh token. The old refresh token is revoked immediately (rotation). Clients must store and use the new refresh token for subsequent refreshes.

## Error format

All error responses follow a consistent shape:

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `statusCode` | `number` | HTTP status code |
| `message` | `string` | Human-readable error description |
| `error` | `string` | HTTP status text |

## Pagination

Endpoints that return collections use a `PaginatedResponse<T>` envelope:

```json
{
  "data": [
    { "id": "abc123", "name": "Chicken breast", "quantity": 4 }
  ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

| Field | Type | Description |
|-------|------|-------------|
| `data` | `T[]` | Array of results for the current page |
| `total` | `number` | Total number of matching records |
| `page` | `number` | Current page number (1-indexed) |
| `limit` | `number` | Maximum items per page |

Control pagination with the `page` and `limit` query parameters.

## Rate limiting

The API enforces per-IP rate limits to prevent abuse.

| Scope | Limit |
|-------|-------|
| Global (all endpoints) | 100 requests / minute |
| Auth endpoints (`/auth/*`) | 5 requests / minute |
| Refresh endpoint (`/auth/refresh`) | 10 requests / minute |

Exceeding the limit returns `429 Too Many Requests`.

## IDs

All resource identifiers use the [CUID2](https://github.com/paralleldrive/cuid2) format (e.g., `clh2v3x0k0000qw08z1y9d3rk`).

## Dates

All date/time values are serialized as **ISO-8601** strings in UTC (e.g., `2025-01-15T08:30:00.000Z`).

## Swagger UI

In **development mode only**, interactive API documentation is available at:

```
http://localhost:3000/api/docs
```

This Swagger UI is disabled in production builds.

## Endpoint overview

| Section | Base path | Description |
|---------|-----------|-------------|
| [Authentication](authentication.md) | `/auth` | Register, login, refresh, logout |
| [Users](users.md) | `/users` | Profile management |
| [Households](households.md) | `/households` | Household CRUD, membership, ownership |
| [Invites](invites.md) | `/households/:hid/invites` | Invite codes and QR sharing |
| [Freezers](freezers.md) | `/households/:hid/freezers` | Freezer management |
| [Compartments](compartments.md) | `/households/:hid/freezers/:fid/compartments` | Compartment management |
| [Items](items.md) | `/households/:hid/items` | Freezer item CRUD, search, archive, history |
| [Health](health.md) | `/health` | Liveness and readiness probes |
