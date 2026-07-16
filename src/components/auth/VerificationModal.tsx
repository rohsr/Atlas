import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Modal,
  TextInput as RNTextInput,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useHaptics } from '../../hooks/useHaptics';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Icon } from '../Icon';
import { ScalePress } from '../ui/Animation';

interface VerificationModalProps {
  visible: boolean;
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onClose?: () => void;
  loading?: boolean;
}

const CODE_LENGTH = 6;

function BlinkingCursor() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
  }, [opacity]);

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        cursorStyle,
        {
          width: 2,
          height: 24,
          backgroundColor: '#111111',
          position: 'absolute',
          alignSelf: 'center',
        },
      ]}
    />
  );
}

export function VerificationModal({
  visible,
  email,
  onVerify,
  onResend,
  onClose,
  loading = false,
}: VerificationModalProps) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [timeLeft, setTimeLeft] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const inputRefs = useRef<(RNTextInput | null)[]>([]);
  const haptics = useHaptics();
  const isReduced = useReducedMotion();

  // Shake animation for error states
  const shakeX = useSharedValue(0);
  const buttonScale = useSharedValue(1);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const triggerShake = () => {
    if (isReduced) return;
    shakeX.value = withSequence(
      withTiming(-8, { duration: 50 }),
      withRepeat(withTiming(8, { duration: 100 }), 3, true),
      withTiming(0, { duration: 50 }),
    );
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  // Animate verify button when code becomes complete
  useEffect(() => {
    if (isCodeComplete && !isReduced) {
      buttonScale.value = withSequence(
        withTiming(1.05, { duration: 150 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );
    } else {
      buttonScale.value = 1;
    }
  }, [isCodeComplete, isReduced, buttonScale]);

  // Reset state when modal closes
  useEffect(() => {
    if (!visible) {
      const timeoutId = setTimeout(() => {
        setCode(Array(CODE_LENGTH).fill(''));
        setTimeLeft(45);
        setCanResend(false);
        setFocusedIndex(null);
      }, 300); // Slight delay to let exit animation complete
      return () => clearTimeout(timeoutId);
    }

    // Auto-focus first input when modal opens
    const focusTimeout = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 400);

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(focusTimeout);
      clearInterval(timer);
    };
  }, [visible]);

  const handleCodeChange = (index: number, value: string) => {
    // Handle paste — user pastes full OTP
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, CODE_LENGTH).split('');
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (index + i < CODE_LENGTH) {
          newCode[index + i] = digit;
        }
      });
      setCode(newCode);
      haptics.light();

      // Focus the next empty field or the last field
      const nextEmpty = newCode.findIndex((d) => d === '');
      if (nextEmpty >= 0) {
        inputRefs.current[nextEmpty]?.focus();
      } else {
        // All filled — dismiss keyboard and auto-submit
        Keyboard.dismiss();
        haptics.success();
        onVerify(newCode.join(''));
      }
      return;
    }

    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value) {
      haptics.light();

      if (index < CODE_LENGTH - 1) {
        // Auto-focus next input
        inputRefs.current[index + 1]?.focus();
      } else {
        // Last digit — dismiss keyboard
        Keyboard.dismiss();
      }

      // Check if all digits are filled
      if (newCode.every((digit) => digit !== '')) {
        haptics.success();
        onVerify(newCode.join(''));
      }
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      if (!code[index] && index > 0) {
        // Move to previous field and clear it
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
        haptics.light();
      } else if (code[index]) {
        // Clear current field
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handleVerifyPress = () => {
    const fullCode = code.join('');
    if (fullCode.length === CODE_LENGTH) {
      haptics.medium();
      onVerify(fullCode);
    } else {
      // Shake the inputs to indicate error
      triggerShake();
      haptics.error();
    }
  };

  const handleResend = () => {
    haptics.medium();
    onResend();
    setTimeLeft(45);
    setCanResend(false);
    setCode(Array(CODE_LENGTH).fill(''));
    // Re-focus first input
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
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
          <Animated.View entering={FadeIn.delay(200).duration(300)}>
            <ScalePress
              onPress={() => {
                haptics.light();
                onClose?.();
              }}
              scaleValue={0.9}
              haptic={false}
              className="self-start h-11 w-11 items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Icon name="Back" size={24} />
            </ScalePress>
          </Animated.View>

          {/* Content */}
          <View className="flex-1 justify-center">
            <Animated.View entering={FadeInDown.delay(300).duration(400)}>
              <Text className="text-2xl font-semibold text-black">Verify your email</Text>
              <Text className="mt-2 text-base text-slate">
                We&apos;ve sent a 6-digit code to {'\n'}
                <Text className="font-semibold text-black">{email}</Text>
              </Text>
            </Animated.View>

            {/* Code Input Grid */}
            <Animated.View entering={FadeInDown.delay(400).duration(400)}>
              <Animated.View style={shakeStyle}>
                <View className="mt-10 gap-4">
                  <View className="flex-row justify-center gap-3">
                    {code.map((digit, index) => {
                      const isBoxFocused = focusedIndex === index;
                      return (
                        <View key={index} className="relative justify-center w-14">
                          <RNTextInput
                            ref={(ref) => {
                              inputRefs.current[index] = ref;
                            }}
                            value={digit}
                            onChangeText={(value) => handleCodeChange(index, value)}
                            onKeyPress={(event) =>
                              handleKeyPress(index, event.nativeEvent.key)
                            }
                            onFocus={() => setFocusedIndex(index)}
                            onBlur={() => setFocusedIndex(null)}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            autoComplete={index === 0 ? 'sms-otp' : 'off'}
                            maxLength={index === 0 ? CODE_LENGTH : 1}
                            selectTextOnFocus
                            caretHidden={true}
                            className={`h-16 w-14 rounded-2xl border text-center text-2xl font-semibold text-black ${isBoxFocused
                              ? 'border-black bg-slate-50'
                              : digit
                                ? 'border-black bg-gray-50'
                                : 'border-neutral-200 bg-white'
                              }`}
                            placeholderTextColor="#e2e8f0"
                            editable={!loading}
                            accessibilityLabel={`Digit ${index + 1}`}
                          />
                          {isBoxFocused && !digit && <BlinkingCursor />}
                        </View>
                      );
                    })}
                  </View>
                </View>
              </Animated.View>
            </Animated.View>

            {/* Resend Timer */}
            <Animated.View
              entering={FadeInDown.delay(500).duration(400)}
              className="mt-6 items-center gap-2"
            >
              {!canResend ? (
                <Text className="text-sm text-slate">
                  Resend code in{' '}
                  <Text className="font-semibold text-black">
                    {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                    {String(timeLeft % 60).padStart(2, '0')}
                  </Text>
                </Text>
              ) : (
                <ScalePress
                  onPress={handleResend}
                  disabled={loading}
                  scaleValue={0.97}
                  haptic={false}
                  accessibilityRole="button"
                  accessibilityLabel="Resend code"
                >
                  <Text className="text-sm font-semibold text-black underline">
                    Resend code
                  </Text>
                </ScalePress>
              )}
            </Animated.View>
          </View>

          {/* Verify Button */}
          <Animated.View entering={FadeInDown.delay(600).duration(400)}>
            <Animated.View style={buttonStyle}>
              <ScalePress
                onPress={handleVerifyPress}
                disabled={loading || !isCodeComplete}
                scaleValue={0.96}
                haptic={false}
                className={`h-14 items-center justify-center rounded-2xl ${loading || !isCodeComplete ? 'bg-neutral-200' : 'bg-black'
                  }`}
                accessibilityRole="button"
                accessibilityLabel="Verify email"
              >
                <Text
                  className={`text-base font-semibold ${loading || !isCodeComplete ? 'text-slate' : 'text-white'
                    }`}
                >
                  {loading ? 'Verifying...' : 'Verify Email'}
                </Text>
              </ScalePress>
            </Animated.View>
          </Animated.View>
        </View>
      </ScrollView>
    </Modal>
  );
}
