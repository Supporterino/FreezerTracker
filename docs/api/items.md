# Items

Manage freezer items within a household. Items support full-text search, filtering, pagination, soft-delete with an archive, and change history tracking. All endpoints are prefixed with `/api/v1/households/:hid/items`.

---

## FreezerItemResponse

All item endpoints return objects with this shape:

```json
{
  "id": "clh7h9i0j0008qw08x5y6z7a8",
  "householdId": "clh3a1b2c0001qw08k5m7n9p0",
  "freezerId": "clh5e6f7g0005qw08l2m3n4o5",
  "compartmentId": "clh6f7g8h0006qw08p3q4r5s6",
  "name": "Chicken breast",
  "quantity": 4,
  "notes": "Bought from Costco",
  "storedAt": "2025-01-15T10:30:00.000Z",
  "expiresAt": "2025-07-15T00:00:00.000Z",
  "deletedAt": null,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z",
  "createdBy": {
    "id": "clh2v3x0k0000qw08z1y9d3rk",
    "email": "jane@example.com",
    "name": "Jane Doe"
  },
  "updatedBy": {
    "id": "clh2v3x0k0000qw08z1y9d3rk",
    "email": "jane@example.com",
    "name": "Jane Doe"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Item ID (CUID2) |
| `householdId` | `string` | Parent household ID |
| `freezerId` | `string` | Freezer the item is stored in |
| `compartmentId` | `string` | Compartment within the freezer |
| `name` | `string` | Item name |
| `quantity` | `number` | Number of units |
| `notes` | `string \| null` | Optional notes |
| `storedAt` | `string \| null` | When the item was placed in the freezer |
| `expiresAt` | `string \| null` | Expiration date |
| `deletedAt` | `string \| null` | Soft-delete timestamp (null if active) |
| `createdAt` | `string` | Record creation timestamp |
| `updatedAt` | `string` | Last update timestamp |
| `createdBy` | `UserResponse` | User who created the item |
| `updatedBy` | `UserResponse` | User who last updated the item |

---

## POST /households/:hid/items

Create a new freezer item.

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
  "name": "Chicken breast",
  "quantity": 4,
  "freezerId": "clh5e6f7g0005qw08l2m3n4o5",
  "compartmentId": "clh6f7g8h0006qw08p3q4r5s6",
  "notes": "Bought from Costco",
  "storedAt": "2025-01-15T10:30:00.000Z",
  "expiresAt": "2025-07-15T00:00:00.000Z"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | Yes | Item name |
| `quantity` | `number` | Yes | Number of units |
| `freezerId` | `string` | Yes | Target freezer ID |
| `compartmentId` | `string` | Yes | Target compartment ID |
| `notes` | `string` | No | Optional notes |
| `storedAt` | `string` | No | ISO-8601 date when stored (defaults to now) |
| `expiresAt` | `string` | No | ISO-8601 expiration date |

### Response `201 Created`

Returns the full `FreezerItemResponse`.

### Example

```bash
curl -X POST http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "name": "Chicken breast",
    "quantity": 4,
    "freezerId": "clh5e6f7g0005qw08l2m3n4o5",
    "compartmentId": "clh6f7g8h0006qw08p3q4r5s6",
    "notes": "Bought from Costco",
    "expiresAt": "2025-07-15T00:00:00.000Z"
  }'
```

---

## GET /households/:hid/items

List active items with optional filtering and pagination.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Query parameters

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `freezerId` | `string` | -- | Filter by freezer |
| `compartmentIds[]` | `string[]` | -- | Filter by one or more compartments |
| `search` | `string` | -- | Full-text search on item name |
| `expiresBefore` | `string` | -- | ISO-8601 date; return items expiring before this date |
| `page` | `number` | `1` | Page number (1-indexed) |
| `limit` | `number` | `20` | Items per page |

### Response `200 OK`

Returns a `PaginatedResponse<FreezerItemResponse>`.

```json
{
  "data": [
    {
      "id": "clh7h9i0j0008qw08x5y6z7a8",
      "name": "Chicken breast",
      "quantity": 4,
      "freezerId": "clh5e6f7g0005qw08l2m3n4o5",
      "compartmentId": "clh6f7g8h0006qw08p3q4r5s6",
      "storedAt": "2025-01-15T10:30:00.000Z",
      "expiresAt": "2025-07-15T00:00:00.000Z",
      "deletedAt": null,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "createdBy": { "id": "clh2v3x0k0000qw08z1y9d3rk", "email": "jane@example.com", "name": "Jane Doe" },
      "updatedBy": { "id": "clh2v3x0k0000qw08z1y9d3rk", "email": "jane@example.com", "name": "Jane Doe" },
      "householdId": "clh3a1b2c0001qw08k5m7n9p0",
      "notes": "Bought from Costco"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

### Examples

```bash
# List all items (first page)
curl "http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items" \
  -H "Authorization: Bearer <accessToken>"

# Filter by freezer and search
curl "http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items?freezerId=clh5e6f7g0005qw08l2m3n4o5&search=chicken" \
  -H "Authorization: Bearer <accessToken>"

# Find items expiring before a date, page 2
curl "http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items?expiresBefore=2025-03-01T00:00:00.000Z&page=2&limit=10" \
  -H "Authorization: Bearer <accessToken>"

# Filter by multiple compartments
curl "http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items?compartmentIds[]=clh6f7g8h0006qw08p3q4r5s6&compartmentIds[]=clh6g8h9i0007qw08t4u5v6w7" \
  -H "Authorization: Bearer <accessToken>"
```

---

## GET /households/:hid/items/archive

List soft-deleted items (items with a non-null `deletedAt`).

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |

### Response `200 OK`

Returns an array of `FreezerItemResponse` where `deletedAt` is set.

```json
[
  {
    "id": "clh7h9i0j0008qw08x5y6z7a8",
    "name": "Expired salmon",
    "quantity": 1,
    "deletedAt": "2025-02-01T12:00:00.000Z",
    "..."
  }
]
```

### Example

```bash
curl http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items/archive \
  -H "Authorization: Bearer <accessToken>"
```

---

## GET /households/:hid/items/:iid

Get a single item by ID.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `iid` | `string` | Item ID (CUID2) |

### Response `200 OK`

Returns the full `FreezerItemResponse`.

### Example

```bash
curl http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items/clh7h9i0j0008qw08x5y6z7a8 \
  -H "Authorization: Bearer <accessToken>"
```

---

## PATCH /households/:hid/items/:iid

Update an item. Each changed field creates a change log entry (see [GET /:iid/history](#get-householdshiditemsiidhistory)).

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `iid` | `string` | Item ID (CUID2) |

### Request body

Any subset of the create-item fields:

```json
{
  "name": "Chicken thighs",
  "quantity": 6,
  "compartmentId": "clh6g8h9i0007qw08t4u5v6w7",
  "notes": "Moved to bottom drawer"
}
```

| Field | Type | Required |
|-------|------|----------|
| `name` | `string` | No |
| `quantity` | `number` | No |
| `freezerId` | `string` | No |
| `compartmentId` | `string` | No |
| `notes` | `string` | No |
| `storedAt` | `string` | No |
| `expiresAt` | `string` | No |

### Response `200 OK`

Returns the updated `FreezerItemResponse`.

### Example

```bash
curl -X PATCH http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items/clh7h9i0j0008qw08x5y6z7a8 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "quantity": 2,
    "notes": "Used 2 for dinner"
  }'
```

---

## DELETE /households/:hid/items/:iid

Soft-delete an item by setting `deletedAt` to the current timestamp. The item moves to the archive.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `iid` | `string` | Item ID (CUID2) |

### Response `200 OK`

```json
{
  "message": "Item archived successfully"
}
```

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items/clh7h9i0j0008qw08x5y6z7a8 \
  -H "Authorization: Bearer <accessToken>"
```

---

## DELETE /households/:hid/items/:iid/permanent

Permanently delete an item from the archive. The item must have been soft-deleted first.

| | |
|---|---|
| **Auth** | `HouseholdOwnerGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `iid` | `string` | Item ID (CUID2) |

### Response `200 OK`

```json
{
  "message": "Item permanently deleted"
}
```

### Errors

| Status | Reason |
|--------|--------|
| `400` | Item is not in the archive (must be soft-deleted first) |

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items/clh7h9i0j0008qw08x5y6z7a8/permanent \
  -H "Authorization: Bearer <accessToken>"
```

---

## GET /households/:hid/items/:iid/history

Retrieve the change log for an item. Each entry records a single field change with old and new values.

| | |
|---|---|
| **Auth** | `HouseholdMemberGuard` |
| **Rate limit** | 100 req/min |

### Path parameters

| Param | Type | Description |
|-------|------|-------------|
| `hid` | `string` | Household ID (CUID2) |
| `iid` | `string` | Item ID (CUID2) |

### Response `200 OK`

Returns an array of `ChangeLogEntryResponse`:

```json
[
  {
    "id": "clh8i0j1k0009qw08b6c7d8e9",
    "itemId": "clh7h9i0j0008qw08x5y6z7a8",
    "fieldName": "quantity",
    "oldValue": "4",
    "newValue": "2",
    "changedAt": "2025-01-20T14:00:00.000Z",
    "changedBy": {
      "id": "clh2v3x0k0000qw08z1y9d3rk",
      "email": "jane@example.com",
      "name": "Jane Doe"
    }
  },
  {
    "id": "clh8j1k2l0010qw08f7g8h9i0",
    "itemId": "clh7h9i0j0008qw08x5y6z7a8",
    "fieldName": "notes",
    "oldValue": "Bought from Costco",
    "newValue": "Used 2 for dinner",
    "changedAt": "2025-01-20T14:00:00.000Z",
    "changedBy": {
      "id": "clh2v3x0k0000qw08z1y9d3rk",
      "email": "jane@example.com",
      "name": "Jane Doe"
    }
  }
]
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Change log entry ID (CUID2) |
| `itemId` | `string` | Item that was changed |
| `fieldName` | `string` | Name of the changed field |
| `oldValue` | `string \| null` | Previous value (stringified) |
| `newValue` | `string \| null` | New value (stringified) |
| `changedAt` | `string` | ISO-8601 timestamp of the change |
| `changedBy` | `UserResponse` | User who made the change |

### Example

```bash
curl http://localhost:3000/api/v1/households/clh3a1b2c0001qw08k5m7n9p0/items/clh7h9i0j0008qw08x5y6z7a8/history \
  -H "Authorization: Bearer <accessToken>"
```
