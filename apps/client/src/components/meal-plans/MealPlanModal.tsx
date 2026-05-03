import type {
  CreateMealPlanDto,
  MealPlanResponse,
  UpdateMealPlanDto,
} from '@freezer-tracker/shared';
import { Button, Group, Modal, MultiSelect, Stack, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useItems } from '@/hooks/useItems';
import { useCreateMealPlan, useUpdateMealPlan } from '@/hooks/useMealPlans';

interface MealPlanModalProps {
  opened: boolean;
  onClose: () => void;
  householdId: string;
  plan?: MealPlanResponse | null;
  defaultDate?: string | null;
}

const mealPlanFormSchema = z.object({
  name: z.string().optional(),
  plannedDate: z.string().min(1),
  notes: z.string().optional(),
  itemIds: z.array(z.string()).min(1, 'Add at least one item'),
});

type FormValues = z.infer<typeof mealPlanFormSchema>;

export function MealPlanModal({
  opened,
  onClose,
  householdId,
  plan,
  defaultDate,
}: MealPlanModalProps) {
  const isEdit = !!plan;
  const { data: itemsData } = useItems(householdId);
  const items = itemsData?.data ?? [];

  const createMealPlan = useCreateMealPlan(householdId);
  const updateMealPlan = useUpdateMealPlan(householdId, plan?.id ?? '');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: plan?.name ?? '',
      plannedDate: plan?.plannedDate
        ? dayjs(plan.plannedDate).format('YYYY-MM-DD')
        : defaultDate
          ? defaultDate
          : dayjs().format('YYYY-MM-DD'),
      notes: plan?.notes ?? '',
      itemIds: plan?.items.map((pi) => pi.itemId) ?? [],
    },
  });

  useEffect(() => {
    if (opened) {
      reset({
        name: plan?.name ?? '',
        plannedDate: plan?.plannedDate
          ? dayjs(plan.plannedDate).format('YYYY-MM-DD')
          : defaultDate
            ? defaultDate
            : dayjs().format('YYYY-MM-DD'),
        notes: plan?.notes ?? '',
        itemIds: plan?.items.map((pi) => pi.itemId) ?? [],
      });
    }
  }, [opened, plan, defaultDate, reset]);

  const onSubmit = async (data: FormValues) => {
    const parsed = mealPlanFormSchema.safeParse(data);
    if (!parsed.success) {
      notifications.show({
        title: 'Validation error',
        message: parsed.error.issues.map((i) => i.message).join(', '),
        color: 'red',
      });
      return;
    }

    try {
      if (isEdit) {
        await updateMealPlan.mutateAsync({
          name: data.name || undefined,
          plannedDate: data.plannedDate,
          notes: data.notes || undefined,
        } as UpdateMealPlanDto);
      } else {
        await createMealPlan.mutateAsync({
          name: data.name || undefined,
          plannedDate: data.plannedDate,
          notes: data.notes || undefined,
          itemIds: data.itemIds,
        } as CreateMealPlanDto);
      }
      onClose();
    } catch {
      // onError handler shows notification
    }
  };

  const isPending = createMealPlan.isPending || updateMealPlan.isPending;
  const isMobile = useMediaQuery('(max-width: 480px)');

  const itemOptions = items.map((i) => ({
    value: i.id,
    label: `${i.name} (${i.quantity})`,
  }));

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? 'Edit Meal Plan' : 'New Meal Plan'}
      size="md"
      fullScreen={isMobile}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Meal name"
            placeholder="e.g. Tuesday Dinner (optional)"
            {...register('name')}
            error={errors.name?.message}
          />

          <Controller
            name="plannedDate"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label="Planned date"
                value={field.value || null}
                onChange={(v) => field.onChange(v ?? '')}
                dropdownType={isMobile ? 'modal' : 'popover'}
              />
            )}
          />

          <Textarea
            label="Notes"
            placeholder="Optional notes"
            autosize
            minRows={2}
            {...register('notes')}
          />

          <Controller
            name="itemIds"
            control={control}
            render={({ field }) => (
              <MultiSelect
                label="Items"
                placeholder="Select items to plan"
                data={itemOptions}
                value={field.value}
                onChange={field.onChange}
                searchable
                error={errors.itemIds?.message}
              />
            )}
          />

          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              {isEdit ? 'Save' : 'Create'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
