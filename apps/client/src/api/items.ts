import type {
  ChangeLogEntryResponse,
  CreateItemDto,
  FreezerItemResponse,
  ItemQueryDto,
  PaginatedResponse,
  UpdateItemDto,
} from '@freezer-tracker/shared';
import { apiClient } from '@/api/client';

export const itemsApi = {
  list: (hid: string, params?: ItemQueryDto) => {
    const searchParams = new URLSearchParams();
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined) continue;
        if (Array.isArray(value)) {
          for (const v of value) searchParams.append(key, String(v));
        } else {
          searchParams.set(key, String(value));
        }
      }
    }
    return apiClient
      .get(`households/${hid}/items`, { searchParams })
      .json<PaginatedResponse<FreezerItemResponse>>();
  },

  listArchive: (hid: string) =>
    apiClient.get(`households/${hid}/items/archive`).json<FreezerItemResponse[]>(),

  get: (hid: string, iid: string) =>
    apiClient.get(`households/${hid}/items/${iid}`).json<FreezerItemResponse>(),

  create: (hid: string, dto: CreateItemDto) =>
    apiClient.post(`households/${hid}/items`, { json: dto }).json<FreezerItemResponse>(),

  update: (hid: string, iid: string, dto: UpdateItemDto) =>
    apiClient.patch(`households/${hid}/items/${iid}`, { json: dto }).json<FreezerItemResponse>(),

  softDelete: (hid: string, iid: string) => apiClient.delete(`households/${hid}/items/${iid}`),

  hardDelete: (hid: string, iid: string) =>
    apiClient.delete(`households/${hid}/items/${iid}/permanent`),

  getHistory: (hid: string, iid: string) =>
    apiClient.get(`households/${hid}/items/${iid}/history`).json<ChangeLogEntryResponse[]>(),
};
