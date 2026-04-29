import type { CompartmentResponse, FreezerItemResponse } from '@freezer-tracker/shared';
import { Stack, Title } from '@mantine/core';
import type { DateValue } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ItemDetailDrawer } from '@/components/items/ItemDetailDrawer';
import { ItemFilters } from '@/components/items/ItemFilters';
import { ItemGrid } from '@/components/items/ItemGrid';
import { ItemModal } from '@/components/items/ItemModal';
import { useFreezers } from '@/hooks/useFreezer';
import { useItems } from '@/hooks/useItems';

export const Route = createFileRoute('/households/$hid/items/')({
  component: ItemsPage,
});

function ItemsPage() {
  const { hid } = Route.useParams();
  const { data: freezers } = useFreezers(hid);

  const [search, setSearch] = useState('');
  const [compartmentIds, setCompartmentIds] = useState<string[]>([]);
  const [expiresBefore, setExpiresBefore] = useState<DateValue>(null);

  const { data: itemsData, isLoading } = useItems(hid, {
    search: search || undefined,
    compartmentIds: compartmentIds.length ? compartmentIds : undefined,
    expiresBefore: expiresBefore ? dayjs(expiresBefore).toISOString() : undefined,
  });

  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [editItem, setEditItem] = useState<FreezerItemResponse | null>(null);
  const [detailItem, setDetailItem] = useState<FreezerItemResponse | null>(null);

  // Collect all compartments from all freezers for filter dropdown
  // We don't have a "all compartments" endpoint, so we use empty array here
  const allCompartments: CompartmentResponse[] = [];

  const items = itemsData?.data ?? [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <Stack gap="md">
      <Title order={3}>All Items</Title>

      <ItemFilters
        search={search}
        onSearchChange={setSearch}
        compartmentIds={compartmentIds}
        onCompartmentChange={setCompartmentIds}
        expiresBefore={expiresBefore}
        onExpiresBeforeChange={setExpiresBefore}
        compartments={allCompartments}
      />

      <ItemGrid
        items={items}
        compartments={allCompartments}
        householdId={hid}
        isLoading={isLoading}
        onEdit={(item) => setEditItem(item)}
        onViewDetail={(item) => setDetailItem(item)}
        onAddFirst={openAdd}
      />

      <ItemModal opened={addOpened} onClose={closeAdd} householdId={hid} />

      <ItemModal
        opened={!!editItem}
        onClose={() => setEditItem(null)}
        householdId={hid}
        item={editItem ?? undefined}
      />

      <ItemDetailDrawer
        item={detailItem}
        householdId={hid}
        opened={!!detailItem}
        onClose={() => setDetailItem(null)}
      />
    </Stack>
  );
}
