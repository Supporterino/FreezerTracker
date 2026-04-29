import { Alert, Button, Stack, Text } from '@mantine/core';
import { IconAlertCircle, IconCamera } from '@tabler/icons-react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { useEffect, useRef, useState } from 'react';

interface QRScannerProps {
  onScan: (code: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  const startScanning = async () => {
    setError(null);
    setScanning(true);

    try {
      const codeReader = new BrowserQRCodeReader();
      const controls = await codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result, err) => {
          if (result) {
            controlsRef.current?.stop();
            setScanning(false);
            onScan(result.getText());
          } else if (err && !(err instanceof Error && err.name === 'NotFoundException')) {
            // NotFoundException fires every frame when no QR is visible — ignore it
            controlsRef.current?.stop();
            setScanning(false);
            setError('Failed to read camera stream. Please try again.');
          }
        },
      );
      controlsRef.current = controls;
    } catch (err) {
      const name = err instanceof Error ? err.name : '';
      let message = 'Failed to start camera. Please try again.';
      if (name === 'NotAllowedError') {
        message = 'Camera access was denied. Please allow camera access in Settings and try again.';
      } else if (name === 'NotFoundError') {
        message = 'No camera was found on this device.';
      } else if (name === 'NotSupportedError' || name === 'SecurityError') {
        message =
          'Camera access is not supported in this context. Make sure the app has camera permission in iOS Settings.';
      } else if (name === 'NotReadableError' || name === 'AbortError') {
        message = 'Camera is in use by another app. Please close other apps and try again.';
      }
      setError(message);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    controlsRef.current?.stop();
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  return (
    <Stack gap="sm">
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" title="Camera error">
          {error}
        </Alert>
      )}

      {scanning ? (
        <Stack align="center" gap="sm">
          <video
            ref={videoRef}
            style={{ width: '100%', maxWidth: 320, borderRadius: 8 }}
            muted
            playsInline
          />
          <Text size="sm" c="dimmed">
            Point camera at QR code...
          </Text>
          <Button variant="default" size="sm" onClick={stopScanning}>
            Cancel
          </Button>
        </Stack>
      ) : (
        <Button leftSection={<IconCamera size={16} />} variant="light" onClick={startScanning}>
          Scan QR code
        </Button>
      )}
    </Stack>
  );
}
