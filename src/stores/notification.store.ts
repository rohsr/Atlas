/**
 * Atlas — Notification Store
 *
 * Manages notification list, read/unread state, and dismiss actions.
 */

import { create } from 'zustand';
import { MOCK_NOTIFICATIONS } from '../constants/mock-data';
import type { AppNotification } from '../types/trip';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
}

interface NotificationActions {
  markAllRead: () => void;
  markRead: (id: string) => void;
  dismiss: (id: string) => void;
}

const computeUnread = (notifications: AppNotification[]): number =>
  notifications.filter((n) => !n.read).length;

export const useNotificationStore = create<NotificationState & NotificationActions>()(
  (set) => ({
    // State
    notifications: MOCK_NOTIFICATIONS,
    unreadCount: computeUnread(MOCK_NOTIFICATIONS),

    // Actions
    markAllRead: () =>
      set((state) => {
        const updated = state.notifications.map((n) => ({ ...n, read: true }));
        return { notifications: updated, unreadCount: 0 };
      }),

    markRead: (id) =>
      set((state) => {
        const updated = state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n,
        );
        return { notifications: updated, unreadCount: computeUnread(updated) };
      }),

    dismiss: (id) =>
      set((state) => {
        const updated = state.notifications.filter((n) => n.id !== id);
        return { notifications: updated, unreadCount: computeUnread(updated) };
      }),
  }),
);

// ─── Selectors ─────────────────────────────────────────────────────────────
export const selectNotifications = (state: NotificationState) => state.notifications;
export const selectUnreadCount = (state: NotificationState) => state.unreadCount;
