import { forwardRef, useState, memo } from 'react';
import { Pressable, TextInput as RNTextInput, Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AuthTextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  editable?: boolean;
}

export const AuthTextInput = memo(
  forwardRef<RNTextInput, AuthTextInputProps>(
    (
      {
        label,
        placeholder,
        value,
        onChangeText,
        onBlur,
        secureTextEntry = false,
        error,
        autoCapitalize = 'sentences',
        keyboardType = 'default',
        editable = true,
      },
      ref
    ) => {
      const [isSecureVisible, setIsSecureVisible] = useState(false);
      const [isFocused, setIsFocused] = useState(false);

      return (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: error ? '#EF4444' : isFocused ? '#111111' : '#ECECEC',
              },
            ]}
          >
            <RNTextInput
              ref={ref}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry && !isSecureVisible}
              autoCapitalize={autoCapitalize}
              keyboardType={keyboardType}
              editable={editable}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onBlur?.();
              }}
              placeholderTextColor="#94a3b8"
              style={styles.input}
              accessibilityLabel={label}
            />
            {secureTextEntry && (
              <Pressable
                onPress={() => setIsSecureVisible(!isSecureVisible)}
                accessibilityRole="button"
                accessibilityLabel={isSecureVisible ? 'Hide password' : 'Show password'}
                style={styles.eyeButton}
              >
                <Feather
                  name={isSecureVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="#6B7280"
                />
              </Pressable>
            )}
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      );
    }
  )
);

AuthTextInput.displayName = 'AuthTextInput';

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    // Soft shadow is kept static to prevent rendering/layout reflows on focus
    shadowColor: '#111111',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111111',
    fontFamily: 'Inter-Regular',
    padding: 0,
  },
  eyeButton: {
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
});
