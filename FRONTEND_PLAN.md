# Freezer Tracker — Frontend Detailed Creation Plan

## 0. Decisions Reference

| Topic | Decision |
|---|---|
| Framework | React **19.2.5** inside Tauri v2 webview |
| UI library | Mantine **9.1.1** (`@mantine/core`, `@mantine/hooks`, `@mantine/notifications`, `@mantine/dates`) |
| Routing | TanStack Router **1.168.x** (type-safe, file-based) |
| Server state | TanStack Query **5.100.x** |
| Client state | Zustand **5.0.12** |
| Forms | React Hook Form **7.74.0** + Zod **3.x** (see note below) |
| Icons | `@tabler/icons-react` **3.41.1** |
| QR display | `qrcode.react` **4.2.0** |
| QR scan | `@zxing/browser` **0.2.0** (webview camera access) |
| HTTP client | `ky` **2.0.2** |
| Build | Vite **8.0.10** (via Tauri) |
| Color scheme | Dark/light + OS preference via Mantine `ColorSchemeScript` |
| Primary color | Blue (Mantine default) |
| Item layout | Card grid (compartment shown as badge) |
| Add/edit UX | Centered Modal |
| Mobile nav | AppShell Burger → full-height Drawer |
| Desktop nav | Left sidebar with nested NavLinks (households → freezers) |
| Server URL | In-app settings screen; stored via `@tauri-apps/plugin-store` **2.4.2** |
| Expiry cues | Coloured Badge on each item card |
| Notifications | `@mantine/notifications` (toast system) |
| Tauri | `@tauri-apps/api` **2.10.1** + `@tauri-apps/plugin-store` **2.4.2** |
| Language | TypeScript **6.0.3** strict mode |

> **Zod version note:** Zod **4.x** (latest: 4.3.6) is a new major release with breaking
> changes. `@hookform/resolvers` **5.2.2** supports Zod 4, but many ecosystem packages still
> expect Zod 3. **Pin Zod to `3.x`** (`zod@^3.24.0`, latest 3.x is **3.25.x**) unless all
> dependencies have been verified against Zod 4. Check `@hookform/resolvers` changelog before
> upgrading.

---

## 1. Project Bootstrap

### 1.1 Scaffold Tauri v2 + React app

All commands in this section are run from the **monorepo root** unless stated otherwise.
The `apps/` directory must already exist (created as part of the monorepo bootstrap in
`BACKEND_PLAN.md` step 1). The Tauri scaffold command must be run from inside `apps/` so
that the project is created at `apps/client/`:

```bash
# Run from monorepo root
mkdir -p apps
cd apps
bunx create-tauri-app client \
  --template react-ts \
  --manager bun
cd ..   # return to monorepo root before any further bun install calls
```

Like the server, all `bun install` calls must be run from the **monorepo root** so that Bun
workspaces correctly link `packages/shared` into both `apps/client` and `apps/server`.
Never run `bun install` from inside `apps/client` in isolation.

This scaffolds `apps/client/` with:
- `src/` — React entry point
- `src-tauri/` — Rust Tauri shell
- `vite.config.ts`
- `index.html`

### 1.2 Install frontend dependencies

**Runtime** (pin to these versions):
- `@mantine/core@9` `@mantine/hooks@9` `@mantine/notifications@9` `@mantine/dates@9`
- `@mantine/form@9` — used only for minor form wiring; primary form lib is RHF
- `@tabler/icons-react@3`
- `@tanstack/react-router@1` `@tanstack/react-query@5` `@tanstack/react-query-devtools@5`
- `zustand@5`
- `react-hook-form@7` `zod@^3.24.0` `@hookform/resolvers@3` — **pin Zod to v3**, see version note above
- `ky@2`
- `qrcode.react@4`
- `@zxing/browser@0.2`
- `dayjs@1` — required by `@mantine/dates`
- `@tauri-apps/plugin-store@2` — secure key-value store
- `@tauri-apps/api@2` — Tauri JS API

**Dev**:
- `@tanstack/router-plugin@1` — Vite plugin for file-based routing
- `@types/react@19` `@types/react-dom@19`
- `vite@8` `@vitejs/plugin-react@6`
- `typescript@6`
- `postcss` `postcss-preset-mantine@1`

### 1.3 `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Must match the tsconfig.json path alias so Vite resolves shared types at runtime
      '@freezer-tracker/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  server: { port: 1420, strictPort: true },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
  },
});
```

### 1.4 `src/main.tsx`

Token and settings rehydration from Tauri Store is **async**. The app must await this before
calling `createRoot()` to prevent a flash-redirect to `/login` on every cold start. A minimal
CSS spinner in `index.html` covers the ~50 ms wait.

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen'; // auto-generated by TanStack Router
import { theme } from './theme';
import { tauriStore } from '@/lib/tauriStore';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
// Note: @/api/client is imported dynamically inside rehydrate() to avoid circular deps
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient } });

async function rehydrate(): Promise<void> {
  // Import reinitialiseClient here to avoid a top-level circular dependency
  // between client.ts and settingsStore.ts (see §4 for full explanation).
  const { reinitialiseClient } = await import('@/api/client');

  // 1. Server URL — must be first so ky is ready before any API call
  const savedUrl = await tauriStore.get<string>('serverBaseUrl');
  const baseUrl = savedUrl ?? '';
  useSettingsStore.getState().setServerBaseUrl(baseUrl);
  reinitialiseClient(baseUrl);

  // 2. Auth tokens
  const accessToken = await tauriStore.get<string>('accessToken');
  const refreshToken = await tauriStore.get<string>('refreshToken');
  if (accessToken && refreshToken) {
    useAuthStore.getState().setTokens({ accessToken, refreshToken });
  }
}

rehydrate().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <ColorSchemeScript defaultColorScheme="auto" />
          <Notifications position="top-right" autoClose={4000} />
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryClientProvider>
    </StrictMode>
  );
});
```

Add a minimal spinner to `index.html` inside `<div id="root">` so the page is not blank during
the rehydration await:

```html
<div id="root">
  <div style="display:flex;height:100vh;align-items:center;justify-content:center">
    <div style="width:32px;height:32px;border:3px solid #228be6;border-top-color:transparent;border-radius:50%;animation:spin 0.6s linear infinite"></div>
  </div>
  <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
</div>
```

### 1.5 `src/theme.ts`

Create a Mantine theme extension:

```typescript
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily: 'Inter, sans-serif',
  components: {
    Card: { defaultProps: { withBorder: true, shadow: 'sm', radius: 'md' } },
    Modal: { defaultProps: { centered: true, overlayProps: { blur: 3 } } },
  },
});
```

---

## 2. Tauri Plugin Configuration

### 2.1 Enable `plugin-store` in `src-tauri/Cargo.toml`

Add `tauri-plugin-store` as a dependency and register it in `src-tauri/src/main.rs`:

```rust
tauri::Builder::default()
    .plugin(tauri_plugin_store::Builder::default().build())
    .run(tauri::generate_context!())
    .expect("error running app");
```

### 2.2 Enable camera plugin for QR scanning

Add `tauri-plugin-camera` (or use `@tauri-apps/plugin-camera`) in `Cargo.toml` and configure
permissions in `src-tauri/capabilities/default.json` to allow `camera:allow-open` and `store:allow-*`.

### 2.3 `src-tauri/tauri.conf.json`

Key settings:
- `identifier`: `com.freezertracker.app`
- `window.title`: `Freezer Tracker`
- `window.minWidth`: 800 (desktop only)
- `security.csp`: restrict to `default-src 'self' https:` — the server URL is user-supplied at
  runtime so CSP must allow `https:` wildcards

---

## 3. Directory Structure (`apps/client/src/`)

```
src/
├── main.tsx                    ← App entry point
├── theme.ts                    ← Mantine theme
├── routeTree.gen.ts            ← Auto-generated by TanStack Router
│
├── routes/                     ← File-based routes (TanStack Router)
│   ├── __root.tsx              ← Root layout
│   ├── index.tsx               ← Redirect to /login or /households
│   ├── login.tsx
│   ├── register.tsx
│   ├── households/
│   │   ├── index.tsx           ← Household picker
│   │   ├── new.tsx             ← Create household
│   │   └── $hid/
│   │       ├── __layout.tsx    ← AppShell with sidebar (authenticated layout)
│   │       ├── overview.tsx    ← Dashboard
│   │       ├── items/
│   │       │   ├── index.tsx   ← Full item list
│   │       │   └── $iid.tsx    ← Item detail (opens modal, but has own route)
│   │       ├── freezers/
│   │       │   └── $fid.tsx    ← Freezer card grid view
│   │       ├── archive.tsx     ← Soft-deleted items
│   │       └── settings.tsx    ← Household settings + invite QR
│   └── profile.tsx             ← User profile / account
│
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx       ← AppShell wrapper with navbar + header
│   │   ├── Sidebar.tsx         ← NavLink tree: households → freezers
│   │   ├── Header.tsx          ← Top bar with user menu + dark mode toggle
│   │   └── MobileNavBurger.tsx ← Burger button for mobile
│   │
│   ├── items/
│   │   ├── ItemCard.tsx        ← Mantine Card for a single freezer item
│   │   ├── ItemGrid.tsx        ← SimpleGrid of ItemCards with filters
│   │   ├── ItemModal.tsx       ← Add/Edit modal (React Hook Form)
│   │   ├── ItemDetailDrawer.tsx← Full item detail + history (right Drawer)
│   │   ├── ItemFilters.tsx     ← Search + filter controls
│   │   └── ExpiryBadge.tsx     ← Badge with colour logic (green/yellow/red)
│   │
│   ├── freezers/
│   │   ├── FreezerCard.tsx     ← Summary card on overview
│   │   └── FreezerModal.tsx    ← Add/Edit freezer modal
│   │
│   ├── compartments/
│   │   └── CompartmentModal.tsx← Add/Edit compartment modal
│   │
│   ├── households/
│   │   ├── HouseholdModal.tsx  ← Create household modal
│   │   ├── MemberList.tsx      ← Members table with remove action
│   │   ├── InviteQRPanel.tsx   ← Generate + display QR code
│   │   └── QRScanner.tsx       ← Camera-based QR code scanner
│   │
│   ├── history/
│   │   └── ChangeHistoryList.tsx ← Timeline of ItemChangeLog entries
│   │
│   └── common/
│       ├── ConfirmModal.tsx    ← Reusable "are you sure?" modal
│       ├── EmptyState.tsx      ← Illustrated empty state placeholder
│       ├── LoadingSpinner.tsx  ← Centered Mantine Loader
│       └── ErrorBoundary.tsx   ← React error boundary
│
├── api/                        ← All HTTP layer
│   ├── client.ts               ← ky instance with base URL + auth header injection
│   ├── auth.ts                 ← Auth API functions
│   ├── households.ts
│   ├── invites.ts
│   ├── freezers.ts
│   ├── compartments.ts
│   ├── items.ts
│   └── users.ts
│
├── hooks/                      ← TanStack Query hooks
│   ├── useAuth.ts
│   ├── useHouseholds.ts
│   ├── useFreezer.ts
│   ├── useCompartments.ts
│   ├── useItems.ts
│   └── useChangeLog.ts
│
├── store/                      ← Zustand store slices
│   ├── authStore.ts            ← tokens, currentUser
│   ├── householdStore.ts       ← activeHouseholdId, activeFreezer
│   └── settingsStore.ts        ← serverBaseUrl, colorScheme override
│
└── lib/
    ├── tauriStore.ts           ← @tauri-apps/plugin-store helpers (get/set typed values)
    └── expiryUtils.ts          ← Date diff helpers for expiry badge colour
```

---

## 4. API Client (`src/api/client.ts`)

The client is a **module-level singleton** — a single `ky` instance exported from `client.ts`
and imported directly by every `src/api/*.ts` file. When the user changes the server URL in
Settings, the singleton is replaced in-place by calling `reinitialiseClient()`.

> **Circular import warning:** `client.ts` must **not** import from `settingsStore.ts`, and
> `settingsStore.ts` must **not** import from `client.ts` at the module level. If either file
> imports the other at the top level, the bundler will resolve one of them as `undefined` at
> startup. The solution is: `client.ts` initialises with an empty `baseUrl` and `main.tsx`
> always calls `reinitialiseClient(url)` explicitly before mounting the React tree.
> `settingsStore.ts` calls `reinitialiseClient` by importing it lazily inside the action body,
> which is safe because by the time any action runs, all modules are fully loaded.

```typescript
import ky, { type KyInstance } from 'ky';
import { useAuthStore } from '@/store/authStore';
// ⚠️ Do NOT import settingsStore here — circular dependency risk.
// baseUrl is injected via reinitialiseClient() called from main.tsx.

let _baseUrl = '';   // set before first render by main.tsx

// Module-level singleton — all src/api/*.ts files import `apiClient`
let apiClient: KyInstance = buildClient(_baseUrl);

function buildClient(baseUrl: string): KyInstance {
  return ky.create({
    prefixUrl: baseUrl ? `${baseUrl}/api/v1` : '/',
    hooks: {
      beforeRequest: [
        (request) => {
          const token = useAuthStore.getState().accessToken;
          if (token) request.headers.set('Authorization', `Bearer ${token}`);
        },
      ],
      afterResponse: [
        async (request, _options, response) => {
          if (response.status === 401) {
            const { refreshToken, setTokens, logout } = useAuthStore.getState();
            if (refreshToken) {
              try {
                // Use bare ky (not apiClient) to avoid interceptor loop
                const refreshed = await ky.post(`${_baseUrl}/api/v1/auth/refresh`, {
                  json: { refreshToken },
                }).json<{ accessToken: string; refreshToken: string }>();
                setTokens(refreshed);
                request.headers.set('Authorization', `Bearer ${refreshed.accessToken}`);
                return ky(request);
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
```

**Usage in every `src/api/*.ts` file:**

```typescript
import { apiClient } from '@/api/client';
import type { FreezerItemResponse, CreateItemDto, PaginatedResponse, ItemQueryDto } from '@freezer-tracker/shared';

export const itemsApi = {
  list: (householdId: string, params: ItemQueryDto) =>
    apiClient.get(`households/${householdId}/items`, { searchParams: params as Record<string, string> })
      .json<PaginatedResponse<FreezerItemResponse>>(),

  create: (householdId: string, dto: CreateItemDto) =>
    apiClient.post(`households/${householdId}/items`, { json: dto })
      .json<FreezerItemResponse>(),
  // ... etc
};
```

**`settingsStore.ts` — import `reinitialiseClient` inside the action, not at the top level:**

```typescript
// ✅ Lazy import inside action body — safe, no circular dependency
setServerBaseUrl: (url) => {
  set({ serverBaseUrl: url });
  tauriStore.set('serverBaseUrl', url);
  // Import inside the action to avoid a circular module reference at load time
  import('@/api/client').then(({ reinitialiseClient }) => reinitialiseClient(url));
  // NOTE: queryClient is NOT accessible here (it lives in main.tsx).
  // queryClient.clear() must be called at the UI call site after setServerBaseUrl returns.
},
```

**In the settings save handler (UI layer) — call `queryClient.clear()` there:**

```typescript
// In the profile route or settings form submit handler:
import { useQueryClient } from '@tanstack/react-query';
import { useSettingsStore } from '@/store/settingsStore';
import { useNavigate } from '@tanstack/react-router';

const queryClient = useQueryClient();   // accessible inside React component
const navigate = useNavigate();
const setServerBaseUrl = useSettingsStore(s => s.setServerBaseUrl);

function handleSave(url: string) {
  setServerBaseUrl(url);        // persists + reinitialises ky client
  queryClient.clear();          // purge all cached server data
  navigate({ to: '/login' });   // force re-authentication against new server
}
```

**`main.tsx` — always call `reinitialiseClient` explicitly before mounting:**

```typescript
async function rehydrate(): Promise<void> {
  const { reinitialiseClient } = await import('@/api/client');

  // 1. Server URL — must be set first so the client is ready before auth rehydration
  const savedUrl = await tauriStore.get<string>('serverBaseUrl');
  const baseUrl = savedUrl ?? '';
  useSettingsStore.getState().setServerBaseUrl(baseUrl); // persists to store
  reinitialiseClient(baseUrl);                            // builds the ky instance

  // 2. Auth tokens
  const accessToken = await tauriStore.get<string>('accessToken');
  const refreshToken = await tauriStore.get<string>('refreshToken');
  if (accessToken && refreshToken) {
    useAuthStore.getState().setTokens({ accessToken, refreshToken });
  }
}
```

---

## 5. Zustand Stores

### `authStore.ts`

```typescript
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  currentUser: UserResponse | null;
  setTokens: (tokens: TokenResponse) => void;
  setUser: (user: UserResponse) => void;
  logout: () => void;
}
```

On `setTokens`: save both tokens to Tauri Store (`tauriStore.set('accessToken', ...)`,
`tauriStore.set('refreshToken', ...)`).

On `logout`: clear store + Tauri Store + navigate to `/login`.

On app start (`main.tsx`): read tokens from Tauri Store and rehydrate Zustand before the router
renders.

### `householdStore.ts`

```typescript
interface HouseholdState {
  activeHouseholdId: string | null;
  activeFreezerIdMap: Record<string, string>; // householdId → last selected freezerId
  setActiveHousehold: (id: string) => void;
  setActiveFreezer: (householdId: string, freezerId: string) => void;
}
```

Persisted to Tauri Store so the user returns to the same context after restart.

### `settingsStore.ts`

```typescript
interface SettingsState {
  serverBaseUrl: string;
  setServerBaseUrl: (url: string) => void;
}
```

Persisted to Tauri Store.

---

## 6. TanStack Query Hooks

Each hook file exports query + mutation hooks. Example pattern for items:

### `useItems.ts`

`queryClient` is **not** available as a module-level variable in hook files — calling
`useQueryClient()` at the top level of a non-component file violates React hook rules.
Use TanStack Query's `useMutation` `onSuccess` callback which receives the `QueryClient`
via the mutation context, or obtain it with `useQueryClient()` inside the hook function body.
The pattern below uses `useQueryClient()` inside each mutation hook:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { itemsApi } from '@/api/items';
import type { CreateItemDto, UpdateItemDto, ItemQueryDto } from '@freezer-tracker/shared';

// Query: list active items
export const useItems = (householdId: string, filters: ItemQueryDto) =>
  useQuery({
    queryKey: ['items', householdId, filters],
    queryFn: () => itemsApi.list(householdId, filters),
    enabled: !!householdId,
  });

// Query: archived items
export const useArchivedItems = (householdId: string) =>
  useQuery({
    queryKey: ['items', householdId, 'archive'],
    queryFn: () => itemsApi.listArchive(householdId),
  });

// Query: single item
export const useItem = (householdId: string, itemId: string) =>
  useQuery({
    queryKey: ['items', householdId, itemId],
    queryFn: () => itemsApi.get(householdId, itemId),
  });

// Mutation: create
export const useCreateItem = (householdId: string) => {
  const queryClient = useQueryClient();   // ✅ called inside a hook function — valid
  return useMutation({
    mutationFn: (dto: CreateItemDto) => itemsApi.create(householdId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', householdId] });
      notifications.show({ title: 'Item added', message: 'Item was added to the freezer', color: 'green' });
    },
  });
};

// Mutation: update (also invalidates history)
export const useUpdateItem = (householdId: string, itemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateItemDto) => itemsApi.update(householdId, itemId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items', householdId] });
      queryClient.invalidateQueries({ queryKey: ['items', householdId, itemId] });
    },
  });
};

// Mutation: soft delete
export const useDeleteItem = (householdId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => itemsApi.softDelete(householdId, itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['items', householdId] }),
  });
};
```

Follow the same pattern for all mutation hooks in `useHouseholds`, `useFreezer`,
`useCompartments`, `useChangeLog`, `useAuth` — always call `useQueryClient()` inside
the hook function body, never at module scope.

---

## 7. Route & Layout Implementation

### 7.1 `routes/__root.tsx`

- Renders `<Outlet />` only — all layout is inside the authenticated layout route
- Token rehydration is **not** done here — it is completed in `main.tsx` before `createRoot()` is called (see §1.4). By the time any route renders, the Zustand stores are already populated.
- Adds a `beforeLoad` guard that reads `accessToken` from the **already-rehydrated** Zustand `authStore`. If the token is absent (user has never logged in or has logged out), redirect to `/login`. This is a fast synchronous check — no Tauri Store reads happen here.

### 7.2 `routes/login.tsx` and `routes/register.tsx`

- Full-page centered Mantine `Paper` card (no AppShell)
- React Hook Form + Zod schemas from `@freezer-tracker/shared`
- On successful login: store tokens → redirect to `/households`
- Show `@mantine/notifications` toast on error (e.g. "Invalid credentials")

### 7.3 `routes/households/$hid/__layout.tsx` — Authenticated Shell

Wraps all household-level routes in `AppLayout`:

```tsx
<AppShell
  header={{ height: 60 }}
  navbar={{
    width: { sm: 260, lg: 300 },
    breakpoint: 'sm',
    collapsed: { mobile: !navOpened },
  }}
  padding="md"
>
  <AppShell.Header><Header /></AppShell.Header>
  <AppShell.Navbar>
    <AppShell.Section grow component={ScrollArea}>
      <Sidebar />
    </AppShell.Section>
  </AppShell.Navbar>
  <AppShell.Main><Outlet /></AppShell.Main>
</AppShell>
```

`beforeLoad` guard: verify `accessToken` in Zustand; if missing, redirect to `/login`.

### 7.4 `routes/households/$hid/freezers/$fid.tsx` — Freezer Card Grid

Layout:
1. `Breadcrumbs`: `Household name > Freezer name`
2. `ItemFilters` bar: `TextInput` (search), `Select` (compartment filter),
   `DatePickerInput` (expiring before)
3. `SimpleGrid` (cols: `{ base: 1, sm: 2, md: 3, lg: 4 }`) of `ItemCard`
4. Floating `ActionIcon` (bottom-right, `+` icon) opens `ItemModal` for creation

### 7.5 `routes/households/$hid/overview.tsx` — Dashboard

Grid of `FreezerCard` components — each shows freezer name, item count, and count of
expiring-soon items (orange badge). Clicking a card navigates to that freezer's route.

### 7.6 `routes/households/$hid/settings.tsx` — Household Settings

Sections (using Mantine `Tabs`):

- **General** — rename household form, transfer ownership `Select` + button, delete household
  (red confirm)
- **Members** — `MemberList` (Mantine `Table`): avatar, name, email, role badge, remove button
- **Invite** — `InviteQRPanel`: "Generate invite" button → shows QR code + code text + copy
  button + expiry; list of active invites below

### 7.7 `routes/profile.tsx`

- Update name form
- Delete account section (with confirm modal)
- Server URL settings form
- Join household section: text input for invite code + `QRScanner` component

---

## 8. Key Component Specifications

### 8.1 `ItemCard.tsx`

```
┌─────────────────────────────────────┐
│  [Compartment badge]   [Expiry badge]│  ← top row badges
│                                     │
│  Item Name (fw={600}, size="md")    │
│  Quantity (c="dimmed", size="sm")   │
│                                     │
│  Stored: Jan 3, 2026                │
│                                     │
│  [Notes icon if notes present]      │
│─────────────────────────────────────│
│ [Edit icon]            [Delete icon]│  ← Card.Section with inheritPadding
└─────────────────────────────────────┘
```

- Clicking the card body opens `ItemDetailDrawer` (right-side `Drawer`)
- Clicking Edit icon opens `ItemModal` pre-filled with item data
- Clicking Delete icon opens `ConfirmModal`; on confirm calls `useDeleteItem`

**Expiry badge logic** (from `expiryUtils.ts`):
- No expiry date → no badge
- More than 30 days → `Badge color="green"` showing date
- 7–30 days → `Badge color="yellow"` showing "X days left"
- Under 7 days → `Badge color="orange"` showing "X days left"
- Expired → `Badge color="red"` showing "Expired"

### 8.2 `ItemModal.tsx`

Mantine `Modal` (`size="md"`, `centered`) containing a React Hook Form:

| Field | Mantine Component | Notes |
|---|---|---|
| Name | `TextInput` | Required, autofocus (`data-autofocus`) |
| Quantity | `TextInput` | Required, free-text |
| Freezer | `Select` | Pre-filled from current route context |
| Compartment | `Select` | Filtered by selected freezer, updates on freezer change |
| Stored date | `DatePickerInput` | Defaults to today |
| Expiry date | `DatePickerInput` | Optional, `clearable`, `dropdownType="modal"` on mobile |
| Notes | `Textarea` | Optional, `autosize` |

Footer: "Cancel" (`variant="default"`) + "Save" (`variant="filled"`) buttons in a
`Group justify="flex-end"`.

On submit: call `useCreateItem` or `useUpdateItem`. Show `notifications.show` on success/error.

### 8.3 `ItemDetailDrawer.tsx`

Right-side `Drawer` (`position="right"`, `size="md"`,
`scrollAreaComponent={ScrollArea.Autosize}`):

- Header: item name + close button
- Body sections using vertical `Table` (`variant="vertical"`) for metadata display:
  - Freezer, compartment, quantity, stored date, expiry
  - Notes (if present)
- "Edit" button → closes drawer, opens `ItemModal`
- `Divider` + "Change History" heading
- `ChangeHistoryList` — scrollable list of `ItemChangeLog` entries

### 8.4 `Sidebar.tsx`

Mantine `NavLink` nested structure:

```tsx
{households.map(h => (
  <NavLink
    key={h.id}
    label={h.name}
    leftSection={<IconHome size={16} />}
    defaultOpened={h.id === activeHouseholdId}
    active={h.id === activeHouseholdId}
  >
    {freezers[h.id].map(f => (
      <NavLink
        key={f.id}
        label={f.name}
        leftSection={<IconSnowflake size={16} />}
        active={currentFreezer === f.id}
        component={Link}
        to={`/households/${h.id}/freezers/${f.id}`}
        childrenOffset={28}
      />
    ))}
    <NavLink label="All items"  leftSection={<IconList size={16} />}    component={Link} to={`/households/${h.id}/items`} />
    <NavLink label="Archive"    leftSection={<IconArchive size={16} />}  component={Link} to={`/households/${h.id}/archive`} />
    <NavLink label="Settings"   leftSection={<IconSettings size={16} />} component={Link} to={`/households/${h.id}/settings`} />
  </NavLink>
))}
```

Bottom section (inside non-grow `AppShell.Section`): link to `/profile` with user avatar
(`Avatar` with initials fallback) + display name.

### 8.5 `Header.tsx`

```
┌─────────────────────────────────────────────────────┐
│ [Burger (hiddenFrom="sm")] [Logo / App name]        │
│                              [ColorScheme] [Avatar] │
└─────────────────────────────────────────────────────┘
```

- `Burger` uses `useDisclosure` to toggle sidebar on mobile; hidden on `sm+` with `hiddenFrom="sm"`
- `ActionIcon` for color scheme toggle using Mantine `useComputedColorScheme` +
  `useMantineColorScheme`; shows `IconSun` (dark mode) or `IconMoon` (light mode)
- `Menu` for user avatar: "My profile", "Settings" (server URL), "Sign out"

### 8.6 `InviteQRPanel.tsx`

```tsx
// On "Generate invite" button click:
const { data } = useGenerateInvite(householdId);
// data = { code, qrDataUri, expiresAt }

<QRCodeSVG value={data.qrDataUri} size={200} />
<Code block>{data.code}</Code>
<CopyButton value={data.code}>
  {({ copied, copy }) => (
    <Button leftSection={<IconCopy />} onClick={copy}>
      {copied ? 'Copied!' : 'Copy code'}
    </Button>
  )}
</CopyButton>
<Text size="xs" c="dimmed">Expires {dayjs(data.expiresAt).fromNow()}</Text>
```

### 8.7 `QRScanner.tsx`

Uses `@zxing/browser`'s `BrowserQRCodeReader` to access the device camera and decode QR codes:

1. Request camera permission via Tauri camera plugin
2. Pipe video stream to a `<video>` element rendered in the component
3. Decode frames continuously; on successful decode call `invitesApi.accept(code)` then navigate
   to the joined household
4. Show camera permission error gracefully with a Mantine `Alert`

### 8.8 `ChangeHistoryList.tsx`

Timeline-style list of `ItemChangeLog` entries. Each row:

```
[User avatar] [User name] changed [fieldName]
              from "[oldValue]" → "[newValue]"
              [relative time, e.g. "3 hours ago"]
```

Use `dayjs(entry.changedAt).fromNow()` for relative timestamps. Rendered inside a `ScrollArea`
with `mah={400}` (max height).

### 8.9 `ExpiryBadge.tsx`

Pure presentational component:

```typescript
function ExpiryBadge({ expiresAt }: { expiresAt: string | null }) {
  if (!expiresAt) return null;
  const days = dayjs(expiresAt).diff(dayjs(), 'day');
  if (days < 0)   return <Badge color="red">Expired</Badge>;
  if (days < 7)   return <Badge color="orange">{days}d left</Badge>;
  if (days < 30)  return <Badge color="yellow">{days}d left</Badge>;
  return <Badge color="green">{dayjs(expiresAt).format('D MMM')}</Badge>;
}
```

---

## 9. Settings Screen

### Server URL configuration

Located at `/profile`, also accessible from the user avatar `Menu → Settings`:

```tsx
<TextInput
  label="Server URL"
  description="The base URL of your self-hosted Freezer Tracker server"
  placeholder="https://freezer.myhome.local"
  {...form.getInputProps('serverBaseUrl')}
/>
<Button onClick={handleSave}>Save and reconnect</Button>
```

On save:
1. `settingsStore.setServerBaseUrl(url)` persists to Tauri Store
2. `reinitialiseClient(url)` replaces the singleton (called internally by `setServerBaseUrl` — see §4)
3. All TanStack Query caches invalidated via `queryClient.clear()`
4. User is redirected to `/login` to re-authenticate against the new server

---

## 10. `packages/shared` Integration

Both the API functions in `src/api/` and form Zod schemas reference `@freezer-tracker/shared`:

```typescript
// src/api/items.ts
import type { FreezerItemResponse, CreateItemDto } from '@freezer-tracker/shared';

// Form validation in ItemModal.tsx
import { createItemSchema } from '@freezer-tracker/shared';
const form = useForm<CreateItemDto>({
  resolver: zodResolver(createItemSchema),
});
```

Ensure `apps/client/tsconfig.json` has the path alias:

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@freezer-tracker/shared": ["../../packages/shared/src"]
    }
  }
}
```

---

## 11. Tauri Mobile Considerations

### iOS & Android specific

- Use `dropdownType="modal"` on all `DatePickerInput` fields — `Popover` is awkward on touch
  screens
- `Modal` components: add `fullScreen` prop when `useMediaQuery('(max-width: 480px)')` is true
- QR scanner uses `@zxing/browser` inside the webview; camera permission must be declared in
  `src-tauri/capabilities/default.json` for both iOS (`NSCameraUsageDescription`) and Android
  (`android.permission.CAMERA`)
- The `AppShell` burger approach works for both iOS and Android — the navbar slides in from the
  left as a drawer overlay
- All interactive targets should be at minimum 44×44 px (use Mantine `size="md"` or `size="lg"`
  on all interactive elements)

---

## 12. Error Handling & UX Patterns

| Situation | Handling |
|---|---|
| API request fails (non-401) | `notifications.show({ color: 'red', title: 'Error', message: err.message })` |
| 401 (token expired) | `ky` `afterResponse` hook attempts refresh; on failure → logout + redirect |
| Form validation fails | React Hook Form field-level errors shown inline via Mantine `error` prop |
| Network unreachable | `ky` timeout → catch → notification "Cannot reach server. Check your server URL in Settings." |
| Empty state (no items) | `EmptyState` component with Tabler icon + descriptive text + "Add first item" button |
| Compartment has items (delete blocked) | API returns `ConflictException` → notification "Remove all items from this compartment first" |
| Owner account deletion blocked | API returns `ConflictException` → notification "Transfer or delete your households first" |

---

## 13. Implementation Order for an AI Agent

Execute in this exact sequence.

> **Cross-agent dependency:** This frontend plan assumes `packages/shared/src/index.ts` is
> already fully populated with all request DTO interfaces, response interfaces, and Zod schemas
> as specified in `BACKEND_PLAN.md §14`. Step 5 below (fill shared) may be done by the backend
> agent or this agent — but it **must be complete before step 8** (API client) or step 17
> (ItemModal form validation) can proceed. If running both agents in parallel, coordinate so
> that shared is written once and not overwritten by both agents independently.

1. **Bootstrap** — `create-tauri-app`, install all dependencies, configure `vite.config.ts`
2. **Tauri plugins** — add `plugin-store` and camera plugin to `Cargo.toml`, register in
   `main.rs`, set capabilities JSON
3. **Theme** — `src/theme.ts` with primary colour, default radius, component defaults
4. **`src/main.tsx`** — wire up `MantineProvider`, `QueryClientProvider`, `RouterProvider`,
   `Notifications`, CSS imports
5. **`packages/shared`** — fill in all request DTO interfaces, response interfaces, and Zod
   schemas as defined in `BACKEND_PLAN.md §14`. Skip this step if the backend agent has already
   written the file; verify by checking that `packages/shared/src/index.ts` exports all types
   listed in that section before proceeding.
6. **Tauri Store helpers** — `src/lib/tauriStore.ts` typed wrappers for get/set
7. **Zustand stores** — `authStore`, `householdStore`, `settingsStore`; wire Tauri Store
   persistence on each setter
8. **API client** — `src/api/client.ts` (ky singleton with auth header injection and refresh interceptor, as specified in §4)
9. **API functions** — one file per resource: `auth.ts`, `users.ts`, `households.ts`,
   `invites.ts`, `freezers.ts`, `compartments.ts`, `items.ts`
10. **TanStack Query hooks** — one file per resource in `src/hooks/`
11. **Common components** — `ConfirmModal`, `EmptyState`, `LoadingSpinner`, `ErrorBoundary`
12. **Root route + auth routes** — `__root.tsx` with synchronous `beforeLoad` guard (checks Zustand `authStore` for token, redirects to `/login` if absent — rehydration already done in `main.tsx`); `login.tsx`, `register.tsx`
13. **Household picker** — `routes/households/index.tsx` and `routes/households/new.tsx`
14. **Authenticated layout** — `AppLayout`, `Header`, `Sidebar`, `MobileNavBurger`; wire into
    `routes/households/$hid/__layout.tsx`
15. **`ExpiryBadge.tsx`** + `src/lib/expiryUtils.ts`
16. **`ItemCard.tsx`** and **`ItemGrid.tsx`**
17. **`ItemModal.tsx`** — add + edit, all form fields, Zod validation from shared
18. **`ChangeHistoryList.tsx`**
19. **`ItemDetailDrawer.tsx`**
20. **Freezer view** — `routes/households/$hid/freezers/$fid.tsx` with `ItemFilters` +
    `ItemGrid` + floating add button
21. **Overview** — `FreezerCard.tsx` + `routes/households/$hid/overview.tsx`
22. **`FreezerModal.tsx`** and **`CompartmentModal.tsx`**
23. **`InviteQRPanel.tsx`** and **`QRScanner.tsx`**
24. **`MemberList.tsx`**
25. **Settings route** — `routes/households/$hid/settings.tsx` with General / Members / Invite
    tabs
26. **Archive route** — `routes/households/$hid/archive.tsx`
27. **Item list route** — `routes/households/$hid/items/index.tsx` (household-wide searchable
    list)
28. **Profile route** — `routes/profile.tsx` with name update, server URL form, account
    deletion, QR scanner for joining households
29. **Mobile polish** — audit all modals for `fullScreen` on small viewports, check touch target
    sizes, verify burger nav on mobile breakpoint
30. **Smoke test** — `bun run tauri dev`, connect to a running backend, exercise full flow:
    register → create household → add freezer → add compartment → add item → edit item →
    view history → generate invite QR → scan QR on second account → verify household join
