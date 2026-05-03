import { createFileRoute } from '@tanstack/react-router';
import { MealPlansPage } from '@/components/meal-plans/MealPlansPage';

export const Route = createFileRoute('/_authenticated/households/$hid/meal-plans/')({
  component: function MealPlansRoute() {
    const { hid } = Route.useParams();
    return <MealPlansPage householdId={hid} />;
  },
});
