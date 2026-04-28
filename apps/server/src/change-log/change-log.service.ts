import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface FieldDiff {
  fieldName: string;
  oldValue: string | null;
  newValue: string | null;
}

@Injectable()
export class ChangeLogService {
  constructor(private prisma: PrismaService) {}

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
  }

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
