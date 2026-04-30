import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateHouseholdDto } from './dto/create-household.dto';
import type { UpdateHouseholdDto } from './dto/update-household.dto';

/**
 * Service handling household CRUD, member management, and ownership transfer.
 */
@Injectable()
export class HouseholdsService {
  private readonly logger = new Logger(HouseholdsService.name);

  constructor(private prisma: PrismaService) {}

  /** Create a new household with the requesting user as owner. */
  async create(userId: string, dto: CreateHouseholdDto) {
    const household = await this.prisma.$transaction(async (tx) => {
      const h = await tx.household.create({
        data: { name: dto.name, ownerId: userId },
      });
      await tx.householdMember.create({
        data: { householdId: h.id, userId, role: 'OWNER' },
      });
      return h;
    });
    this.logger.log(`Household ${household.id} created by user ${userId}`);
    return household;
  }

  /** List all households the user is a member of. */
  async findAll(userId: string) {
    const memberships = await this.prisma.householdMember.findMany({
      where: { userId },
      include: { household: true },
    });
    return memberships.map((m) => m.household);
  }

  /** Get household detail including member list. */
  async findOne(householdId: string) {
    const household = await this.prisma.household.findUniqueOrThrow({
      where: { id: householdId },
      include: {
        members: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
      },
    });
    return {
      ...household,
      members: household.members.map((m) => ({
        id: m.id,
        userId: m.userId,
        name: m.user.name,
        email: m.user.email,
        role: m.role,
        joinedAt: m.joinedAt,
      })),
    };
  }

  /** Update household properties (name). */
  async update(householdId: string, dto: UpdateHouseholdDto) {
    this.logger.log(`Household ${householdId} updated`);
    return this.prisma.household.update({
      where: { id: householdId },
      data: { ...(dto.name && { name: dto.name }) },
    });
  }

  /** Delete a household (cascades to members, freezers, items, invites). */
  async remove(householdId: string) {
    await this.prisma.household.delete({ where: { id: householdId } });
    this.logger.log(`Household ${householdId} deleted`);
  }

  /**
   * Remove a member from the household.
   * @throws BadRequestException if the owner tries to remove themselves.
   * @throws NotFoundException if the target member does not exist.
   */
  async removeMember(householdId: string, targetUserId: string, requestingUserId: string) {
    if (targetUserId === requestingUserId) {
      throw new BadRequestException('Owner cannot remove themselves');
    }
    const member = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId, userId: targetUserId } },
    });
    if (!member) throw new NotFoundException('Member not found');
    await this.prisma.householdMember.delete({ where: { id: member.id } });
    this.logger.log(
      `User ${targetUserId} removed from household ${householdId} by ${requestingUserId}`,
    );
  }

  /**
   * Transfer household ownership to another member.
   * @throws NotFoundException if the target user is not a member.
   */
  async transferOwnership(householdId: string, newOwnerId: string) {
    const household = await this.prisma.household.findUniqueOrThrow({
      where: { id: householdId },
    });

    const newOwnerMember = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId, userId: newOwnerId } },
    });
    if (!newOwnerMember)
      throw new NotFoundException('Target user is not a member of this household');

    const oldOwnerId = household.ownerId;

    await this.prisma.$transaction([
      // Update the household's ownerId
      this.prisma.household.update({
        where: { id: householdId },
        data: { ownerId: newOwnerId },
      }),
      // Promote the new owner's membership role
      this.prisma.householdMember.update({
        where: { id: newOwnerMember.id },
        data: { role: 'OWNER' },
      }),
      // Demote the old owner's membership role to MEMBER
      this.prisma.householdMember.updateMany({
        where: { householdId, userId: oldOwnerId },
        data: { role: 'MEMBER' },
      }),
    ]);
    this.logger.log(
      `Household ${householdId} ownership transferred from user ${oldOwnerId} to user ${newOwnerId}`,
    );
  }
}
