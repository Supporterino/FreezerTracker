import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';
import type { CreateHouseholdDto } from './dto/create-household.dto';
import type { UpdateHouseholdDto } from './dto/update-household.dto';

@Injectable()
export class HouseholdsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateHouseholdDto) {
    return this.prisma.$transaction(async (tx) => {
      const household = await tx.household.create({
        data: { name: dto.name, ownerId: userId },
      });
      await tx.householdMember.create({
        data: { householdId: household.id, userId, role: 'OWNER' },
      });
      return household;
    });
  }

  async findAll(userId: string) {
    const memberships = await this.prisma.householdMember.findMany({
      where: { userId },
      include: { household: true },
    });
    return memberships.map((m) => m.household);
  }

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

  async update(householdId: string, dto: UpdateHouseholdDto) {
    return this.prisma.household.update({
      where: { id: householdId },
      data: { ...(dto.name && { name: dto.name }) },
    });
  }

  async remove(householdId: string) {
    await this.prisma.household.delete({ where: { id: householdId } });
  }

  async removeMember(householdId: string, targetUserId: string, requestingUserId: string) {
    if (targetUserId === requestingUserId) {
      throw new BadRequestException('Owner cannot remove themselves');
    }
    const member = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId, userId: targetUserId } },
    });
    if (!member) throw new NotFoundException('Member not found');
    await this.prisma.householdMember.delete({ where: { id: member.id } });
  }

  async transferOwnership(householdId: string, newOwnerId: string) {
    const newOwnerMember = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId, userId: newOwnerId } },
    });
    if (!newOwnerMember)
      throw new NotFoundException('Target user is not a member of this household');

    await this.prisma.$transaction([
      this.prisma.household.update({
        where: { id: householdId },
        data: { ownerId: newOwnerId },
      }),
      this.prisma.householdMember.update({
        where: { id: newOwnerMember.id },
        data: { role: 'OWNER' },
      }),
    ]);
  }
}
