import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconLogout, IconMoon, IconSun, IconUser } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/store/authStore';
import { MobileNavBurger } from './MobileNavBurger';

interface HeaderProps {
  navOpened: boolean;
  toggleNav: () => void;
}

export function Header({ navOpened, toggleNav }: HeaderProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser, logout, refreshToken } = useAuthStore();

  const handleLogout = async () => {
    if (refreshToken) {
      const { authApi } = await import('@/api/auth');
      await authApi.logout(refreshToken).catch(() => {});
    }
    queryClient.clear();
    logout();
  };

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <MobileNavBurger opened={navOpened} toggle={toggleNav} />
        <Text
          fw={700}
          size="lg"
          component={Link}
          to="/households"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Freezer Tracker
        </Text>
      </Group>

      <Group gap="xs">
        <ActionIcon
          variant="default"
          size="lg"
          onClick={() => setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle color scheme"
        >
          {computedColorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
        </ActionIcon>

        <Menu shadow="md" width={180}>
          <Menu.Target>
            <Avatar size="sm" radius="xl" color="blue" style={{ cursor: 'pointer' }}>
              {currentUser?.name?.[0]?.toUpperCase() ?? 'U'}
            </Avatar>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{currentUser?.name ?? 'Account'}</Menu.Label>
            <Menu.Item
              leftSection={<IconUser size={14} />}
              onClick={() => navigate({ to: '/profile' })}
            >
              My profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={handleLogout}>
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
