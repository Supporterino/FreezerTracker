import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import {
  ActionIcon,
  Button,
  Card,
  Center,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconHome, IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useHouseholds } from '@/hooks/useHouseholds';
import { useHouseholdStore } from '@/store/householdStore';
import { useAuthStore } from '@/store/authStore';
import { EmptyState } from '@/components/common/EmptyState';
import { useCreateHousehold } from '@/hooks/useHouseholds';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, TextInput } from '@mantine/core';
import { createHouseholdSchema } from '@freezer-tracker/shared';
import type { CreateHouseholdDto } from '@freezer-tracker/shared';

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
      <Center mih="100vh">
        <Loader />
      </Center>
    );
  }

  return (
    <Center mih="100vh" bg="var(--mantine-color-body)">
      <Stack w="100%" maw={600} p="md">
        <Group justify="space-between" align="center">
          <Title order={3}>Your Households</Title>
          <Button leftSection={<IconPlus size={16} />} onClick={open}>
            New household
          </Button>
        </Group>

        {households && households.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {households.map((h) => (
              <Card
                key={h.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelect(h.id)}
              >
                <Group>
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
    </Center>
  );
}
