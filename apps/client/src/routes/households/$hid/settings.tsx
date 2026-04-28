import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  Button,
  Divider,
  Group,
  Select,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useHousehold, useUpdateHousehold, useDeleteHousehold, useTransferOwnership } from '@/hooks/useHouseholds';
import { MemberList } from '@/components/households/MemberList';
import { InviteQRPanel } from '@/components/households/InviteQRPanel';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { updateHouseholdSchema } from '@freezer-tracker/shared';
import type { UpdateHouseholdDto } from '@freezer-tracker/shared';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

export const Route = createFileRoute('/households/$hid/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const { hid } = Route.useParams();
  const navigate = useNavigate();
  const { data: household, isLoading } = useHousehold(hid);
  const currentUser = useAuthStore((s) => s.currentUser);

  const updateHousehold = useUpdateHousehold(hid);
  const deleteHousehold = useDeleteHousehold();
  const transferOwnership = useTransferOwnership(hid);

  const [deleteConfirm, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [transferTo, setTransferTo] = useState<string | null>(null);

  const form = useForm<UpdateHouseholdDto>({
    resolver: zodResolver(updateHouseholdSchema),
    defaultValues: { name: '' },
  });

  useEffect(() => {
    if (household) {
      form.reset({ name: household.name });
    }
  }, [household, form]);

  if (isLoading) return <LoadingSpinner />;
  if (!household) return null;

  const isOwner = currentUser?.id === household.ownerId;
  const otherMembers = (household.members ?? []).filter((m) => m.userId !== currentUser?.id);

  const handleRename = async (data: UpdateHouseholdDto) => {
    await updateHousehold.mutateAsync(data);
  };

  const handleDelete = async () => {
    await deleteHousehold.mutateAsync(hid);
    closeDelete();
    navigate({ to: '/households' });
  };

  const handleTransfer = async () => {
    if (transferTo) {
      await transferOwnership.mutateAsync(transferTo);
      setTransferTo(null);
    }
  };

  return (
    <Stack gap="md">
      <Title order={3}>Household Settings</Title>

      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="members">Members</Tabs.Tab>
          <Tabs.Tab value="invite">Invite</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt="md">
          <Stack gap="md" maw={480}>
            <form onSubmit={form.handleSubmit(handleRename)}>
              <Stack gap="sm">
                <TextInput
                  label="Household name"
                  {...form.register('name')}
                  error={form.formState.errors.name?.message}
                />
                <Group justify="flex-end">
                  <Button type="submit" loading={updateHousehold.isPending}>
                    Save
                  </Button>
                </Group>
              </Stack>
            </form>

            {isOwner && otherMembers.length > 0 && (
              <>
                <Divider />
                <Stack gap="sm">
                  <Text fw={500}>Transfer ownership</Text>
                  <Select
                    placeholder="Select new owner"
                    data={otherMembers.map((m) => ({ value: m.userId, label: m.name }))}
                    value={transferTo}
                    onChange={setTransferTo}
                  />
                  <Group justify="flex-end">
                    <Button
                      variant="light"
                      disabled={!transferTo}
                      loading={transferOwnership.isPending}
                      onClick={handleTransfer}
                    >
                      Transfer ownership
                    </Button>
                  </Group>
                </Stack>
              </>
            )}

            {isOwner && (
              <>
                <Divider />
                <Stack gap="sm">
                  <Text fw={500} c="red">
                    Danger zone
                  </Text>
                  <Button color="red" variant="light" onClick={openDelete}>
                    Delete household
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="members" pt="md">
          <MemberList
            members={household.members ?? []}
            householdId={hid}
            ownerId={household.ownerId}
          />
        </Tabs.Panel>

        <Tabs.Panel value="invite" pt="md">
          <InviteQRPanel householdId={hid} />
        </Tabs.Panel>
      </Tabs>

      <ConfirmModal
        opened={deleteConfirm}
        onClose={closeDelete}
        onConfirm={handleDelete}
        title="Delete household"
        message={`Are you sure you want to delete "${household.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleteHousehold.isPending}
      />
    </Stack>
  );
}
