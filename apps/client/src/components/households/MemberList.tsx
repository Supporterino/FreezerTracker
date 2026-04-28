import type { MemberResponse } from '@freezer-tracker/shared';
import { Avatar, Badge, Button, Group, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { useRemoveMember } from '@/hooks/useHouseholds';
import { useAuthStore } from '@/store/authStore';

interface MemberListProps {
  members: MemberResponse[];
  householdId: string;
  ownerId: string;
}

export function MemberList({ members, householdId, ownerId }: MemberListProps) {
  const currentUser = useAuthStore((s) => s.currentUser);
  const removeMember = useRemoveMember(householdId);
  const [confirmUid, setConfirmUid] = useState<string | null>(null);
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);

  const handleRemoveClick = (uid: string) => {
    setConfirmUid(uid);
    openConfirm();
  };

  const handleConfirmRemove = () => {
    if (confirmUid) {
      removeMember.mutate(confirmUid, { onSuccess: closeConfirm });
    }
  };

  const memberToRemove = members.find((m) => m.userId === confirmUid);

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Member</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Joined</Table.Th>
            {currentUser?.id === ownerId && <Table.Th />}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {members.map((m) => (
            <Table.Tr key={m.id}>
              <Table.Td>
                <Group gap="sm">
                  <Avatar size="sm" radius="xl" color="blue">
                    {m.name?.[0]?.toUpperCase() ?? 'U'}
                  </Avatar>
                  <div>
                    <Text size="sm" fw={500}>
                      {m.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {m.email}
                    </Text>
                  </div>
                </Group>
              </Table.Td>
              <Table.Td>
                <Badge color={m.role === 'OWNER' ? 'blue' : 'gray'} variant="light" size="sm">
                  {m.role}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="dimmed">
                  {new Date(m.joinedAt).toLocaleDateString()}
                </Text>
              </Table.Td>
              {currentUser?.id === ownerId && (
                <Table.Td>
                  {m.userId !== ownerId && (
                    <Button
                      size="xs"
                      variant="subtle"
                      color="red"
                      onClick={() => handleRemoveClick(m.userId)}
                    >
                      Remove
                    </Button>
                  )}
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <ConfirmModal
        opened={confirmOpened}
        onClose={closeConfirm}
        onConfirm={handleConfirmRemove}
        title="Remove member"
        message={`Remove ${memberToRemove?.name} from this household?`}
        confirmLabel="Remove"
        loading={removeMember.isPending}
      />
    </>
  );
}
