/**
 * Atlas — UI Store
 *
 * Transient UI state: toast messages, loading overlays.
 * NOT persisted — resets on app launch.
 */

import { create } from 'zustand';

type ToastVariant = 'info' | 'success' | 'error' | 'warning';

interface ToastPayload {
  message: string;
  variant: ToastVariant;
}

interface UIState {
  toastVisible: boolean;
  toastMessage: string;
  toastVariant: ToastVariant;
  isGlobalLoading: boolean;
}

interface UIActions {
  showToast: (message: string, variant?: ToastVariant) => void;
  hideToast: () => void;
  setGlobalLoading: (loading: boolean) => void;
}

let toastTimeout: ReturnType<typeof setTimeout> | null = null;

export const useUIStore = create<UIState & UIActions>()((set) => ({
  // State
  toastVisible: false,
  toastMessage: '',
  toastVariant: 'info',
  isGlobalLoading: false,

  // Actions
  showToast: (message, variant = 'info') => {
    // Clear existing timeout to prevent flickering
    if (toastTimeout) clearTimeout(toastTimeout);

    set({
      toastVisible: true,
      toastMessage: message,
      toastVariant: variant,
    });

    // Auto-dismiss after 2.5s
    toastTimeout = setTimeout(() => {
      set({ toastVisible: false });
    }, 2500);
  },

  hideToast: () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    set({ toastVisible: false });
  },

  setGlobalLoading: (loading) =>
    set({ isGlobalLoading: loading }),
}));

// ─── Selectors ─────────────────────────────────────────────────────────────
export const selectToast = (state: UIState) => ({
  visible: state.toastVisible,
  message: state.toastMessage,
  variant: state.toastVariant,
});
