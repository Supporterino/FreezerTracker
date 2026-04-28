import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { itemsApi } from '@/api/items';
import type { CreateItemDto, UpdateItemDto, ItemQueryDto } from '@freezer-tracker/shared';

export const useItems = (hid: string, filters?: ItemQueryDto) =>
  useQuery({
    queryKey: ['items', hid, filters],
    queryFn: () => itemsApi.list(hid, filters),
    enabled: !!hid,
  });

export const useArchivedItems = (hid: string) =>
  useQuery({
    queryKey: ['items', hid, 'archive'],
    queryFn: () => itemsApi.listArchive(hid),
    enabled: !!hid,
  });

export const useItem = (hid: string, iid: string) =>
  useQuery({
    queryKey: ['items', hid, iid],
    queryFn: () => itemsApi.get(hid, iid),
    enabled: !!hid && !!iid,
  });

export const useCreateItem = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateItemDto) => itemsApi.create(hid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', hid] });
      notifications.show({ title: 'Item added', message: 'Item was added to the freezer.', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to add item.', color: 'red' });
    },
  });
};

export const useUpdateItem = (hid: string, iid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateItemDto) => itemsApi.update(hid, iid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', hid] });
      queryClient.invalidateQueries({ queryKey: ['items', hid, iid] });
      notifications.show({ title: 'Saved', message: 'Item updated.', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to update item.', color: 'red' });
    },
  });
};

export const useDeleteItem = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (iid: string) => itemsApi.softDelete(hid, iid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', hid] });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to delete item.', color: 'red' });
    },
  });
};

export const useHardDeleteItem = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (iid: string) => itemsApi.hardDelete(hid, iid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', hid, 'archive'] });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to permanently delete item.', color: 'red' });
    },
  });
};
