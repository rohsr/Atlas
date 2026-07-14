import { Pressable, Text, View } from 'react-native';
import { Icon, type IconName } from '../Icon';
import { theme } from '../../theme';

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
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center h-20 px-4 rounded-card border active:opacity-90 ${
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
      <View
        className={`h-6 w-6 rounded-full border items-center justify-center ${
          selected ? 'border-accent bg-accent' : 'border-neutral-300 bg-white'
        }`}
      >
        {selected && <Icon name="Check" size={12} color="white" strokeWidth={3.5} />}
      </View>
    </Pressable>
  );
}
