import { Pressable, Text, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

interface SocialAuthButtonProps {
  onPress: () => void;
  provider: 'google' | 'apple' | 'email';
}

function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export function SocialAuthButton({ onPress, provider }: SocialAuthButtonProps) {
  const renderIcon = () => {
    switch (provider) {
      case 'google':
        return <GoogleLogo size={20} />;
      case 'apple':
        return <Ionicons name="logo-apple" size={22} color="black" />;
      case 'email':
        return <Feather name="mail" size={20} color="black" />;
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
      className="relative flex-row items-center justify-center h-14 rounded-2xl border border-neutral-200 bg-white active:bg-neutral-50 px-6"
      style={{
        shadowColor: '#111111',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
      }}
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${provider}`}
    >
      <View className="absolute left-5 items-center justify-center">
        {renderIcon()}
      </View>
      <Text className="text-base font-semibold text-black font-sans">{getLabel()}</Text>
    </Pressable>
  );
}
