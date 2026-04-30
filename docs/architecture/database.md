# Data Model

FreezerMan uses PostgreSQL 17 as its database, accessed through Prisma 7 ORM with the PrismaPg adapter. The schema consists of 9 models that support multi-household freezer management with full change tracking.

## Entity-Relationship Diagram

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     │ 1:N
     ▼
┌──────────────┐        ┌─────────────────┐
│ RefreshToken  │        │ HouseholdInvite │
└──────────────┘        └────────┬────────┘
                                 │ N:1
     ┌───────────────────────────┘
     │
     ▼
┌──────────────┐    1:N    ┌───────────────────┐
│  Household   │──────────>│ HouseholdMember   │
└──────┬───────┘           │ (User + Role)     │
       │                   └───────────────────┘
       │ 1:N
       ├──────────────────────────────┐
       │                              │
       ▼                              ▼
┌──────────────┐    1:N    ┌─────────────────┐    1:N    ┌────────────────┐
│   Freezer    │──────────>│  Compartment    │           │  FreezerItem   │
└──────────────┘           └─────────────────┘           └───────┬────────┘
                                                                 │ 1:N
                                                                 ▼
                                                         ┌────────────────┐
                                                         │ ItemChangeLog  │
                                                         └────────────────┘
```

## Models

### User

Represents a registered user account.

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `email` | String | Unique |
| `passwordHash` | String | bcrypt hash |
| `name` | String | Display name |
| `createdAt` | DateTime | Auto-set on creation |
| `updatedAt` | DateTime | Auto-updated |

### RefreshToken

Stores issued refresh tokens for JWT rotation. Revoking a token sets `revokedAt`.

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `token` | String | Unique, the token value |
| `expiresAt` | DateTime | Expiration timestamp |
| `revokedAt` | DateTime? | Nullable; set when token is revoked |
| `userId` | String | FK to `User` (cascade delete) |

### Household

A household groups users, freezers, and items under one organizational unit.

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `name` | String | Household display name |
| `ownerId` | String | FK to `User` (restrict delete) |
| `createdAt` | DateTime | Auto-set on creation |
| `updatedAt` | DateTime | Auto-updated |

### HouseholdMember

Join table linking users to households with a role assignment.

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `householdId` | String | FK to `Household` (cascade delete) |
| `userId` | String | FK to `User` (cascade delete) |
| `role` | Enum | `OWNER` or `MEMBER` |
| `joinedAt` | DateTime | Auto-set on creation |

**Unique constraint:** `(householdId, userId)` — a user can only be a member of a household once.

### HouseholdInvite

Short-lived invite codes for joining a household. Each code can be used at most once.

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `householdId` | String | FK to `Household` (cascade delete) |
| `code` | String | Unique invite code |
| `expiresAt` | DateTime | Code expiration |
| `usedAt` | DateTime? | Nullable; set when code is consumed |
| `usedByUserId` | String? | FK to `User` (nullable); who used the code |

### Freezer

A physical freezer belonging to a household.

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `householdId` | String | FK to `Household` (cascade delete) |
| `name` | String | Freezer display name |
| `description` | String? | Nullable; optional notes |
| `createdAt` | DateTime | Auto-set on creation |
| `updatedAt` | DateTime | Auto-updated |

### Compartment

A named section within a freezer (e.g., "Top Shelf", "Drawer 1").

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `freezerId` | String | FK to `Freezer` (cascade delete) |
| `name` | String | Compartment display name |
| `position` | Int | Ordering index within the freezer |
| `createdAt` | DateTime | Auto-set on creation |

### FreezerItem

An item stored in a freezer compartment. Supports soft-delete via the `deletedAt` field.

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `householdId` | String | FK to `Household` (cascade delete) |
| `freezerId` | String | FK to `Freezer` (restrict delete) |
| `compartmentId` | String | FK to `Compartment` (restrict delete) |
| `name` | String | Item name |
| `quantity` | String | Free-text quantity (e.g., "2 bags", "500g") |
| `notes` | String? | Nullable; optional notes |
| `storedAt` | DateTime | When the item was placed in the freezer |
| `expiresAt` | DateTime? | Nullable; optional expiry date |
| `deletedAt` | DateTime? | Nullable; soft-delete timestamp |
| `createdAt` | DateTime | Auto-set on creation |
| `updatedAt` | DateTime | Auto-updated |
| `createdById` | String | FK to `User` (who created the item) |
| `updatedById` | String | FK to `User` (who last updated the item) |

### ItemChangeLog

Records individual field changes for audit and history purposes.

| Field | Type | Constraints |
| --- | --- | --- |
| `id` | String (CUID) | Primary key |
| `itemId` | String | FK to `FreezerItem` (cascade delete) |
| `changedById` | String | FK to `User` (who made the change) |
| `fieldName` | String | Name of the changed field |
| `oldValue` | String? | Nullable; previous value (null for initial creation) |
| `newValue` | String? | Nullable; new value (null if field was cleared) |
| `changedAt` | DateTime | When the change occurred |

## Referential Integrity

The schema enforces two categories of foreign key behavior depending on the relationship:

### Cascade Deletes

When a parent record is deleted, all dependent records are automatically removed:

- **Household** deletion cascades to: `HouseholdMember`, `Freezer`, `FreezerItem`, `HouseholdInvite`
- **Freezer** deletion cascades to: `Compartment`
- **FreezerItem** deletion cascades to: `ItemChangeLog`
- **User** deletion cascades to: `RefreshToken`, `HouseholdMember`

### Restrict Deletes

These foreign keys prevent deletion of a parent when children exist, protecting against accidental data loss:

- **FreezerItem** restricts deletion of its `Freezer` — you cannot delete a freezer that still contains items
- **FreezerItem** restricts deletion of its `Compartment` — you cannot delete a compartment that still contains items
- **Household** restricts deletion of its owner `User` — you cannot delete a user who owns a household

### Soft-Delete

`FreezerItem` uses a `deletedAt` nullable timestamp for soft-delete instead of physical row deletion. This enables:

- An archive view where users can browse and restore deleted items
- Preservation of the complete change-log history for deleted items
- Protection against accidental permanent data loss

All item queries filter on `deletedAt IS NULL` by default. The archive view explicitly queries for items where `deletedAt IS NOT NULL`.

## Indexing

Prisma automatically creates indexes for:

- All primary keys (`id` fields)
- All unique constraints (`email`, `token`, `code`, `householdId + userId`)
- All foreign key columns

Additional indexes may be added as query patterns are profiled in production use.
