import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ProgressBarProps {
  percent: number;
  label?: string;
  className?: string;
}

/**
 * Rounded progress bar with blue fill on gray track.
 */
export function ProgressBar({ percent, label, className = '' }: ProgressBarProps) {
  const clampedPercent = Math.max(0, Math.min(100, percent));
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(clampedPercent, { duration: 600 });
  }, [clampedPercent]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  return (
    <View className={className}>
      <View className="h-2 rounded-full bg-border overflow-hidden">
        <Animated.View
          style={animatedStyle}
          className="h-full rounded-full bg-accent"
        />
      </View>
      {label && (
        <Text className="mt-1.5 text-caption text-slate font-sans">{label}</Text>
      )}
    </View>
  );
}

