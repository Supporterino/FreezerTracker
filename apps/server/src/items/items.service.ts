import { Injectable, NotFoundException } from '@nestjs/common';
import { ChangeLogService, type FieldDiff } from '../change-log/change-log.service';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateItemDto } from './dto/create-item.dto';
import type { ItemQueryDto } from './dto/item-query.dto';
import type { UpdateItemDto } from './dto/update-item.dto';

const USER_SELECT = { id: true, name: true, email: true, createdAt: true };

@Injectable()
export class ItemsService {
  constructor(
    private prisma: PrismaService,
    private changeLogService: ChangeLogService,
  ) {}

  private async verifyFreezerChain(householdId: string, freezerId: string, compartmentId: string) {
    const freezer = await this.prisma.freezer.findFirst({ where: { id: freezerId, householdId } });
    if (!freezer) throw new NotFoundException('Freezer not found');
    const compartment = await this.prisma.compartment.findFirst({
      where: { id: compartmentId, freezerId },
    });
    if (!compartment) throw new NotFoundException('Compartment not found');
  }

  async create(userId: string, householdId: string, dto: CreateItemDto) {
    await this.verifyFreezerChain(householdId, dto.freezerId, dto.compartmentId);

    const item = await this.prisma.freezerItem.create({
      data: {
        householdId,
        freezerId: dto.freezerId,
        compartmentId: dto.compartmentId,
        name: dto.name,
        quantity: dto.quantity,
        notes: dto.notes,
        storedAt: dto.storedAt ? new Date(dto.storedAt) : undefined,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
        createdById: userId,
        updatedById: userId,
      },
      include: { createdBy: { select: USER_SELECT }, updatedBy: { select: USER_SELECT } },
    });

    await this.changeLogService.recordChanges(item.id, userId, [
      { fieldName: 'created', oldValue: null, newValue: item.name },
    ]);

    return item;
  }

  async findAll(householdId: string, query: ItemQueryDto) {
    const {
      freezerId,
      compartmentIds: rawCompartmentIds,
      search,
      expiresBefore,
      page = 1,
      limit = 20,
    } = query;
    // Coerce defensively: NestJS may deliver a plain string when only one query param is sent
    const compartmentIds = rawCompartmentIds
      ? Array.isArray(rawCompartmentIds)
        ? rawCompartmentIds
        : [rawCompartmentIds as unknown as string]
      : undefined;
    const skip = (page - 1) * limit;

    const where: any = {
      householdId,
      deletedAt: null,
      ...(freezerId && { freezerId }),
      ...(compartmentIds?.length && { compartmentId: { in: compartmentIds } }),
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
      ...(expiresBefore && { expiresAt: { lt: new Date(expiresBefore) } }),
    };

    const [data, total] = await Promise.all([
      this.prisma.freezerItem.findMany({
        where,
        skip,
        take: limit,
        include: { createdBy: { select: USER_SELECT }, updatedBy: { select: USER_SELECT } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.freezerItem.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findArchive(householdId: string) {
    return this.prisma.freezerItem.findMany({
      where: { householdId, deletedAt: { not: null } },
      include: { createdBy: { select: USER_SELECT }, updatedBy: { select: USER_SELECT } },
      orderBy: { deletedAt: 'desc' },
    });
  }

  async findOne(householdId: string, itemId: string) {
    const item = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId, deletedAt: null },
      include: { createdBy: { select: USER_SELECT }, updatedBy: { select: USER_SELECT } },
    });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(userId: string, householdId: string, itemId: string, dto: UpdateItemDto) {
    const current = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId, deletedAt: null },
    });
    if (!current) throw new NotFoundException('Item not found');

    if (dto.freezerId || dto.compartmentId) {
      await this.verifyFreezerChain(
        householdId,
        dto.freezerId ?? current.freezerId,
        dto.compartmentId ?? current.compartmentId,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.freezerItem.update({
        where: { id: itemId },
        data: {
          ...(dto.name !== undefined && { name: dto.name }),
          ...(dto.quantity !== undefined && { quantity: dto.quantity }),
          ...(dto.notes !== undefined && { notes: dto.notes }),
          ...(dto.freezerId !== undefined && { freezerId: dto.freezerId }),
          ...(dto.compartmentId !== undefined && { compartmentId: dto.compartmentId }),
          ...(dto.expiresAt !== undefined && {
            expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
          }),
          updatedById: userId,
        },
        include: { createdBy: { select: USER_SELECT }, updatedBy: { select: USER_SELECT } },
      });

      const diffs: FieldDiff[] = [];
      const trackedFields: Array<keyof typeof current> = [
        'name',
        'quantity',
        'notes',
        'freezerId',
        'compartmentId',
        'expiresAt',
      ];
      for (const field of trackedFields) {
        const oldVal = current[field];
        const newVal = (updated as any)[field];
        const oldStr = oldVal instanceof Date ? oldVal.toISOString() : (oldVal as string | null);
        const newStr = newVal instanceof Date ? newVal.toISOString() : (newVal as string | null);
        if (oldStr !== newStr) {
          diffs.push({ fieldName: field, oldValue: oldStr, newValue: newStr });
        }
      }

      await this.changeLogService.recordChanges(itemId, userId, diffs);
      return updated;
    });
  }

  async softDelete(householdId: string, itemId: string) {
    const item = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Item not found');
    return this.prisma.freezerItem.update({
      where: { id: itemId },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(householdId: string, itemId: string) {
    const item = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId, deletedAt: { not: null } },
    });
    if (!item) throw new NotFoundException('Item not found in archive');
    await this.prisma.freezerItem.delete({ where: { id: itemId } });
  }

  async getHistory(householdId: string, itemId: string) {
    return this.changeLogService.getHistory(itemId, householdId);
  }
}
