/**
 * Unit tests for HouseholdMemberGuard and HouseholdOwnerGuard.
 *
 * Tests cover the authorization decision paths:
 * - Member access granted/denied
 * - Owner access granted/denied
 * - Missing userId or householdId
 *
 * Recommended integration tests (not implemented here):
 * - Guard + controller integration with real request pipeline
 * - Multiple guard composition (JwtAuthGuard + HouseholdGuard)
 *
 * Coverage target: 100% on guard classes
 */
import { type ExecutionContext, ForbiddenException } from '@nestjs/common';
import { HouseholdMemberGuard } from './household-member.guard';
import { HouseholdOwnerGuard } from './household-owner.guard';

function createMockContext(userId?: string, hid?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        user: userId ? { userId } : undefined,
        params: { hid },
      }),
    }),
  } as unknown as ExecutionContext;
}

describe('HouseholdMemberGuard', () => {
  let guard: HouseholdMemberGuard;
  const mockPrisma = {
    householdMember: { findUnique: jest.fn() },
  };

  beforeEach(() => {
    guard = new HouseholdMemberGuard(mockPrisma as any);
    jest.clearAllMocks();
  });

  it('should throw ForbiddenException when userId is missing', async () => {
    const ctx = createMockContext(undefined, 'hid-1');
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when householdId is missing', async () => {
    const ctx = createMockContext('user-1', undefined);
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when user is not a member', async () => {
    mockPrisma.householdMember.findUnique.mockResolvedValue(null);
    const ctx = createMockContext('user-1', 'hid-1');
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should allow access for a member', async () => {
    mockPrisma.householdMember.findUnique.mockResolvedValue({
      id: 'mem-1',
      role: 'MEMBER',
    });
    const ctx = createMockContext('user-1', 'hid-1');
    const result = await guard.canActivate(ctx);
    expect(result).toBe(true);
  });

  it('should allow access for an owner', async () => {
    mockPrisma.householdMember.findUnique.mockResolvedValue({
      id: 'mem-1',
      role: 'OWNER',
    });
    const ctx = createMockContext('user-1', 'hid-1');
    const result = await guard.canActivate(ctx);
    expect(result).toBe(true);
  });
});

describe('HouseholdOwnerGuard', () => {
  let guard: HouseholdOwnerGuard;
  const mockPrisma = {
    householdMember: { findUnique: jest.fn() },
  };

  beforeEach(() => {
    guard = new HouseholdOwnerGuard(mockPrisma as any);
    jest.clearAllMocks();
  });

  it('should throw ForbiddenException when user is a MEMBER (not OWNER)', async () => {
    mockPrisma.householdMember.findUnique.mockResolvedValue({
      id: 'mem-1',
      role: 'MEMBER',
    });
    const ctx = createMockContext('user-1', 'hid-1');
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException when user is not a member', async () => {
    mockPrisma.householdMember.findUnique.mockResolvedValue(null);
    const ctx = createMockContext('user-1', 'hid-1');
    await expect(guard.canActivate(ctx)).rejects.toThrow(ForbiddenException);
  });

  it('should allow access for an OWNER', async () => {
    mockPrisma.householdMember.findUnique.mockResolvedValue({
      id: 'mem-1',
      role: 'OWNER',
    });
    const ctx = createMockContext('user-1', 'hid-1');
    const result = await guard.canActivate(ctx);
    expect(result).toBe(true);
  });
});
