/**
 * Atlas — Onboarding Store
 *
 * Tracks user selections across the multi-step onboarding flow.
 * Persisted so progress is not lost if the app is backgrounded.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '../lib/storage';
import type { BudgetStyle, InterestCategory, TravelStyle } from '../types/trip';

interface OnboardingState {
  username: string;
  city: string;
  travelStyle: TravelStyle | null;
  interests: InterestCategory[];
  budgetStyle: BudgetStyle | null;
  selectedDestinations: string[];
  notificationPreferences: Record<string, boolean>;
}

interface OnboardingActions {
  setProfile: (username: string, city: string) => void;
  setTravelStyle: (style: TravelStyle) => void;
  toggleInterest: (interest: InterestCategory) => void;
  setBudgetStyle: (style: BudgetStyle) => void;
  toggleDestination: (id: string) => void;
  setNotificationPreference: (key: string, value: boolean) => void;
  resetOnboarding: () => void;
}

const INITIAL_STATE: OnboardingState = {
  username: '',
  city: '',
  travelStyle: null,
  interests: [],
  budgetStyle: null,
  selectedDestinations: [],
  notificationPreferences: {
    flights: true,
    weather: true,
    reminders: true,
    documents: false,
    deals: false,
  },
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      // Actions
      setProfile: (username, city) =>
        set({ username, city }),

      setTravelStyle: (style) =>
        set({ travelStyle: style }),

      toggleInterest: (interest) =>
        set((state) => ({
          interests: state.interests.includes(interest)
            ? state.interests.filter((i) => i !== interest)
            : [...state.interests, interest],
        })),

      setBudgetStyle: (style) =>
        set({ budgetStyle: style }),

      toggleDestination: (id) =>
        set((state) => ({
          selectedDestinations: state.selectedDestinations.includes(id)
            ? state.selectedDestinations.filter((d) => d !== id)
            : [...state.selectedDestinations, id],
        })),

      setNotificationPreference: (key, value) =>
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            [key]: value,
          },
        })),

      resetOnboarding: () =>
        set(INITIAL_STATE),
    }),
    {
      name: 'atlas-onboarding',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
