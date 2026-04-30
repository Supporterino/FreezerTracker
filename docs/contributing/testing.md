# Testing

FreezerMan uses **Jest** with **ts-jest** for server-side testing. Tests are co-located with their source files using the `*.spec.ts` naming convention.

## Running Tests

From `apps/server`:

```bash
# Run all tests
bun run test

# Run with coverage report
bun run test -- --coverage

# Run a specific test file
bun run test -- auth.service.spec.ts
```

## Existing Test Coverage

The following test suites are currently in place:

### `auth.service.spec.ts` (9 tests)

Covers the `AuthService`:

- **validateUser** -- non-existent email, wrong password, valid credentials
- **register** -- duplicate email, successful registration
- **refresh** -- non-existent token, revoked token, expired token, deleted user, valid token rotation
- **logout** -- token revocation

### `items.service.spec.ts` (8 tests)

Covers the `ItemsService`:

- **create** -- freezer not found, compartment not found, success with change log entry
- **findOne** -- item not found, item found
- **softDelete** -- item not found, sets `deletedAt` timestamp
- **hardDelete** -- item not in archive, permanent deletion
- **findAll** -- filtering and pagination

### `household-member.guard.spec.ts` (8 tests)

Covers route guards:

- **HouseholdMemberGuard** -- no user on request, no `hid` route param, user is not a member, valid member
- **HouseholdOwnerGuard** -- member but not owner, valid owner

## Writing New Tests

### Mocking PrismaService

Create a mock factory for each Prisma model method your service uses:

```typescript
const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  refreshToken: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};
```

### Mocking ConfigService

For services that depend on JWT or other config values:

```typescript
const mockConfigService = {
  get: jest.fn((key: string) => {
    const config: Record<string, string> = {
      JWT_SECRET: 'test-secret',
      JWT_EXPIRATION: '15m',
      JWT_REFRESH_EXPIRATION: '7d',
    };
    return config[key];
  }),
};
```

### Test Module Setup

Use the NestJS `Test.createTestingModule` pattern:

```typescript
import { Test, TestingModule } from '@nestjs/testing';

let service: AuthService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AuthService,
      { provide: PrismaService, useValue: mockPrismaService },
      { provide: ConfigService, useValue: mockConfigService },
      { provide: JwtService, useValue: mockJwtService },
    ],
  }).compile();

  service = module.get<AuthService>(AuthService);
});
```

### Testing Guards

Mock the `ExecutionContext` to test `canActivate`:

```typescript
const mockExecutionContext = {
  switchToHttp: () => ({
    getRequest: () => ({
      user: { id: 'user-1' },
      params: { hid: 'household-1' },
    }),
  }),
};

it('should allow a valid member', async () => {
  mockPrismaService.householdMember.findUnique.mockResolvedValue({
    userId: 'user-1',
    householdId: 'household-1',
  });

  const result = await guard.canActivate(mockExecutionContext as any);
  expect(result).toBe(true);
});
```

### Best Practices

- **Test both success and error paths.** Every service method should have at least one test for the happy path and one for each expected failure mode.
- **Follow existing patterns.** Look at `auth.service.spec.ts` as the reference implementation for how tests are structured.
- **Keep mocks minimal.** Only mock what the test actually exercises.
- **Reset mocks between tests.** Use `jest.clearAllMocks()` in `beforeEach` or `afterEach`.

## Coverage Targets

| Layer | Target |
|-------|--------|
| Services | 80%+ |
| Guards | 100% |
| Controllers | 60%+ (integration-level) |

These are guidelines, not hard gates. Focus on meaningful coverage over hitting a number.

## Client Tests

Client-side tests (React / Tauri) are **not yet set up**. If you're interested in helping establish the client test infrastructure, open an issue to discuss the approach.
