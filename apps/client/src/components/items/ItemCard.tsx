import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconNotes, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import type { FreezerItemResponse, CompartmentResponse } from '@freezer-tracker/shared';
import { ExpiryBadge } from './ExpiryBadge';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { useDeleteItem } from '@/hooks/useItems';

interface ItemCardProps {
  item: FreezerItemResponse;
  compartment?: CompartmentResponse;
  householdId: string;
  onEdit: (item: FreezerItemResponse) => void;
  onViewDetail: (item: FreezerItemResponse) => void;
}

export function ItemCard({ item, compartment, householdId, onEdit, onViewDetail }: ItemCardProps) {
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);
  const deleteItem = useDeleteItem(householdId);

  const handleDelete = () => {
    deleteItem.mutate(item.id, { onSuccess: closeConfirm });
  };

  return (
    <>
      <Card style={{ cursor: 'pointer' }} onClick={() => onViewDetail(item)}>
        <Stack gap="xs">
          <Group justify="space-between" wrap="nowrap">
            <Group gap="xs">
              {compartment && (
                <Badge variant="light" size="sm">
                  {compartment.name}
                </Badge>
              )}
            </Group>
            <ExpiryBadge expiresAt={item.expiresAt} />
          </Group>

          <Text fw={600} size="md" lineClamp={1}>
            {item.name}
          </Text>
          <Text c="dimmed" size="sm">
            {item.quantity}
          </Text>

          <Text size="xs" c="dimmed">
            Stored: {dayjs(item.storedAt).format('D MMM YYYY')}
          </Text>

          {item.notes && (
            <Tooltip label={item.notes} multiline maw={250}>
              <Group gap={4}>
                <IconNotes size={14} color="gray" />
                <Text size="xs" c="dimmed" lineClamp={1}>
                  {item.notes}
                </Text>
              </Group>
            </Tooltip>
          )}
        </Stack>

        <Card.Section inheritPadding py="xs" mt="xs" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
          <Group justify="space-between">
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onEdit(item); }}
              aria-label="Edit item"
            >
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={(e) => { e.stopPropagation(); openConfirm(); }}
              aria-label="Delete item"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Card.Section>
      </Card>

      <ConfirmModal
        opened={confirmOpened}
        onClose={closeConfirm}
        onConfirm={handleDelete}
        title="Delete item"
        message={`Are you sure you want to delete "${item.name}"?`}
        confirmLabel="Delete"
        loading={deleteItem.isPending}
      />
    </>
  );
}
