import { Text, View } from 'react-native';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'accent';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; text: string }> = {
  default: { bg: 'bg-gray-100', text: 'text-slate' },
  success: { bg: 'bg-green-50', text: 'text-success' },
  warning: { bg: 'bg-amber-50', text: 'text-warning' },
  danger: { bg: 'bg-red-50', text: 'text-danger' },
  accent: { bg: 'bg-blue-50', text: 'text-accent' },
};

/**
 * Small pill badge for status indicators, countdowns, etc.
 */
export function Badge({ label, variant = 'default', dot, className = '' }: BadgeProps) {
  const style = VARIANT_STYLES[variant];

  return (
    <View
      className={`flex-row items-center px-2.5 py-1 rounded-full ${style.bg} ${className}`}
    >
      {dot && (
        <View className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
          variant === 'success' ? 'bg-success' :
          variant === 'accent' ? 'bg-accent' :
          variant === 'warning' ? 'bg-warning' :
          variant === 'danger' ? 'bg-danger' : 'bg-slate'
        }`} />
      )}
      <Text className={`text-caption font-medium ${style.text}`}>{label}</Text>
    </View>
  );
}
