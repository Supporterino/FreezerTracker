import type { TokenResponse, UserResponse } from '@freezer-tracker/shared';
import { create } from 'zustand';
import { tauriStore } from '@/lib/tauriStore';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  currentUser: UserResponse | null;
  setTokens: (tokens: TokenResponse) => void;
  setUser: (user: UserResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  currentUser: null,

  setTokens: (tokens) => {
    set({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
    tauriStore.set('accessToken', tokens.accessToken);
    tauriStore.set('refreshToken', tokens.refreshToken);
  },

  setUser: (user) => set({ currentUser: user }),

  logout: () => {
    set({ accessToken: null, refreshToken: null, currentUser: null });
    tauriStore.delete('accessToken');
    tauriStore.delete('refreshToken');
    // Navigate to login — use window.location to avoid circular deps with router
    window.location.href = '/login';
  },
}));
