import { apiClient } from '@/api/client';
import type { InviteResponse, AcceptInviteDto, HouseholdResponse } from '@freezer-tracker/shared';

export const invitesApi = {
  generate: (hid: string) =>
    apiClient.post(`households/${hid}/invites`).json<InviteResponse>(),

  list: (hid: string) =>
    apiClient.get(`households/${hid}/invites`).json<InviteResponse[]>(),

  revoke: (hid: string, inviteId: string) =>
    apiClient.delete(`households/${hid}/invites/${inviteId}`),

  accept: (dto: AcceptInviteDto) =>
    apiClient.post(`households/${dto.code}/invites/accept`, { json: dto }).json<HouseholdResponse>(),

  acceptByCode: (code: string) =>
    apiClient.post(`households/_/invites/accept`, { json: { code } }).json<HouseholdResponse>(),
};
