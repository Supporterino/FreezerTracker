import type { FreezerItemResponse } from '@freezer-tracker/shared';
import { ActionIcon, Breadcrumbs, Button, Group, Stack, Text, Title } from '@mantine/core';
import type { DateValue } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconLayoutGrid, IconPlus } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { CompartmentManager } from '@/components/compartments/CompartmentManager';
import { ItemDetailDrawer } from '@/components/items/ItemDetailDrawer';
import { ItemFilters } from '@/components/items/ItemFilters';
import { ItemGrid } from '@/components/items/ItemGrid';
import { ItemModal } from '@/components/items/ItemModal';
import { useCompartments } from '@/hooks/useCompartments';
import { useFreezer } from '@/hooks/useFreezer';
import { useHousehold } from '@/hooks/useHouseholds';
import { useItems } from '@/hooks/useItems';
import { useHouseholdStore } from '@/store/householdStore';

export const Route = createFileRoute('/households/$hid/freezers/$fid')({
  component: FreezerView,
});

function FreezerView() {
  const { hid, fid } = Route.useParams();
  const setActiveFreezer = useHouseholdStore((s) => s.setActiveFreezer);

  // Track active freezer selection
  setActiveFreezer(hid, fid);

  const { data: household } = useHousehold(hid);
  const { data: freezer, isLoading: freezerLoading } = useFreezer(hid, fid);
  const { data: compartments } = useCompartments(hid, fid);

  const [search, setSearch] = useState('');
  const [compartmentIds, setCompartmentIds] = useState<string[]>([]);
  const [expiresBefore, setExpiresBefore] = useState<DateValue>(null);

  const { data: itemsData, isLoading: itemsLoading } = useItems(hid, {
    freezerId: fid,
    search: search || undefined,
    compartmentIds: compartmentIds.length ? compartmentIds : undefined,
    expiresBefore: expiresBefore ? dayjs(expiresBefore).toISOString() : undefined,
  });

  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [manageOpened, { open: openManage, close: closeManage }] = useDisclosure(false);
  const [editItem, setEditItem] = useState<FreezerItemResponse | null>(null);
  const [detailItem, setDetailItem] = useState<FreezerItemResponse | null>(null);

  if (freezerLoading) return <LoadingSpinner />;

  const items = itemsData?.data ?? [];
  const compartmentMap = Object.fromEntries((compartments ?? []).map((c) => [c.id, c]));

  return (
    <Stack gap="md">
      <Breadcrumbs>
        <Text component={Link} to="/households" size="sm" c="dimmed">
          Households
        </Text>
        <Text
          component={Link}
          to="/households/$hid/overview"
          params={{ hid } as any}
          size="sm"
          c="dimmed"
        >
          {household?.name}
        </Text>
        <Text size="sm">{freezer?.name}</Text>
      </Breadcrumbs>

      <Group justify="space-between">
        <Title order={3}>{freezer?.name}</Title>
        <Button
          variant="light"
          size="sm"
          leftSection={<IconLayoutGrid size={16} />}
          onClick={openManage}
        >
          Manage compartments
        </Button>
      </Group>

      <ItemFilters
        search={search}
        onSearchChange={setSearch}
        compartmentIds={compartmentIds}
        onCompartmentChange={setCompartmentIds}
        expiresBefore={expiresBefore}
        onExpiresBeforeChange={setExpiresBefore}
        compartments={compartments ?? []}
      />

      <ItemGrid
        items={items}
        compartments={compartments ?? []}
        householdId={hid}
        isLoading={itemsLoading}
        onEdit={(item) => setEditItem(item)}
        onViewDetail={(item) => setDetailItem(item)}
        onAddFirst={openAdd}
      />

      {/* Floating add button */}
      <ActionIcon
        size={56}
        radius="xl"
        variant="filled"
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}
        onClick={openAdd}
        aria-label="Add item"
      >
        <IconPlus size={24} />
      </ActionIcon>

      <ItemModal opened={addOpened} onClose={closeAdd} householdId={hid} defaultFreezerId={fid} />

      <ItemModal
        opened={!!editItem}
        onClose={() => setEditItem(null)}
        householdId={hid}
        item={editItem ?? undefined}
        defaultFreezerId={fid}
      />

      <ItemDetailDrawer
        item={detailItem}
        compartment={detailItem ? compartmentMap[detailItem.compartmentId] : undefined}
        householdId={hid}
        opened={!!detailItem}
        onClose={() => setDetailItem(null)}
      />

      <CompartmentManager opened={manageOpened} onClose={closeManage} hid={hid} fid={fid} />
    </Stack>
  );
}
