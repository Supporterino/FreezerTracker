import type { LoginDto, RegisterDto, TokenResponse } from '@freezer-tracker/shared';
import { apiClient } from '@/api/client';

export const authApi = {
  register: (dto: RegisterDto) =>
    apiClient.post('auth/register', { json: dto }).json<TokenResponse>(),

  login: (dto: LoginDto) => apiClient.post('auth/login', { json: dto }).json<TokenResponse>(),

  refresh: (refreshToken: string) =>
    apiClient.post('auth/refresh', { json: { refreshToken } }).json<TokenResponse>(),

  logout: (refreshToken: string) => apiClient.post('auth/logout', { json: { refreshToken } }),
};
