import * as crypto from 'node:crypto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import * as qrcode from 'qrcode';
import type { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvitesService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(householdId: string) {
    const code = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.prisma.householdInvite.create({
      data: { householdId, code, expiresAt },
    });

    const baseUrl = this.configService.get<string>('appBaseUrl');
    const url = `${baseUrl}/join?code=${code}`;
    const qrDataUri = await qrcode.toDataURL(url);

    return { code, qrDataUri, expiresAt };
  }

  async findAll(householdId: string) {
    return this.prisma.householdInvite.findMany({
      where: { householdId, usedAt: null, expiresAt: { gt: new Date() } },
    });
  }

  async revoke(householdId: string, inviteId: string) {
    const invite = await this.prisma.householdInvite.findFirst({
      where: { id: inviteId, householdId },
    });
    if (!invite) throw new NotFoundException('Invite not found');
    await this.prisma.householdInvite.delete({ where: { id: inviteId } });
  }

  async accept(userId: string, code: string) {
    const invite = await this.prisma.householdInvite.findUnique({ where: { code } });

    if (!invite) throw new BadRequestException('Invalid invite code');
    if (invite.usedAt) throw new BadRequestException('Invite already used');
    if (invite.expiresAt < new Date()) throw new BadRequestException('Invite has expired');

    const existing = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId: invite.householdId, userId } },
    });
    if (existing) throw new ConflictException('You are already a member of this household');

    return this.prisma.$transaction(async (tx) => {
      await tx.householdMember.create({
        data: { householdId: invite.householdId, userId, role: 'MEMBER' },
      });
      await tx.householdInvite.update({
        where: { id: invite.id },
        data: { usedAt: new Date(), usedByUserId: userId },
      });
      return tx.household.findUniqueOrThrow({ where: { id: invite.householdId } });
    });
  }
}
