import type { CreateCompartmentDto, UpdateCompartmentDto } from '@freezer-tracker/shared';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { compartmentsApi } from '@/api/compartments';

export const useCompartments = (hid: string, fid: string) =>
  useQuery({
    queryKey: ['compartments', hid, fid],
    queryFn: () => compartmentsApi.list(hid, fid),
    enabled: !!hid && !!fid,
  });

export const useCreateCompartment = (hid: string, fid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCompartmentDto) => compartmentsApi.create(hid, fid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compartments', hid, fid] });
      notifications.show({
        title: 'Compartment added',
        message: 'New compartment has been added.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to create compartment.',
        color: 'red',
      });
    },
  });
};

export const useUpdateCompartment = (hid: string, fid: string, cid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateCompartmentDto) => compartmentsApi.update(hid, fid, cid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compartments', hid, fid] });
      notifications.show({ title: 'Saved', message: 'Compartment updated.', color: 'green' });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to update compartment.',
        color: 'red',
      });
    },
  });
};

export const useDeleteCompartment = (hid: string, fid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cid: string) => compartmentsApi.delete(hid, fid, cid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compartments', hid, fid] });
      notifications.show({
        title: 'Deleted',
        message: 'Compartment has been deleted.',
        color: 'orange',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete compartment. Remove all items from this compartment first.',
        color: 'red',
      });
    },
  });
};
