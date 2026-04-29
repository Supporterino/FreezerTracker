import { AppShell, Avatar, Divider, NavLink, ScrollArea } from '@mantine/core';
import {
  IconArchive,
  IconHome,
  IconHomePlus,
  IconList,
  IconSettings,
  IconSnowflake,
} from '@tabler/icons-react';
import { Link, useParams } from '@tanstack/react-router';
import { useFreezers } from '@/hooks/useFreezer';
import { useHouseholds } from '@/hooks/useHouseholds';
import { useAuthStore } from '@/store/authStore';
import { useHouseholdStore } from '@/store/householdStore';

function FreezerLinks({
  hid,
  closeNav,
  activeFid,
}: {
  hid: string;
  closeNav: () => void;
  activeFid?: string;
}) {
  const { data: freezers } = useFreezers(hid);

  return (
    <>
      {(freezers ?? []).map((f) => (
        <NavLink
          key={f.id}
          label={f.name}
          leftSection={<IconSnowflake size={16} />}
          active={activeFid === f.id}
          component={Link}
          to="/households/$hid/freezers/$fid"
          params={{ hid, fid: f.id } as any}
          childrenOffset={28}
          onClick={closeNav}
        />
      ))}
    </>
  );
}

export function Sidebar({ closeNav }: { closeNav: () => void }) {
  const params = useParams({ strict: false }) as { hid?: string; fid?: string };
  const activeHouseholdId = useHouseholdStore((s) => s.activeHouseholdId);
  const { data: households } = useHouseholds();
  const currentUser = useAuthStore((s) => s.currentUser);

  return (
    <>
      <AppShell.Section grow component={ScrollArea}>
        <NavLink
          label="All households"
          leftSection={<IconHomePlus size={16} />}
          component={Link}
          to="/households"
          onClick={closeNav}
        />
        <Divider my={4} />
        {(households ?? []).map((h) => (
          <NavLink
            key={h.id}
            label={h.name}
            leftSection={<IconHome size={16} />}
            defaultOpened={h.id === activeHouseholdId}
            active={params.hid === h.id}
          >
            <FreezerLinks hid={h.id} closeNav={closeNav} activeFid={params.fid} />
            <NavLink
              label="All items"
              leftSection={<IconList size={16} />}
              component={Link}
              to="/households/$hid/items"
              params={{ hid: h.id } as any}
              onClick={closeNav}
            />
            <NavLink
              label="Archive"
              leftSection={<IconArchive size={16} />}
              component={Link}
              to="/households/$hid/archive"
              params={{ hid: h.id } as any}
              onClick={closeNav}
            />
            <NavLink
              label="Settings"
              leftSection={<IconSettings size={16} />}
              component={Link}
              to="/households/$hid/settings"
              params={{ hid: h.id } as any}
              onClick={closeNav}
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
          onClick={closeNav}
        />
      </AppShell.Section>
    </>
  );
}
