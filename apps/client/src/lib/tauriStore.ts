import { LazyStore } from '@tauri-apps/plugin-store';

const store = new LazyStore('freezer-tracker.bin');

export const tauriStore = {
  get: async <T>(key: string): Promise<T | null> => {
    return store.get<T>(key) as Promise<T | null>;
  },
  set: async (key: string, value: unknown): Promise<void> => {
    await store.set(key, value);
    await store.save();
  },
  delete: async (key: string): Promise<void> => {
    await store.delete(key);
    await store.save();
  },
};
