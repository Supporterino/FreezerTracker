import { Button, Stack, Text, ThemeIcon } from '@mantine/core';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Stack align="center" justify="center" py="xl" gap="sm">
      <ThemeIcon size={64} variant="light" color="gray">
        {icon}
      </ThemeIcon>
      <Text fw={600} size="lg" ta="center">
        {title}
      </Text>
      {description && (
        <Text c="dimmed" size="sm" ta="center" maw={400}>
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button variant="light" mt="xs" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Stack>
  );
}
