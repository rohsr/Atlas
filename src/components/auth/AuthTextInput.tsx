import { useState, useEffect } from 'react';
import { Pressable, TextInput as RNTextInput, Text, View } from 'react-native';
import { theme } from '../../theme';
import { Icon } from '../Icon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withRepeat,
  interpolateColor,
  FadeInDown,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AuthTextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  editable?: boolean;
}

export function AuthTextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  editable = true,
}: AuthTextInputProps) {
  const [isSecureVisible, setIsSecureVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isReduced = useReducedMotion();

  const focusProgress = useSharedValue(0);
  const shakeX = useSharedValue(0);

  useEffect(() => {
    focusProgress.value = withTiming(isFocused ? 1 : 0, { duration: 150 });
  }, [isFocused]);

  useEffect(() => {
    if (error && !isReduced) {
      shakeX.value = withSequence(
        withTiming(-8, { duration: 50 }),
        withRepeat(withTiming(8, { duration: 100 }), 3, true),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error, isReduced]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = error
      ? '#EF4444' // red-500
      : interpolateColor(
          focusProgress.value,
          [0, 1],
          ['#ECECEC', '#111111']
        );

    const backgroundColor = error
      ? '#FFFFFF'
      : interpolateColor(
          focusProgress.value,
          [0, 1],
          ['#FFFFFF', '#F8FAFC']
        );

    return {
      borderColor,
      backgroundColor,
      transform: [{ translateX: shakeX.value }],
    };
  });

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-black">{label}</Text>
      <Animated.View
        style={animatedContainerStyle}
        className="flex-row items-center rounded-xl border px-4 py-3"
      >
        <RNTextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isSecureVisible}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#94a3b8"
          className="flex-1 text-base text-black"
          accessibilityLabel={label}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsSecureVisible(!isSecureVisible)}
            accessibilityRole="button"
            accessibilityLabel={isSecureVisible ? 'Hide password' : 'Show password'}
            className="ml-2"
          >
            <Icon
              name={isSecureVisible ? 'Hide Password' : 'Eye'}
              size="small"
              color={theme.colors.slate}
            />
          </Pressable>
        )}
      </Animated.View>
      {error && (
        <Animated.View entering={isReduced ? undefined : FadeInDown.duration(150)}>
          <Text className="text-xs font-medium text-red-500">{error}</Text>
        </Animated.View>
      )}
    </View>
  );
}

