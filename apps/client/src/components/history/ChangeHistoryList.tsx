import type { ChangeLogEntryResponse } from '@freezer-tracker/shared';
import { Avatar, Group, ScrollArea, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ChangeHistoryListProps {
  entries: ChangeLogEntryResponse[];
}

export function ChangeHistoryList({ entries }: ChangeHistoryListProps) {
  if (entries.length === 0) {
    return (
      <Text c="dimmed" size="sm" ta="center" py="md">
        No history yet.
      </Text>
    );
  }

  return (
    <ScrollArea mah={400}>
      <Stack gap="sm">
        {entries.map((entry) => (
          <Group key={entry.id} align="flex-start" gap="sm">
            <Avatar size="sm" radius="xl" color="blue">
              {entry.changedBy.name?.[0]?.toUpperCase() ?? 'U'}
            </Avatar>
            <Stack gap={2} style={{ flex: 1 }}>
              <Text size="sm">
                <Text component="span" fw={600}>
                  {entry.changedBy.name}
                </Text>{' '}
                changed{' '}
                <Text component="span" fw={500}>
                  {entry.fieldName}
                </Text>
              </Text>
              <Text size="xs" c="dimmed">
                {entry.oldValue != null ? `"${entry.oldValue}"` : '(empty)'} →{' '}
                {entry.newValue != null ? `"${entry.newValue}"` : '(empty)'}
              </Text>
              <Text size="xs" c="dimmed">
                {dayjs(entry.changedAt).fromNow()}
              </Text>
            </Stack>
          </Group>
        ))}
      </Stack>
    </ScrollArea>
  );
}
