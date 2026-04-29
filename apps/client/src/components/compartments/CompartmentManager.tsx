import type { CreateCompartmentDto, UpdateCompartmentDto } from '@freezer-tracker/shared';
import { createCompartmentSchema, updateCompartmentSchema } from '@freezer-tracker/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconCheck, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  useCompartments,
  useCreateCompartment,
  useDeleteCompartment,
  useUpdateCompartment,
} from '@/hooks/useCompartments';

interface CompartmentManagerProps {
  opened: boolean;
  onClose: () => void;
  hid: string;
  fid: string;
}

interface EditRowProps {
  hid: string;
  fid: string;
  cid: string;
  initialName: string;
  initialPosition: number;
  onCancel: () => void;
}

function EditRow({ hid, fid, cid, initialName, initialPosition, onCancel }: EditRowProps) {
  const updateCompartment = useUpdateCompartment(hid, fid, cid);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateCompartmentDto>({
    resolver: zodResolver(updateCompartmentSchema),
    defaultValues: { name: initialName, position: initialPosition },
  });

  const onSubmit = (data: UpdateCompartmentDto) => {
    updateCompartment.mutate(data, { onSuccess: onCancel });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="xs">
        <Group gap="sm">
          <TextInput
            placeholder="Name"
            style={{ flex: 1 }}
            {...register('name')}
            error={errors.name?.message}
            size="xs"
          />
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <NumberInput
                placeholder="Pos"
                min={0}
                w={70}
                size="xs"
                value={field.value ?? 0}
                onChange={(v) => field.onChange(typeof v === 'number' ? v : 0)}
              />
            )}
          />
          <ActionIcon
            type="submit"
            variant="light"
            color="green"
            size="sm"
            loading={updateCompartment.isPending}
            aria-label="Save"
          >
            <IconCheck size={14} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={onCancel}
            aria-label="Cancel"
          >
            <IconX size={14} />
          </ActionIcon>
        </Group>
      </Stack>
    </form>
  );
}

export function CompartmentManager({ opened, onClose, hid, fid }: CompartmentManagerProps) {
  const { data: compartments } = useCompartments(hid, fid);
  const deleteCompartment = useDeleteCompartment(hid, fid);
  const createCompartment = useCreateCompartment(hid, fid);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addForm = useForm<CreateCompartmentDto>({
    resolver: zodResolver(createCompartmentSchema),
    defaultValues: { name: '', position: 0 },
  });

  const onAdd = (data: CreateCompartmentDto) => {
    createCompartment.mutate(data, {
      onSuccess: () => addForm.reset({ name: '', position: 0 }),
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Manage compartments" size="sm">
      <Stack gap="sm">
        {(compartments ?? []).length === 0 && (
          <Text c="dimmed" size="sm">
            No compartments yet. Add one below.
          </Text>
        )}

        {(compartments ?? []).map((c) =>
          editingId === c.id ? (
            <EditRow
              key={c.id}
              hid={hid}
              fid={fid}
              cid={c.id}
              initialName={c.name}
              initialPosition={c.position}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <Group key={c.id} justify="space-between" wrap="nowrap">
              <Text size="sm" style={{ flex: 1 }} truncate>
                {c.name}
                <Text span c="dimmed" size="xs" ml={6}>
                  pos {c.position}
                </Text>
              </Text>
              <Group gap={4} wrap="nowrap">
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={() => setEditingId(c.id)}
                  aria-label="Edit"
                >
                  <IconPencil size={14} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  size="sm"
                  loading={deleteCompartment.isPending}
                  onClick={() => deleteCompartment.mutate(c.id)}
                  aria-label="Delete"
                >
                  <IconTrash size={14} />
                </ActionIcon>
              </Group>
            </Group>
          ),
        )}

        <Divider />

        <Text fw={500} size="sm">
          Add compartment
        </Text>
        <form onSubmit={addForm.handleSubmit(onAdd)}>
          <Stack gap="xs">
            <TextInput
              placeholder="Name"
              {...addForm.register('name')}
              error={addForm.formState.errors.name?.message}
              size="sm"
            />
            <Group gap="sm">
              <Controller
                name="position"
                control={addForm.control}
                render={({ field }) => (
                  <NumberInput
                    placeholder="Position"
                    label="Position"
                    min={0}
                    style={{ flex: 1 }}
                    size="sm"
                    value={field.value ?? 0}
                    onChange={(v) => field.onChange(typeof v === 'number' ? v : 0)}
                  />
                )}
              />
              <Button type="submit" size="sm" mt="lg" loading={createCompartment.isPending}>
                Add
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}
