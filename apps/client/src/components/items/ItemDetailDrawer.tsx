import { Button, Divider, Drawer, Group, Loader, ScrollArea, Stack, Table, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import type { FreezerItemResponse, CompartmentResponse } from '@freezer-tracker/shared';
import { ChangeHistoryList } from '@/components/history/ChangeHistoryList';
import { useChangeLog } from '@/hooks/useChangeLog';
import { ItemModal } from './ItemModal';

interface ItemDetailDrawerProps {
  item: FreezerItemResponse | null;
  compartment?: CompartmentResponse;
  householdId: string;
  opened: boolean;
  onClose: () => void;
}

export function ItemDetailDrawer({
  item,
  compartment,
  householdId,
  opened,
  onClose,
}: ItemDetailDrawerProps) {
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);

  const { data: history, isLoading: historyLoading } = useChangeLog(
    householdId,
    item?.id ?? ''
  );

  if (!item) return null;

  const handleEdit = () => {
    onClose();
    openEdit();
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={onClose}
        title={item.name}
        position="right"
        size="md"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Stack gap="md">
          <Group justify="flex-end">
            <Button variant="light" size="sm" onClick={handleEdit}>
              Edit
            </Button>
          </Group>

          <Table variant="vertical">
            <Table.Tbody>
              {compartment && (
                <Table.Tr>
                  <Table.Th w={130}>Compartment</Table.Th>
                  <Table.Td>{compartment.name}</Table.Td>
                </Table.Tr>
              )}
              <Table.Tr>
                <Table.Th>Quantity</Table.Th>
                <Table.Td>{item.quantity}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Stored</Table.Th>
                <Table.Td>{dayjs(item.storedAt).format('D MMM YYYY')}</Table.Td>
              </Table.Tr>
              {item.expiresAt && (
                <Table.Tr>
                  <Table.Th>Expires</Table.Th>
                  <Table.Td>{dayjs(item.expiresAt).format('D MMM YYYY')}</Table.Td>
                </Table.Tr>
              )}
              {item.notes && (
                <Table.Tr>
                  <Table.Th>Notes</Table.Th>
                  <Table.Td>{item.notes}</Table.Td>
                </Table.Tr>
              )}
              <Table.Tr>
                <Table.Th>Added by</Table.Th>
                <Table.Td>{item.createdBy.name}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>

          <Divider />

          <Title order={5}>Change History</Title>

          {historyLoading ? (
            <Loader size="sm" />
          ) : (
            <ChangeHistoryList entries={history ?? []} />
          )}
        </Stack>
      </Drawer>

      <ItemModal
        opened={editOpened}
        onClose={closeEdit}
        householdId={householdId}
        item={item}
        defaultFreezerId={item.freezerId}
      />
    </>
  );
}
