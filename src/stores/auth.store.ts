/**
 * Atlas — Auth Store
 *
 * Manages authentication state, user profile, and onboarding completion.
 * Persisted so the user doesn't have to re-authenticate or re-onboard on restart.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '../lib/storage';
import type { UserProfile } from '../types/trip';
import { MOCK_USER } from '../constants/mock-data';

interface AuthState {
  /** Whether the user has completed auth (sign-in or sign-up + verification) */
  isAuthenticated: boolean;
  /** Whether the user has completed the onboarding flow */
  isOnboarded: boolean;
  /** Current user profile */
  user: UserProfile | null;
}

interface AuthActions {
  signIn: (user: UserProfile) => void;
  signOut: () => void;
  completeOnboarding: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      // State
      isAuthenticated: false,
      isOnboarded: false,
      user: null,

      // Actions
      signIn: (user) =>
        set({
          isAuthenticated: true,
          user,
        }),

      signOut: () =>
        set({
          isAuthenticated: false,
          isOnboarded: false,
          user: null,
        }),

      completeOnboarding: () =>
        set({ isOnboarded: true }),

      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'atlas-auth',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

// ─── Selectors ─────────────────────────────────────────────────────────────
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectIsOnboarded = (state: AuthState) => state.isOnboarded;
export const selectUser = (state: AuthState) => state.user;
