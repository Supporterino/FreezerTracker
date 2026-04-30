# Frontend Architecture

The FreezerMan client is a Tauri v2 application wrapping a React 19 frontend. Tauri provides native OS integration (secure storage, camera access, system tray) while React handles the entire UI within a webview. The app targets macOS and iOS.

## Technology Stack

| Concern | Technology | Version | Notes |
| --- | --- | --- | --- |
| Native shell | Tauri | v2 | Rust-based app container, small binary footprint |
| UI framework | React | 19 | Component rendering inside Tauri webview |
| Component library | Mantine | 9 | Pre-built UI components with consistent design |
| Routing | TanStack Router | 1.x | File-based, fully type-safe route definitions |
| Server state | TanStack Query | 5.x | Data fetching, caching, background refetching, mutation invalidation |
| Client state | Zustand | 5.x | Lightweight store for auth tokens, active household/freezer IDs |
| Forms | React Hook Form | 7.x | Performant form state with minimal re-renders |
| Validation | Zod | 3.x | Schema-based validation, integrated via `zodResolver` |
| HTTP client | ky | 2.x | Fetch wrapper with hooks for interceptors |
| Mobile HTTP | @tauri-apps/plugin-http | 2.x | Native fetch for Tauri mobile (passed into ky) |
| QR display | qrcode.react | 4.x | React component for rendering QR codes |
| QR scanning | @zxing/browser | 0.2.x | Browser-based barcode/QR reader |
| Bundler | Vite | 8.x | Fast HMR in development, optimized production builds |
| Language | TypeScript | 6.x | Strict mode enabled |

## Route Structure

Routes are defined using TanStack Router's file-based convention. Each route file exports a typed route component that TanStack Router discovers automatically.

```
/login                                  Login screen
/register                               Registration screen

/households                             Household picker (multi-household users)
/households/new                         Create a new household

/households/:hid/overview               Dashboard — all freezers at a glance
/households/:hid/freezers/:fid          Single freezer view (compartments + items)
/households/:hid/items                  Searchable, filterable item list for household
/households/:hid/items/:iid             Item detail + change history
/households/:hid/settings               Household settings, members, invites
/households/:hid/archive                Soft-deleted items (restore or permanent delete)

/profile                                User account settings
```

All routes under `/households/:hid/` are protected by authentication. The route tree validates that the current user is a member of the specified household before rendering.

## Component Hierarchy

The application uses Mantine's `AppShell` as the top-level layout, providing a persistent sidebar and header around routed content.

```
<AppShell>                              Mantine AppShell (sidebar + header)
  <Sidebar>                             Nested NavLinks: households → freezers
  <Header>                              App title, user menu, household switcher
  <RouterOutlet>
    ├── <FreezerView>                   Single freezer page
    │     <ItemFilters>                 Search bar, compartment filter, expiry filter
    │     <ItemGrid>                    Responsive grid of items (Mantine SimpleGrid)
    │       <ItemCard>                  Item name, quantity, compartment badge, expiry badge
    │
    ├── <ItemDetailDrawer>              Right-side drawer for item detail
    │     <ChangeHistoryList>           Ordered list of per-field changes
    │
    ├── <ItemModal>                     Centered modal for add/edit item forms
    │
    └── <HouseholdSettings>            Settings page
          <MemberList>                  Current members with roles
          <InviteQRPanel>               Generate and display invite QR codes
```

## State Management

FreezerMan separates state into three categories, each managed by the most appropriate tool:

### Auth Tokens — Tauri Secure Store

Authentication tokens are stored in the operating system's keychain (macOS Keychain, iOS Secure Enclave) via Tauri's secure store plugin. Tokens are never written to `localStorage` or any browser-accessible storage.

### Server State — TanStack Query

All data fetched from the API is managed by TanStack Query. This provides:

- **Automatic caching** with configurable stale times
- **Background refetching** to keep data fresh
- **Mutation invalidation** — when a mutation succeeds (e.g., creating an item), related queries are automatically invalidated and refetched
- **Optimistic updates** for responsive UI on slower connections

Query keys follow a consistent convention tied to the API resource hierarchy, making invalidation predictable.

### UI State — Zustand

A small Zustand store holds ephemeral UI state that does not come from the server:

- Active household ID
- Active freezer ID
- Server base URL

These values are persisted to Tauri's `LazyStore` so they survive app restarts. The Zustand store hydrates from `LazyStore` on startup.

## Auth Interceptor

The HTTP client (`ky`) is configured with request/response hooks that handle authentication transparently:

```
Request Flow:
  ky.beforeRequest hook
    → Read access token from Tauri secure store
    → Attach Authorization: Bearer <token> header
    → Proceed with request

Response Flow:
  ky.afterResponse hook
    → If response is 401 Unauthorized:
        1. Call POST /auth/refresh with current refresh token
        2. Store new token pair in Tauri secure store
        3. Retry the original request with the new access token
    → If refresh also fails:
        1. Clear stored tokens
        2. Redirect to /login
```

This pattern ensures that token expiration is handled silently. The user only sees a login screen if their refresh token is also expired or revoked.

## Build and Development

The client is built with Vite, which Tauri invokes as part of its build pipeline:

- **Development:** `bun run dev` starts Vite's dev server with HMR. Tauri opens a webview pointed at `localhost:5173`.
- **Production:** `bun run build` produces an optimized bundle. Tauri embeds the static assets into the native binary.

The Tauri Rust shell (`src-tauri/`) is minimal — it configures plugins (secure store, HTTP, camera) and defines the application window. All application logic lives in the React/TypeScript layer.
