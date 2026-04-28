import type { InviteResponse } from '@freezer-tracker/shared';
import { Button, Code, CopyButton, Group, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCopy, IconQrcode } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { invitesApi } from '@/api/invites';

dayjs.extend(relativeTime);

interface InviteQRPanelProps {
  householdId: string;
}

export function InviteQRPanel({ householdId }: InviteQRPanelProps) {
  const queryClient = useQueryClient();
  const [activeInvite, setActiveInvite] = useState<InviteResponse | null>(null);

  const { data: invites } = useQuery({
    queryKey: ['invites', householdId],
    queryFn: () => invitesApi.list(householdId),
  });

  const generateMutation = useMutation({
    mutationFn: () => invitesApi.generate(householdId),
    onSuccess: (invite) => {
      setActiveInvite(invite);
      queryClient.invalidateQueries({ queryKey: ['invites', householdId] });
    },
    onError: () => {
      notifications.show({ title: 'Error', message: 'Failed to generate invite.', color: 'red' });
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (inviteId: string) => invitesApi.revoke(householdId, inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites', householdId] });
      if (activeInvite && revokeMutation.variables === activeInvite.id) {
        setActiveInvite(null);
      }
    },
  });

  return (
    <Stack gap="md">
      <Title order={5}>Invite members</Title>

      <Button
        leftSection={<IconQrcode size={16} />}
        loading={generateMutation.isPending}
        onClick={() => generateMutation.mutate()}
      >
        Generate invite
      </Button>

      {activeInvite && (
        <Stack align="center" gap="sm">
          <QRCodeSVG value={activeInvite.code} size={200} />
          <Code block fz="sm">
            {activeInvite.code}
          </Code>
          <CopyButton value={activeInvite.code}>
            {({ copied, copy }) => (
              <Button leftSection={<IconCopy size={14} />} variant="light" size="sm" onClick={copy}>
                {copied ? 'Copied!' : 'Copy code'}
              </Button>
            )}
          </CopyButton>
          <Text size="xs" c="dimmed">
            Expires {dayjs(activeInvite.expiresAt).fromNow()}
          </Text>
        </Stack>
      )}

      {invites && invites.length > 0 && (
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Active invites
          </Text>
          {invites.map((inv) => (
            <Group key={inv.id} justify="space-between">
              <Code fz="xs">{inv.code}</Code>
              <Group gap="xs">
                <Text size="xs" c="dimmed">
                  Expires {dayjs(inv.expiresAt).fromNow()}
                </Text>
                <Button
                  size="xs"
                  variant="subtle"
                  color="red"
                  loading={revokeMutation.isPending && revokeMutation.variables === inv.id}
                  onClick={() => revokeMutation.mutate(inv.id)}
                >
                  Revoke
                </Button>
              </Group>
            </Group>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
