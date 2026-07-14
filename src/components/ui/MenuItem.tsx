import { Pressable, Text, View } from 'react-native';
import { Icon, type IconName } from '../Icon';
import { theme } from '../../theme';

interface MenuItemProps {
  icon: IconName;
  iconTint?: string;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  rightElement?: React.ReactNode;
  className?: string;
}

/**
 * Settings-style menu row: tinted icon circle, label, value/chevron right.
 */
export function MenuItem({
  icon,
  iconTint = '#DBEAFE',
  label,
  value,
  onPress,
  showChevron = true,
  rightElement,
  className = '',
}: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center h-[52px] px-4 active:opacity-80 ${className}`}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {/* Icon circle */}
      <View
        className="h-10 w-10 rounded-md items-center justify-center mr-3"
        style={{ backgroundColor: iconTint }}
      >
        <Icon name={icon} size="small" color={theme.colors.primary} />
      </View>

      {/* Label */}
      <Text className="flex-1 text-body1 text-primary font-sans">{label}</Text>

      {/* Right side */}
      {rightElement ? (
        rightElement
      ) : value ? (
        <Text className="text-body2 text-slate font-sans mr-1">{value}</Text>
      ) : null}

      {showChevron && !rightElement && (
        <Icon name="ChevronRight" size="small" color={theme.colors.slate} />
      )}
    </Pressable>
  );
}
