import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/households/$hid')({
  component: HouseholdLayout,
});

function HouseholdLayout() {
  return <Outlet />;
}
