/**
 * Atlas — Packing Store
 *
 * Manages packing list items with toggle, add, and category filter.
 * Persisted so checked items survive app restarts.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '../lib/storage';
import { MOCK_PACKING_ITEMS } from '../constants/mock-data';
import type { PackingCategory, PackingItem } from '../types/trip';

interface PackingState {
  items: PackingItem[];
  selectedCategory: string;
}

interface PackingActions {
  toggleItem: (id: string) => void;
  addItem: (name: string, category: PackingCategory, tripId: string) => void;
  setCategory: (category: string) => void;
  getFilteredItems: () => PackingItem[];
  getProgress: () => { packed: number; total: number; percent: number };
}

export const usePackingStore = create<PackingState & PackingActions>()(
  persist(
    (set, get) => ({
      // State
      items: MOCK_PACKING_ITEMS,
      selectedCategory: 'All',

      // Actions
      toggleItem: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, packed: !item.packed } : item,
          ),
        })),

      addItem: (name, category, tripId) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: `p-${Date.now()}`,
              tripId,
              category,
              name,
              packed: false,
            },
          ],
        })),

      setCategory: (category) =>
        set({ selectedCategory: category }),

      getFilteredItems: () => {
        const { items, selectedCategory } = get();
        if (selectedCategory === 'All') return items;
        return items.filter(
          (item) => item.category === selectedCategory.toLowerCase(),
        );
      },

      getProgress: () => {
        const { items } = get();
        const packed = items.filter((i) => i.packed).length;
        const total = items.length;
        const percent = total > 0 ? Math.round((packed / total) * 100) : 0;
        return { packed, total, percent };
      },
    }),
    {
      name: 'atlas-packing',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

// ─── Selectors ─────────────────────────────────────────────────────────────
export const selectPackingItems = (state: PackingState) => state.items;
export const selectPackingCategory = (state: PackingState) => state.selectedCategory;
