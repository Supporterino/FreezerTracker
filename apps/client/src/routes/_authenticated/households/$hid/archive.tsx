import type { FreezerItemResponse } from '@freezer-tracker/shared';
import { ActionIcon, Card, Group, Stack, Text, Title } from '@mantine/core';
import { IconArchive, IconTrash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useArchivedItems, useHardDeleteItem } from '@/hooks/useItems';

export const Route = createFileRoute('/_authenticated/households/$hid/archive')({
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
