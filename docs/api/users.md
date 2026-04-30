# Users

Manage the authenticated user's profile. All endpoints are prefixed with `/api/v1/users` and require a valid JWT access token.

---

## GET /users/me

Retrieve the currently authenticated user's profile.

| | |
|---|---|
| **Auth** | `JwtAuthGuard` |
| **Rate limit** | 100 req/min |

### Response `200 OK`

```json
{
  "id": "clh2v3x0k0000qw08z1y9d3rk",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "createdAt": "2025-01-15T08:30:00.000Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | CUID2 user identifier |
| `email` | `string` | User's email address |
| `name` | `string` | Display name |
| `createdAt` | `string` | ISO-8601 account creation timestamp |

### Example

```bash
curl http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer <accessToken>"
```

---

## PATCH /users/me

Update the currently authenticated user's profile.

| | |
|---|---|
| **Auth** | `JwtAuthGuard` |
| **Rate limit** | 100 req/min |

### Request body

```json
{
  "name": "Jane Smith"
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name` | `string` | No | Minimum 2 characters |

### Response `200 OK`

Returns the updated user object.

```json
{
  "id": "clh2v3x0k0000qw08z1y9d3rk",
  "email": "jane@example.com",
  "name": "Jane Smith",
  "createdAt": "2025-01-15T08:30:00.000Z"
}
```

### Example

```bash
curl -X PATCH http://localhost:3000/api/v1/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "name": "Jane Smith"
  }'
```

---

## DELETE /users/me

Delete the currently authenticated user's account.

| | |
|---|---|
| **Auth** | `JwtAuthGuard` |
| **Rate limit** | 100 req/min |

### Response `200 OK`

```json
{
  "message": "Account deleted successfully"
}
```

### Errors

| Status | Reason |
|--------|--------|
| `409` | User still owns one or more households. Transfer ownership or delete the households first. |

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer <accessToken>"
```
