import * as crypto from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as qrcode from 'qrcode';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Service handling household invite lifecycle: creation, listing, revocation,
 * and acceptance with QR code generation.
 */
@Injectable()
export class InvitesService {
  private readonly logger = new Logger(InvitesService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  /** Generate a new invite code with QR data URI (7-day expiry). */
  async create(householdId: string) {
    const code = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.prisma.householdInvite.create({
      data: { householdId, code, expiresAt },
    });

    const baseUrl = this.configService.get<string>('appBaseUrl');
    const url = `${baseUrl}/join?code=${code}`;
    const qrDataUri = await qrcode.toDataURL(url);

    this.logger.log(`Invite created for household ${householdId}`);
    return { code, qrDataUri, expiresAt };
  }

  /** List active (unused, non-expired) invites for a household. */
  async findAll(householdId: string) {
    return this.prisma.householdInvite.findMany({
      where: { householdId, usedAt: null, expiresAt: { gt: new Date() } },
    });
  }

  /**
   * Revoke an invite by deleting it.
   * @throws NotFoundException if the invite does not belong to the household.
   */
  async revoke(householdId: string, inviteId: string) {
    const invite = await this.prisma.householdInvite.findFirst({
      where: { id: inviteId, householdId },
    });
    if (!invite) throw new NotFoundException('Invite not found');
    await this.prisma.householdInvite.delete({ where: { id: inviteId } });
    this.logger.log(`Invite ${inviteId} revoked for household ${householdId}`);
  }

  /**
   * Accept an invite code and join the household.
   * @throws BadRequestException if the code is invalid, used, or expired.
   * @throws ConflictException if the user is already a member.
   */
  async accept(userId: string, code: string) {
    const invite = await this.prisma.householdInvite.findUnique({ where: { code } });

    if (!invite) {
      this.logger.warn(`Invalid invite code attempt by user ${userId}`);
      throw new BadRequestException('Invalid invite code');
    }
    if (invite.usedAt) {
      this.logger.warn(`Used invite code attempt by user ${userId}`);
      throw new BadRequestException('Invite already used');
    }
    if (invite.expiresAt < new Date()) {
      this.logger.warn(`Expired invite code attempt by user ${userId}`);
      throw new BadRequestException('Invite has expired');
    }

    const existing = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId: invite.householdId, userId } },
    });
    if (existing) throw new ConflictException('You are already a member of this household');

    const household = await this.prisma.$transaction(async (tx) => {
      await tx.householdMember.create({
        data: { householdId: invite.householdId, userId, role: 'MEMBER' },
      });
      await tx.householdInvite.update({
        where: { id: invite.id },
        data: { usedAt: new Date(), usedByUserId: userId },
      });
      return tx.household.findUniqueOrThrow({ where: { id: invite.householdId } });
    });

    this.logger.log(`User ${userId} joined household ${household.id} via invite`);
    return household;
  }
}
