/**
 * Atlas — Reduced Motion Hook
 *
 * Checks if the user has enabled "Reduce Motion" in system accessibility settings.
 * Used to conditionally skip animations throughout the app.
 */

import { useReducedMotion as useReanimatedReducedMotion } from 'react-native-reanimated';

export function useReducedMotion(): boolean {
  return useReanimatedReducedMotion();
}
