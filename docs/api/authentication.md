# Authentication

All authentication endpoints are prefixed with `/api/v1/auth`. Auth endpoints are rate-limited to **5 requests/minute** (except refresh, which allows **10 requests/minute**).

---

## POST /auth/register

Create a new user account and receive a token pair.

| | |
|---|---|
| **Auth** | None |
| **Rate limit** | 5 req/min |

### Request body

```json
{
  "email": "jane@example.com",
  "password": "s3cureP@ss",
  "name": "Jane Doe"
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `email` | `string` | Yes | Valid email address |
| `password` | `string` | Yes | Minimum 8 characters |
| `name` | `string` | Yes | Minimum 2 characters |

### Response `201 Created`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Errors

| Status | Reason |
|--------|--------|
| `400` | Validation failed (missing fields, password too short, etc.) |
| `409` | Email address already registered |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "s3cureP@ss",
    "name": "Jane Doe"
  }'
```

---

## POST /auth/login

Authenticate with email and password. Uses `LocalAuthGuard` internally.

| | |
|---|---|
| **Auth** | None (LocalAuthGuard) |
| **Rate limit** | 5 req/min |

### Request body

```json
{
  "email": "jane@example.com",
  "password": "s3cureP@ss"
}
```

| Field | Type | Required |
|-------|------|----------|
| `email` | `string` | Yes |
| `password` | `string` | Yes |

### Response `200 OK`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Errors

| Status | Reason |
|--------|--------|
| `401` | Invalid email or password |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "s3cureP@ss"
  }'
```

---

## POST /auth/refresh

Exchange a valid refresh token for a new token pair. The old refresh token is **revoked** immediately (token rotation).

| | |
|---|---|
| **Auth** | None |
| **Rate limit** | 10 req/min |

### Request body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

| Field | Type | Required |
|-------|------|----------|
| `refreshToken` | `string` | Yes |

### Response `200 OK`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Errors

| Status | Reason |
|--------|--------|
| `401` | Refresh token is invalid, expired, or already revoked |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

---

## POST /auth/logout

Revoke a refresh token. The associated access token remains valid until it expires naturally.

| | |
|---|---|
| **Auth** | `JwtAuthGuard` (Bearer token required) |
| **Rate limit** | 100 req/min (global) |

### Request body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

| Field | Type | Required |
|-------|------|----------|
| `refreshToken` | `string` | Yes |

### Response `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```
