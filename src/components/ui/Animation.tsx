/**
 * Atlas — Reusable Animation Utilities
 *
 * Provides spring-based hooks and wrapper components for premium animations.
 * Built with react-native-reanimated and expo-haptics.
 */

import React, { useEffect } from 'react';
import { Pressable, PressableProps, View, ViewProps, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useHaptics } from '../../hooks/useHaptics';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Icon } from '../Icon';

// ==========================================
// 1. ANIMATION HOOKS
// ==========================================

/**
 * Hook for animating press/scale behavior on buttons and touchable elements.
 */
export function usePressAnimation(scaleValue = 0.96, duration = 120, hapticEnabled = true) {
  const scale = useSharedValue(1);
  const haptics = useHaptics();
  const isReduced = useReducedMotion();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isReduced ? 1 : scale.value }],
  }));

  const onPressIn = () => {
    if (isReduced) return;
    scale.value = withTiming(scaleValue, { duration, easing: Easing.out(Easing.quad) });
  };

  const onPressOut = () => {
    if (isReduced) return;
    scale.value = withTiming(1, { duration, easing: Easing.out(Easing.quad) });
  };

  const onPressTrigger = () => {
    if (hapticEnabled) {
      haptics.light();
    }
  };

  return {
    animatedStyle,
    onPressIn,
    onPressOut,
    onPressTrigger,
  };
}

/**
 * Hook for screen/component entrance with vertical slide and opacity fade.
 */
export function useEntranceAnimation(delay = 0, duration = 250, translateY = 12) {
  const opacity = useSharedValue(0);
  const offset = useSharedValue(translateY);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      opacity.value = 1;
      offset.value = 0;
      return;
    }
    opacity.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.cubic) }));
    offset.value = withDelay(
      delay,
      withSpring(0, { damping: 18, stiffness: 120 })
    );
  }, [delay, duration, translateY, isReduced]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: offset.value }],
  }));

  return animatedStyle;
}

/**
 * Hook for staggered grid/list entrances.
 */
export function useStaggerAnimation(
  index: number,
  delayStep = 40,
  duration = 250,
  translateY = 16,
  scaleStart = 0.96
) {
  const opacity = useSharedValue(0);
  const offset = useSharedValue(translateY);
  const scale = useSharedValue(scaleStart);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      opacity.value = 1;
      offset.value = 0;
      scale.value = 1;
      return;
    }
    const delay = index * delayStep;
    opacity.value = withDelay(delay, withTiming(1, { duration, easing: Easing.out(Easing.cubic) }));
    offset.value = withDelay(
      delay,
      withSpring(0, { damping: 18, stiffness: 120 })
    );
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 18, stiffness: 120 })
    );
  }, [index, delayStep, duration, translateY, scaleStart, isReduced]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: offset.value }, { scale: scale.value }],
  }));

  return animatedStyle;
}

// ==========================================
// 2. ENTRANCE WRAPPER COMPONENTS
// ==========================================

interface FadeProps extends ViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, delay = 0, duration = 250, style, ...props }: FadeProps) {
  const animStyle = useEntranceAnimation(delay, duration, 0);
  return (
    <Animated.View style={[animStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}

export function FadeInUp({ children, delay = 0, duration = 250, style, ...props }: FadeProps) {
  const animStyle = useEntranceAnimation(delay, duration, 12);
  return (
    <Animated.View style={[animStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}

export function FadeInDown({ children, delay = 0, duration = 250, style, ...props }: FadeProps) {
  const animStyle = useEntranceAnimation(delay, duration, -12);
  return (
    <Animated.View style={[animStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}

// ==========================================
// 3. PRESSABLE & CARD COMPONENTS
// ==========================================

interface ScalePressProps extends PressableProps {
  children: React.ReactNode;
  scaleValue?: number;
  duration?: number;
  haptic?: boolean;
  className?: string;
  style?: any;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ScalePress({
  children,
  scaleValue = 0.96,
  duration = 120,
  haptic = true,
  onPress,
  className,
  style,
  ...props
}: ScalePressProps) {
  const { animatedStyle, onPressIn, onPressOut, onPressTrigger } = usePressAnimation(
    scaleValue,
    duration,
    haptic
  );

  const handlePress = (e: any) => {
    onPressTrigger();
    onPress?.(e);
  };

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={handlePress}
      style={[animatedStyle, style]}
      className={className}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}

interface AnimatedCardProps extends ViewProps {
  children: React.ReactNode;
  index?: number;
  onPress?: () => void;
  className?: string;
  scaleValue?: number;
  haptic?: boolean;
}

export function AnimatedCard({
  children,
  index,
  onPress,
  className = '',
  style,
  scaleValue = 0.97,
  haptic = true,
  ...props
}: AnimatedCardProps) {
  const entryStyle = index !== undefined ? useStaggerAnimation(index) : null;

  if (onPress) {
    return (
      <Animated.View style={entryStyle} className={className} {...props}>
        <ScalePress
          onPress={onPress}
          scaleValue={scaleValue}
          haptic={haptic}
          className="bg-card rounded-card border border-border shadow-card overflow-hidden"
          style={style}
        >
          {children}
        </ScalePress>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[entryStyle, style]}
      className={`bg-card rounded-card border border-border shadow-card overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

// ==========================================
// 4. SCREEN WRAPPER
// ==========================================

interface AnimatedScreenProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedScreen({ children, className = '', style, ...props }: AnimatedScreenProps) {
  const animStyle = useEntranceAnimation(0, 250, 12);
  return (
    <Animated.View
      style={[animStyle, style]}
      className={`flex-1 ${className}`}
      {...props}
    >
      {children}
    </Animated.View>
  );
}

// ==========================================
// 5. OTHER UTILITIES
// ==========================================

interface AnimatedButtonProps extends PressableProps {
  children: React.ReactNode;
  scaleValue?: number;
  haptic?: boolean;
  className?: string;
}

export function AnimatedButton({
  children,
  scaleValue = 0.96,
  haptic = true,
  className = '',
  style,
  ...props
}: AnimatedButtonProps) {
  return (
    <ScalePress
      scaleValue={scaleValue}
      haptic={haptic}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </ScalePress>
  );
}

/**
 * Tab transition wrapper to animate sub-tab contents smoothly.
 */
export function TabTransition({ children, activeKey }: { children: React.ReactNode; activeKey: string }) {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(10);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) {
      opacity.value = 1;
      translateX.value = 0;
      return;
    }
    opacity.value = 0;
    translateX.value = 10;
    opacity.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.quad) });
    translateX.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.quad) });
  }, [activeKey, isReduced]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}

/**
 * Bouncing dot typing indicator for AI Assistant.
 */
export function TypingIndicator() {
  return (
    <View className="flex-row justify-start my-2">
      <View className="bg-white border border-border rounded-card rounded-bl-none p-4 shadow-card flex-row gap-1.5 items-center">
        <BouncingDot delay={0} />
        <BouncingDot delay={150} />
        <BouncingDot delay={300} />
      </View>
    </View>
  );
}

function BouncingDot({ delay }: { delay: number }) {
  const translateY = useSharedValue(0);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-6, { duration: 300, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, [delay, isReduced]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[style]} className="h-2 w-2 rounded-full bg-slate" />;
}

/**
 * Floating AI Button with float and pulse effects.
 */
export function FloatingAIButton() {
  const router = useRouter();
  const haptics = useHaptics();
  const isReduced = useReducedMotion();

  const floatY = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (isReduced) return;

    // 1. Float translation
    floatY.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(5, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // 2. Pulse scale periodically
    const pulseInterval = setInterval(() => {
      pulseScale.value = withSequence(
        withTiming(1.08, { duration: 300, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 300, easing: Easing.in(Easing.quad) })
      );
    }, 4000);

    return () => clearInterval(pulseInterval);
  }, [isReduced]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: floatY.value },
      { scale: pulseScale.value },
    ],
  }));

  const handlePress = () => {
    haptics.medium();
    router.push('/ai-assistant');
  };

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          bottom: 24,
          right: 24,
          zIndex: 999,
        },
      ]}
    >
      <ScalePress
        onPress={handlePress}
        scaleValue={0.9}
        haptic={false}
        className="h-14 w-14 rounded-full bg-black items-center justify-center shadow-panel"
      >
        <Icon name="Sparkles" size={24} color="#FFFFFF" strokeWidth={2} />
      </ScalePress>
    </Animated.View>
  );
}
