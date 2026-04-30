# Shared Package

The `packages/shared` workspace is the single source of truth for the API contract between the FreezerMan client and server. It ensures that no API type is ever defined twice, and that TypeScript catches any mismatch at compile time.

## Design Principle

> **No API type is ever defined twice.** The server defines the canonical shape via class-validator DTOs. The shared package re-exports the same fields as plain TypeScript interfaces. TypeScript surfaces any mismatch in the frontend at compile time.

This principle eliminates an entire class of bugs where the client and server disagree on the shape of a request or response. When a field is added, renamed, or removed on the server, the corresponding interface in `packages/shared` must be updated in the same commit. If it is not, the client build fails.

## Package Structure

```
packages/shared/
└── src/
    ├── dto/                Request DTO interfaces
    │   ├── auth.ts         RegisterDto, LoginDto, RefreshDto
    │   ├── households.ts   CreateHouseholdDto, UpdateHouseholdDto
    │   ├── freezers.ts     CreateFreezerDto, UpdateFreezerDto
    │   ├── compartments.ts CreateCompartmentDto, UpdateCompartmentDto
    │   ├── items.ts        CreateItemDto, UpdateItemDto
    │   └── invites.ts      CreateInviteDto, AcceptInviteDto
    ├── responses/          Response interfaces
    │   ├── auth.ts         TokenResponse
    │   ├── users.ts        UserResponse
    │   ├── households.ts   HouseholdResponse, HouseholdDetailResponse
    │   ├── freezers.ts     FreezerResponse
    │   ├── compartments.ts CompartmentResponse
    │   ├── items.ts        FreezerItemResponse, PaginatedResponse<T>
    │   ├── invites.ts      InviteResponse
    │   └── change-log.ts   ChangeLogEntryResponse
    ├── schemas/            Zod validation schemas
    │   ├── auth.ts         registerSchema, loginSchema
    │   ├── households.ts   createHouseholdSchema, updateHouseholdSchema
    │   ├── freezers.ts     createFreezerSchema, updateFreezerSchema
    │   ├── items.ts        createItemSchema, updateItemSchema
    │   └── invites.ts      acceptInviteSchema
    └── index.ts            Barrel exports
```

## Three Categories of Exports

### 1. Request DTO Interfaces

Plain TypeScript interfaces that mirror every NestJS DTO shape. These are used by the client to type API call payloads.

```typescript
// packages/shared/src/dto/items.ts

export interface CreateItemDto {
  name: string;
  quantity: string;
  freezerId: string;
  compartmentId: string;
  notes?: string;
  storedAt: string;       // ISO 8601 date string
  expiresAt?: string;     // ISO 8601 date string
}

export interface UpdateItemDto {
  name?: string;
  quantity?: string;
  freezerId?: string;
  compartmentId?: string;
  notes?: string;
  storedAt?: string;
  expiresAt?: string | null;
}
```

These interfaces intentionally use no decorators. They are plain types, consumable by any TypeScript code without importing NestJS or class-validator.

### 2. Response Interfaces

Plain TypeScript interfaces matching every controller's return shape. These type the data that TanStack Query caches and components consume.

```typescript
// packages/shared/src/responses/items.ts

export interface FreezerItemResponse {
  id: string;
  name: string;
  quantity: string;
  freezerId: string;
  compartmentId: string;
  notes: string | null;
  storedAt: string;
  expiresAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

### 3. Zod Schemas

Client-side validation schemas that mirror the DTO constraints. These are used by React Hook Form via `zodResolver` to validate form input before making API calls.

```typescript
// packages/shared/src/schemas/items.ts

import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  quantity: z.string().min(1, 'Quantity is required'),
  freezerId: z.string().cuid(),
  compartmentId: z.string().cuid(),
  notes: z.string().max(1000).optional(),
  storedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});
```

## Import Rules

The shared package enforces a strict separation between server and client dependencies:

| Consumer | Imports from shared | Never imports |
| --- | --- | --- |
| **Server** (`apps/server`) | Nothing directly — server defines its own class-validator DTOs that match the shared interfaces | Zod schemas (server uses class-validator) |
| **Client** (`apps/client`) | DTO interfaces, response interfaces, Zod schemas | class-validator, NestJS modules |

The server's class-validator DTOs and the shared package's plain interfaces describe the same shapes. TypeScript's structural type system ensures compatibility: if the server DTO adds a required field that the shared interface lacks, any code passing the shared interface where the DTO is expected will fail to compile.

## Workflow for API Changes

When modifying the API contract, follow this sequence:

1. **Update the server DTO** — Add, rename, or remove fields in the NestJS class-validator DTO.
2. **Update the shared interface** — Make the corresponding change in `packages/shared`. Both the request DTO interface and the response interface may need updating.
3. **Update the Zod schema** — If the change affects client-side validation, update the corresponding Zod schema.
4. **Build** — Run `bun run build` from the monorepo root. TypeScript will report any mismatches between the client's usage of the shared types and the updated interfaces.
5. **Fix client code** — Update any client components, forms, or API calls that reference the changed types.

This workflow ensures that API changes are always propagated end-to-end in a single commit, and that no stale types persist.
