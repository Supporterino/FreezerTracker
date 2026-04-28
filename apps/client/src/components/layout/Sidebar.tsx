import { Link, useParams } from '@tanstack/react-router';
import { AppShell, Avatar, NavLink, ScrollArea, Text } from '@mantine/core';
import {
  IconArchive,
  IconHome,
  IconList,
  IconSettings,
  IconSnowflake,
} from '@tabler/icons-react';
import { useHouseholds } from '@/hooks/useHouseholds';
import { useFreezers } from '@/hooks/useFreezer';
import { useHouseholdStore } from '@/store/householdStore';
import { useAuthStore } from '@/store/authStore';

function FreezerLinks({ hid }: { hid: string }) {
  const { data: freezers } = useFreezers(hid);
  const activeFreezerIdMap = useHouseholdStore((s) => s.activeFreezerIdMap);
  const currentFreezerId = activeFreezerIdMap[hid];

  return (
    <>
      {(freezers ?? []).map((f) => (
        <NavLink
          key={f.id}
          label={f.name}
          leftSection={<IconSnowflake size={16} />}
          active={currentFreezerId === f.id}
          component={Link}
          to="/households/$hid/freezers/$fid"
          params={{ hid, fid: f.id } as any}
          childrenOffset={28}
        />
      ))}
    </>
  );
}

export function Sidebar() {
  const params = useParams({ strict: false }) as { hid?: string };
  const activeHouseholdId = useHouseholdStore((s) => s.activeHouseholdId);
  const { data: households } = useHouseholds();
  const currentUser = useAuthStore((s) => s.currentUser);

  return (
    <>
      <AppShell.Section grow component={ScrollArea}>
        {(households ?? []).map((h) => (
          <NavLink
            key={h.id}
            label={h.name}
            leftSection={<IconHome size={16} />}
            defaultOpened={h.id === activeHouseholdId}
            active={params.hid === h.id}
          >
            <FreezerLinks hid={h.id} />
            <NavLink
              label="All items"
              leftSection={<IconList size={16} />}
              component={Link}
              to="/households/$hid/items"
              params={{ hid: h.id } as any}
            />
            <NavLink
              label="Archive"
              leftSection={<IconArchive size={16} />}
              component={Link}
              to="/households/$hid/archive"
              params={{ hid: h.id } as any}
            />
            <NavLink
              label="Settings"
              leftSection={<IconSettings size={16} />}
              component={Link}
              to="/households/$hid/settings"
              params={{ hid: h.id } as any}
            />
          </NavLink>
        ))}
      </AppShell.Section>

      <AppShell.Section p="md">
        <NavLink
          label={currentUser?.name ?? 'Profile'}
          description={currentUser?.email}
          leftSection={
            <Avatar size="sm" radius="xl" color="blue">
              {currentUser?.name?.[0]?.toUpperCase() ?? 'U'}
            </Avatar>
          }
          component={Link}
          to="/profile"
        />
      </AppShell.Section>
    </>
  );
}
