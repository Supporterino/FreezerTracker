import dayjs from 'dayjs';

export type ExpiryStatus = 'none' | 'ok' | 'soon' | 'imminent' | 'expired';

export function getExpiryStatus(expiresAt: string | null): ExpiryStatus {
  if (!expiresAt) return 'none';
  const days = dayjs(expiresAt).diff(dayjs(), 'day');
  if (days < 0) return 'expired';
  if (days < 7) return 'imminent';
  if (days < 30) return 'soon';
  return 'ok';
}

export function getDaysUntilExpiry(expiresAt: string): number {
  return dayjs(expiresAt).diff(dayjs(), 'day');
}
