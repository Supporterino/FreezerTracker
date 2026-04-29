import type { RegisterDto } from '@freezer-tracker/shared';
import { registerSchema } from '@freezer-tracker/shared';
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
import { ServerUrlDisclosure } from '@/components/common/ServerUrlDisclosure';
import { useRegister } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';

export const Route = createFileRoute('/register')({
  beforeLoad: () => {
    const token = useAuthStore.getState().accessToken;
    if (token) throw redirect({ to: '/households' });
  },
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();

  const form = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', name: '' },
  });

  const onSubmit = async (data: RegisterDto) => {
    await register.mutateAsync(data);
    navigate({ to: '/households' });
  };

  return (
    <Center mih="100vh" bg="var(--mantine-color-body)">
      <Box w={400} p="md">
        <Title order={2} ta="center" mb="xs">
          Freezer Tracker
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb="lg">
          Create a new account
        </Text>
        <Paper p="xl">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Your name"
                data-autofocus
                {...form.register('name')}
                error={form.formState.errors.name?.message}
              />
              <TextInput
                label="Email"
                placeholder="you@example.com"
                {...form.register('email')}
                error={form.formState.errors.email?.message}
              />
              <PasswordInput
                label="Password"
                placeholder="At least 8 characters"
                {...form.register('password')}
                error={form.formState.errors.password?.message}
              />
              <Button type="submit" loading={register.isPending} fullWidth mt="xs">
                Create account
              </Button>
              <ServerUrlDisclosure />
              <Text size="sm" ta="center">
                Already have an account?{' '}
                <Anchor component="button" type="button" onClick={() => navigate({ to: '/login' })}>
                  Sign in
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Center>
  );
}
