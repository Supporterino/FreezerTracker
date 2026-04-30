# Invites

Manage household invitation codes. Invites allow household owners to share a code or QR image that other authenticated users can accept to join the household. All endpoints are prefixed with `/api/v1/households/:hid/invites`.

---

## POST /households/:hid/invites

Generate a new invite code with an associated QR code image.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Response `201 Created`

```json
{
  "id": "clh4d5e6f0004qw08g1h2i3j4",
  "code": "ABCD-1234-EFGH",
  "qrDataUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "expiresAt": "2025-01-22T09:00:00.000Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Invite ID (CUID2) |
| `code` | `string` | Human-readable invite code |
| `qrDataUri` | `string` | Base64-encoded PNG QR code as a data URI |
| `expiresAt` | `string` | ISO-8601 expiration timestamp |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/invites \
  -H "Authorization: Bearer <accessToken>"
```

---

## GET /households/:hid/invites

List all active (non-expired, non-revoked) invites for a household.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Response `200 OK`

```json
[
  {
    "id": "clh4d5e6f0004qw08g1h2i3j4",
    "code": "ABCD-1234-EFGH",
    "qrDataUri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "expiresAt": "2025-01-22T09:00:00.000Z"
  }
]
```

### Example

```bash
curl http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/invites \
  -H "Authorization: Bearer <accessToken>"
```

---

## DELETE /households/:hid/invites/:inviteId

Revoke an invite code so it can no longer be used.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `inviteId` | `string` | Invite ID (CUID2) |

### Response `200 OK`

```json
{
  "message": "Invite revoked successfully"
}
```

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/invites/clh4d5e6f0004qw08g1h2i3j4 \
  -H "Authorization: Bearer <accessToken>"
```

---

## POST /households/:hid/invites/accept

Accept an invite code to join the household as a `MEMBER`.

| | |
|---|---|
| **Auth** | `JwtAuthGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Request body

```json
{
  "code": "ABCD-1234-EFGH"
}
```

| Field | Type | Required |
|-------|------|----------|
| `code` | `string` | Yes |

### Response `200 OK`

```json
{
  "message": "Successfully joined household"
}
```

### Errors

| Status | Reason |
|--------|--------|
| `404` | Invite code not found or does not belong to this household |
| `409` | User is already a member of this household |
| `410` | Invite code has expired |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/invites/accept \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{ "code": "ABCD-1234-EFGH" }'
```
