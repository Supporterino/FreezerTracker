import {
  type CreateItemDto,
  createItemSchema,
  type FreezerItemResponse,
  type UpdateItemDto,
  updateItemSchema,
} from '@freezer-tracker/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Modal, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCompartments } from '@/hooks/useCompartments';
import { useFreezers } from '@/hooks/useFreezer';
import { useCreateItem, useUpdateItem } from '@/hooks/useItems';

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
  storedAt?: Date | string | null;
  expiresAt?: Date | string | null;
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

  // Build a form-level Zod schema that relaxes date fields to accept Date objects.
  // The shared createItemSchema/updateItemSchema expects ISO strings, but the form
  // uses Date objects for date pickers. We validate the final payload separately.
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
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
    const toISO = (v: Date | string | null | undefined): string | undefined => {
      if (!v) return undefined;
      if (v instanceof Date) return v.toISOString();
      const d = new Date(v);
      return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
    };

    const payload = {
      name: data.name,
      quantity: data.quantity,
      freezerId: data.freezerId,
      compartmentId: data.compartmentId,
      notes: data.notes || undefined,
      storedAt: toISO(data.storedAt),
      expiresAt: toISO(data.expiresAt),
    };

    // Validate the payload against the shared Zod schema before sending
    const schema = isEdit ? updateItemSchema : createItemSchema;
    const parsed = schema.safeParse(payload);
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
        await updateItem.mutateAsync(parsed.data as UpdateItemDto);
      } else {
        await createItem.mutateAsync(parsed.data as CreateItemDto);
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
      <form
        onSubmit={handleSubmit(onSubmit, () => {
          notifications.show({
            title: 'Check required fields',
            message: 'Please fill in all required fields before saving.',
            color: 'red',
          });
        })}
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="e.g. Chicken breast"
            data-autofocus
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />

          <TextInput
            label="Quantity"
            placeholder="e.g. 500g, 2 packs"
            {...register('quantity', { required: 'Quantity is required' })}
            error={errors.quantity?.message}
          />

          <Controller
            name="freezerId"
            control={control}
            rules={{ required: 'Freezer is required' }}
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
            rules={{ required: 'Compartment is required' }}
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
                value={field.value ? new Date(field.value) : null}
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
                value={field.value ? new Date(field.value) : null}
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
