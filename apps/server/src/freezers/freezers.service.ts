import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateFreezerDto } from './dto/create-freezer.dto';
import type { UpdateFreezerDto } from './dto/update-freezer.dto';

@Injectable()
export class FreezersService {
  constructor(private prisma: PrismaService) {}

  private async verifyFreezerBelongsToHousehold(freezerId: string, householdId: string) {
    const freezer = await this.prisma.freezer.findFirst({
      where: { id: freezerId, householdId },
    });
    if (!freezer) throw new NotFoundException('Freezer not found');
    return freezer;
  }

  async create(householdId: string, dto: CreateFreezerDto) {
    return this.prisma.freezer.create({
      data: { householdId, name: dto.name, description: dto.description },
    });
  }

  async findAll(householdId: string) {
    return this.prisma.freezer.findMany({ where: { householdId } });
  }

  async findOne(householdId: string, freezerId: string) {
    const freezer = await this.prisma.freezer.findFirst({
      where: { id: freezerId, householdId },
      include: { compartments: { orderBy: { position: 'asc' } } },
    });
    if (!freezer) throw new NotFoundException('Freezer not found');
    return freezer;
  }

  async update(householdId: string, freezerId: string, dto: UpdateFreezerDto) {
    await this.verifyFreezerBelongsToHousehold(freezerId, householdId);
    return this.prisma.freezer.update({
      where: { id: freezerId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
    });
  }

  async remove(householdId: string, freezerId: string) {
    await this.verifyFreezerBelongsToHousehold(freezerId, householdId);
    await this.prisma.freezer.delete({ where: { id: freezerId } });
  }
}
