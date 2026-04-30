import { Alert, Button, Stack, Text } from '@mantine/core';
import { IconAlertCircle, IconCamera } from '@tabler/icons-react';
import { BrowserQRCodeReader } from '@zxing/browser';
import { useCallback, useEffect, useRef, useState } from 'react';

interface QRScannerProps {
  onScan: (code: string) => void;
}

/**
 * Returns true when running inside a Tauri iOS WKWebView.
 *
 * WKWebView does not support navigator.mediaDevices.getUserMedia,
 * so we must use the native barcode-scanner plugin on iOS.
 */
function isNativeMobile(): boolean {
  // Tauri injects __TAURI_INTERNALS__ into the webview.
  // Combined with a mobile user-agent check, this reliably detects
  // iOS (or Android in the future) vs. macOS desktop.
  const hasTauri = '__TAURI_INTERNALS__' in window;
  const isMobileUA = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return hasTauri && isMobileUA;
}

/**
 * Uses the native Tauri barcode-scanner plugin.
 * This opens a full-screen native camera overlay managed by the OS,
 * returning the scanned content as a string.
 */
async function scanWithNativePlugin(): Promise<string> {
  const { scan, Format } = await import('@tauri-apps/plugin-barcode-scanner');
  const result = await scan({ formats: [Format.QRCode], cameraDirection: 'back' });
  return result.content;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  const stopScanning = useCallback(() => {
    controlsRef.current?.stop();
    setScanning(false);
  }, []);

  const startBrowserScanning = async () => {
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

  const startNativeScanning = async () => {
    try {
      const code = await scanWithNativePlugin();
      setScanning(false);
      onScan(code);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to scan QR code. Please try again.';

      // The user cancelled the native scanner — not an error
      if (message.toLowerCase().includes('cancel')) {
        setScanning(false);
        return;
      }

      setError(message);
      setScanning(false);
    }
  };

  const startScanning = async () => {
    setError(null);
    setScanning(true);

    if (isNativeMobile()) {
      await startNativeScanning();
    } else {
      await startBrowserScanning();
    }
  };

  useEffect(() => {
    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  // On native mobile the plugin opens its own full-screen camera overlay,
  // so we only render a video element on desktop.
  const showVideoPreview = scanning && !isNativeMobile();

  return (
    <Stack gap="sm">
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" title="Camera error">
          {error}
        </Alert>
      )}

      {scanning ? (
        <Stack align="center" gap="sm">
          {showVideoPreview && (
            <video
              ref={videoRef}
              style={{ width: '100%', maxWidth: 320, borderRadius: 8 }}
              muted
              playsInline
            />
          )}
          <Text size="sm" c="dimmed">
            {isNativeMobile() ? 'Opening camera...' : 'Point camera at QR code...'}
          </Text>
          {!isNativeMobile() && (
            <Button variant="default" size="sm" onClick={stopScanning}>
              Cancel
            </Button>
          )}
        </Stack>
      ) : (
        <Button leftSection={<IconCamera size={16} />} variant="light" onClick={startScanning}>
          Scan QR code
        </Button>
      )}
    </Stack>
  );
}
