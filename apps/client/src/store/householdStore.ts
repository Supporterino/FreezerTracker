import { create } from 'zustand';
import { tauriStore } from '@/lib/tauriStore';

interface HouseholdState {
  activeHouseholdId: string | null;
  activeFreezerIdMap: Record<string, string>;
  setActiveHousehold: (id: string) => void;
  setActiveFreezer: (householdId: string, freezerId: string) => void;
}

export const useHouseholdStore = create<HouseholdState>((set, get) => ({
  activeHouseholdId: null,
  activeFreezerIdMap: {},

  setActiveHousehold: (id) => {
    set({ activeHouseholdId: id });
    tauriStore.set('activeHouseholdId', id);
  },

  setActiveFreezer: (householdId, freezerId) => {
    // Update zustand state synchronously (single source of truth)
    const updatedMap = { ...get().activeFreezerIdMap, [householdId]: freezerId };
    set({ activeFreezerIdMap: updatedMap });
    // Persist the full map from the just-updated zustand state to avoid
    // the async read-then-write race condition with tauriStore.get().
    tauriStore.set('activeFreezerIdMap', updatedMap);
  },
}));
