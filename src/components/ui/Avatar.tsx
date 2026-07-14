import { Image } from 'expo-image';
import { Text, View } from 'react-native';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const SIZES = {
  small: { container: 'h-8 w-8', text: 'text-caption' },
  medium: { container: 'h-10 w-10', text: 'text-body2' },
  large: { container: 'h-20 w-20', text: 'text-heading2' },
} as const;

/**
 * Circular avatar with image or fallback initials.
 */
export function Avatar({ uri, name, size = 'medium', className = '' }: AvatarProps) {
  const s = SIZES[size];
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  if (uri) {
    return (
      <Image
        source={{ uri }}
        className={`${s.container} rounded-full ${className}`}
        contentFit="cover"
        accessibilityLabel={name ?? 'Avatar'}
      />
    );
  }

  return (
    <View
      className={`${s.container} rounded-full bg-border items-center justify-center ${className}`}
    >
      <Text className={`${s.text} text-slate font-display`}>{initials}</Text>
    </View>
  );
}
