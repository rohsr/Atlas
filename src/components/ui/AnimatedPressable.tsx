/**
 * Atlas — Animated Pressable
 *
 * Drop-in replacement for Pressable with built-in scale animation and optional haptic.
 * Uses react-native-reanimated for 60fps scale spring.
 */

import { type ReactNode } from 'react';
import { Pressable, type PressableProps, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useHaptics } from '../../hooks/useHaptics';

interface AnimatedPressableProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  /** Scale factor on press. Default: 0.97 */
  scaleValue?: number;
  /** Enable haptic feedback on press. Default: true */
  haptic?: boolean;
  /** Haptic intensity. Default: 'light' */
  hapticType?: 'light' | 'medium' | 'heavy' | 'selection';
  className?: string;
  style?: ViewStyle;
}

const AnimatedPressableInner = Animated.createAnimatedComponent(Pressable);

export function AnimatedPressable({
  children,
  scaleValue = 0.97,
  haptic = true,
  hapticType = 'light',
  onPress,
  className,
  style,
  ...props
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);
  const haptics = useHaptics();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(scaleValue, {
      damping: 15,
      stiffness: 400,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 400,
    });
  };

  const handlePress = (e: any) => {
    if (haptic) {
      haptics[hapticType]();
    }
    onPress?.(e);
  };

  return (
    <AnimatedPressableInner
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={[animatedStyle, style]}
      className={className}
      {...props}
    >
      {children}
    </AnimatedPressableInner>
  );
}
