import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuthStore } from '@/store/authStore';

export const Route = createFileRoute('/households/$hid')({
  beforeLoad: () => {
    const token = useAuthStore.getState().accessToken;
    if (!token) throw redirect({ to: '/login' });
  },
  component: HouseholdLayout,
});

function HouseholdLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
