import { apiClient } from '@/api/client';
import type { UserResponse, UpdateUserDto } from '@freezer-tracker/shared';

export const usersApi = {
  getMe: () => apiClient.get('users/me').json<UserResponse>(),

  updateMe: (dto: UpdateUserDto) =>
    apiClient.patch('users/me', { json: dto }).json<UserResponse>(),

  deleteMe: () => apiClient.delete('users/me'),
};
