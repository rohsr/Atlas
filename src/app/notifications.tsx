import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../components/Icon';
import { Card, SectionHeader } from '../components/ui';
import { MOCK_NOTIFICATIONS } from '../constants/mock-data';
import { theme } from '../theme';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="h-10 w-10 items-center justify-center -ml-3"
          >
            <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
          </Pressable>
          <Text className="text-heading1 text-primary font-bold">Notifications</Text>
        </View>
        <Pressable onPress={markAllAsRead} accessibilityRole="button">
          <Text className="text-body2 text-accent font-medium">Mark all read</Text>
        </Pressable>
      </View>

      {/* Notifications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6 py-4 gap-3"
      >
        {notifications.map((notif) => {
          let categoryIcon: any = 'Bell';
          let iconBg = '#F1F5F9';

          if (notif.type === 'booking') {
            categoryIcon = 'CheckSquare';
            iconBg = '#DCFCE7';
          } else if (notif.type === 'price-alert') {
            categoryIcon = 'TrendingDown';
            iconBg = '#FEF3C7';
          } else if (notif.type === 'reminder') {
            categoryIcon = 'Calendar';
            iconBg = '#DBEAFE';
          } else if (notif.type === 'passport') {
            categoryIcon = 'UserRound';
            iconBg = '#FEE2E2';
          } else if (notif.type === 'ai-suggestion') {
            categoryIcon = 'Sparkles';
            iconBg = '#F3E8FF';
          }

          return (
            <Card
              key={notif.id}
              className={`p-4 flex-row items-start relative ${
                !notif.read ? 'bg-blue-50/20 border-blue-100' : ''
              }`}
            >
              {/* Unread Indicator Dot */}
              {!notif.read && (
                <View className="absolute top-4 right-4 h-2 w-2 rounded-full bg-accent" />
              )}

              {/* Icon Container */}
              <View
                className="h-10 w-10 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: iconBg }}
              >
                <Icon name={categoryIcon} size={20} color={theme.colors.primary} />
              </View>

              {/* Details */}
              <View className="flex-1 pr-6">
                <Text className="text-body1 text-primary font-display">{notif.title}</Text>
                <Text className="text-body2 text-slate font-sans mt-1 leading-5">
                  {notif.body}
                </Text>
                <Text className="text-caption text-slate font-sans mt-2">{notif.timestamp}</Text>
              </View>

              {/* Close / Dismiss */}
              <Pressable
                onPress={() => deleteNotification(notif.id)}
                className="h-8 w-8 items-center justify-center absolute bottom-2 right-2"
                accessibilityRole="button"
                accessibilityLabel="Dismiss notification"
              >
                <Icon name="X" size={16} color={theme.colors.slate} />
              </Pressable>
            </Card>
          );
        })}

        {notifications.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <View className="h-16 w-16 rounded-full bg-slate-50 items-center justify-center mb-4">
              <Icon name="Bell" size={28} color={theme.colors.slate} />
            </View>
            <Text className="text-body1 text-slate font-sans">No notifications yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
