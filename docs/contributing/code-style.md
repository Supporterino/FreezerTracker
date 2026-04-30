# Code Style

FreezerMan uses **Biome** as the sole linter and formatter. There is no ESLint or Prettier in this project -- Biome handles everything.

## Biome Configuration

Key settings applied across the monorepo:

| Setting | Value |
|---------|-------|
| Indent | 2 spaces |
| Line width | 100 |
| Quotes | Single quotes |
| Trailing commas | Always |
| Semicolons | Always |
| Recommended rules | Enabled |

### Per-Workspace Rule Overrides

Some rules are tuned per workspace to match framework requirements:

| Rule | Server | Client | Test files |
|------|--------|--------|------------|
| `noExplicitAny` | off | warn | off |
| `useImportType` | off | default | default |
| `noNonNullAssertion` | warn | warn | warn |
| `useExhaustiveDependencies` | warn | warn | warn |

> **Why is `useImportType` off for the server?** NestJS relies on runtime imports for dependency injection. Type-only imports break DI metadata emission, so the rule is disabled in `apps/server`.

### Running Biome Manually

```bash
# Check and auto-fix
bun run check

# CI mode -- no auto-fix, exits non-zero on errors
bun run ci:check

# Lint only
bun run lint

# Format only
bun run format
```

## Pre-Commit Hook (Lefthook)

A pre-commit hook is configured via **Lefthook**. It runs automatically after `bun install`.

What the hook does:

- Runs `biome check --write` on all staged `.ts`, `.tsx`, `.js`, `.jsx`, and `.json` files
- Auto-stages any files that Biome modified
- Runs checks in parallel for speed

If you need to reinstall the hook manually:

```bash
bun run lefthook install
```

> The hook ensures that every commit conforms to the project's style. You should rarely need to think about formatting.

## EditorConfig

The repository includes an `.editorconfig` file with the following settings:

- **Charset:** UTF-8
- **Line endings:** LF
- **Indent style:** Spaces (2)
- **Trim trailing whitespace:** Yes
- **Insert final newline:** Yes

Most editors pick this up automatically. If yours doesn't, install an EditorConfig plugin.

## TypeScript Conventions

- **Strict mode** is enabled everywhere (`strict: true` in all `tsconfig.json` files).
- **Path alias:** `@/` maps to `src/` in both the server and client. Use it for imports:

  ```typescript
  import { AuthService } from '@/auth/auth.service';
  ```

- **Server DTOs** use `class-validator` decorators for request validation:

  ```typescript
  import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

  export class RegisterDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
  }
  ```

- **Client validation** uses Zod schemas from `packages/shared` for form validation.

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files | kebab-case | `auth.service.ts`, `household-member.guard.ts` |
| Classes | PascalCase | `AuthService`, `HouseholdMemberGuard` |
| Functions / variables | camelCase | `validateUser`, `refreshToken` |
| Constants | camelCase | `defaultPageSize` (not `DEFAULT_PAGE_SIZE`) |
| Database models | PascalCase | `Household`, `FreezerItem` (Prisma convention) |
| API routes | kebab-case / lowercase | `/api/freezer-items`, `/api/auth/login` |
