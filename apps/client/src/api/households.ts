import { apiClient } from '@/api/client';
import type {
  HouseholdResponse,
  HouseholdDetailResponse,
  CreateHouseholdDto,
  UpdateHouseholdDto,
} from '@freezer-tracker/shared';

export const householdsApi = {
  list: () => apiClient.get('households').json<HouseholdResponse[]>(),

  get: (hid: string) => apiClient.get(`households/${hid}`).json<HouseholdDetailResponse>(),

  create: (dto: CreateHouseholdDto) =>
    apiClient.post('households', { json: dto }).json<HouseholdResponse>(),

  update: (hid: string, dto: UpdateHouseholdDto) =>
    apiClient.patch(`households/${hid}`, { json: dto }).json<HouseholdResponse>(),

  delete: (hid: string) => apiClient.delete(`households/${hid}`),

  removeMember: (hid: string, uid: string) =>
    apiClient.delete(`households/${hid}/members/${uid}`),

  transferOwnership: (hid: string, newOwnerId: string) =>
    apiClient.patch(`households/${hid}/transfer`, { json: { newOwnerId } }),
};
