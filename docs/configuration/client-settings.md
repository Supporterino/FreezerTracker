# Client Settings

The FreezerMan client (Tauri desktop and iOS app) has one configurable setting: the **Server URL**.

All other preferences (display options, notification settings, etc.) are managed through the standard in-app UI and do not require manual configuration.

## Server URL

The Server URL tells the client where the FreezerMan API is running. Every API call the client makes uses this as its base URL.

| Property | Value |
|----------|-------|
| Default | `http://localhost:3000` |
| Set via | Settings / Profile page |
| Storage | Tauri secure store (OS keychain on macOS, Secure Enclave on iOS) |
| Persists | Yes -- survives app restarts and updates |

### Development

The default value (`http://localhost:3000`) works out of the box when running the server locally with `pnpm dev`.

### Production

For production deployments, the Server URL must point to your server behind a reverse proxy:

```
https://api.freezerman.example.com
```

> **Note:** Use an HTTPS URL in production. The client will make API calls to this URL, and mobile platforms (iOS in particular) enforce App Transport Security, which blocks plaintext HTTP by default.

## How to Change the Server URL

1. Open the app and navigate to the **Profile** page (tap your avatar or go to Settings).
2. Locate the **Server URL** disclosure group and expand it.
3. Enter the new URL (e.g. `https://api.freezerman.example.com`).
4. Tap **Save**.

The client validates the URL format before saving. After saving, all subsequent API calls will use the new base URL immediately -- no restart required.

## Storage Details

The Server URL is stored in the **Tauri secure store**, which maps to platform-native secure storage:

| Platform | Backend |
|----------|---------|
| macOS | Keychain |
| iOS | Secure Enclave / Keychain |

This means:

- The value is encrypted at rest by the operating system.
- It is not accessible to other applications.
- It persists across app restarts, updates, and re-installs (on macOS; iOS keychain behaviour on uninstall depends on the entitlement configuration).
- You cannot read or edit it by modifying a config file -- use the in-app UI.
