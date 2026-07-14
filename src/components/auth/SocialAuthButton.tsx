import { Pressable, Text } from 'react-native';

interface SocialAuthButtonProps {
  onPress: () => void;
  provider: 'google' | 'apple' | 'email';
}

export function SocialAuthButton({ onPress, provider }: SocialAuthButtonProps) {
  const getIcon = () => {
    switch (provider) {
      case 'google':
        return <Text className="text-xl font-bold">G</Text>;
      case 'apple':
        return <Text className="text-xl">🍎</Text>;
      case 'email':
        return <Text className="text-xl">✉</Text>;
    }
  };

  const getLabel = () => {
    switch (provider) {
      case 'google':
        return 'Continue with Google';
      case 'apple':
        return 'Continue with Apple';
      case 'email':
        return 'Continue with Email';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 py-4"
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${provider}`}
    >
      {getIcon()}
      <Text className="text-base font-medium text-black">{getLabel()}</Text>
    </Pressable>
  );
}
