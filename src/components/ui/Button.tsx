import { ActivityIndicator, Pressable, Text } from 'react-native';
import { Icon, type IconName } from '../Icon';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'text';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; text: string; iconColor: string }> = {
  primary: { bg: 'bg-primary', text: 'text-white', iconColor: '#FFFFFF' },
  secondary: { bg: 'bg-white border border-border', text: 'text-primary', iconColor: '#111111' },
  accent: { bg: 'bg-accent', text: 'text-white', iconColor: '#FFFFFF' },
  text: { bg: 'bg-transparent', text: 'text-slate', iconColor: '#6B7280' },
};

/**
 * Button component with primary/secondary/accent/text variants.
 * 20px radius, 56px height, full width by default.
 */
export function Button({
  title,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const style = VARIANT_STYLES[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`h-14 flex-row items-center justify-center rounded-button gap-2 ${style.bg} ${
        isDisabled ? 'opacity-50' : 'active:opacity-80'
      } ${className}`}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={style.iconColor} />
      ) : (
        <>
          {icon && <Icon name={icon} size="small" color={style.iconColor} />}
          <Text className={`text-body1 font-display ${style.text}`}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}
