import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useEffect } from 'react';
import { usersApi } from '@/api/users';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuthStore } from '@/store/authStore';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const token = useAuthStore.getState().accessToken;
    if (!token) throw redirect({ to: '/login' });
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { currentUser, setUser } = useAuthStore();

  // Populate currentUser from the API if not yet set (e.g. after app restart
  // with a persisted token, or after login which only calls setTokens).
  useEffect(() => {
    if (!currentUser) {
      usersApi
        .getMe()
        .then(setUser)
        .catch(() => {});
    }
  }, [currentUser, setUser]);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
