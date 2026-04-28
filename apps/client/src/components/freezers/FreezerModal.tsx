import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Group, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import type { FreezerResponse } from '@freezer-tracker/shared';
import { createFreezerSchema } from '@freezer-tracker/shared';
import type { CreateFreezerDto } from '@freezer-tracker/shared';
import { useCreateFreezer, useUpdateFreezer } from '@/hooks/useFreezer';

interface FreezerModalProps {
  opened: boolean;
  onClose: () => void;
  householdId: string;
  freezer?: FreezerResponse;
}

export function FreezerModal({ opened, onClose, householdId, freezer }: FreezerModalProps) {
  const isEdit = !!freezer;
  const createFreezer = useCreateFreezer(householdId);
  const updateFreezer = useUpdateFreezer(householdId, freezer?.id ?? '');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateFreezerDto>({
    resolver: zodResolver(createFreezerSchema),
    defaultValues: { name: freezer?.name ?? '', description: freezer?.description ?? '' },
  });

  useEffect(() => {
    if (opened) {
      reset({ name: freezer?.name ?? '', description: freezer?.description ?? '' });
    }
  }, [opened, freezer, reset]);

  const onSubmit = async (data: CreateFreezerDto) => {
    if (isEdit) {
      await updateFreezer.mutateAsync(data);
    } else {
      await createFreezer.mutateAsync(data);
    }
    onClose();
  };

  const isPending = createFreezer.isPending || updateFreezer.isPending;

  return (
    <Modal opened={opened} onClose={onClose} title={isEdit ? 'Edit Freezer' : 'Add Freezer'} size="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="e.g. Garage freezer"
            data-autofocus
            {...register('name')}
            error={errors.name?.message}
          />
          <Textarea
            label="Description"
            placeholder="Optional description"
            autosize
            {...register('description')}
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
