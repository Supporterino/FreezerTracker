/**
 * Unit tests for AuthService.
 *
 * Tests cover the critical authentication paths:
 * - Registration (happy path, duplicate email)
 * - User validation (valid credentials, wrong password, non-existent user)
 * - Token refresh (valid, expired, revoked, deleted user)
 * - Logout (token revocation)
 *
 * Recommended integration tests (not implemented here):
 * - Full auth flow: register -> login -> refresh -> logout
 * - Concurrent refresh token rotation (race condition)
 * - Token expiry enforcement end-to-end
 *
 * Coverage target: 90%+ on AuthService
 */
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

// Mock PrismaService
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  refreshToken: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
  },
};

// Mock ConfigService
const mockConfig = {
  get: jest.fn((key: string) => {
    const config: Record<string, string> = {
      'jwt.secret': 'test-secret',
      'jwt.refreshSecret': 'test-refresh-secret',
      'jwt.accessExpiresIn': '15m',
      'jwt.refreshExpiresIn': '30d',
    };
    return config[key];
  }),
};

// Mock JwtService
const mockJwt = {
  sign: jest.fn().mockReturnValue('mock-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'PrismaService', useValue: mockPrisma },
        { provide: ConfigService, useValue: mockConfig },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    // Replace the private prisma property
    (service as any).prisma = mockPrisma;

    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return null for non-existent email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      const result = await service.validateUser('no@email.com', 'password');
      expect(result).toBeNull();
    });

    it('should return null for wrong password', async () => {
      const hash = await bcrypt.hash('correct', 12);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        passwordHash: hash,
        name: 'Test',
      });
      const result = await service.validateUser('test@test.com', 'wrong');
      expect(result).toBeNull();
    });

    it('should return user (without passwordHash) for valid credentials', async () => {
      const hash = await bcrypt.hash('correct', 12);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        passwordHash: hash,
        name: 'Test',
      });
      const result = await service.validateUser('test@test.com', 'correct');
      expect(result).toEqual({ id: '1', email: 'test@test.com', name: 'Test' });
      expect(result).not.toHaveProperty('passwordHash');
    });
  });

  describe('register', () => {
    it('should throw ConflictException for duplicate email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: '1' });
      await expect(
        service.register({ email: 'dup@test.com', password: 'password123', name: 'Test' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create user and return tokens for new email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: 'new-id',
        email: 'new@test.com',
        name: 'New User',
      });
      mockPrisma.refreshToken.create.mockResolvedValue({});

      const result = await service.register({
        email: 'new@test.com',
        password: 'password123',
        name: 'New User',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(mockPrisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'new@test.com',
            name: 'New User',
          }),
        }),
      );
    });
  });

  describe('refresh', () => {
    it('should throw UnauthorizedException for non-existent token', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(null);
      await expect(service.refresh('bad-token')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for revoked token', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        revokedAt: new Date(),
        expiresAt: new Date(Date.now() + 86400000),
      });
      await expect(service.refresh('revoked-token')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for expired token', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        revokedAt: null,
        expiresAt: new Date(Date.now() - 86400000),
      });
      await expect(service.refresh('expired-token')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user is deleted', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        revokedAt: null,
        expiresAt: new Date(Date.now() + 86400000),
        userId: 'deleted-user',
      });
      mockPrisma.refreshToken.update.mockResolvedValue({});
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.refresh('valid-token')).rejects.toThrow(UnauthorizedException);
    });

    it('should revoke old token and issue new pair for valid token', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: 'rt-1',
        revokedAt: null,
        expiresAt: new Date(Date.now() + 86400000),
        userId: 'user-1',
      });
      mockPrisma.refreshToken.update.mockResolvedValue({});
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@test.com',
      });
      mockPrisma.refreshToken.create.mockResolvedValue({});

      const result = await service.refresh('valid-token');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(mockPrisma.refreshToken.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'rt-1' },
          data: expect.objectContaining({ revokedAt: expect.any(Date) }),
        }),
      );
    });
  });

  describe('logout', () => {
    it('should revoke the refresh token', async () => {
      mockPrisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });
      await service.logout('some-token');
      expect(mockPrisma.refreshToken.updateMany).toHaveBeenCalledWith({
        where: { token: 'some-token', revokedAt: null },
        data: { revokedAt: expect.any(Date) },
      });
    });
  });
});
