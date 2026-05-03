import type { MealPlanResponse } from '@freezer-tracker/shared';
import { ActionIcon, Badge, Card, Group, Menu, Text } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

interface MealPlanCardProps {
  plan: MealPlanResponse;
  onEdit: (plan: MealPlanResponse) => void;
  onDelete: (planId: string) => void;
  onRemoveItem: (planId: string, plannedItemId: string) => void;
}

export function MealPlanCard({ plan, onEdit, onDelete, onRemoveItem }: MealPlanCardProps) {
  const isToday = dayjs(plan.plannedDate).isSame(dayjs(), 'day');
  const isPast = dayjs(plan.plannedDate).isBefore(dayjs(), 'day');

  return (
    <Card withBorder shadow="xs" padding="sm" radius="md" mb="xs">
      <Group justify="space-between" mb={plan.items.length > 0 ? 'xs' : 0}>
        <Group gap="xs">
          <Text fw={600} size="sm">
            {plan.name || 'Items'}
          </Text>
          {isToday && (
            <Badge color="orange" variant="filled" size="xs">
              Take out today
            </Badge>
          )}
          {isPast && !isToday && (
            <Badge color="gray" variant="light" size="xs">
              Past
            </Badge>
          )}
        </Group>
        <Menu withinPortal position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" size="sm">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconPencil size={14} />} onClick={() => onEdit(plan)}>
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={14} />}
              color="red"
              onClick={() => onDelete(plan.id)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {plan.notes && (
        <Text size="xs" c="dimmed" mb="xs">
          {plan.notes}
        </Text>
      )}

      {plan.items.length > 0 ? (
        <Group gap={4} wrap="wrap">
          {plan.items.map((pi) => (
            <Badge
              key={pi.id}
              variant="light"
              color="blue"
              size="sm"
              rightSection={
                <ActionIcon
                  size="xs"
                  color="blue"
                  variant="transparent"
                  onClick={() => onRemoveItem(plan.id, pi.id)}
                  style={{ marginLeft: 4 }}
                >
                  ×
                </ActionIcon>
              }
            >
              {pi.item.name}
            </Badge>
          ))}
        </Group>
      ) : (
        <Text size="xs" c="dimmed" fs="italic">
          No items added yet
        </Text>
      )}
    </Card>
  );
}
