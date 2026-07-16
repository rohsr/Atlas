/**
 * Atlas — Animated Toast Notification
 *
 * Slides down from top, auto-dismisses. Driven by ui.store.
 */

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUIStore, selectToast } from '../../stores/ui.store';
import { Icon, type IconName } from '../Icon';

const VARIANT_CONFIG: Record<
  string,
  { bg: string; border: string; textColor: string; icon: IconName; iconColor: string }
> = {
  info: {
    bg: 'bg-white',
    border: 'border-border',
    textColor: 'text-primary',
    icon: 'Info',
    iconColor: '#2563EB',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    textColor: 'text-primary',
    icon: 'Check',
    iconColor: '#22C55E',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    textColor: 'text-primary',
    icon: 'X',
    iconColor: '#EF4444',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    textColor: 'text-primary',
    icon: 'AlertTriangle',
    iconColor: '#F59E0B',
  },
};

export function Toast() {
  const visible = useUIStore((s) => s.toastVisible);
  const message = useUIStore((s) => s.toastMessage);
  const variant = useUIStore((s) => s.toastVariant);
  const hideToast = useUIStore((s) => s.hideToast);
  const insets = useSafeAreaInsets();

  const [shouldRender, setShouldRender] = useState(visible);

  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
        mass: 0.8,
      });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withTiming(-100, { duration: 250 });
      opacity.value = withTiming(0, { duration: 200 }, (finished) => {
        if (finished) {
          runOnJS(setShouldRender)(false);
        }
      });
    }
  }, [visible, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.info;

  if (!shouldRender) return null;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          top: insets.top + 8,
          left: 16,
          right: 16,
          zIndex: 9999,
        },
      ]}
      pointerEvents="box-none"
    >
      <View
        className={`flex-row items-center px-4 py-3.5 rounded-card border shadow-panel ${config.bg} ${config.border}`}
      >
        <View className="h-8 w-8 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: `${config.iconColor}15` }}
        >
          <Icon name={config.icon} size={16} color={config.iconColor} strokeWidth={2.5} />
        </View>
        <Text className={`flex-1 text-body2 font-sans ${config.textColor}`} numberOfLines={2}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
