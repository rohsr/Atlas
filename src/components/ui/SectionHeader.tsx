import { Pressable, Text, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Section label with optional "See all" or similar action link.
 */
export function SectionHeader({
  title,
  actionLabel,
  onAction,
  className = '',
}: SectionHeaderProps) {
  return (
    <View className={`flex-row items-center justify-between ${className}`}>
      <Text className="text-title text-primary font-display">{title}</Text>
      {actionLabel && (
        <Pressable onPress={onAction} accessibilityRole="button">
          <Text className="text-body2 text-accent font-medium">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
