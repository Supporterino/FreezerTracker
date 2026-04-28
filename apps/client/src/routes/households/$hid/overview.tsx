import { Button, Group, SimpleGrid, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconSnowflake } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { FreezerCard } from '@/components/freezers/FreezerCard';
import { FreezerModal } from '@/components/freezers/FreezerModal';
import { useFreezers } from '@/hooks/useFreezer';
import { useHousehold } from '@/hooks/useHouseholds';

export const Route = createFileRoute('/households/$hid/overview')({
  component: OverviewPage,
});

function OverviewPage() {
  const { hid } = Route.useParams();
  const { data: household } = useHousehold(hid);
  const { data: freezers, isLoading } = useFreezers(hid);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={3}>{household?.name ?? 'Overview'}</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={openAdd}>
          Add freezer
        </Button>
      </Group>

      {freezers && freezers.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
          {freezers.map((f) => (
            <FreezerCard key={f.id} freezer={f} householdId={hid} />
          ))}
        </SimpleGrid>
      ) : (
        <EmptyState
          icon={<IconSnowflake size={32} />}
          title="No freezers yet"
          description="Add your first freezer to get started."
          actionLabel="Add freezer"
          onAction={openAdd}
        />
      )}

      <FreezerModal opened={addOpened} onClose={closeAdd} householdId={hid} />
    </Stack>
  );
}
