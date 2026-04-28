import { create } from 'zustand';
import { tauriStore } from '@/lib/tauriStore';

interface SettingsState {
  serverBaseUrl: string;
  setServerBaseUrl: (url: string) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  serverBaseUrl: '',

  setServerBaseUrl: (url) => {
    set({ serverBaseUrl: url });
    tauriStore.set('serverBaseUrl', url);
    // Lazy import to avoid circular dependency with api/client.ts at module level
    import('@/api/client').then(({ reinitialiseClient }) => reinitialiseClient(url));
  },
}));
