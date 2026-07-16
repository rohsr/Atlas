/**
 * Atlas — Skeleton Loader
 *
 * Shimmer placeholder component for loading states.
 * Replaces spinners throughout the app.
 */

import { useEffect } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

interface SkeletonLoaderProps {
  /** Width of the skeleton. Default: '100%' */
  width?: number | string;
  /** Height of the skeleton. Default: 20 */
  height?: number;
  /** Border radius. Default: 8 */
  borderRadius?: number;
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: ViewStyle;
}

export function SkeletonLoader({
  width = '100%',
  height = 20,
  borderRadius = 8,
  className = '',
  style,
}: SkeletonLoaderProps) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // infinite
      true, // reverse
    );
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.3, 0.7]),
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as number,
          height,
          borderRadius,
          backgroundColor: '#E2E8F0',
        },
        animatedStyle,
        style,
      ]}
      className={className}
    />
  );
}

/**
 * Pre-built skeleton patterns for common layouts.
 */
export function SkeletonCard() {
  return (
    <View className="bg-white rounded-card border border-border p-4 gap-3">
      <SkeletonLoader height={140} borderRadius={12} />
      <SkeletonLoader width={200} height={18} />
      <SkeletonLoader width={140} height={14} />
    </View>
  );
}

export function SkeletonListItem() {
  return (
    <View className="flex-row items-center bg-white rounded-card border border-border p-4 gap-4">
      <SkeletonLoader width={56} height={56} borderRadius={12} />
      <View className="flex-1 gap-2">
        <SkeletonLoader width={160} height={16} />
        <SkeletonLoader width={120} height={12} />
      </View>
    </View>
  );
}
