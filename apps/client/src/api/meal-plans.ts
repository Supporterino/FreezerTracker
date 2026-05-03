import type {
  AddPlannedItemDto,
  CreateMealPlanDto,
  MealPlanQueryDto,
  MealPlanResponse,
  UpdateMealPlanDto,
} from '@freezer-tracker/shared';
import { apiClient } from '@/api/client';

export const mealPlansApi = {
  list: (hid: string, params?: MealPlanQueryDto) => {
    const searchParams = new URLSearchParams();
    if (params) {
      if (params.from) searchParams.set('from', params.from);
      if (params.to) searchParams.set('to', params.to);
    }
    return apiClient
      .get(`households/${hid}/meal-plans`, { searchParams })
      .json<MealPlanResponse[]>();
  },

  get: (hid: string, mpid: string) =>
    apiClient.get(`households/${hid}/meal-plans/${mpid}`).json<MealPlanResponse>(),

  create: (hid: string, dto: CreateMealPlanDto) =>
    apiClient.post(`households/${hid}/meal-plans`, { json: dto }).json<MealPlanResponse>(),

  update: (hid: string, mpid: string, dto: UpdateMealPlanDto) =>
    apiClient.patch(`households/${hid}/meal-plans/${mpid}`, { json: dto }).json<MealPlanResponse>(),

  remove: (hid: string, mpid: string) => apiClient.delete(`households/${hid}/meal-plans/${mpid}`),

  addItem: (hid: string, mpid: string, dto: AddPlannedItemDto) =>
    apiClient
      .post(`households/${hid}/meal-plans/${mpid}/items`, { json: dto })
      .json<MealPlanResponse['items'][0]>(),

  removeItem: (hid: string, mpid: string, piid: string) =>
    apiClient.delete(`households/${hid}/meal-plans/${mpid}/items/${piid}`),
};
