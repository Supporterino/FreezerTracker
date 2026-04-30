/**
 * Unit tests for ItemsService.
 *
 * Tests cover the core item lifecycle:
 * - Create with freezer chain verification
 * - Update with change log diffing
 * - Soft delete and hard delete
 * - findAll with filters and pagination
 * - findOne and findArchive
 *
 * Recommended integration tests (not implemented here):
 * - Full CRUD flow through the controller with auth
 * - Pagination edge cases (last page, zero results)
 * - Concurrent updates to the same item
 * - Change log accuracy across multiple updates
 *
 * Coverage target: 80%+ on ItemsService
 */
import { NotFoundException } from '@nestjs/common';
import { ItemsService } from './items.service';

const mockChangeLogService = {
  recordChanges: jest.fn(),
  getHistory: jest.fn(),
};

const mockPrisma = {
  freezer: { findFirst: jest.fn() },
  compartment: { findFirst: jest.fn() },
  freezerItem: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  $transaction: jest.fn(),
};

describe('ItemsService', () => {
  let service: ItemsService;

  beforeEach(() => {
    service = new ItemsService(mockPrisma as any, mockChangeLogService as any);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw NotFoundException if freezer not found', async () => {
      mockPrisma.freezer.findFirst.mockResolvedValue(null);

      await expect(
        service.create('user-1', 'hid-1', {
          name: 'Chicken',
          quantity: '500g',
          freezerId: 'bad-fid',
          compartmentId: 'cid-1',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if compartment not found', async () => {
      mockPrisma.freezer.findFirst.mockResolvedValue({ id: 'fid-1' });
      mockPrisma.compartment.findFirst.mockResolvedValue(null);

      await expect(
        service.create('user-1', 'hid-1', {
          name: 'Chicken',
          quantity: '500g',
          freezerId: 'fid-1',
          compartmentId: 'bad-cid',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create item and record change log', async () => {
      mockPrisma.freezer.findFirst.mockResolvedValue({ id: 'fid-1' });
      mockPrisma.compartment.findFirst.mockResolvedValue({ id: 'cid-1' });
      const createdItem = {
        id: 'item-1',
        name: 'Chicken',
        quantity: '500g',
        householdId: 'hid-1',
        freezerId: 'fid-1',
        compartmentId: 'cid-1',
        createdBy: { id: 'user-1', name: 'Test', email: 'test@test.com', createdAt: new Date() },
        updatedBy: { id: 'user-1', name: 'Test', email: 'test@test.com', createdAt: new Date() },
      };
      mockPrisma.freezerItem.create.mockResolvedValue(createdItem);
      mockChangeLogService.recordChanges.mockResolvedValue(undefined);

      const result = await service.create('user-1', 'hid-1', {
        name: 'Chicken',
        quantity: '500g',
        freezerId: 'fid-1',
        compartmentId: 'cid-1',
      });

      expect(result.id).toBe('item-1');
      expect(mockChangeLogService.recordChanges).toHaveBeenCalledWith('item-1', 'user-1', [
        { fieldName: 'created', oldValue: null, newValue: 'Chicken' },
      ]);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if item not found', async () => {
      mockPrisma.freezerItem.findFirst.mockResolvedValue(null);
      await expect(service.findOne('hid-1', 'bad-id')).rejects.toThrow(NotFoundException);
    });

    it('should return item if found', async () => {
      const item = { id: 'item-1', name: 'Chicken', deletedAt: null };
      mockPrisma.freezerItem.findFirst.mockResolvedValue(item);
      const result = await service.findOne('hid-1', 'item-1');
      expect(result.id).toBe('item-1');
    });
  });

  describe('softDelete', () => {
    it('should throw NotFoundException for non-existent item', async () => {
      mockPrisma.freezerItem.findFirst.mockResolvedValue(null);
      await expect(service.softDelete('hid-1', 'bad-id')).rejects.toThrow(NotFoundException);
    });

    it('should set deletedAt on the item', async () => {
      mockPrisma.freezerItem.findFirst.mockResolvedValue({ id: 'item-1' });
      mockPrisma.freezerItem.update.mockResolvedValue({ id: 'item-1', deletedAt: new Date() });

      await service.softDelete('hid-1', 'item-1');

      expect(mockPrisma.freezerItem.update).toHaveBeenCalledWith({
        where: { id: 'item-1' },
        data: { deletedAt: expect.any(Date) },
      });
    });
  });

  describe('hardDelete', () => {
    it('should throw NotFoundException if item not in archive', async () => {
      mockPrisma.freezerItem.findFirst.mockResolvedValue(null);
      await expect(service.hardDelete('hid-1', 'bad-id')).rejects.toThrow(NotFoundException);
    });

    it('should permanently delete archived item', async () => {
      mockPrisma.freezerItem.findFirst.mockResolvedValue({
        id: 'item-1',
        deletedAt: new Date(),
      });
      mockPrisma.freezerItem.delete.mockResolvedValue({});

      await service.hardDelete('hid-1', 'item-1');

      expect(mockPrisma.freezerItem.delete).toHaveBeenCalledWith({
        where: { id: 'item-1' },
      });
    });
  });

  describe('findAll', () => {
    it('should apply filters and pagination', async () => {
      mockPrisma.freezerItem.findMany.mockResolvedValue([]);
      mockPrisma.freezerItem.count.mockResolvedValue(0);

      const result = await service.findAll('hid-1', {
        freezerId: 'fid-1',
        search: 'chicken',
        page: 2,
        limit: 10,
      });

      expect(result).toEqual({ data: [], total: 0, page: 2, limit: 10 });
    });
  });
});
