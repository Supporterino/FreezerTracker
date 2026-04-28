import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import { IconSnowflake } from '@tabler/icons-react';
import type { FreezerResponse } from '@freezer-tracker/shared';
import { useItems } from '@/hooks/useItems';

interface FreezerCardProps {
  freezer: FreezerResponse;
  householdId: string;
}

function FreezerCardInner({ freezer, householdId }: FreezerCardProps) {
  const navigate = useNavigate();
  const { data: itemsData } = useItems(householdId, { freezerId: freezer.id });
  const items = itemsData?.data ?? [];

  // Count expiring within 7 days
  const now = new Date();
  const soon = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expiringSoon = items.filter((i) => {
    if (!i.expiresAt) return false;
    const exp = new Date(i.expiresAt);
    return exp <= soon && exp >= now;
  }).length;

  return (
    <Card
      style={{ cursor: 'pointer' }}
      onClick={() =>
        navigate({
          to: '/households/$hid/freezers/$fid',
          params: { hid: householdId, fid: freezer.id },
        })
      }
    >
      <Stack gap="xs">
        <Group>
          <IconSnowflake size={20} />
          <Text fw={600}>{freezer.name}</Text>
        </Group>
        {freezer.description && (
          <Text size="sm" c="dimmed" lineClamp={1}>
            {freezer.description}
          </Text>
        )}
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </Text>
          {expiringSoon > 0 && (
            <Badge color="orange" size="sm">
              {expiringSoon} expiring soon
            </Badge>
          )}
        </Group>
      </Stack>
    </Card>
  );
}

export { FreezerCardInner as FreezerCard };
