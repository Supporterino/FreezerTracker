import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
import { usersApi } from '@/api/users';
import { updateUserSchema } from '@freezer-tracker/shared';
import type { UpdateUserDto } from '@freezer-tracker/shared';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { QRScanner } from '@/components/households/QRScanner';
import { invitesApi } from '@/api/invites';

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser, logout, setUser } = useAuthStore();
  const { serverBaseUrl, setServerBaseUrl } = useSettingsStore();
  const [deleteConfirm, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [showScanner, setShowScanner] = useState(false);

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

  const acceptInvite = useMutation({
    mutationFn: (code: string) => invitesApi.acceptByCode(code),
    onSuccess: (household) => {
      queryClient.invalidateQueries({ queryKey: ['households'] });
      notifications.show({ title: 'Joined!', message: `You joined "${household.name}".`, color: 'green' });
      navigate({ to: '/households/$hid/overview', params: { hid: household.id } });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Invalid or expired invite code.', color: 'red' });
    },
  });

  const handleServerSave = (data: { serverBaseUrl: string }) => {
    setServerBaseUrl(data.serverBaseUrl);
    queryClient.clear();
    navigate({ to: '/login' });
  };

  const handleScan = (code: string) => {
    setShowScanner(false);
    acceptInvite.mutate(code);
  };

  const inviteCodeForm = useForm<{ code: string }>({
    defaultValues: { code: '' },
  });

  return (
    <Stack gap="md" maw={520} mx="auto">
      <Title order={3}>Profile</Title>

      <Paper p="md">
        <form onSubmit={nameForm.handleSubmit((d) => updateName.mutate(d))}>
          <Stack gap="sm">
            <Text fw={500}>Display name</Text>
            <TextInput
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
      </Paper>

      <Paper p="md">
        <form onSubmit={serverForm.handleSubmit(handleServerSave)}>
          <Stack gap="sm">
            <Text fw={500}>Server URL</Text>
            <TextInput
              label="Server URL"
              description="The base URL of your self-hosted Freezer Tracker server"
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
      </Paper>

      <Paper p="md">
        <Stack gap="sm">
          <Text fw={500}>Join a household</Text>
          <form
            onSubmit={inviteCodeForm.handleSubmit((d) => acceptInvite.mutate(d.code))}
          >
            <Group>
              <TextInput
                placeholder="Enter invite code"
                style={{ flex: 1 }}
                {...inviteCodeForm.register('code', { required: true })}
              />
              <Button type="submit" loading={acceptInvite.isPending}>
                Join
              </Button>
            </Group>
          </form>
          {showScanner ? (
            <QRScanner onScan={handleScan} />
          ) : (
            <Button variant="light" size="sm" onClick={() => setShowScanner(true)}>
              Scan QR code instead
            </Button>
          )}
        </Stack>
      </Paper>

      <Paper p="md">
        <Stack gap="sm">
          <Text fw={500} c="red">
            Danger zone
          </Text>
          <Button color="red" variant="light" onClick={openDelete}>
            Delete account
          </Button>
        </Stack>
      </Paper>

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
