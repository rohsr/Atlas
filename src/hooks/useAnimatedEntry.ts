/**
 * Atlas — Animated Entry Hook
 *
 * Reusable Reanimated hook returning an animated style for fade + translateY entrance.
 * Configurable delay and duration for staggered animations.
 */

import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
  type WithTimingConfig,
} from 'react-native-reanimated';

interface AnimatedEntryOptions {
  /** Delay before the animation starts (ms). Default: 0 */
  delay?: number;
  /** Duration of the animation (ms). Default: 500 */
  duration?: number;
  /** Vertical offset to animate from (px). Default: 20 */
  translateY?: number;
  /** Whether to animate on mount. Default: true */
  enabled?: boolean;
}

const TIMING_CONFIG: WithTimingConfig = {
  duration: 500,
  easing: Easing.out(Easing.cubic),
};

export function useAnimatedEntry(options: AnimatedEntryOptions = {}) {
  const {
    delay = 0,
    duration = 500,
    translateY: offsetY = 20,
    enabled = true,
  } = options;

  const opacity = useSharedValue(enabled ? 0 : 1);
  const translateY = useSharedValue(enabled ? offsetY : 0);

  useEffect(() => {
    if (!enabled) return;

    const timingConfig: WithTimingConfig = {
      ...TIMING_CONFIG,
      duration,
    };

    opacity.value = withDelay(delay, withTiming(1, timingConfig));
    translateY.value = withDelay(delay, withTiming(0, timingConfig));
  }, [enabled, delay, duration, offsetY, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}
