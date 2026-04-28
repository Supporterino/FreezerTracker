import type { CreateHouseholdDto, UpdateHouseholdDto } from '@freezer-tracker/shared';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { householdsApi } from '@/api/households';

export const useHouseholds = () =>
  useQuery({
    queryKey: ['households'],
    queryFn: () => householdsApi.list(),
  });

export const useHousehold = (hid: string) =>
  useQuery({
    queryKey: ['households', hid],
    queryFn: () => householdsApi.get(hid),
    enabled: !!hid,
  });

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateHouseholdDto) => householdsApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['households'] });
      notifications.show({
        title: 'Household created',
        message: 'Your new household is ready.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to create household.', color: 'red' });
    },
  });
};

export const useUpdateHousehold = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateHouseholdDto) => householdsApi.update(hid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['households'] });
      queryClient.invalidateQueries({ queryKey: ['households', hid] });
      notifications.show({ title: 'Saved', message: 'Household updated.', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to update household.', color: 'red' });
    },
  });
};

export const useDeleteHousehold = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hid: string) => householdsApi.delete(hid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['households'] });
      notifications.show({
        title: 'Deleted',
        message: 'Household has been deleted.',
        color: 'orange',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete household. Transfer or delete your households first.',
        color: 'red',
      });
    },
  });
};

export const useRemoveMember = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uid: string) => householdsApi.removeMember(hid, uid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['households', hid] });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to remove member.', color: 'red' });
    },
  });
};

export const useTransferOwnership = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newOwnerId: string) => householdsApi.transferOwnership(hid, newOwnerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['households', hid] });
      notifications.show({
        title: 'Ownership transferred',
        message: 'Household ownership has been transferred.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to transfer ownership.',
        color: 'red',
      });
    },
  });
};
