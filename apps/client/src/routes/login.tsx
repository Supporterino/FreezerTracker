import type { LoginDto } from '@freezer-tracker/shared';
import { loginSchema } from '@freezer-tracker/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Anchor,
  Box,
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const token = useAuthStore.getState().accessToken;
    if (token) throw redirect({ to: '/households' });
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginDto) => {
    await login.mutateAsync(data);
    navigate({ to: '/households' });
  };

  return (
    <Center mih="100vh" bg="var(--mantine-color-body)">
      <Box w={400} p="md">
        <Title order={2} ta="center" mb="xs">
          Freezer Tracker
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb="lg">
          Sign in to your account
        </Text>
        <Paper p="xl">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.register('password')}
                error={form.formState.errors.password?.message}
              />
              <Button type="submit" loading={login.isPending} fullWidth mt="xs">
                Sign in
              </Button>
              <Text size="sm" ta="center">
                No account?{' '}
                <Anchor
                  component="button"
                  type="button"
                  onClick={() => navigate({ to: '/register' })}
                >
                  Register
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Center>
  );
}
