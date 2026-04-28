import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Modal, NumberInput, Stack, TextInput } from '@mantine/core';
import { Controller } from 'react-hook-form';
import type { CompartmentResponse } from '@freezer-tracker/shared';
import { createCompartmentSchema } from '@freezer-tracker/shared';
import type { CreateCompartmentDto } from '@freezer-tracker/shared';
import { useCreateCompartment, useUpdateCompartment } from '@/hooks/useCompartments';

interface CompartmentModalProps {
  opened: boolean;
  onClose: () => void;
  householdId: string;
  freezerId: string;
  compartment?: CompartmentResponse;
}

export function CompartmentModal({
  opened,
  onClose,
  householdId,
  freezerId,
  compartment,
}: CompartmentModalProps) {
  const isEdit = !!compartment;
  const createCompartment = useCreateCompartment(householdId, freezerId);
  const updateCompartment = useUpdateCompartment(householdId, freezerId, compartment?.id ?? '');

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CreateCompartmentDto>({
    resolver: zodResolver(createCompartmentSchema),
    defaultValues: { name: compartment?.name ?? '', position: compartment?.position ?? 0 },
  });

  useEffect(() => {
    if (opened) {
      reset({ name: compartment?.name ?? '', position: compartment?.position ?? 0 });
    }
  }, [opened, compartment, reset]);

  const onSubmit = async (data: CreateCompartmentDto) => {
    if (isEdit) {
      await updateCompartment.mutateAsync(data);
    } else {
      await createCompartment.mutateAsync(data);
    }
    onClose();
  };

  const isPending = createCompartment.isPending || updateCompartment.isPending;

  return (
    <Modal opened={opened} onClose={onClose} title={isEdit ? 'Edit Compartment' : 'Add Compartment'} size="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="e.g. Top shelf"
            data-autofocus
            {...register('name')}
            error={errors.name?.message}
          />
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="Position"
                description="Display order (optional)"
                min={0}
                value={field.value ?? 0}
                onChange={(v) => field.onChange(typeof v === 'number' ? v : 0)}
              />
            )}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} disabled={isPending}>Cancel</Button>
            <Button type="submit" loading={isPending}>Save</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
