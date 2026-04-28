import { apiClient } from '@/api/client';
import type { CompartmentResponse, CreateCompartmentDto, UpdateCompartmentDto } from '@freezer-tracker/shared';

export const compartmentsApi = {
  list: (hid: string, fid: string) =>
    apiClient.get(`households/${hid}/freezers/${fid}/compartments`).json<CompartmentResponse[]>(),

  create: (hid: string, fid: string, dto: CreateCompartmentDto) =>
    apiClient.post(`households/${hid}/freezers/${fid}/compartments`, { json: dto }).json<CompartmentResponse>(),

  update: (hid: string, fid: string, cid: string, dto: UpdateCompartmentDto) =>
    apiClient.patch(`households/${hid}/freezers/${fid}/compartments/${cid}`, { json: dto }).json<CompartmentResponse>(),

  delete: (hid: string, fid: string, cid: string) =>
    apiClient.delete(`households/${hid}/freezers/${fid}/compartments/${cid}`),
};
