# Freezers

Manage freezers within a household. Each household can contain multiple freezers, and each freezer can hold multiple compartments. All endpoints are prefixed with `/api/v1/households/:hid/freezers`.

---

## POST /households/:hid/freezers

Create a new freezer in the household.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Request body

```json
{
  "name": "Garage Chest Freezer",
  "description": "Large chest freezer in the garage"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Freezer name |
| `description` | `string` | No | Optional description |

### Response `201 Created`

```json
{
  "id": "clh5e6f7g0005qw08l2m3n4o5",
  "householdId": "clh3a1b2c0001qw08k5m7n9p0",
  "name": "Garage Chest Freezer",
  "description": "Large chest freezer in the garage",
  "createdAt": "2025-01-15T10:00:00.000Z"
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "name": "Garage Chest Freezer",
    "description": "Large chest freezer in the garage"
  }'
```

---

## GET /households/:hid/freezers

List all freezers in the household.

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
[
  {
    "id": "clh5e6f7g0005qw08l2m3n4o5",
    "householdId": "clh3a1b2c0001qw08k5m7n9p0",
    "name": "Garage Chest Freezer",
    "description": "Large chest freezer in the garage",
    "createdAt": "2025-01-15T10:00:00.000Z"
  }
]
```

### Example

```bash
curl http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers \
  -H "Authorization: Bearer <accessToken>"
```

---

## GET /households/:hid/freezers/:fid

Get a single freezer with its compartments.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `fid` | `string` | Freezer ID (CUID2) |

### Response `200 OK`

```json
{
  "id": "clh5e6f7g0005qw08l2m3n4o5",
  "householdId": "clh3a1b2c0001qw08k5m7n9p0",
  "name": "Garage Chest Freezer",
  "description": "Large chest freezer in the garage",
  "createdAt": "2025-01-15T10:00:00.000Z",
  "compartments": [
    {
      "id": "clh6f7g8h0006qw08p3q4r5s6",
      "freezerId": "clh5e6f7g0005qw08l2m3n4o5",
      "name": "Top Shelf",
      "position": 1
    },
    {
      "id": "clh6g8h9i0007qw08t4u5v6w7",
      "freezerId": "clh5e6f7g0005qw08l2m3n4o5",
      "name": "Bottom Drawer",
      "position": 2
    }
  ]
}
```

### Example

```bash
curl http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers/clh5e6f7g0005qw08l2m3n4o5 \
  -H "Authorization: Bearer <accessToken>"
```

---

## PATCH /households/:hid/freezers/:fid

Update a freezer's details.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `fid` | `string` | Freezer ID (CUID2) |

### Request body

```json
{
  "name": "Garage Deep Freezer",
  "description": "Updated description"
}
```

| Field | Type | Required |
|-------|------|----------|
| `name` | `string` | No |
| `description` | `string` | No |

### Response `200 OK`

Returns the updated freezer object.

```json
{
  "id": "clh5e6f7g0005qw08l2m3n4o5",
  "householdId": "clh3a1b2c0001qw08k5m7n9p0",
  "name": "Garage Deep Freezer",
  "description": "Updated description",
  "createdAt": "2025-01-15T10:00:00.000Z"
}
```

### Example

```bash
curl -X PATCH http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers/clh5e6f7g0005qw08l2m3n4o5 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{ "name": "Garage Deep Freezer" }'
```

---

## DELETE /households/:hid/freezers/:fid

Delete a freezer and **cascade-delete** all its compartments and items.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `fid` | `string` | Freezer ID (CUID2) |

### Response `200 OK`

```json
{
  "message": "Freezer deleted successfully"
}
```

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers/clh5e6f7g0005qw08l2m3n4o5 \
  -H "Authorization: Bearer <accessToken>"
```
