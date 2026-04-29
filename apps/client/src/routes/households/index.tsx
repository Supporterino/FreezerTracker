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
import { IconHome, IconPlus } from '@tabler/icons-react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { EmptyState } from '@/components/common/EmptyState';
import { useCreateHousehold, useHouseholds } from '@/hooks/useHouseholds';
import { useAuthStore } from '@/store/authStore';
import { useHouseholdStore } from '@/store/householdStore';

export const Route = createFileRoute('/households/')({
  beforeLoad: () => {
    const token = useAuthStore.getState().accessToken;
    if (!token) throw redirect({ to: '/login' });
  },
  component: HouseholdsPage,
});

function HouseholdsPage() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: households, isLoading } = useHouseholds();
  const setActiveHousehold = useHouseholdStore((s) => s.setActiveHousehold);
  const createHousehold = useCreateHousehold();

  const form = useForm<CreateHouseholdDto>({
    resolver: zodResolver(createHouseholdSchema),
    defaultValues: { name: '' },
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
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <Title order={3}>Your Households</Title>
          <Button size="sm" leftSection={<IconPlus size={16} />} onClick={open}>
            New household
          </Button>
        </Group>

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
    </>
  );
}
