import { apiClient } from '@/api/client';
import type { FreezerResponse, FreezerDetailResponse, CreateFreezerDto, UpdateFreezerDto } from '@freezer-tracker/shared';

export const freezersApi = {
  list: (hid: string) =>
    apiClient.get(`households/${hid}/freezers`).json<FreezerResponse[]>(),

  get: (hid: string, fid: string) =>
    apiClient.get(`households/${hid}/freezers/${fid}`).json<FreezerDetailResponse>(),

  create: (hid: string, dto: CreateFreezerDto) =>
    apiClient.post(`households/${hid}/freezers`, { json: dto }).json<FreezerResponse>(),

  update: (hid: string, fid: string, dto: UpdateFreezerDto) =>
    apiClient.patch(`households/${hid}/freezers/${fid}`, { json: dto }).json<FreezerResponse>(),

  delete: (hid: string, fid: string) =>
    apiClient.delete(`households/${hid}/freezers/${fid}`),
};
