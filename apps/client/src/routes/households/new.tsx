import { createFileRoute, redirect } from '@tanstack/react-router';

// New household creation is handled by the modal on the households index page.
export const Route = createFileRoute('/households/new')({
  beforeLoad: () => {
    throw redirect({ to: '/households' });
  },
  component: () => null,
});
