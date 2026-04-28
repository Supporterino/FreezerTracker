# Freezer Tracker — Backend Detailed Creation Plan

## 0. Decisions Reference

| Topic | Decision |
|---|---|
| Runtime | Bun **1.3.13** (nest CLI for scaffolding, bun to run) |
| Language | TypeScript **6.0.3** strict mode |
| Framework | NestJS **11.x** with **Express** adapter |
| ORM | Prisma **7.8.0** |
| Database | PostgreSQL **17** |
| Primary keys | `cuid2` UUIDs via Prisma `@default(cuid())` |
| Auth | JWT access token (short-lived) + stateful refresh token with rotation |
| Validation | `class-validator` **0.15.1** + `class-transformer` **0.5.1** DTOs + global `ValidationPipe` |
| API docs | `@nestjs/swagger` **11.4.2** — Swagger UI at `/api/docs` (dev only) |
| HTTP server | Express (via `@nestjs/platform-express`) — simpler Swagger integration than Fastify |
| Invite codes | Single-use, time-limited tokens |
| Multi-household | Users can belong to many households |
| Owner deletion | Blocked if user owns any household |
| Rate limiting | None (deferred to reverse proxy) |

---

## 1. Repository & Project Bootstrapping

### 1.1 Monorepo root (`/`)

Create `package.json` as a **Bun workspace** root:

```json
{
  "name": "freezer-tracker",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev:server": "bun run --cwd apps/server dev",
    "dev:client": "bun run --cwd apps/client dev"
  }
}
```

Create `bunfig.toml` at root (empty is fine; ensures bun recognises the workspace).

Create `.gitignore` covering `node_modules`, `.env`, `dist`, `prisma/migrations` build artifacts.

### 1.2 Scaffold NestJS app

The scaffold command must be run from inside `apps/` so the project lands at `apps/server/`.
Always return to the monorepo root before running any `bun install`.

```bash
# Run from monorepo root
mkdir -p apps
cd apps
bunx @nestjs/cli new server --package-manager bun --skip-git
cd ..   # return to monorepo root before any bun install calls
```

Remove the generated `src/app.controller.ts`, `src/app.controller.spec.ts`, and `src/app.service.ts` — they are not needed.

Replace the generated `src/app.module.ts` with a clean root module that only imports feature modules.

### 1.3 `apps/server/package.json` additions

All package installation must be run from the **monorepo root**, never from inside `apps/server`
or `apps/client`. Bun workspaces resolve `packages/shared` as a local symlink only when
`bun install` is invoked at the root. Running it from a subdirectory will create a separate,
isolated `node_modules` and break cross-workspace imports.

Install these packages (run once from the monorepo root, then commit `bun.lockb`):

**Runtime dependencies** (pin to these versions):
- `@nestjs/common@11` `@nestjs/core@11` `@nestjs/platform-express@11` — use **Express** adapter (simpler Swagger integration)
- `@nestjs/config@4` — `.env` loading
- `@nestjs/jwt@11` — JWT utilities
- `@nestjs/passport@11` — passport integration
- `@nestjs/swagger@11` — OpenAPI (works natively with Express adapter)
- `@nestjs/throttler@6` — kept as dep even though not configured now, for easy future use
- `passport@0.7` `passport-jwt@4` `passport-local@1`
- `@prisma/client@7`
- `class-validator@0.15` `class-transformer@0.5`
- `bcrypt@6` — password hashing
- `@paralleldrive/cuid2@3` — ID generation (Prisma uses its own but useful for invite codes too)
- `qrcode@1` — generate QR data URI server-side for the invite endpoint
- `joi@17` — used by `ConfigModule` to validate env vars at startup

**Dev dependencies**:
- `prisma@7`
- `@types/bcrypt@6` `@types/passport-jwt@4` `@types/passport-local@1` `@types/qrcode@1` `@types/express@4`
- `@nestjs/cli@11`
- `ts-node@10` `typescript@6`

### 1.4 `apps/server/tsconfig.json`

Strict TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictPropertyInitialization": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "module": "commonjs",
    "target": "ES2022",
    "outDir": "dist",
    "baseUrl": ".",
    "paths": { "@freezer-tracker/shared": ["../../packages/shared/src/index.ts"] }
  }
}
```

The alias key **must match the package name** (`@freezer-tracker/shared`) so that imports in
service files compile correctly:

```typescript
// Example usage in a NestJS service
import type { FreezerItemResponse } from '@freezer-tracker/shared';
```

The server only imports plain TypeScript interfaces from shared — never Zod schemas.

### 1.5 Environment configuration

`apps/server/.env.example`:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/freezer_tracker
JWT_SECRET=change_me_access
JWT_REFRESH_SECRET=change_me_refresh
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
ALLOWED_ORIGINS=http://localhost:1420
NODE_ENV=development
APP_BASE_URL=http://localhost:3000
```

Use `@nestjs/config` with `ConfigModule.forRoot({ isGlobal: true })` to load all env vars at startup. Create a `config/` folder with a typed `configuration.ts` factory function and a `validation.schema.ts` using Joi to validate required env vars at startup — the app must refuse to start if any required variable is missing.

---

## 2. Prisma Schema (`apps/server/prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String
  createdAt    DateTime @default(now())

  memberships     HouseholdMember[]
  ownedHouseholds Household[]       @relation("HouseholdOwner")
  refreshTokens   RefreshToken[]
  createdItems    FreezerItem[]     @relation("CreatedItems")
  updatedItems    FreezerItem[]     @relation("UpdatedItems")
  changeLogs      ItemChangeLog[]
}

model RefreshToken {
  id        String    @id @default(cuid())
  token     String    @unique
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  revokedAt DateTime?
  createdAt DateTime  @default(now())
}

model Household {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  ownerId   String
  owner     User     @relation("HouseholdOwner", fields: [ownerId], references: [id])

  members  HouseholdMember[]
  freezers Freezer[]
  items    FreezerItem[]
  invites  HouseholdInvite[]
}

model HouseholdMember {
  id          String        @id @default(cuid())
  householdId String
  household   Household     @relation(fields: [householdId], references: [id], onDelete: Cascade)
  userId      String
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  role        HouseholdRole @default(MEMBER)
  joinedAt    DateTime      @default(now())

  @@unique([householdId, userId])
}

enum HouseholdRole {
  OWNER
  MEMBER
}

model HouseholdInvite {
  id           String    @id @default(cuid())
  householdId  String
  household    Household @relation(fields: [householdId], references: [id], onDelete: Cascade)
  code         String    @unique
  expiresAt    DateTime
  usedAt       DateTime?
  usedByUserId String?
  createdAt    DateTime  @default(now())
}

model Freezer {
  id          String    @id @default(cuid())
  householdId String
  household   Household @relation(fields: [householdId], references: [id], onDelete: Cascade)
  name        String
  description String?
  createdAt   DateTime  @default(now())

  compartments Compartment[]
  items        FreezerItem[]
}

model Compartment {
  id        String  @id @default(cuid())
  freezerId String
  freezer   Freezer @relation(fields: [freezerId], references: [id], onDelete: Cascade)
  name      String
  position  Int     @default(0)

  items FreezerItem[]
}

model FreezerItem {
  id            String      @id @default(cuid())
  householdId   String
  household     Household   @relation(fields: [householdId], references: [id], onDelete: Cascade)
  freezerId     String
  freezer       Freezer     @relation(fields: [freezerId], references: [id])
  compartmentId String
  compartment   Compartment @relation(fields: [compartmentId], references: [id])
  name          String
  quantity      String
  notes         String?
  storedAt      DateTime    @default(now())
  expiresAt     DateTime?
  deletedAt     DateTime?
  createdById   String
  createdBy     User        @relation("CreatedItems", fields: [createdById], references: [id])
  updatedById   String
  updatedBy     User        @relation("UpdatedItems", fields: [updatedById], references: [id])
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  changeLogs ItemChangeLog[]
}

model ItemChangeLog {
  id          String      @id @default(cuid())
  itemId      String
  item        FreezerItem @relation(fields: [itemId], references: [id], onDelete: Cascade)
  changedById String
  changedBy   User        @relation(fields: [changedById], references: [id])
  changedAt   DateTime    @default(now())
  fieldName   String
  oldValue    String?
  newValue    String?
}
```

After writing the schema, run from the `apps/server/` directory (where `prisma/schema.prisma` lives):

```bash
cd apps/server
bunx prisma migrate dev --name init
bunx prisma generate
cd ../..   # return to monorepo root
```

---

## 3. Module Structure & File Map

Every module follows NestJS conventions: `module` / `controller` / `service` / `dto/` / `guards/` (where needed).

```
apps/server/src/
├── main.ts
├── app.module.ts
├── config/
│   ├── configuration.ts     ← typed factory: () => ({ jwt: { secret, expiresIn }, ... })
│   └── validation.schema.ts ← Joi schema validating all required env vars at startup
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── local-auth.guard.ts
│   └── dto/
│       ├── register.dto.ts
│       └── login.dto.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│       └── update-user.dto.ts
├── households/
│   ├── households.module.ts
│   ├── households.controller.ts
│   ├── households.service.ts
│   ├── guards/
│   │   ├── household-member.guard.ts
│   │   └── household-owner.guard.ts
│   └── dto/
│       ├── create-household.dto.ts
│       └── update-household.dto.ts
├── invites/
│   ├── invites.module.ts
│   ├── invites.controller.ts
│   ├── invites.service.ts
│   └── dto/
│       └── accept-invite.dto.ts
├── freezers/
│   ├── freezers.module.ts
│   ├── freezers.controller.ts
│   ├── freezers.service.ts
│   └── dto/
│       ├── create-freezer.dto.ts
│       └── update-freezer.dto.ts
├── compartments/
│   ├── compartments.module.ts
│   ├── compartments.controller.ts
│   ├── compartments.service.ts
│   └── dto/
│       ├── create-compartment.dto.ts
│       └── update-compartment.dto.ts
├── items/
│   ├── items.module.ts
│   ├── items.controller.ts
│   ├── items.service.ts   ← handles diffing + calls ChangeLogService directly (no interceptor needed)
│   └── dto/
│       ├── create-item.dto.ts
│       ├── update-item.dto.ts
│       └── item-query.dto.ts
└── change-log/
    ├── change-log.module.ts
    ├── change-log.service.ts
    └── (no controller — accessed via items module)
```

---

## 4. `main.ts` Bootstrap

Uses the default Express adapter — no adapter import needed, `NestFactory.create()` defaults to Express.

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS — restrict to ALLOWED_ORIGINS from env
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(','),
  });

  // Swagger (dev only)
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Freezer Tracker API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
```

---

## 5. Prisma Module

`PrismaService` extends `PrismaClient`, connects `onModuleInit`, and disconnects `onModuleDestroy`. Exported from `PrismaModule` as `@Global()` so it does not need re-importing in every feature module.

---

## 6. Auth Module — Full Detail

### 6.1 `RegisterDto`

Fields: `email` (IsEmail), `password` (MinLength 8), `name` (IsString, MinLength 2).

### 6.2 `LoginDto`

Fields: `email` (IsEmail), `password` (IsString).

### 6.3 `LocalStrategy`

Calls `authService.validateUser(email, password)`. Compares with `bcrypt.compare`. Returns the user object (without `passwordHash`) or throws `UnauthorizedException`.

### 6.4 `JwtStrategy`

Validates `Bearer` token from `Authorization` header. Payload shape: `{ sub: userId, email }`. Returns `{ userId, email }` attached to `req.user`.

### 6.5 `AuthService`

- `register(dto)` — check email uniqueness, hash password with `bcrypt` (cost 12), create `User`. Return token pair.
- `login(user)` — issue token pair.
- `refresh(token)` — look up `RefreshToken` record by token, verify not revoked and not expired, issue new token pair, **revoke old token** (set `revokedAt = now`), save new token. Return new pair.
- `logout(token)` — find and revoke the specific refresh token by setting `revokedAt = now`.
- `issueTokens(userId, email)` — private helper that signs access JWT + refresh JWT, stores the raw refresh token in DB with `expiresAt`, returns both tokens.

### 6.6 `AuthController` (`/api/v1/auth`)

| Method | Path | Guard | Description |
|---|---|---|---|
| POST | `/register` | none | Register new user |
| POST | `/login` | `LocalAuthGuard` | Login, receive token pair |
| POST | `/refresh` | none | Body: `{ refreshToken }` → new pair |
| POST | `/logout` | `JwtAuthGuard` | Body: `{ refreshToken }` → revoke |

---

## 7. Users Module

### `UsersController` (`/api/v1/users`)

| Method | Path | Guard | Description |
|---|---|---|---|
| GET | `/me` | `JwtAuthGuard` | Return current user profile |
| PATCH | `/me` | `JwtAuthGuard` | Update name (email change out of scope) |
| DELETE | `/me` | `JwtAuthGuard` | Delete account (blocked if user owns any household) |

`UsersService.deleteMe(userId)` — first checks `Household.count({ where: { ownerId: userId } })`. If > 0, throw `ConflictException('Transfer or delete your households first')`.

---

## 8. Households Module

### Guards

- `HouseholdMemberGuard` — reads `householdId` from `req.params`, checks `HouseholdMember` record exists for the current user. Throws `ForbiddenException` if not a member.
- `HouseholdOwnerGuard` — same check but also requires `role === 'OWNER'`.

Both guards extend `CanActivate` and inject `PrismaService`.

### `HouseholdsController` (`/api/v1/households`)

| Method | Path | Guards | Description |
|---|---|---|---|
| POST | `/` | `JwtAuthGuard` | Create household; creator becomes OWNER |
| GET | `/` | `JwtAuthGuard` | List all households the current user belongs to |
| GET | `/:hid` | `JwtAuthGuard`, `HouseholdMemberGuard` | Get household detail + member list |
| PATCH | `/:hid` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Update name |
| DELETE | `/:hid` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Delete household and all related data (cascade) |
| DELETE | `/:hid/members/:uid` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Remove a member (owner cannot remove themselves) |
| PATCH | `/:hid/transfer` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Transfer ownership to another member |

`HouseholdsService.create(userId, dto)` — creates `Household` and simultaneously creates a `HouseholdMember` record with `role: OWNER` in a single Prisma transaction.

---

## 9. Invites Module

### `InvitesController` (`/api/v1/households/:hid/invites`)

| Method | Path | Guards | Description |
|---|---|---|---|
| POST | `/` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Generate invite code + QR |
| GET | `/` | `JwtAuthGuard`, `HouseholdOwnerGuard` | List active (unused, non-expired) invites |
| DELETE | `/:inviteId` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Revoke invite (hard delete) |
| POST | `/accept` | `JwtAuthGuard` | Body: `{ code }` — join household |

### `InvitesService`

- `create(householdId, ownerId)`:
  1. Generate a cryptographically random code using `crypto.randomBytes(32).toString('hex')`
  2. Set `expiresAt = now + 7 days`
  3. Save `HouseholdInvite` row
  4. Build join URL: `${APP_BASE_URL}/join?code=${code}`
  5. Generate QR data URI using `qrcode.toDataURL(url)`
  6. Return `{ code, qrDataUri, expiresAt }`

- `accept(userId, code)`:
  1. Find `HouseholdInvite` by code
  2. Validate: exists, `usedAt` is null, `expiresAt` > now — throw `BadRequestException` if any check fails
  3. Check user is not already a member — throw `ConflictException` if already joined
  4. Create `HouseholdMember` record with `role: MEMBER`
  5. Mark invite as used: set `usedAt = now`, `usedByUserId = userId`
  6. Steps 4 and 5 run in a single Prisma transaction
  7. Return household info

---

## 10. Freezers Module

### `FreezersController` (`/api/v1/households/:hid/freezers`)

| Method | Path | Guards | Description |
|---|---|---|---|
| POST | `/` | `JwtAuthGuard`, `HouseholdMemberGuard` | Create freezer |
| GET | `/` | `JwtAuthGuard`, `HouseholdMemberGuard` | List freezers |
| GET | `/:fid` | `JwtAuthGuard`, `HouseholdMemberGuard` | Get freezer with compartments |
| PATCH | `/:fid` | `JwtAuthGuard`, `HouseholdMemberGuard` | Update name/description |
| DELETE | `/:fid` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Delete freezer (cascade compartments + items) |

Service validates that the freezer belongs to the given household on every operation — throw `NotFoundException` if the freezer does not exist or does not belong to the household.

---

## 11. Compartments Module

### `CompartmentsController` (`/api/v1/households/:hid/freezers/:fid/compartments`)

| Method | Path | Guards | Description |
|---|---|---|---|
| POST | `/` | `JwtAuthGuard`, `HouseholdMemberGuard` | Add compartment |
| GET | `/` | `JwtAuthGuard`, `HouseholdMemberGuard` | List compartments (ordered by `position` ASC) |
| PATCH | `/:cid` | `JwtAuthGuard`, `HouseholdMemberGuard` | Update name or reorder (`position`) |
| DELETE | `/:cid` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Delete — blocked if compartment has active (non-deleted) items; throw `ConflictException` |

Service validates that `compartmentId` belongs to `freezerId` which belongs to `householdId` — throw `NotFoundException` if the chain is broken.

---

## 12. Items Module

### `ItemsController` (`/api/v1/households/:hid/items`)

| Method | Path | Guards | Description |
|---|---|---|---|
| POST | `/` | `JwtAuthGuard`, `HouseholdMemberGuard` | Create item |
| GET | `/` | `JwtAuthGuard`, `HouseholdMemberGuard` | List active items with optional filters |
| GET | `/archive` | `JwtAuthGuard`, `HouseholdMemberGuard` | List soft-deleted items |
| GET | `/:iid` | `JwtAuthGuard`, `HouseholdMemberGuard` | Get single active item |
| PATCH | `/:iid` | `JwtAuthGuard`, `HouseholdMemberGuard` | Update item (triggers change log) |
| DELETE | `/:iid` | `JwtAuthGuard`, `HouseholdMemberGuard` | Soft-delete (sets `deletedAt = now`) |
| DELETE | `/:iid/permanent` | `JwtAuthGuard`, `HouseholdOwnerGuard` | Hard-delete from archive (only already soft-deleted items) |
| GET | `/:iid/history` | `JwtAuthGuard`, `HouseholdMemberGuard` | Full change log for item ordered by `changedAt DESC` |

### Query parameters for `GET /items`

`ItemQueryDto` fields (all optional, validated with class-validator):

| Field | Type | Description |
|---|---|---|
| `freezerId` | string | Filter by freezer |
| `compartmentId` | string | Filter by compartment |
| `search` | string | Case-insensitive name search (`contains`, `mode: insensitive`) |
| `expiresBefore` | ISO date string | Items expiring before this date |
| `page` | number (min 1, default 1) | Pagination page |
| `limit` | number (min 1, max 100, default 20) | Items per page |

### `CreateItemDto`

| Field | Validation |
|---|---|
| `name` | `IsString`, `MinLength(1)` |
| `quantity` | `IsString`, `MinLength(1)` |
| `freezerId` | `IsString` |
| `compartmentId` | `IsString` |
| `notes` | `IsOptional`, `IsString` |
| `storedAt` | `IsOptional`, `IsDateString` |
| `expiresAt` | `IsOptional`, `IsDateString` |

### `UpdateItemDto`

Use NestJS `PartialType(CreateItemDto)` — all fields from `CreateItemDto` become optional.

### `ItemsService.create(userId, householdId, dto)`

1. Verify `freezerId` belongs to `householdId` — throw `NotFoundException` if not
2. Verify `compartmentId` belongs to `freezerId` — throw `NotFoundException` if not
3. Create `FreezerItem` with `createdById = userId`, `updatedById = userId`
4. Write a single `ItemChangeLog` entry with `fieldName = 'created'`, `oldValue = null`, `newValue = item.name`

### `ItemsService.update(userId, householdId, itemId, dto)`

1. Fetch current item (must be active — `deletedAt` is null — and belong to `householdId`)
2. If `freezerId` or `compartmentId` are being changed, validate the new IDs belong to the household/freezer chain
3. Execute Prisma update (set `updatedById = userId`; `updatedAt` auto-updates via `@updatedAt`)
4. Diff old vs new values for tracked fields: `name`, `quantity`, `compartmentId`, `freezerId`, `notes`, `expiresAt`
5. Call `ChangeLogService.recordChanges(itemId, userId, diffs)`
6. Steps 3 and 5 run in a **single Prisma transaction**

### Tracked fields for change log

Only log a field if its value actually changed (strict equality check before writing):

| Field | Stored as |
|---|---|
| `name` | string |
| `quantity` | string |
| `notes` | string or null |
| `freezerId` | string (ID) |
| `compartmentId` | string (ID) |
| `expiresAt` | ISO string or null |

---

## 13. Change-Log Module

### `ChangeLogService`

- `recordChanges(itemId: string, userId: string, diffs: Array<{ fieldName: string, oldValue: string | null, newValue: string | null }>)` — bulk-inserts `ItemChangeLog` rows using `prisma.itemChangeLog.createMany`
- `getHistory(itemId: string, householdId: string)` — validates the item belongs to the household, then returns all log entries ordered by `changedAt DESC`, including `changedBy { id, name }` via Prisma `include`

This service is imported by `ItemsModule` only. No dedicated controller — history is accessed via `GET /households/:hid/items/:iid/history`.

---

## 14. Shared Package (`packages/shared`)

`packages/shared` is the **single source of truth for the API contract** between server and
client. It must be written and kept in sync whenever backend DTOs or response shapes change.
TypeScript path aliases in both `apps/server` and `apps/client` point to this package so that
any type mismatch surfaces at compile time in both apps simultaneously.

The server imports **only plain TS interfaces** from shared (for typing service return values).
It never imports Zod from shared. The client imports both interfaces and Zod schemas.

### `packages/shared/package.json`

```json
{
  "name": "@freezer-tracker/shared",
  "version": "0.0.1",
  "main": "src/index.ts"
}
```

### `packages/shared/src/index.ts` — full export surface

#### 1. Request DTO interfaces (plain TypeScript, no class-validator decorators)

These mirror the NestJS DTOs field-for-field. The client uses them to type API call payloads.
The server's class-validator DTOs are the canonical definition; these interfaces must stay
in sync with them.

| Interface | Fields |
|---|---|
| `RegisterDto` | `email: string`, `password: string`, `name: string` |
| `LoginDto` | `email: string`, `password: string` |
| `RefreshDto` | `refreshToken: string` |
| `CreateHouseholdDto` | `name: string` |
| `UpdateHouseholdDto` | `name?: string` |
| `TransferOwnershipDto` | `newOwnerId: string` |
| `AcceptInviteDto` | `code: string` |
| `CreateFreezerDto` | `name: string`, `description?: string` |
| `UpdateFreezerDto` | `name?: string`, `description?: string` |
| `CreateCompartmentDto` | `name: string`, `position?: number` |
| `UpdateCompartmentDto` | `name?: string`, `position?: number` |
| `CreateItemDto` | `name: string`, `quantity: string`, `freezerId: string`, `compartmentId: string`, `notes?: string`, `storedAt?: string`, `expiresAt?: string` |
| `UpdateItemDto` | all fields from `CreateItemDto` as optional |
| `UpdateUserDto` | `name?: string` |
| `ItemQueryDto` | `freezerId?: string`, `compartmentId?: string`, `search?: string`, `expiresBefore?: string`, `page?: number`, `limit?: number` |

#### 2. Response interfaces (plain TypeScript)

These match every controller's return shape exactly.

- `TokenResponse` — `{ accessToken: string, refreshToken: string }`
- `UserResponse` — `{ id: string, email: string, name: string, createdAt: string }`
- `HouseholdResponse` — `{ id: string, name: string, ownerId: string, createdAt: string }`
- `MemberResponse` — `{ id: string, userId: string, name: string, email: string, role: 'OWNER' | 'MEMBER', joinedAt: string }`
- `HouseholdDetailResponse` — extends `HouseholdResponse` with `members: MemberResponse[]`
- `InviteResponse` — `{ id: string, code: string, qrDataUri: string, expiresAt: string }`
- `FreezerResponse` — `{ id: string, householdId: string, name: string, description: string | null, createdAt: string }`
- `CompartmentResponse` — `{ id: string, freezerId: string, name: string, position: number }`
- `FreezerDetailResponse` — extends `FreezerResponse` with `compartments: CompartmentResponse[]`
- `FreezerItemResponse` — `{ id, householdId, freezerId, compartmentId, name, quantity, notes: string | null, storedAt, expiresAt: string | null, deletedAt: string | null, createdAt, updatedAt, createdBy: UserResponse, updatedBy: UserResponse }`
- `ChangeLogEntryResponse` — `{ id: string, itemId: string, fieldName: string, oldValue: string | null, newValue: string | null, changedAt: string, changedBy: UserResponse }`
- `PaginatedResponse<T>` — `{ data: T[], total: number, page: number, limit: number }`

#### 3. Zod schemas (client-side validation only — server never imports these)

Each schema mirrors the corresponding request DTO interface. Used with `zodResolver` in
React Hook Form. The schema must enforce the same constraints as the class-validator DTO
(e.g. `password: z.string().min(8)`, `email: z.string().email()`).

- `registerSchema` → validates `RegisterDto`
- `loginSchema` → validates `LoginDto`
- `createHouseholdSchema`, `updateHouseholdSchema`
- `acceptInviteSchema`
- `createFreezerSchema`, `updateFreezerSchema`
- `createCompartmentSchema`, `updateCompartmentSchema`
- `createItemSchema`, `updateItemSchema`
- `updateUserSchema`

#### Rule: keep shared in sync with DTOs

Whenever a field is added, removed, or renamed in a NestJS DTO (`apps/server/src/*/dto/*.ts`),
the corresponding interface and Zod schema in `packages/shared/src/index.ts` **must be updated
in the same commit**. Failure to do so will produce TypeScript errors in the frontend at the
next `bun run typecheck`.

---

## 15. Docker Compose (`docker-compose.yml` at monorepo root)

```yaml
version: '3.9'
services:
  db:
    image: postgres:17-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: freezer_tracker
    volumes:
      - pg_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    # Healthcheck so dependent services wait until Postgres is accepting connections,
    # not just until the container has started.
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d freezer_tracker"]
      interval: 5s
      timeout: 5s
      retries: 10

  server:
    build:
      context: .                        # monorepo root — gives Docker access to packages/shared
      dockerfile: apps/server/Dockerfile
    restart: unless-stopped
    depends_on:
      db:
        condition: service_healthy      # wait for Postgres to be ready, not just started
    env_file:
      - apps/server/.env
    ports:
      - "3000:3000"

volumes:
  pg_data:
```

### `apps/server/Dockerfile`

The Docker build context must be the **monorepo root** (not `apps/server`) so that
`packages/shared` and the root `bun.lockb` are available inside the image.
The `docker-compose.yml` already sets `context: .` (monorepo root) to achieve this.

```dockerfile
FROM oven/bun:1.3.13 AS base
WORKDIR /app

# Copy monorepo workspace manifests and lockfile first (layer caching)
COPY package.json bunfig.toml bun.lockb ./
COPY packages/shared/package.json ./packages/shared/package.json
COPY apps/server/package.json ./apps/server/package.json

# Install all workspace dependencies from the monorepo root
RUN bun install --frozen-lockfile

# Copy shared package source (required by apps/server at runtime)
COPY packages/shared/ ./packages/shared/

# Copy server source
COPY apps/server/ ./apps/server/

WORKDIR /app/apps/server
RUN bunx prisma generate

# Run migrations then start the server.
# 'prisma migrate deploy' applies any pending migrations against the live DB at startup.
# It is idempotent and safe to run on every container start.
CMD ["sh", "-c", "bunx prisma migrate deploy && bun run src/main.ts"]
```

---

## 16. Implementation Order for an AI Agent

Execute in this exact sequence — each step depends on the previous.

> **Cross-agent dependency:** If a separate agent is building the frontend in parallel, it
> depends on `packages/shared` being complete before it can implement API hooks and form
> validation. Steps 1–2 (monorepo root + shared stub) and step 18 (fill shared fully) are
> the synchronisation points. The frontend agent must not begin step 5 of its own plan until
> `packages/shared/src/index.ts` contains all interfaces and Zod schemas defined in §14 of
> this document.

1. **Root monorepo** — `package.json`, `bunfig.toml`, `.gitignore`
2. **`packages/shared`** — stub `index.ts`, `package.json`
3. **Scaffold NestJS** — `apps/server` via nest CLI, remove generated boilerplate files
4. **Install all dependencies** — one `bun install` pass at the monorepo root
5. **`tsconfig.json`** + **`.env.example`** + **`ConfigModule` setup** with Joi validation schema
6. **`PrismaModule` + `PrismaService`** — write and wire up as global module
7. **Prisma schema** — write full schema; run `prisma migrate dev --name init` and `prisma generate` from inside `apps/server/`
8. **`AuthModule`** — strategies, guards, service, controller (register + login + refresh + logout)
9. **`UsersModule`** — `/me` endpoints including delete guard
10. **`HouseholdsModule`** — guards (`HouseholdMemberGuard`, `HouseholdOwnerGuard`), service, controller
11. **`InvitesModule`** — generate + accept flow including QR data URI
12. **`FreezersModule`** — CRUD with household ownership validation
13. **`CompartmentsModule`** — CRUD with position ordering and deletion guard
14. **`ChangeLogModule`** — service only (`recordChanges`, `getHistory`)
15. **`ItemsModule`** — CRUD, soft-delete, query filters, history endpoint; integrate `ChangeLogService`; transactional update + diff
16. **`app.module.ts` + `main.ts`** — Wire all feature modules into `AppModule` imports array (`PrismaModule`, `AuthModule`, `UsersModule`, `HouseholdsModule`, `InvitesModule`, `FreezersModule`, `CompartmentsModule`, `ItemsModule`, `ChangeLogModule`). Then write `main.ts`: Express bootstrap, global `ValidationPipe`, CORS, Swagger (dev only).
17. **Swagger decorators** — add `@ApiTags`, `@ApiOperation`, `@ApiBearerAuth`, `@ApiResponse` to all controllers and DTOs
18. **Shared types** — fill `packages/shared/src/index.ts` with all request DTO interfaces, response interfaces, and Zod schemas as specified in §14. This step unblocks the frontend agent.
19. **`docker-compose.yml`** + **`apps/server/Dockerfile`**
20. **Smoke test** — `docker compose up -d` (migrations run automatically on container start via the Dockerfile `CMD`); verify `GET http://localhost:3000/api/docs` returns Swagger UI; test register → login → create household → generate invite flow end-to-end
