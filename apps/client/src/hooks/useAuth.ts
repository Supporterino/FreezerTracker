import type { LoginDto, RegisterDto } from '@freezer-tracker/shared';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

export const useRegister = () => {
  const setTokens = useAuthStore((s) => s.setTokens);
  return useMutation({
    mutationFn: (dto: RegisterDto) => authApi.register(dto),
    onSuccess: (data) => {
      setTokens(data);
      notifications.show({
        title: 'Welcome!',
        message: 'Account created successfully',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Registration failed. Please try again.',
        color: 'red',
      });
    },
  });
};

export const useLogin = () => {
  const setTokens = useAuthStore((s) => s.setTokens);
  return useMutation({
    mutationFn: (dto: LoginDto) => authApi.login(dto),
    onSuccess: (data) => {
      setTokens(data);
    },
    onError: () => {
      notifications.show({
        title: 'Invalid credentials',
        message: 'Please check your email and password.',
        color: 'red',
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { refreshToken, logout } = useAuthStore.getState();
  return useMutation({
    mutationFn: () =>
      refreshToken ? authApi.logout(refreshToken).then(() => undefined) : Promise.resolve(),
    onSettled: () => {
      queryClient.clear();
      logout();
    },
  });
};
