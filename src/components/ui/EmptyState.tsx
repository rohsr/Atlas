import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon, type IconName } from '../Icon';
import { Button } from './Button';
import { theme } from '../../theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  FadeIn,
  FadeInUp,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Centered empty state with icon, title, subtitle, and optional CTA.
 */
export function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  const isReduced = useReducedMotion();
  const ctaScale = useSharedValue(1);

  useEffect(() => {
    if (isReduced) return;
    
    // Pulse/bounce CTA slightly when entering to attract attention
    ctaScale.value = withDelay(
      800,
      withSequence(
        withTiming(1.05, { duration: 150 }),
        withTiming(0.95, { duration: 150 }),
        withTiming(1.03, { duration: 120 }),
        withTiming(1, { duration: 120 })
      )
    );
  }, [isReduced]);

  const ctaStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ctaScale.value }],
  }));

  return (
    <View className={`flex-1 items-center justify-center px-12 ${className}`}>
      {/* Icon Circle (Illustration) */}
      <Animated.View 
        entering={isReduced ? undefined : FadeIn.duration(300)}
        className="h-16 w-16 rounded-full bg-blue-50 items-center justify-center mb-5"
      >
        <Icon name={icon} size="large" color={theme.colors.accent} />
      </Animated.View>

      {/* Texts */}
      <Animated.View 
        entering={isReduced ? undefined : FadeInUp.delay(150).duration(450)}
        className="items-center"
      >
        <Text className="text-heading2 text-primary font-display text-center">{title}</Text>
        {subtitle && (
          <Text className="mt-2 text-body1 text-slate font-sans text-center">{subtitle}</Text>
        )}
      </Animated.View>

      {/* CTA Button */}
      {actionLabel && onAction && (
        <Animated.View 
          entering={isReduced ? undefined : FadeInUp.delay(300).duration(450)}
        >
          <Animated.View style={ctaStyle}>
            <Button
              title={actionLabel}
              onPress={onAction}
              variant="accent"
              className="mt-6 w-52"
            />
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
}

