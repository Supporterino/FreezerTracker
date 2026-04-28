import { Badge } from '@mantine/core';
import dayjs from 'dayjs';

interface ExpiryBadgeProps {
  expiresAt: string | null | undefined;
}

export function ExpiryBadge({ expiresAt }: ExpiryBadgeProps) {
  if (!expiresAt) return null;

  const days = dayjs(expiresAt).diff(dayjs(), 'day');

  if (days < 0) return <Badge color="red">Expired</Badge>;
  if (days < 7) return <Badge color="orange">{days}d left</Badge>;
  if (days < 30) return <Badge color="yellow">{days}d left</Badge>;
  return <Badge color="green">{dayjs(expiresAt).format('D MMM')}</Badge>;
}
