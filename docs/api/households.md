# Households

Manage households and their members. Households are the top-level organizational unit -- every freezer, compartment, and item belongs to a household. All endpoints are prefixed with `/api/v1/households`.

---

## POST /households

Create a new household. The authenticated user becomes the owner.

| | |
|---|---|
| **Auth** | `JwtAuthGuard` |
| **Rate limit** | 100 req/min |

### Request body

```json
{
  "name": "Home Kitchen"
}
```

| Field | Type | Required |
|-------|------|----------|
| `name` | `string` | Yes |

### Response `201 Created`

```json
{
  "id": "clh3a1b2c0001qw08k5m7n9p0",
  "name": "Home Kitchen",
  "ownerId": "clh2v3x0k0000qw08z1y9d3rk",
  "createdAt": "2025-01-15T09:00:00.000Z"
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/households \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{ "name": "Home Kitchen" }'
```

---

## GET /households

List all households the authenticated user is a member of.

| | |
|---|---|
| **Auth** | `JwtAuthGuard` |
| **Rate limit** | 100 req/min |

### Response `200 OK`

```json
[
  {
    "id": "clh3a1b2c0001qw08k5m7n9p0",
    "name": "Home Kitchen",
    "ownerId": "clh2v3x0k0000qw08z1y9d3rk",
    "createdAt": "2025-01-15T09:00:00.000Z"
  }
]
```

### Example

```bash
curl http://localhost:3000/api/v1/households \
  -H "Authorization: Bearer <accessToken>"
```

---

## GET /households/:hid

Get household details including the full member list.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Response `200 OK`

```json
{
  "id": "clh3a1b2c0001qw08k5m7n9p0",
  "name": "Home Kitchen",
  "ownerId": "clh2v3x0k0000qw08z1y9d3rk",
  "createdAt": "2025-01-15T09:00:00.000Z",
  "members": [
    {
      "id": "clh3b2c3d0002qw08r4s6t8u1",
      "userId": "clh2v3x0k0000qw08z1y9d3rk",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "OWNER",
      "joinedAt": "2025-01-15T09:00:00.000Z"
    },
    {
      "id": "clh3c4d5e0003qw08v7w9x0y2",
      "userId": "clh2w4y1l0001qw08a2b3c4d5",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "MEMBER",
      "joinedAt": "2025-01-16T10:30:00.000Z"
    }
  ]
}
```

### Example

```bash
curl http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0 \
  -H "Authorization: Bearer <accessToken>"
```

---

## PATCH /households/:hid

Update household details. Only the household owner can perform this action.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Request body

```json
{
  "name": "Main House Kitchen"
}
```

| Field | Type | Required |
|-------|------|----------|
| `name` | `string` | No |

### Response `200 OK`

Returns the updated household object.

```json
{
  "id": "clh3a1b2c0001qw08k5m7n9p0",
  "name": "Main House Kitchen",
  "ownerId": "clh2v3x0k0000qw08z1y9d3rk",
  "createdAt": "2025-01-15T09:00:00.000Z"
}
```

### Example

```bash
curl -X PATCH http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{ "name": "Main House Kitchen" }'
```

---

## DELETE /households/:hid

Delete a household and **cascade-delete** all associated data (freezers, compartments, items, invites, memberships).

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
{
  "message": "Household deleted successfully"
}
```

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0 \
  -H "Authorization: Bearer <accessToken>"
```

---

## DELETE /households/:hid/members/:uid

Remove a member from the household. Only the household owner can perform this action.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `uid` | `string` | User ID of the member to remove (CUID2) |

### Response `200 OK`

```json
{
  "message": "Member removed successfully"
}
```

### Errors

| Status | Reason |
|--------|--------|
| `400` | Cannot remove the household owner. Transfer ownership first. |

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/members/clh2w4y1l0001qw08a2b3c4d5 \
  -H "Authorization: Bearer <accessToken>"
```

---

## PATCH /households/:hid/transfer

Transfer household ownership to another member. Only the current owner can perform this action.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Request body

```json
{
  "newOwnerId": "clh2w4y1l0001qw08a2b3c4d5"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `newOwnerId` | `string` | Yes | User ID of the new owner (must be an existing member) |

### Response `200 OK`

Returns the updated household with the new `ownerId`.

```json
{
  "id": "clh3a1b2c0001qw08k5m7n9p0",
  "name": "Home Kitchen",
  "ownerId": "clh2w4y1l0001qw08a2b3c4d5",
  "createdAt": "2025-01-15T09:00:00.000Z"
}
```

### Example

```bash
curl -X PATCH http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/transfer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{ "newOwnerId": "clh2w4y1l0001qw08a2b3c4d5" }'
```
