import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ChangeLogService, type FieldDiff } from '../change-log/change-log.service';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateItemDto } from './dto/create-item.dto';
import type { ItemQueryDto } from './dto/item-query.dto';
import type { UpdateItemDto } from './dto/update-item.dto';

const USER_SELECT = { id: true, name: true, email: true, createdAt: true };

/**
 * Service handling freezer item CRUD with change-log tracking,
 * soft-delete (archive), and filtered/paginated listing.
 */
@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    private prisma: PrismaService,
    private changeLogService: ChangeLogService,
  ) {}

  /** Verify the freezer->compartment chain belongs to the household. */
  private async verifyFreezerChain(householdId: string, freezerId: string, compartmentId: string) {
    const freezer = await this.prisma.freezer.findFirst({ where: { id: freezerId, householdId } });
    if (!freezer) throw new NotFoundException('Freezer not found');
    const compartment = await this.prisma.compartment.findFirst({
      where: { id: compartmentId, freezerId },
    });
    if (!compartment) throw new NotFoundException('Compartment not found');
  }

  /** Create a new item and record the initial change log entry. */
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

    this.logger.log(`Item ${item.id} created in household ${householdId} by user ${userId}`);
    return item;
  }

  /** List active items with optional filters and pagination. */
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

  /** List archived (soft-deleted) items. */
  async findArchive(householdId: string) {
    return this.prisma.freezerItem.findMany({
      where: { householdId, deletedAt: { not: null } },
      include: { createdBy: { select: USER_SELECT }, updatedBy: { select: USER_SELECT } },
      orderBy: { deletedAt: 'desc' },
    });
  }

  /** Get a single active item by ID. */
  async findOne(householdId: string, itemId: string) {
    const item = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId, deletedAt: null },
      include: { createdBy: { select: USER_SELECT }, updatedBy: { select: USER_SELECT } },
    });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  /** Update an item and record field-level diffs in the change log. */
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

    const updated = await this.prisma.$transaction(async (tx) => {
      const result = await tx.freezerItem.update({
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
        const newVal = (result as any)[field];
        const oldStr = oldVal instanceof Date ? oldVal.toISOString() : (oldVal as string | null);
        const newStr = newVal instanceof Date ? newVal.toISOString() : (newVal as string | null);
        if (oldStr !== newStr) {
          diffs.push({ fieldName: field, oldValue: oldStr, newValue: newStr });
        }
      }

      await this.changeLogService.recordChanges(itemId, userId, diffs);
      return result;
    });

    if (updated) {
      this.logger.log(`Item ${itemId} updated by user ${userId} in household ${householdId}`);
    }
    return updated;
  }

  /** Soft-delete an item (sets deletedAt, moves to archive). */
  async softDelete(householdId: string, itemId: string) {
    const item = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Item not found');
    this.logger.log(`Item ${itemId} soft-deleted in household ${householdId}`);
    return this.prisma.freezerItem.update({
      where: { id: itemId },
      data: { deletedAt: new Date() },
    });
  }

  /** Permanently delete an item (must already be archived). */
  async hardDelete(householdId: string, itemId: string) {
    const item = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId, deletedAt: { not: null } },
    });
    if (!item) throw new NotFoundException('Item not found in archive');
    await this.prisma.freezerItem.delete({ where: { id: itemId } });
    this.logger.log(`Item ${itemId} permanently deleted from household ${householdId}`);
  }

  /** Get the change log history for an item. */
  async getHistory(householdId: string, itemId: string) {
    return this.changeLogService.getHistory(itemId, householdId);
  }
}
