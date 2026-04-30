import type { HouseholdResponse, InviteResponse } from '@freezer-tracker/shared';
import { apiClient } from '@/api/client';

export const invitesApi = {
  generate: (hid: string) => apiClient.post(`households/${hid}/invites`).json<InviteResponse>(),

  list: (hid: string) => apiClient.get(`households/${hid}/invites`).json<InviteResponse[]>(),

  revoke: (hid: string, inviteId: string) =>
    apiClient.delete(`households/${hid}/invites/${inviteId}`),

  acceptByCode: (code: string) =>
    apiClient.post(`households/_/invites/accept`, { json: { code } }).json<HouseholdResponse>(),
};
