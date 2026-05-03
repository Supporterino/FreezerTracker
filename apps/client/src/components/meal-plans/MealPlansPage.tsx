import type { MealPlanResponse } from '@freezer-tracker/shared';
import { ActionIcon, Badge, Group, Stack, Text, Timeline, Title } from '@mantine/core';
import { MiniCalendar } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarEvent, IconPlus } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { mealPlansApi } from '@/api/meal-plans';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { MealPlanCard } from '@/components/meal-plans/MealPlanCard';
import { MealPlanModal } from '@/components/meal-plans/MealPlanModal';
import { useDeleteMealPlan, useMealPlans } from '@/hooks/useMealPlans';

interface MealPlansPageProps {
  householdId: string;
}

export function MealPlansPage({ householdId }: MealPlansPageProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));
  const [calendarDate, setCalendarDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));

  const from = dayjs(calendarDate).startOf('week').toISOString();
  const to = dayjs(calendarDate).add(13, 'day').toISOString();

  const { data: plans = [], isLoading } = useMealPlans(householdId, { from, to });

  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [editPlan, setEditPlan] = useState<MealPlanResponse | null>(null);
  const [defaultDate, setDefaultDate] = useState<string | null>(null);

  const deleteMealPlan = useDeleteMealPlan(householdId);
  const queryClient = useQueryClient();

  const handleRemoveItem = async (planId: string, plannedItemId: string) => {
    await mealPlansApi.removeItem(householdId, planId, plannedItemId);
    queryClient.invalidateQueries({ queryKey: ['meal-plans', householdId] });
  };

  // Calculate the visible date range (7 days from selected date)
  const startDate = dayjs(selectedDate || undefined);
  const days = Array.from({ length: 7 }, (_, i) => startDate.add(i, 'day'));

  // Group plans by date
  const plansByDate = new Map<string, MealPlanResponse[]>();
  for (const plan of plans) {
    const dateKey = dayjs(plan.plannedDate).format('YYYY-MM-DD');
    const existing = plansByDate.get(dateKey) ?? [];
    existing.push(plan);
    plansByDate.set(dateKey, existing);
  }

  // Find which dates have plans for MiniCalendar highlighting
  const plannedDates = Array.from(plansByDate.keys());

  const handleAddForDate = (date: string | null) => {
    setDefaultDate(date ?? dayjs().format('YYYY-MM-DD'));
    setEditPlan(null);
    openAdd();
  };

  const handleEdit = (plan: MealPlanResponse) => {
    setEditPlan(plan);
    setDefaultDate(dayjs(plan.plannedDate).format('YYYY-MM-DD'));
    openAdd();
  };

  const handleDelete = (planId: string) => {
    deleteMealPlan.mutate(planId);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={3}>Meal Planning</Title>
        <ActionIcon size="lg" variant="filled" onClick={() => handleAddForDate(selectedDate)}>
          <IconPlus size={20} />
        </ActionIcon>
      </Group>

      <MiniCalendar
        value={selectedDate ?? undefined}
        onChange={(date) => setSelectedDate(date)}
        date={calendarDate ?? undefined}
        onDateChange={(date) => setCalendarDate(date)}
        numberOfDays={7}
        getDayProps={(date) => ({
          style: plannedDates.includes(date) ? { fontWeight: 700 } : undefined,
        })}
      />

      <Timeline active={days.length} bulletSize={24} lineWidth={2}>
        {days.map((day) => {
          const dateKey = day.format('YYYY-MM-DD');
          const dayPlans = plansByDate.get(dateKey) ?? [];
          const isToday = day.isSame(dayjs(), 'day');

          return (
            <Timeline.Item
              key={dateKey}
              bullet={isToday ? <IconCalendarEvent size={14} /> : undefined}
              title={
                <Group gap="xs">
                  <Text fw={600} size="sm">
                    {day.format('ddd, MMM D')}
                  </Text>
                  {isToday && (
                    <Badge color="orange" variant="filled" size="xs">
                      Today
                    </Badge>
                  )}
                  <ActionIcon variant="subtle" size="xs" onClick={() => handleAddForDate(dateKey)}>
                    <IconPlus size={12} />
                  </ActionIcon>
                </Group>
              }
            >
              {dayPlans.length > 0 ? (
                dayPlans.map((plan) => (
                  <MealPlanCard
                    key={plan.id}
                    plan={plan}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRemoveItem={handleRemoveItem}
                  />
                ))
              ) : (
                <Text size="xs" c="dimmed" fs="italic" mb="xs">
                  No items planned
                </Text>
              )}
            </Timeline.Item>
          );
        })}
      </Timeline>

      <MealPlanModal
        opened={addOpened}
        onClose={() => {
          closeAdd();
          setEditPlan(null);
        }}
        householdId={householdId}
        plan={editPlan}
        defaultDate={defaultDate}
      />
    </Stack>
  );
}
