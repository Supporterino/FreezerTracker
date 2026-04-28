import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Group, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArchive } from '@tabler/icons-react';
import { useArchivedItems, useHardDeleteItem } from '@/hooks/useItems';
import { useCompartments } from '@/hooks/useCompartments';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { Badge, Card, Group as MGroup, Text, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import type { FreezerItemResponse } from '@freezer-tracker/shared';
import dayjs from 'dayjs';

export const Route = createFileRoute('/households/$hid/archive')({
  component: ArchivePage,
});

function ArchivePage() {
  const { hid } = Route.useParams();
  const { data: items, isLoading } = useArchivedItems(hid);
  const hardDelete = useHardDeleteItem(hid);
  const [confirmItem, setConfirmItem] = useState<FreezerItemResponse | null>(null);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Stack gap="md">
      <Title order={3}>Archive</Title>

      {!items || items.length === 0 ? (
        <EmptyState
          icon={<IconArchive size={32} />}
          title="Archive is empty"
          description="Deleted items will appear here."
        />
      ) : (
        <Stack gap="sm">
          {items.map((item) => (
            <Card key={item.id}>
              <Group justify="space-between">
                <Stack gap={2}>
                  <Text fw={600}>{item.name}</Text>
                  <Text size="sm" c="dimmed">
                    {item.quantity} · deleted {dayjs(item.deletedAt).fromNow()}
                  </Text>
                </Stack>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => setConfirmItem(item)}
                  aria-label="Permanently delete"
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </Stack>
      )}

      <ConfirmModal
        opened={!!confirmItem}
        onClose={() => setConfirmItem(null)}
        onConfirm={() => {
          if (confirmItem) {
            hardDelete.mutate(confirmItem.id, { onSuccess: () => setConfirmItem(null) });
          }
        }}
        title="Permanently delete"
        message={`Permanently delete "${confirmItem?.name}"? This cannot be undone.`}
        confirmLabel="Delete permanently"
        loading={hardDelete.isPending}
      />
    </Stack>
  );
}
