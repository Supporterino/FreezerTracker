import type {
  AddPlannedItemDto,
  CreateMealPlanDto,
  MealPlanQueryDto,
  UpdateMealPlanDto,
} from '@freezer-tracker/shared';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mealPlansApi } from '@/api/meal-plans';

export const useMealPlans = (hid: string, params?: MealPlanQueryDto) =>
  useQuery({
    queryKey: ['meal-plans', hid, params],
    queryFn: () => mealPlansApi.list(hid, params),
    enabled: !!hid,
  });

export const useMealPlan = (hid: string, mpid: string) =>
  useQuery({
    queryKey: ['meal-plans', hid, mpid],
    queryFn: () => mealPlansApi.get(hid, mpid),
    enabled: !!hid && !!mpid,
  });

export const useCreateMealPlan = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMealPlanDto) => mealPlansApi.create(hid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans', hid] });
      notifications.show({
        title: 'Meal plan created',
        message: 'Your meal plan has been saved.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to create meal plan.', color: 'red' });
    },
  });
};

export const useUpdateMealPlan = (hid: string, mpid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateMealPlanDto) => mealPlansApi.update(hid, mpid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans', hid] });
      notifications.show({ title: 'Saved', message: 'Meal plan updated.', color: 'green' });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to update meal plan.',
        color: 'red',
      });
    },
  });
};

export const useDeleteMealPlan = (hid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mpid: string) => mealPlansApi.remove(hid, mpid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans', hid] });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete meal plan.',
        color: 'red',
      });
    },
  });
};

export const useAddPlannedItem = (hid: string, mpid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: AddPlannedItemDto) => mealPlansApi.addItem(hid, mpid, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans', hid] });
      queryClient.invalidateQueries({ queryKey: ['meal-plans', hid, mpid] });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to add item to meal plan.',
        color: 'red',
      });
    },
  });
};

export const useRemovePlannedItem = (hid: string, mpid: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (piid: string) => mealPlansApi.removeItem(hid, mpid, piid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meal-plans', hid] });
      queryClient.invalidateQueries({ queryKey: ['meal-plans', hid, mpid] });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to remove item from meal plan.',
        color: 'red',
      });
    },
  });
};
