import { Text, View } from 'react-native';
import { Icon, type IconName } from '../Icon';
import { Button } from './Button';
import { theme } from '../../theme';

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
  return (
    <View className={`flex-1 items-center justify-center px-12 ${className}`}>
      <View className="h-16 w-16 rounded-full bg-blue-50 items-center justify-center mb-5">
        <Icon name={icon} size="large" color={theme.colors.accent} />
      </View>
      <Text className="text-heading2 text-primary font-display text-center">{title}</Text>
      {subtitle && (
        <Text className="mt-2 text-body1 text-slate font-sans text-center">{subtitle}</Text>
      )}
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="accent"
          className="mt-6 w-52"
        />
      )}
    </View>
  );
}
