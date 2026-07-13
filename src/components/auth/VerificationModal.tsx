import { useEffect, useState } from 'react';
import { Modal, Pressable, TextInput as RNTextInput, ScrollView, Text, View } from 'react-native';

interface VerificationModalProps {
  visible: boolean;
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onClose?: () => void;
  loading?: boolean;
}

export function VerificationModal({
  visible,
  email,
  onVerify,
  onResend,
  onClose,
  loading = false,
}: VerificationModalProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(45);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!visible) {
      setCode(['', '', '', '', '', '']);
      setTimeLeft(45);
      setCanResend(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next field
    if (value && index < 5) {
      // The TextInput ref would normally handle this, but we'll trigger on the next index
    }

    // Auto-submit when all digits are entered
    if (newCode.every((digit) => digit !== '')) {
      onVerify(newCode.join(''));
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <ScrollView
        contentContainerClassName="flex-1"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <View className="flex-1 bg-white px-6 py-8">
          {/* Close Button */}
          <Pressable
            onPress={onClose}
            className="self-start"
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Text className="text-2xl">←</Text>
          </Pressable>

          {/* Content */}
          <View className="flex-1 justify-center">
            <Text className="text-2xl font-semibold text-black">Verify your email</Text>
            <Text className="mt-2 text-base text-slate">
              We've sent a 6-digit code to {'\n'}
              <Text className="font-semibold text-black">{email}</Text>
            </Text>

            {/* Code Input Grid */}
            <View className="mt-10 gap-4">
              <View className="flex-row justify-center gap-3">
                {code.map((digit, index) => (
                  <RNTextInput
                    key={index}
                    value={digit}
                    onChangeText={(value) => handleCodeChange(index, value)}
                    onKeyPress={(event) => handleKeyPress(index, event.nativeEvent.key)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className="h-16 w-14 rounded-2xl border border-neutral-200 text-center text-2xl font-semibold text-black"
                    placeholderTextColor="#e2e8f0"
                    editable={!loading}
                    accessibilityLabel={`Digit ${index + 1}`}
                  />
                ))}
              </View>
            </View>

            {/* Resend Timer */}
            <View className="mt-6 items-center gap-2">
              <Text className="text-sm text-slate">
                Resend code in{' '}
                <Text className="font-semibold text-black">{String(timeLeft).padStart(2, '0')}:{String(0).padStart(2, '0')}</Text>
              </Text>
              {canResend && (
                <Pressable
                  onPress={() => {
                    onResend();
                    setTimeLeft(45);
                    setCanResend(false);
                  }}
                  disabled={loading}
                  accessibilityRole="button"
                  accessibilityLabel="Resend code"
                >
                  <Text className="text-sm font-semibold text-black underline">Resend code</Text>
                </Pressable>
              )}
            </View>
          </View>

          {/* Verify Button */}
          <Pressable
            onPress={() => onVerify(code.join(''))}
            disabled={loading || code.some((digit) => !digit)}
            className={`h-14 items-center justify-center rounded-2xl ${
              loading || code.some((digit) => !digit) ? 'bg-neutral-200' : 'bg-black'
            }`}
            accessibilityRole="button"
            accessibilityLabel="Verify email"
          >
            <Text className={`text-base font-semibold ${
              loading || code.some((digit) => !digit) ? 'text-slate' : 'text-white'
            }`}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
}
