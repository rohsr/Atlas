/**
 * Atlas — Settings Store
 *
 * Manages app-level preferences. Persisted.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '../lib/storage';

interface SettingsState {
  smartAlerts: boolean;
  locationSharing: boolean;
  biometrics: boolean;
  currency: string;
  language: string;
}

interface SettingsActions {
  toggleSmartAlerts: () => void;
  toggleLocationSharing: () => void;
  toggleBiometrics: () => void;
  setCurrency: (currency: string) => void;
  setLanguage: (language: string) => void;
}

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      // State
      smartAlerts: true,
      locationSharing: false,
      biometrics: true,
      currency: 'USD',
      language: 'English',

      // Actions
      toggleSmartAlerts: () =>
        set((state) => ({ smartAlerts: !state.smartAlerts })),
      toggleLocationSharing: () =>
        set((state) => ({ locationSharing: !state.locationSharing })),
      toggleBiometrics: () =>
        set((state) => ({ biometrics: !state.biometrics })),
      setCurrency: (currency) =>
        set({ currency }),
      setLanguage: (language) =>
        set({ language }),
    }),
    {
      name: 'atlas-settings',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

// ─── Selectors ─────────────────────────────────────────────────────────────
export const selectSmartAlerts = (state: SettingsState) => state.smartAlerts;
export const selectCurrency = (state: SettingsState) => state.currency;
export const selectLanguage = (state: SettingsState) => state.language;
