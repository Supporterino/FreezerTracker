import { NotFoundException } from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';

const mockPrisma = {
  mealPlan: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  mealPlanItem: {
    create: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
  },
  freezerItem: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
  },
};

describe('MealPlansService', () => {
  let service: MealPlansService;

  beforeEach(() => {
    service = new MealPlansService(mockPrisma as any);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw NotFoundException if item IDs are not found', async () => {
      mockPrisma.freezerItem.findMany.mockResolvedValue([]);

      await expect(
        service.create('user-1', 'hid-1', {
          plannedDate: '2026-05-10',
          itemIds: ['missing-item'],
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create a meal plan with items', async () => {
      mockPrisma.freezerItem.findMany.mockResolvedValue([{ id: 'item-1' }]);
      const created = {
        id: 'plan-1',
        householdId: 'hid-1',
        name: 'Dinner',
        plannedDate: new Date('2026-05-10'),
        notes: null,
        items: [{ id: 'pi-1', itemId: 'item-1', mealPlanId: 'plan-1' }],
      };
      mockPrisma.mealPlan.create.mockResolvedValue(created);

      const result = await service.create('user-1', 'hid-1', {
        plannedDate: '2026-05-10',
        itemIds: ['item-1'],
        name: 'Dinner',
      });

      expect(result.id).toBe('plan-1');
      expect(mockPrisma.mealPlan.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return meal plans filtered by date range', async () => {
      mockPrisma.mealPlan.findMany.mockResolvedValue([]);
      const result = await service.findAll('hid-1', {
        from: '2026-05-01',
        to: '2026-05-31',
      });
      expect(result).toEqual([]);
      expect(mockPrisma.mealPlan.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            householdId: 'hid-1',
            plannedDate: expect.any(Object),
          }),
        }),
      );
    });

    it('should return meal plans without date filter', async () => {
      mockPrisma.mealPlan.findMany.mockResolvedValue([]);
      const result = await service.findAll('hid-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if plan not found', async () => {
      mockPrisma.mealPlan.findFirst.mockResolvedValue(null);
      await expect(service.findOne('hid-1', 'bad-id')).rejects.toThrow(NotFoundException);
    });

    it('should return a meal plan', async () => {
      const plan = { id: 'plan-1', householdId: 'hid-1', items: [] };
      mockPrisma.mealPlan.findFirst.mockResolvedValue(plan);
      const result = await service.findOne('hid-1', 'plan-1');
      expect(result.id).toBe('plan-1');
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if plan not found', async () => {
      mockPrisma.mealPlan.findFirst.mockResolvedValue(null);
      await expect(service.update('hid-1', 'bad-id', { name: 'Updated' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should update a meal plan', async () => {
      mockPrisma.mealPlan.findFirst.mockResolvedValue({ id: 'plan-1' });
      mockPrisma.mealPlan.update.mockResolvedValue({
        id: 'plan-1',
        name: 'Updated',
      });

      const result = await service.update('hid-1', 'plan-1', { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if plan not found', async () => {
      mockPrisma.mealPlan.findFirst.mockResolvedValue(null);
      await expect(service.remove('hid-1', 'bad-id')).rejects.toThrow(NotFoundException);
    });

    it('should delete a meal plan', async () => {
      mockPrisma.mealPlan.findFirst.mockResolvedValue({ id: 'plan-1' });
      mockPrisma.mealPlan.delete.mockResolvedValue({});

      await service.remove('hid-1', 'plan-1');
      expect(mockPrisma.mealPlan.delete).toHaveBeenCalledWith({ where: { id: 'plan-1' } });
    });
  });

  describe('addItem', () => {
    it('should throw NotFoundException if plan not found', async () => {
      mockPrisma.mealPlan.findFirst.mockResolvedValue(null);
      await expect(service.addItem('hid-1', 'bad-plan', 'item-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if item not found', async () => {
      mockPrisma.mealPlan.findFirst.mockResolvedValue({ id: 'plan-1' });
      mockPrisma.freezerItem.findFirst.mockResolvedValue(null);
      await expect(service.addItem('hid-1', 'plan-1', 'bad-item')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should add an item to a meal plan', async () => {
      mockPrisma.mealPlan.findFirst.mockResolvedValue({ id: 'plan-1' });
      mockPrisma.freezerItem.findFirst.mockResolvedValue({ id: 'item-1' });
      mockPrisma.mealPlanItem.create.mockResolvedValue({
        id: 'pi-1',
        mealPlanId: 'plan-1',
        itemId: 'item-1',
      });

      const result = await service.addItem('hid-1', 'plan-1', 'item-1');
      expect(result.itemId).toBe('item-1');
    });
  });

  describe('removeItem', () => {
    it('should throw NotFoundException if planned item not found', async () => {
      mockPrisma.mealPlanItem.findFirst.mockResolvedValue(null);
      await expect(service.removeItem('hid-1', 'plan-1', 'bad-pi')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should remove an item from a meal plan', async () => {
      mockPrisma.mealPlanItem.findFirst.mockResolvedValue({ id: 'pi-1' });
      mockPrisma.mealPlanItem.delete.mockResolvedValue({});

      await service.removeItem('hid-1', 'plan-1', 'pi-1');
      expect(mockPrisma.mealPlanItem.delete).toHaveBeenCalledWith({ where: { id: 'pi-1' } });
    });
  });
});
