import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon, type IconName } from '../Icon';
import { theme } from '../../theme';
import { useHaptics } from '../../hooks/useHaptics';
import { ScalePress } from '../ui/Animation';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SelectionCardProps {
  icon: IconName;
  iconBg: string;
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
  className?: string;
}

/**
 * Reusable vertical selection option card with icon, title, subtitle, and checkmark indicator.
 */
export function SelectionCard({
  icon,
  iconBg,
  title,
  subtitle,
  selected,
  onPress,
  className = '',
}: SelectionCardProps) {
  const haptics = useHaptics();
  const isReduced = useReducedMotion();
  const checkScale = useSharedValue(selected ? 1 : 0.8);

  useEffect(() => {
    if (isReduced) {
      checkScale.value = selected ? 1 : 0.8;
      return;
    }
    checkScale.value = withSpring(selected ? 1 : 0.8, { damping: 12, stiffness: 200 });
  }, [selected, isReduced]);

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const handlePress = () => {
    haptics.selection();
    onPress();
  };

  return (
    <ScalePress
      onPress={handlePress}
      scaleValue={0.97}
      haptic={false}
      className={`flex-row items-center h-20 px-4 rounded-card border ${
        selected
          ? 'bg-blue-50/20 border-accent'
          : 'bg-white border-border'
      } ${className}`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
    >
      {/* Icon */}
      <View
        className="h-11 w-11 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: iconBg }}
      >
        <Icon name={icon} size="small" color={theme.colors.primary} />
      </View>

      {/* Info */}
      <View className="flex-1 pr-4">
        <Text className="text-body1 text-primary font-display">{title}</Text>
        {subtitle && (
          <Text className="text-body2 text-slate font-sans mt-0.5" numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Checkmark circle indicator */}
      <Animated.View
        style={animatedCheckStyle}
        className={`h-6 w-6 rounded-full border items-center justify-center ${
          selected ? 'border-accent bg-accent' : 'border-neutral-300 bg-white'
        }`}
      >
        {selected && <Icon name="Check" size={12} color="white" strokeWidth={3.5} />}
      </Animated.View>
    </ScalePress>
  );
}

