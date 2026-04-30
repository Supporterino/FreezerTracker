import { Collapse, Stack, Text, TextInput, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

/**
 * Collapsible panel for configuring the backend server URL.
 * Validates the input is a well-formed HTTP(S) URL before applying.
 */
export function ServerUrlDisclosure() {
  const [opened, { toggle }] = useDisclosure(false);
  const serverBaseUrl = useSettingsStore((s) => s.serverBaseUrl);
  const setServerBaseUrl = useSettingsStore((s) => s.setServerBaseUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleBlur = () => {
    const value = inputRef.current?.value.trim() ?? '';
    setUrlError(null);

    if (!value || value === serverBaseUrl) return;

    // Validate URL format before applying
    try {
      const parsed = new URL(value);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        setUrlError('URL must use http:// or https://');
        return;
      }
      setServerBaseUrl(value);
    } catch {
      setUrlError('Please enter a valid URL (e.g. http://localhost:3000)');
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
            description="Base URL of the FreezerMan backend"
            error={urlError}
          />
        </Stack>
      </Collapse>
    </Stack>
  );
}
