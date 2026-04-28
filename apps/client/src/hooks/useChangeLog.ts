import { useQuery } from '@tanstack/react-query';
import { itemsApi } from '@/api/items';

export const useChangeLog = (hid: string, iid: string) =>
  useQuery({
    queryKey: ['changelog', hid, iid],
    queryFn: () => itemsApi.getHistory(hid, iid),
    enabled: !!hid && !!iid,
  });
