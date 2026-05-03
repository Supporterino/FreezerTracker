import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import type { MealPlanQueryDto } from './dto/meal-plan-query.dto';
import type { UpdateMealPlanDto } from './dto/update-meal-plan.dto';

@Injectable()
export class MealPlansService {
  private readonly logger = new Logger(MealPlansService.name);

  constructor(private prisma: PrismaService) {}

  private readonly ITEM_INCLUDE = {
    item: {
      include: {
        createdBy: { select: { id: true, name: true, email: true, createdAt: true } },
        updatedBy: { select: { id: true, name: true, email: true, createdAt: true } },
      },
    },
  };

  async create(userId: string, householdId: string, dto: CreateMealPlanDto) {
    const items = await this.prisma.freezerItem.findMany({
      where: {
        id: { in: dto.itemIds },
        householdId,
        deletedAt: null,
      },
    });

    if (items.length !== dto.itemIds.length) {
      const foundIds = new Set(items.map((i) => i.id));
      const missing = dto.itemIds.filter((id) => !foundIds.has(id));
      throw new NotFoundException(`Items not found: ${missing.join(', ')}`);
    }

    const plan = await this.prisma.mealPlan.create({
      data: {
        householdId,
        name: dto.name,
        plannedDate: new Date(dto.plannedDate),
        notes: dto.notes,
        items: {
          createMany: {
            data: dto.itemIds.map((itemId) => ({
              itemId,
              householdId,
            })),
          },
        },
      },
      include: { items: { include: this.ITEM_INCLUDE } },
    });

    this.logger.log(`MealPlan ${plan.id} created in household ${householdId} by user ${userId}`);
    return plan;
  }

  async findAll(householdId: string, query: MealPlanQueryDto) {
    const { from, to } = query;
    const where: any = { householdId };

    if (from || to) {
      where.plannedDate = {
        ...(from && { gte: new Date(from) }),
        ...(to && { lte: new Date(to) }),
      };
    }

    return this.prisma.mealPlan.findMany({
      where,
      include: { items: { include: this.ITEM_INCLUDE } },
      orderBy: { plannedDate: 'asc' },
    });
  }

  async findOne(householdId: string, planId: string) {
    const plan = await this.prisma.mealPlan.findFirst({
      where: { id: planId, householdId },
      include: { items: { include: this.ITEM_INCLUDE } },
    });
    if (!plan) throw new NotFoundException('Meal plan not found');
    return plan;
  }

  async update(householdId: string, planId: string, dto: UpdateMealPlanDto) {
    const existing = await this.prisma.mealPlan.findFirst({
      where: { id: planId, householdId },
    });
    if (!existing) throw new NotFoundException('Meal plan not found');

    return this.prisma.mealPlan.update({
      where: { id: planId },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.plannedDate !== undefined && { plannedDate: new Date(dto.plannedDate) }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
      },
      include: { items: { include: this.ITEM_INCLUDE } },
    });
  }

  async remove(householdId: string, planId: string) {
    const existing = await this.prisma.mealPlan.findFirst({
      where: { id: planId, householdId },
    });
    if (!existing) throw new NotFoundException('Meal plan not found');

    await this.prisma.mealPlan.delete({ where: { id: planId } });
    this.logger.log(`MealPlan ${planId} deleted from household ${householdId}`);
  }

  async addItem(householdId: string, planId: string, itemId: string) {
    const plan = await this.prisma.mealPlan.findFirst({
      where: { id: planId, householdId },
    });
    if (!plan) throw new NotFoundException('Meal plan not found');

    const item = await this.prisma.freezerItem.findFirst({
      where: { id: itemId, householdId, deletedAt: null },
    });
    if (!item) throw new NotFoundException('Item not found');

    return this.prisma.mealPlanItem.create({
      data: { mealPlanId: planId, itemId, householdId },
      include: this.ITEM_INCLUDE,
    });
  }

  async removeItem(householdId: string, planId: string, plannedItemId: string) {
    const plannedItem = await this.prisma.mealPlanItem.findFirst({
      where: { id: plannedItemId, mealPlanId: planId, householdId },
    });
    if (!plannedItem) throw new NotFoundException('Planned item not found');

    await this.prisma.mealPlanItem.delete({ where: { id: plannedItemId } });
  }
}
