import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../components/Icon';
import { Card, SectionHeader, AnimatedScreen, FadeInUp, ScalePress } from '../components/ui';
import { theme } from '../theme';
import { useNotificationStore } from '../stores/notification.store';
import { useHaptics } from '../hooks/useHaptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  runOnJS,
  LinearTransition,
  SlideOutRight,
  FadeInUp as ReanimatedFadeInUp,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

function PulsingDot() {
  const isReduced = useReducedMotion();
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isReduced) return;
    scale.value = withRepeat(
      withSequence(
        withTiming(1.25, { duration: 600 }),
        withTiming(1.0, { duration: 600 })
      ),
      -1,
      true
    );
  }, [isReduced, scale]);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[dotStyle]}
      className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-accent"
    />
  );
}

function SwipeableNotification({
  children,
  onDismiss,
}: {
  children: React.ReactNode;
  onDismiss: () => void;
}) {
  const isReduced = useReducedMotion();
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > 120) {
        translateX.value = withTiming(
          event.translationX > 0 ? 500 : -500,
          { duration: 200 },
          () => {
            runOnJS(onDismiss)();
          }
        );
      } else {
        translateX.value = withSpring(0, { damping: 15 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (isReduced) {
    return <View>{children}</View>;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const isReduced = useReducedMotion();

  const notifications = useNotificationStore((s) => s.notifications);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const dismiss = useNotificationStore((s) => s.dismiss);

  const handleMarkAllRead = () => {
    haptics.success();
    markAllRead();
  };

  const handleDismiss = (id: string) => {
    haptics.light();
    dismiss(id);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <AnimatedScreen className="flex-1">
        {/* Header */}
        <FadeInUp delay={50} duration={300} className="flex-row items-center justify-between px-6 pt-4 pb-2">
          <View className="flex-row items-center gap-3">
            <ScalePress
              onPress={() => {
                haptics.light();
                router.back();
              }}
              scaleValue={0.9}
              haptic={false}
              className="h-10 w-10 items-center justify-center -ml-3"
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
            </ScalePress>
            <Text className="text-heading1 text-primary font-bold">Notifications</Text>
          </View>
          {notifications.length > 0 && (
            <ScalePress onPress={handleMarkAllRead} scaleValue={0.95} haptic={false} accessibilityRole="button">
              <Text className="text-body2 text-accent font-medium">Mark all read</Text>
            </ScalePress>
          )}
        </FadeInUp>

        {/* Notifications List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 py-4 gap-3"
        >
          {notifications.map((notif, index) => {
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
              <Animated.View
                key={notif.id}
                entering={isReduced ? undefined : ReanimatedFadeInUp.delay(index * 40).duration(300)}
                exiting={isReduced ? undefined : SlideOutRight.duration(200)}
                layout={isReduced ? undefined : LinearTransition.springify()}
              >
                <SwipeableNotification onDismiss={() => handleDismiss(notif.id)}>
                  <Card
                    className={`p-4 flex-row items-start relative ${
                      !notif.read ? 'bg-blue-50/20 border-blue-100' : ''
                    }`}
                  >
                    {/* Unread Indicator Dot */}
                    {!notif.read && <PulsingDot />}

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
                    <ScalePress
                      onPress={() => handleDismiss(notif.id)}
                      scaleValue={0.85}
                      haptic={false}
                      className="h-8 w-8 items-center justify-center absolute bottom-2 right-2"
                      accessibilityRole="button"
                      accessibilityLabel="Dismiss notification"
                    >
                      <Icon name="X" size={16} color={theme.colors.slate} />
                    </ScalePress>
                  </Card>
                </SwipeableNotification>
              </Animated.View>
            );
          })}

          {notifications.length === 0 && (
            <FadeInUp delay={100} duration={350} className="flex-1 items-center justify-center py-20">
              <View className="h-16 w-16 rounded-full bg-slate-50 items-center justify-center mb-4">
                <Icon name="Bell" size={28} color={theme.colors.slate} />
              </View>
              <Text className="text-body1 text-slate font-sans">No notifications yet</Text>
            </FadeInUp>
          )}
        </ScrollView>
      </AnimatedScreen>
    </SafeAreaView>
  );
}

