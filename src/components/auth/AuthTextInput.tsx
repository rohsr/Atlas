import { useState } from 'react';
import { Pressable, TextInput as RNTextInput, Text, View } from 'react-native';

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

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-black">{label}</Text>
      <View
        className={`flex-row items-center rounded-xl border px-4 py-3 ${
          error ? 'border-red-500' : isFocused ? 'border-black bg-slate-50' : 'border-neutral-200 bg-white'
        }`}
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
            <Text className="text-lg text-slate-500">{isSecureVisible ? '👁️' : '👁️‍🗨️'}</Text>
          </Pressable>
        )}
      </View>
      {error && <Text className="text-xs font-medium text-red-500">{error}</Text>}
    </View>
  );
}
