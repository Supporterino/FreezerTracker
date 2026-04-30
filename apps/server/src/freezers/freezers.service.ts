import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateFreezerDto } from './dto/create-freezer.dto';
import type { UpdateFreezerDto } from './dto/update-freezer.dto';

/**
 * Service handling freezer CRUD operations scoped to a household.
 */
@Injectable()
export class FreezersService {
  private readonly logger = new Logger(FreezersService.name);

  constructor(private prisma: PrismaService) {}

  /** Verify a freezer belongs to the given household. */
  private async verifyFreezerBelongsToHousehold(freezerId: string, householdId: string) {
    const freezer = await this.prisma.freezer.findFirst({
      where: { id: freezerId, householdId },
    });
    if (!freezer) throw new NotFoundException('Freezer not found');
    return freezer;
  }

  /** Create a new freezer in a household. */
  async create(householdId: string, dto: CreateFreezerDto) {
    const freezer = await this.prisma.freezer.create({
      data: { householdId, name: dto.name, description: dto.description },
    });
    this.logger.log(`Freezer ${freezer.id} created in household ${householdId}`);
    return freezer;
  }

  /** List all freezers in a household. */
  async findAll(householdId: string) {
    return this.prisma.freezer.findMany({ where: { householdId } });
  }

  /** Get a single freezer with its compartments. */
  async findOne(householdId: string, freezerId: string) {
    const freezer = await this.prisma.freezer.findFirst({
      where: { id: freezerId, householdId },
      include: { compartments: { orderBy: { position: 'asc' } } },
    });
    if (!freezer) throw new NotFoundException('Freezer not found');
    return freezer;
  }

  /** Update freezer name and/or description. */
  async update(householdId: string, freezerId: string, dto: UpdateFreezerDto) {
    await this.verifyFreezerBelongsToHousehold(freezerId, householdId);
    const freezer = await this.prisma.freezer.update({
      where: { id: freezerId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
    });
    this.logger.log(`Freezer ${freezerId} updated in household ${householdId}`);
    return freezer;
  }

  /** Delete a freezer (cascades to compartments and items). */
  async remove(householdId: string, freezerId: string) {
    await this.verifyFreezerBelongsToHousehold(freezerId, householdId);
    await this.prisma.freezer.delete({ where: { id: freezerId } });
    this.logger.log(`Freezer ${freezerId} deleted from household ${householdId}`);
  }
}
