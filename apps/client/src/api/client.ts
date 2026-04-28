import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import ky, { type KyInstance } from 'ky';
import { useAuthStore } from '@/store/authStore';

// ⚠️ Do NOT import settingsStore here — circular dependency risk.
// baseUrl is injected via reinitialiseClient() called from main.tsx.

let _baseUrl = '';

let apiClient: KyInstance = buildClient(_baseUrl);

function buildClient(baseUrl: string): KyInstance {
  return ky.create({
    baseUrl: baseUrl ? `${baseUrl}/api/v1/` : 'http://localhost:3000/api/v1/',
    fetch: tauriFetch as typeof fetch,
    hooks: {
      beforeRequest: [
        ({ request }) => {
          const token = useAuthStore.getState().accessToken;
          if (token) request.headers.set('Authorization', `Bearer ${token}`);
        },
      ],
      afterResponse: [
        async ({ request, response }) => {
          if (response.status === 401) {
            const { refreshToken, setTokens, logout } = useAuthStore.getState();
            if (refreshToken) {
              try {
                const res = await tauriFetch(`${_baseUrl}/api/v1/auth/refresh`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ refreshToken }),
                });
                const refreshed = (await (res as Response).json()) as {
                  accessToken: string;
                  refreshToken: string;
                };
                setTokens(refreshed);
                const newHeaders = new Headers(request.headers);
                newHeaders.set('Authorization', `Bearer ${refreshed.accessToken}`);
                return tauriFetch(request.url, {
                  method: request.method,
                  headers: Object.fromEntries(newHeaders.entries()),
                  body: request.body ? await request.text() : undefined,
                }) as unknown as Response;
              } catch {
                // Refresh failed — force logout
              }
            }
            logout();
          }
        },
      ],
    },
  });
}

/** Must be called before the React tree mounts and again on every server URL change. */
export function reinitialiseClient(baseUrl: string): void {
  _baseUrl = baseUrl;
  apiClient = buildClient(baseUrl);
}

export { apiClient };
