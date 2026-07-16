/**
 * Atlas — App Entry Point
 *
 * Auth-based routing:
 * - If onboarded + authenticated → tabs (home)
 * - If not onboarded → onboarding splash
 */

import { Redirect } from 'expo-router';
import { useAuthStore } from '../stores/auth.store';

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isOnboarded = useAuthStore((s) => s.isOnboarded);

  if (isAuthenticated && isOnboarded) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding" />;
}
