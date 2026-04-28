import { Group, Select, TextInput } from '@mantine/core';
import { DatePickerInput, type DateValue } from '@mantine/dates';
import { IconSearch } from '@tabler/icons-react';
import type { CompartmentResponse } from '@freezer-tracker/shared';

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
    <Group>
      <TextInput
        placeholder="Search items..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        style={{ flex: 1, minWidth: 160 }}
      />
      <Select
        placeholder="All compartments"
        clearable
        data={compartments.map((c) => ({ value: c.id, label: c.name }))}
        value={compartmentId}
        onChange={onCompartmentChange}
        style={{ minWidth: 160 }}
      />
      <DatePickerInput
        placeholder="Expiring before"
        clearable
        value={expiresBefore}
        onChange={onExpiresBeforeChange}
        style={{ minWidth: 160 }}
      />
    </Group>
  );
}
