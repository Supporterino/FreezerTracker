import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { freezersApi } from '@/api/freezers';
import type { CreateFreezerDto, UpdateFreezerDto } from '@freezer-tracker/shared';

export const useFreezers = (hid: string) =>
  useQuery({
    queryKey: ['freezers', hid],
    queryFn: () => freezersApi.list(hid),
    enabled: !!hid,
  });

export const useFreezer = (hid: string, fid: string) =>
  useQuery({
    queryKey: ['freezers', hid, fid],
    queryFn: () => freezersApi.get(hid, fid),
    enabled: !!hid && !!fid,
  });

export const useCreateFreezer = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateFreezerDto) => freezersApi.create(hid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freezers', hid] });
      notifications.show({ title: 'Freezer added', message: 'New freezer has been added.', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to create freezer.', color: 'red' });
    },
  });
};

export const useUpdateFreezer = (hid: string, fid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateFreezerDto) => freezersApi.update(hid, fid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freezers', hid] });
      queryClient.invalidateQueries({ queryKey: ['freezers', hid, fid] });
      notifications.show({ title: 'Saved', message: 'Freezer updated.', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to update freezer.', color: 'red' });
    },
  });
};

export const useDeleteFreezer = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fid: string) => freezersApi.delete(hid, fid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freezers', hid] });
      notifications.show({ title: 'Deleted', message: 'Freezer has been deleted.', color: 'orange' });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to delete freezer. Remove all items first.', color: 'red' });
    },
  });
};
