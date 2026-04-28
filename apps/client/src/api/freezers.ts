import type {
  CreateFreezerDto,
  FreezerDetailResponse,
  FreezerResponse,
  UpdateFreezerDto,
} from '@freezer-tracker/shared';
import { apiClient } from '@/api/client';

export const freezersApi = {
  list: (hid: string) => apiClient.get(`households/${hid}/freezers`).json<FreezerResponse[]>(),

  get: (hid: string, fid: string) =>
    apiClient.get(`households/${hid}/freezers/${fid}`).json<FreezerDetailResponse>(),

  create: (hid: string, dto: CreateFreezerDto) =>
    apiClient.post(`households/${hid}/freezers`, { json: dto }).json<FreezerResponse>(),

  update: (hid: string, fid: string, dto: UpdateFreezerDto) =>
    apiClient.patch(`households/${hid}/freezers/${fid}`, { json: dto }).json<FreezerResponse>(),

  delete: (hid: string, fid: string) => apiClient.delete(`households/${hid}/freezers/${fid}`),
};
