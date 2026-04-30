# Compartments

Manage compartments within a freezer. Compartments represent physical sections (shelves, drawers, baskets) and help organize items. All endpoints are prefixed with `/api/v1/households/:hid/freezers/:fid/compartments`.

---

## POST /households/:hid/freezers/:fid/compartments

Create a new compartment in a freezer.

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
  "name": "Top Shelf",
  "position": 1
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Compartment name |
| `position` | `number` | No | Display order (lower numbers first) |

### Response `201 Created`

```json
{
  "id": "clh6f7g8h0006qw08p3q4r5s6",
  "freezerId": "clh5e6f7g0005qw08l2m3n4o5",
  "name": "Top Shelf",
  "position": 1
}
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers/clh5e6f7g0005qw08l2m3n4o5/compartments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "name": "Top Shelf",
    "position": 1
  }'
```

---

## GET /households/:hid/freezers/:fid/compartments

List all compartments in a freezer, ordered by `position`.

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
[
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
```

### Example

```bash
curl http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers/clh5e6f7g0005qw08l2m3n4o5/compartments \
  -H "Authorization: Bearer <accessToken>"
```

---

## PATCH /households/:hid/freezers/:fid/compartments/:cid

Update a compartment's name or position.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `fid` | `string` | Freezer ID (CUID2) |
| `cid` | `string` | Compartment ID (CUID2) |

### Request body

```json
{
  "name": "Middle Shelf",
  "position": 2
}
```

| Field | Type | Required |
|-------|------|----------|
| `name` | `string` | No |
| `position` | `number` | No |

### Response `200 OK`

Returns the updated compartment object.

```json
{
  "id": "clh6f7g8h0006qw08p3q4r5s6",
  "freezerId": "clh5e6f7g0005qw08l2m3n4o5",
  "name": "Middle Shelf",
  "position": 2
}
```

### Example

```bash
curl -X PATCH http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers/clh5e6f7g0005qw08l2m3n4o5/compartments/clh6f7g8h0006qw08p3q4r5s6 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{ "name": "Middle Shelf", "position": 2 }'
```

---

## DELETE /households/:hid/freezers/:fid/compartments/:cid

Delete a compartment. Blocked if the compartment still contains active items.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `fid` | `string` | Freezer ID (CUID2) |
| `cid` | `string` | Compartment ID (CUID2) |

### Response `200 OK`

```json
{
  "message": "Compartment deleted successfully"
}
```

### Errors

| Status | Reason |
|--------|--------|
| `409` | Compartment still contains active items. Move or delete the items first. |

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/freezers/clh5e6f7g0005qw08l2m3n4o5/compartments/clh6f7g8h0006qw08p3q4r5s6 \
  -H "Authorization: Bearer <accessToken>"
```
