/**
 * Atlas — Trip Store
 *
 * Manages trip data, selected trip, and active tab within trip detail.
 * Not persisted — trips come from mock data (and later from API).
 */

import { create } from 'zustand';
import { MOCK_TRIPS } from '../constants/mock-data';
import type { Trip } from '../types/trip';

type TripTab = 'Overview' | 'Itinerary' | 'Bookings' | 'Documents' | 'Packing';

interface TripState {
  trips: Trip[];
  selectedTripId: string | null;
  activeTab: TripTab;
}

interface TripActions {
  setSelectedTrip: (id: string) => void;
  setActiveTab: (tab: TripTab) => void;
  getTrip: (id: string) => Trip | undefined;
}

export const useTripStore = create<TripState & TripActions>()((set, get) => ({
  // State
  trips: MOCK_TRIPS,
  selectedTripId: null,
  activeTab: 'Overview',

  // Actions
  setSelectedTrip: (id) =>
    set({ selectedTripId: id, activeTab: 'Overview' }),

  setActiveTab: (tab) =>
    set({ activeTab: tab }),

  getTrip: (id) =>
    get().trips.find((t) => t.id === id),
}));

// ─── Selectors ─────────────────────────────────────────────────────────────
export const selectTrips = (state: TripState) => state.trips;
export const selectActiveTab = (state: TripState) => state.activeTab;
export const selectSelectedTripId = (state: TripState) => state.selectedTripId;
