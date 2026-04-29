import type { CreateHouseholdDto } from '@freezer-tracker/shared';
import { createHouseholdSchema } from '@freezer-tracker/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  Center,
  Group,
  Loader,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconHome, IconPlus, IconUsersGroup } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { invitesApi } from '@/api/invites';
import { EmptyState } from '@/components/common/EmptyState';
import { QRScanner } from '@/components/households/QRScanner';
import { useCreateHousehold, useHouseholds } from '@/hooks/useHouseholds';
import { useHouseholdStore } from '@/store/householdStore';

export const Route = createFileRoute('/_authenticated/households/')({
  component: HouseholdsPage,
});

function HouseholdsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const [joinOpened, { open: openJoin, close: closeJoin }] = useDisclosure(false);
  const [showScanner, setShowScanner] = useState(false);
  const { data: households, isLoading } = useHouseholds();
  const setActiveHousehold = useHouseholdStore((s) => s.setActiveHousehold);
  const createHousehold = useCreateHousehold();

  const form = useForm<CreateHouseholdDto>({
    resolver: zodResolver(createHouseholdSchema),
    defaultValues: { name: '' },
  });

  const inviteForm = useForm<{ code: string }>({
    defaultValues: { code: '' },
  });

  const handleSelect = (id: string) => {
    setActiveHousehold(id);
    navigate({ to: '/households/$hid/overview', params: { hid: id } });
  };

  const onSubmit = async (data: CreateHouseholdDto) => {
    const created = await createHousehold.mutateAsync(data);
    close();
    form.reset();
    handleSelect(created.id);
  };

  const acceptInvite = useMutation({
    mutationFn: (code: string) => invitesApi.acceptByCode(code),
    onSuccess: (household) => {
      queryClient.invalidateQueries({ queryKey: ['households'] });
      notifications.show({
        title: 'Joined!',
        message: `You joined "${household.name}".`,
        color: 'green',
      });
      closeJoin();
      inviteForm.reset();
      setShowScanner(false);
      handleSelect(household.id);
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        message: 'Invalid or expired invite code.',
        color: 'red',
      });
    },
  });

  const handleJoinSubmit = (data: { code: string }) => {
    acceptInvite.mutate(data.code);
  };

  const handleScan = (code: string) => {
    setShowScanner(false);
    acceptInvite.mutate(code);
  };

  const handleCloseJoin = () => {
    closeJoin();
    inviteForm.reset();
    setShowScanner(false);
  };

  if (isLoading) {
    return (
      <Center mih="100dvh">
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Stack
        w="100%"
        maw={600}
        mx="auto"
        p={{ base: 'sm', sm: 'md' }}
        pt={{ base: 'md', sm: 'xl' }}
      >
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Title order={3}>Your Households</Title>
          </Group>
          <SimpleGrid cols={{ base: 2, sm: 2 }} spacing="sm">
            <Button
              variant="light"
              leftSection={<IconUsersGroup size={16} />}
              onClick={openJoin}
              fullWidth
            >
              Join household
            </Button>
            <Button leftSection={<IconPlus size={16} />} onClick={open} fullWidth>
              New household
            </Button>
          </SimpleGrid>
        </Stack>

        {households && households.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {households.map((h) => (
              <Card
                key={h.id}
                withBorder
                shadow="sm"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelect(h.id)}
              >
                <Group gap="sm" align="center">
                  <IconHome size={24} />
                  <Text fw={600}>{h.name}</Text>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState
            icon={<IconHome size={32} />}
            title="No households yet"
            description="Create your first household to start tracking your freezer contents."
            actionLabel="Create household"
            onAction={open}
          />
        )}
      </Stack>

      <Modal opened={opened} onClose={close} title="New Household">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="My Home"
              data-autofocus
              {...form.register('name')}
              error={form.formState.errors.name?.message}
            />
            <Group justify="flex-end">
              <Button variant="default" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" loading={createHousehold.isPending}>
                Create
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Modal opened={joinOpened} onClose={handleCloseJoin} title="Join a Household">
        <Stack>
          <form onSubmit={inviteForm.handleSubmit(handleJoinSubmit)}>
            <Stack gap="sm">
              <TextInput
                label="Invite code"
                placeholder="Paste your invite code here"
                data-autofocus
                {...inviteForm.register('code', { required: true })}
              />
              <Group justify="flex-end">
                <Button
                  variant="default"
                  onClick={handleCloseJoin}
                  disabled={acceptInvite.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={acceptInvite.isPending}>
                  Join
                </Button>
              </Group>
            </Stack>
          </form>
          <Text size="sm" c="dimmed" ta="center">
            or
          </Text>
          {showScanner ? (
            <QRScanner onScan={handleScan} />
          ) : (
            <Button
              variant="light"
              size="sm"
              leftSection={<IconUsersGroup size={16} />}
              onClick={() => setShowScanner(true)}
              disabled={acceptInvite.isPending}
            >
              Scan QR code instead
            </Button>
          )}
        </Stack>
      </Modal>
    </>
  );
}
