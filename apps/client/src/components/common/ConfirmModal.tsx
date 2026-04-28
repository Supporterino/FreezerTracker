import { Button, Group, Modal, Text } from '@mantine/core';

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  loading?: boolean;
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} size="sm">
      <Text size="sm">{message}</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  );
}
