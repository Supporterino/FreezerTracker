import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateCompartmentDto } from './dto/create-compartment.dto';
import type { UpdateCompartmentDto } from './dto/update-compartment.dto';

/**
 * Service handling compartment CRUD operations within a freezer.
 */
@Injectable()
export class CompartmentsService {
  private readonly logger = new Logger(CompartmentsService.name);

  constructor(private prisma: PrismaService) {}

  /** Verify the freezer->compartment ownership chain. */
  private async verifyChain(householdId: string, freezerId: string, compartmentId?: string) {
    const freezer = await this.prisma.freezer.findFirst({ where: { id: freezerId, householdId } });
    if (!freezer) throw new NotFoundException('Freezer not found');

    if (compartmentId) {
      const compartment = await this.prisma.compartment.findFirst({
        where: { id: compartmentId, freezerId },
      });
      if (!compartment) throw new NotFoundException('Compartment not found');
      return compartment;
    }
  }

  /** Create a new compartment in a freezer. */
  async create(householdId: string, freezerId: string, dto: CreateCompartmentDto) {
    await this.verifyChain(householdId, freezerId);
    const compartment = await this.prisma.compartment.create({
      data: { freezerId, name: dto.name, position: dto.position ?? 0 },
    });
    this.logger.log(`Compartment ${compartment.id} created in freezer ${freezerId}`);
    return compartment;
  }

  /** List all compartments in a freezer, ordered by position. */
  async findAll(householdId: string, freezerId: string) {
    await this.verifyChain(householdId, freezerId);
    return this.prisma.compartment.findMany({
      where: { freezerId },
      orderBy: { position: 'asc' },
    });
  }

  /** Update compartment name and/or position. */
  async update(
    householdId: string,
    freezerId: string,
    compartmentId: string,
    dto: UpdateCompartmentDto,
  ) {
    await this.verifyChain(householdId, freezerId, compartmentId);
    const compartment = await this.prisma.compartment.update({
      where: { id: compartmentId },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.position !== undefined && { position: dto.position }),
      },
    });
    this.logger.log(`Compartment ${compartmentId} updated in freezer ${freezerId}`);
    return compartment;
  }

  /**
   * Delete a compartment.
   * @throws ConflictException if the compartment has active (non-deleted) items.
   */
  async remove(householdId: string, freezerId: string, compartmentId: string) {
    await this.verifyChain(householdId, freezerId, compartmentId);

    const activeItems = await this.prisma.freezerItem.count({
      where: { compartmentId, deletedAt: null },
    });
    if (activeItems > 0) {
      this.logger.warn(
        `Cannot delete compartment ${compartmentId}: ${activeItems} active items remain`,
      );
      throw new ConflictException('Cannot delete compartment with active items');
    }

    await this.prisma.compartment.delete({ where: { id: compartmentId } });
    this.logger.log(`Compartment ${compartmentId} deleted from freezer ${freezerId}`);
  }
}
