import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Represents a single field-level change for audit logging. */
export interface FieldDiff {
  fieldName: string;
  oldValue: string | null;
  newValue: string | null;
}

/**
 * Service for recording and retrieving item change history (audit log).
 */
@Injectable()
export class ChangeLogService {
  private readonly logger = new Logger(ChangeLogService.name);

  constructor(private prisma: PrismaService) {}

  /** Batch-record field diffs for an item. Skips if diffs array is empty. */
  async recordChanges(itemId: string, userId: string, diffs: FieldDiff[]) {
    if (diffs.length === 0) return;
    await this.prisma.itemChangeLog.createMany({
      data: diffs.map((d) => ({
        itemId,
        changedById: userId,
        fieldName: d.fieldName,
        oldValue: d.oldValue,
        newValue: d.newValue,
      })),
    });
    this.logger.debug(`Recorded ${diffs.length} change(s) for item ${itemId} by user ${userId}`);
  }

  /**
   * Get full change history for an item within a household.
   * @throws NotFoundException if the item does not exist in the household.
   */
  async getHistory(itemId: string, householdId: string) {
    const item = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId },
    });
    if (!item) throw new NotFoundException('Item not found');

    return this.prisma.itemChangeLog.findMany({
      where: { itemId },
      orderBy: { changedAt: 'desc' },
      include: { changedBy: { select: { id: true, name: true, email: true, createdAt: true } } },
    });
  }
}
