import type { CompartmentResponse } from '@freezer-tracker/shared';
import { Group, Select, Stack, TextInput } from '@mantine/core';
import { DatePickerInput, type DateValue } from '@mantine/dates';
import { IconSearch } from '@tabler/icons-react';

interface ItemFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  compartmentId: string | null;
  onCompartmentChange: (v: string | null) => void;
  expiresBefore: DateValue;
  onExpiresBeforeChange: (v: DateValue) => void;
  compartments: CompartmentResponse[];
}

export function ItemFilters({
  search,
  onSearchChange,
  compartmentId,
  onCompartmentChange,
  expiresBefore,
  onExpiresBeforeChange,
  compartments,
}: ItemFiltersProps) {
  return (
    <Stack gap="xs">
      <TextInput
        placeholder="Search items..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
      />
      <Group grow>
        <Select
          placeholder="All compartments"
          clearable
          data={compartments.map((c) => ({ value: c.id, label: c.name }))}
          value={compartmentId}
          onChange={onCompartmentChange}
        />
        <DatePickerInput
          placeholder="Expiring before"
          clearable
          value={expiresBefore}
          onChange={onExpiresBeforeChange}
        />
      </Group>
    </Stack>
  );
}
