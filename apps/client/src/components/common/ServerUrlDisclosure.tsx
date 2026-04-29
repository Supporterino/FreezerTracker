import { Collapse, Stack, Text, TextInput, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

export function ServerUrlDisclosure() {
  const [opened, { toggle }] = useDisclosure(false);
  const serverBaseUrl = useSettingsStore((s) => s.serverBaseUrl);
  const setServerBaseUrl = useSettingsStore((s) => s.setServerBaseUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    const value = inputRef.current?.value.trim() ?? '';
    if (value && value !== serverBaseUrl) {
      setServerBaseUrl(value);
    }
  };

  return (
    <Stack gap={0}>
      <UnstyledButton onClick={toggle} style={{ alignSelf: 'center' }}>
        <Text size="xs" c="dimmed" td="underline">
          {opened ? 'Hide server settings' : 'Advanced / Server settings'}
        </Text>
      </UnstyledButton>
      <Collapse expanded={opened}>
        <Stack gap="xs" pt="sm">
          <TextInput
            ref={inputRef}
            label="Server URL"
            placeholder="http://localhost:3000"
            defaultValue={serverBaseUrl}
            onBlur={handleBlur}
            description="Base URL of the FreezerTracker backend"
          />
        </Stack>
      </Collapse>
    </Stack>
  );
}
