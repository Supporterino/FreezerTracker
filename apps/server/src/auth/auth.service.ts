import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

/**
 * Handles authentication logic: registration, login, JWT token issuance,
 * refresh token rotation, and logout (token revocation).
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Validate user credentials against stored bcrypt hash.
   * @returns User object (without passwordHash) or null if invalid.
   */
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      this.logger.warn(`Login attempt for non-existent email: ${email}`);
      return null;
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      this.logger.warn(`Invalid password attempt for user ${user.id}`);
      return null;
    }
    const { passwordHash: _ph, ...result } = user;
    return result;
  }

  /**
   * Register a new user account and issue token pair.
   * @throws ConflictException if email is already in use.
   */
  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      this.logger.warn(`Registration attempt with existing email: ${dto.email}`);
      throw new ConflictException('Email already in use');
    }
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: { email: dto.email, passwordHash, name: dto.name },
    });
    this.logger.log(`User registered: ${user.id}`);
    return this.issueTokens(user.id, user.email);
  }

  /**
   * Issue a new token pair for an already-validated user.
   */
  async login(user: { id: string; email: string }) {
    this.logger.log(`User logged in: ${user.id}`);
    return this.issueTokens(user.id, user.email);
  }

  /**
   * Rotate a refresh token: validate the old one, revoke it, and issue a new pair.
   * @throws UnauthorizedException if the token is invalid, revoked, or expired.
   */
  async refresh(token: string) {
    const record = await this.prisma.refreshToken.findUnique({ where: { token } });
    if (!record || record.revokedAt || record.expiresAt < new Date()) {
      this.logger.warn('Invalid refresh token attempt');
      throw new UnauthorizedException('Invalid refresh token');
    }
    // Revoke the old token
    await this.prisma.refreshToken.update({
      where: { id: record.id },
      data: { revokedAt: new Date() },
    });

    const user = await this.prisma.user.findUnique({ where: { id: record.userId } });
    if (!user) {
      this.logger.error(`Refresh token references deleted user: ${record.userId}`);
      throw new UnauthorizedException('User account no longer exists');
    }

    this.logger.debug(`Token refreshed for user ${user.id}`);
    return this.issueTokens(user.id, user.email);
  }

  /**
   * Revoke a refresh token (logout).
   */
  async logout(token: string) {
    await this.prisma.refreshToken.updateMany({
      where: { token, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    this.logger.log('User logged out (refresh token revoked)');
  }

  /**
   * Sign and persist a new access + refresh token pair.
   */
  private async issueTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expiresIn: this.configService.get<string>('jwt.accessExpiresIn') as any,
    });
    const refreshToken = this.jwtService.sign(
      { ...payload, jti: crypto.randomUUID() },
      {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn') as any,
      },
    );

    // Parse expiry for DB record
    const refreshExpiresIn = this.configService.get<string>('jwt.refreshExpiresIn') || '30d';
    const days = parseInt(refreshExpiresIn.replace('d', ''), 10) || 30;
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: { token: refreshToken, userId, expiresAt },
    });

    return { accessToken, refreshToken };
  }
}
