import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop, G, Circle, Rect } from 'react-native-svg';
import { useSignUp } from '@clerk/expo';

function VerificationGraphic() {
  return (
    <View className="items-center justify-center my-6">
      <View className="relative h-32 w-32 items-center justify-center">
        {/* Soft blue glowing circle background */}
        <View
          className="absolute inset-0 rounded-full scale-95"
          style={{ backgroundColor: 'rgba(239, 246, 255, 0.7)' }}
        />
        <View
          className="absolute inset-2 rounded-full scale-95"
          style={{ backgroundColor: 'rgba(219, 234, 254, 0.5)' }}
        />
        
        <Svg width={96} height={96} viewBox="0 0 120 120" fill="none">
          <Defs>
            {/* Soft gradient for the envelope body */}
            <LinearGradient id="envelopeGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FFFFFF" />
              <Stop offset="100%" stopColor="#F3F4F6" />
            </LinearGradient>
            {/* Paper Airplane Gradient */}
            <LinearGradient id="planeGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#60A5FA" />
              <Stop offset="100%" stopColor="#2563EB" />
            </LinearGradient>
            {/* Plane Shadow / Accent */}
            <LinearGradient id="planeAccent" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#2563EB" />
              <Stop offset="100%" stopColor="#1D4ED8" />
            </LinearGradient>
          </Defs>

          {/* Envelope Back / Base */}
          <Rect
            x="25"
            y="45"
            width="70"
            height="40"
            fill="url(#envelopeGrad)"
            rx="8"
            stroke="#E5E7EB"
            strokeWidth="1.5"
          />

          {/* Open flap of envelope */}
          <Path
            d="M25 45l35 25 35-25"
            stroke="#D1D5DB"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          
          {/* Glow/Light effect behind airplane */}
          <Circle cx="75" cy="45" r="22" fill="#DBEAFE" opacity="0.6" />

          {/* Paper Airplane flying up and right */}
          <G transform="translate(52, 22) rotate(-15)">
            {/* Right Wing / Main body */}
            <Path
              d="M0 25 L35 0 L15 35 L10 25 Z"
              fill="url(#planeGrad)"
            />
            {/* Left Wing fold */}
            <Path
              d="M0 25 L35 0 L10 25 Z"
              fill="url(#planeAccent)"
            />
            {/* Folded under part */}
            <Path
              d="M10 25 L15 35 L15 28 Z"
              fill="#1E40AF"
            />
          </G>

          {/* Envelope Front Flap overlay to make airplane look like it's coming out */}
          <Path
            d="M25 85l35-25 35 25"
            fill="#F9FAFB"
            stroke="#E5E7EB"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </View>
  );
}

export default function VerifyScreen() {
  const router = useRouter();
  const { email = 'you@example.com' } = useLocalSearchParams<{ email: string }>();

  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [canResend]);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (newCode.every((digit) => digit !== '')) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      if (!code[index] && index > 0) {
        // Clear previous box and focus it
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      } else if (code[index]) {
        // Clear current box
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handleVerify = async (otpCode: string) => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.warn('Verification incomplete status:', completeSignUp.status);
        Alert.alert('Verification Incomplete', `Verification status: ${completeSignUp.status}`);
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      const errorMessage = error?.errors?.[0]?.message || error?.message || 'Verification failed. Please check the code.';
      Alert.alert('Verification Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setTimeLeft(45);
      setCanResend(false);
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      console.error('Resend error:', error);
      const errorMessage = error?.errors?.[0]?.message || error?.message || 'Failed to resend code. Please try again.';
      Alert.alert('Resend Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="grow"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-between px-6 py-4">
            <View>
              {/* Back Button */}
              <Pressable
                onPress={() => router.back()}
                className="self-start py-2 pr-4"
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <Feather name="arrow-left" size={24} color="black" />
              </Pressable>

              {/* Graphic/Illustration */}
              <VerificationGraphic />

              {/* Header */}
              <View className="items-center mt-4">
                <Text className="text-[32px] font-bold text-black font-sans leading-[40px] text-center">
                  Verify your email
                </Text>
                <Text className="mt-3 text-base text-slate font-sans text-center max-w-[320px] leading-6">
                  {"We've sent a 6-digit code to"}{'\n'}
                  <Text className="font-semibold text-black">{email}</Text>
                </Text>
              </View>

              {/* Code Input Grid */}
              <View className="mt-8 flex-row justify-center gap-2">
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    value={digit}
                    onChangeText={(value) => handleCodeChange(index, value)}
                    onKeyPress={(event) => handleKeyPress(index, event.nativeEvent.key)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className="h-14 w-12 rounded-[16px] border border-neutral-200 text-center text-2xl font-bold text-black bg-white"
                    placeholderTextColor="#CBD5E1"
                    editable={!loading}
                    selectTextOnFocus
                    accessibilityLabel={`Digit ${index + 1}`}
                  />
                ))}
              </View>

              {/* Resend Timer */}
              <View className="mt-8 items-center">
                {canResend ? (
                  <Pressable
                    onPress={handleResend}
                    disabled={loading}
                    accessibilityRole="button"
                    accessibilityLabel="Resend code"
                  >
                    <Text className="text-sm font-semibold text-black underline font-sans">
                      Resend code
                    </Text>
                  </Pressable>
                ) : (
                  <Text className="text-sm font-semibold text-slate font-sans">
                    Resend code in{' '}
                    <Text className="text-black">
                      00:{String(timeLeft).padStart(2, '0')}
                    </Text>
                  </Text>
                )}
              </View>
            </View>

            {/* Verify Button */}
            <View className="mt-12 mb-4">
              <Pressable
                onPress={() => handleVerify(code.join(''))}
                disabled={loading || !isCodeComplete}
                className={`h-14 items-center justify-center rounded-full active:opacity-90 ${
                  loading || !isCodeComplete ? 'bg-neutral-200' : 'bg-black'
                }`}
                accessibilityRole="button"
                accessibilityLabel="Verify email"
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text
                    className={`text-base font-semibold font-sans ${
                      loading || !isCodeComplete ? 'text-slate' : 'text-white'
                    }`}
                  >
                    Verify Email
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
