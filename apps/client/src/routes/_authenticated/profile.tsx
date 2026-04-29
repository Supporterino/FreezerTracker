import type { UpdateUserDto } from '@freezer-tracker/shared';
import { updateUserSchema } from '@freezer-tracker/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Avatar,
  Button,
  Collapse,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlertTriangle, IconChevronDown, IconChevronUp, IconServer } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usersApi } from '@/api/users';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const queryClient = useQueryClient();
  const { currentUser, logout, setUser } = useAuthStore();
  const { serverBaseUrl, setServerBaseUrl } = useSettingsStore();
  const [deleteConfirm, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [serverOpen, { toggle: toggleServer }] = useDisclosure(false);

  const nameForm = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { name: currentUser?.name ?? '' },
  });

  const serverForm = useForm<{ serverBaseUrl: string }>({
    defaultValues: { serverBaseUrl },
  });

  useEffect(() => {
    if (currentUser) {
      nameForm.reset({ name: currentUser.name });
    }
  }, [currentUser, nameForm]);

  const updateName = useMutation({
    mutationFn: (dto: UpdateUserDto) => usersApi.updateMe(dto),
    onSuccess: (user) => {
      setUser(user);
      notifications.show({ title: 'Saved', message: 'Name updated.', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to update name.', color: 'red' });
    },
  });

  const deleteAccount = useMutation({
    mutationFn: () => usersApi.deleteMe(),
    onSuccess: () => {
      queryClient.clear();
      logout();
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete account. Transfer or delete your households first.',
        color: 'red',
      });
    },
  });

  const handleServerSave = (data: { serverBaseUrl: string }) => {
    setServerBaseUrl(data.serverBaseUrl);
    queryClient.clear();
  };

  const initial = currentUser?.name?.[0]?.toUpperCase() ?? 'U';

  return (
    <Stack gap="xl" maw={560} mx="auto">
      {/* Identity header */}
      <Paper p="xl" radius="md" withBorder>
        <Group gap="lg">
          <Avatar size={72} radius="xl" color="blue" fw={700} fz="xl">
            {initial}
          </Avatar>
          <Stack gap={2}>
            <Title order={3}>{currentUser?.name}</Title>
            <Text c="dimmed" size="sm">
              {currentUser?.email}
            </Text>
          </Stack>
        </Group>
      </Paper>

      {/* Account settings */}
      <Paper p="xl" radius="md" withBorder>
        <Stack gap="md">
          <Title order={5}>Account</Title>
          <form onSubmit={nameForm.handleSubmit((d) => updateName.mutate(d))}>
            <Stack gap="sm">
              <TextInput
                label="Display name"
                placeholder="Your name"
                {...nameForm.register('name')}
                error={nameForm.formState.errors.name?.message}
              />
              <Group justify="flex-end">
                <Button type="submit" loading={updateName.isPending}>
                  Save
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Paper>

      {/* Server URL — collapsible advanced section */}
      <Paper radius="md" withBorder style={{ overflow: 'visible' }}>
        <UnstyledButton
          onClick={toggleServer}
          p="md"
          style={{ display: 'block', width: '100%', borderRadius: 'var(--mantine-radius-md)' }}
        >
          <Group justify="space-between">
            <Group gap="sm">
              <IconServer size={18} />
              <Text fw={500} size="sm">
                Advanced — Server URL
              </Text>
            </Group>
            {serverOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
          </Group>
        </UnstyledButton>
        <Collapse expanded={serverOpen}>
          <Divider />
          <form onSubmit={serverForm.handleSubmit(handleServerSave)}>
            <Stack gap="sm" p="md">
              <TextInput
                label="Server URL"
                description="Base URL of your self-hosted Freezer Tracker server"
                placeholder="https://freezer.myhome.local"
                {...serverForm.register('serverBaseUrl')}
              />
              <Group justify="flex-end">
                <Button type="submit" variant="light">
                  Save and reconnect
                </Button>
              </Group>
            </Stack>
          </form>
        </Collapse>
      </Paper>

      {/* Danger zone */}
      <Stack gap="sm">
        <Divider label="Danger zone" labelPosition="left" c="red" />
        <Alert
          color="red"
          variant="light"
          icon={<IconAlertTriangle size={16} />}
          title="Delete account"
        >
          <Stack gap="sm">
            <Text size="sm">
              Permanently deletes your account. You must transfer or delete all households you own
              first.
            </Text>
            <Group>
              <Button color="red" variant="filled" size="xs" onClick={openDelete}>
                Delete my account
              </Button>
            </Group>
          </Stack>
        </Alert>
      </Stack>

      <ConfirmModal
        opened={deleteConfirm}
        onClose={closeDelete}
        onConfirm={() => deleteAccount.mutate()}
        title="Delete account"
        message="Are you sure? Your account will be permanently deleted. You must transfer or delete all households you own first."
        confirmLabel="Delete account"
        loading={deleteAccount.isPending}
      />
    </Stack>
  );
}
