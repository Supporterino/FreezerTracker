import type { CreateItemDto, FreezerItemResponse, UpdateItemDto } from '@freezer-tracker/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Modal, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCompartments } from '@/hooks/useCompartments';
import { useFreezers } from '@/hooks/useFreezer';
import { useCreateItem, useUpdateItem } from '@/hooks/useItems';

// Form-level schema — dates stay as Date objects; ISO conversion happens in onSubmit
const itemFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  freezerId: z.string().min(1, 'Freezer is required'),
  compartmentId: z.string().min(1, 'Compartment is required'),
  notes: z.string().optional(),
  storedAt: z.date().nullable().optional(),
  expiresAt: z.date().nullable().optional(),
});

interface ItemModalProps {
  opened: boolean;
  onClose: () => void;
  householdId: string;
  /** Pre-selected freezer (e.g. when opening from freezer view) */
  defaultFreezerId?: string;
  /** Item to edit — if present, modal is in edit mode */
  item?: FreezerItemResponse;
}

type FormValues = {
  name: string;
  quantity: string;
  freezerId: string;
  compartmentId: string;
  notes?: string;
  storedAt?: Date | null;
  expiresAt?: Date | null;
};

export function ItemModal({
  opened,
  onClose,
  householdId,
  defaultFreezerId,
  item,
}: ItemModalProps) {
  const isEdit = !!item;

  const { data: freezers } = useFreezers(householdId);
  const [selectedFreezerId, setSelectedFreezerId] = useState<string>(
    item?.freezerId ?? defaultFreezerId ?? '',
  );
  const { data: compartments } = useCompartments(householdId, selectedFreezerId);

  const createItem = useCreateItem(householdId);
  const updateItem = useUpdateItem(householdId, item?.id ?? '');

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: item?.name ?? '',
      quantity: item?.quantity ?? '',
      freezerId: item?.freezerId ?? defaultFreezerId ?? '',
      compartmentId: item?.compartmentId ?? '',
      notes: item?.notes ?? '',
      storedAt: item?.storedAt ? new Date(item.storedAt) : new Date(),
      expiresAt: item?.expiresAt ? new Date(item.expiresAt) : null,
    },
  });

  const watchedFreezerId = watch('freezerId');

  useEffect(() => {
    if (watchedFreezerId !== selectedFreezerId) {
      setSelectedFreezerId(watchedFreezerId);
      setValue('compartmentId', '');
    }
  }, [watchedFreezerId, selectedFreezerId, setValue]);

  // Reset form when item changes or modal opens
  useEffect(() => {
    if (opened) {
      reset({
        name: item?.name ?? '',
        quantity: item?.quantity ?? '',
        freezerId: item?.freezerId ?? defaultFreezerId ?? '',
        compartmentId: item?.compartmentId ?? '',
        notes: item?.notes ?? '',
        storedAt: item?.storedAt ? new Date(item.storedAt) : new Date(),
        expiresAt: item?.expiresAt ? new Date(item.expiresAt) : null,
      });
      setSelectedFreezerId(item?.freezerId ?? defaultFreezerId ?? '');
    }
  }, [opened, item, defaultFreezerId, reset]);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      name: data.name,
      quantity: data.quantity,
      freezerId: data.freezerId,
      compartmentId: data.compartmentId,
      notes: data.notes || undefined,
      storedAt: data.storedAt ? data.storedAt.toISOString() : undefined,
      expiresAt: data.expiresAt ? data.expiresAt.toISOString() : undefined,
    };

    try {
      if (isEdit) {
        await updateItem.mutateAsync(payload as UpdateItemDto);
      } else {
        await createItem.mutateAsync(payload as CreateItemDto);
      }
      onClose();
    } catch {
      // mutation's onError already shows the error notification; prevent unhandled rejection
    }
  };

  const isPending = createItem.isPending || updateItem.isPending;
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? 'Edit Item' : 'Add Item'}
      size="md"
      fullScreen={isMobile}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="e.g. Chicken breast"
            data-autofocus
            {...register('name')}
            error={errors.name?.message}
          />

          <TextInput
            label="Quantity"
            placeholder="e.g. 500g, 2 packs"
            {...register('quantity')}
            error={errors.quantity?.message}
          />

          <Controller
            name="freezerId"
            control={control}
            render={({ field }) => (
              <Select
                label="Freezer"
                placeholder="Select freezer"
                data={(freezers ?? []).map((f) => ({ value: f.id, label: f.name }))}
                value={field.value}
                onChange={(v) => field.onChange(v ?? '')}
                error={errors.freezerId?.message}
              />
            )}
          />

          <Controller
            name="compartmentId"
            control={control}
            render={({ field }) => (
              <Select
                label="Compartment"
                placeholder="Select compartment"
                data={(compartments ?? []).map((c) => ({ value: c.id, label: c.name }))}
                value={field.value}
                onChange={(v) => field.onChange(v ?? '')}
                error={errors.compartmentId?.message}
                disabled={!selectedFreezerId}
              />
            )}
          />

          <Controller
            name="storedAt"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label="Stored date"
                placeholder="Today"
                value={field.value ?? null}
                onChange={field.onChange}
                dropdownType={isMobile ? 'modal' : 'popover'}
              />
            )}
          />

          <Controller
            name="expiresAt"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label="Expiry date"
                placeholder="Optional"
                clearable
                value={field.value ?? null}
                onChange={field.onChange}
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

          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
