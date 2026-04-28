import type { UpdateUserDto, UserResponse } from '@freezer-tracker/shared';
import { apiClient } from '@/api/client';

export const usersApi = {
  getMe: () => apiClient.get('users/me').json<UserResponse>(),

  updateMe: (dto: UpdateUserDto) => apiClient.patch('users/me', { json: dto }).json<UserResponse>(),

  deleteMe: () => apiClient.delete('users/me'),
};
