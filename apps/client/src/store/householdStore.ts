import { create } from 'zustand';
import { tauriStore } from '@/lib/tauriStore';

interface HouseholdState {
  activeHouseholdId: string | null;
  activeFreezerIdMap: Record<string, string>;
  setActiveHousehold: (id: string) => void;
  setActiveFreezer: (householdId: string, freezerId: string) => void;
}

export const useHouseholdStore = create<HouseholdState>((set) => ({
  activeHouseholdId: null,
  activeFreezerIdMap: {},

  setActiveHousehold: (id) => {
    set({ activeHouseholdId: id });
    tauriStore.set('activeHouseholdId', id);
  },

  setActiveFreezer: (householdId, freezerId) => {
    set((state) => ({
      activeFreezerIdMap: { ...state.activeFreezerIdMap, [householdId]: freezerId },
    }));
    tauriStore.get<Record<string, string>>('activeFreezerIdMap').then((map) => {
      tauriStore.set('activeFreezerIdMap', { ...(map ?? {}), [householdId]: freezerId });
    });
  },
}));
