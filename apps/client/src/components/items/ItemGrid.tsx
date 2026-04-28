import { SimpleGrid, Text } from '@mantine/core';
import { IconSnowflake } from '@tabler/icons-react';
import type { FreezerItemResponse, CompartmentResponse } from '@freezer-tracker/shared';
import { ItemCard } from './ItemCard';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface ItemGridProps {
  items: FreezerItemResponse[];
  compartments: CompartmentResponse[];
  householdId: string;
  isLoading?: boolean;
  onEdit: (item: FreezerItemResponse) => void;
  onViewDetail: (item: FreezerItemResponse) => void;
  onAddFirst?: () => void;
}

export function ItemGrid({
  items,
  compartments,
  householdId,
  isLoading,
  onEdit,
  onViewDetail,
  onAddFirst,
}: ItemGridProps) {
  if (isLoading) return <LoadingSpinner />;

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<IconSnowflake size={32} />}
        title="No items found"
        description="Add items to track what's in your freezer."
        actionLabel={onAddFirst ? 'Add first item' : undefined}
        onAction={onAddFirst}
      />
    );
  }

  const compartmentMap = Object.fromEntries(compartments.map((c) => [c.id, c]));

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          compartment={compartmentMap[item.compartmentId]}
          householdId={householdId}
          onEdit={onEdit}
          onViewDetail={onViewDetail}
        />
      ))}
    </SimpleGrid>
  );
}
