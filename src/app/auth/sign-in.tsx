import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { AuthTextInput, SocialAuthButton, VerificationModal } from '../../components/auth';
import { Icon } from '../../components/Icon';
import { useAuthStore } from '../../stores/auth.store';
import { useUIStore } from '../../stores/ui.store';
import { useHaptics } from '../../hooks/useHaptics';
import { MOCK_USER } from '../../constants/mock-data';

// Validation schema
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const router = useRouter();
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const signIn = useAuthStore((s) => s.signIn);
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUserEmail(data.email);
      setVerificationVisible(true);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    try {
      setLoading(true);
      // Simulate social auth
      await new Promise((resolve) => setTimeout(resolve, 500));
      // For demo, show verification modal
      setUserEmail(`user+${provider}@example.com`);
      setVerificationVisible(true);
    } catch (error) {
      console.error('Social auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      setLoading(true);
      // Simulate verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Sign in via auth store and navigate to home
      signIn(MOCK_USER);
      haptics.success();
      setVerificationVisible(false);
      router.replace('/(tabs)');
    } catch (error) {
      haptics.error();
      showToast('Verification failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Resend error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="grow"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 py-6">
          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className="self-start"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Icon name="Back" size={24} />
          </Pressable>

          {/* Header */}
          <View className="mt-8 mb-8">
            <Text className="text-3xl font-semibold text-black">Welcome back</Text>
            <Text className="mt-2 text-base text-slate">Log in to continue your journeys.</Text>
          </View>

          {showEmailForm ? (
            // Email/Password Form
            <View className="gap-5">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <AuthTextInput
                    label="Email"
                    placeholder="you@example.com"
                    value={value}
                    onChangeText={onChange}
                    error={errors.email?.message}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <AuthTextInput
                    label="Password"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    error={errors.password?.message}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                )}
              />

              {/* Forgot Password */}
              <Pressable
                onPress={() => {
                  haptics.light();
                  showToast('Password reset coming soon', 'info');
                }}
                accessibilityRole="button"
                accessibilityLabel="Forgot password"
              >
                <Text className="text-sm font-semibold text-black underline">Forgot password?</Text>
              </Pressable>

              {/* Log In Button */}
              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting || loading}
                className={`h-14 items-center justify-center rounded-2xl ${
                  isSubmitting || loading ? 'bg-neutral-200' : 'bg-black'
                }`}
                accessibilityRole="button"
                accessibilityLabel="Log in"
              >
                <Text
                  className={`text-base font-semibold ${
                    isSubmitting || loading ? 'text-slate' : 'text-white'
                  }`}
                >
                  {isSubmitting || loading ? 'Logging in...' : 'Log In'}
                </Text>
              </Pressable>

              {/* Back to Social Auth */}
              <Pressable
                onPress={() => setShowEmailForm(false)}
                accessibilityRole="button"
                accessibilityLabel="Back to social auth options"
                className="py-2"
              >
                <Text className="text-center text-sm text-slate">
                  Back to other options
                </Text>
              </Pressable>
            </View>
          ) : (
            // Social Auth Options
            <View className="gap-4">
              <SocialAuthButton
                provider="google"
                onPress={() => handleSocialAuth('google')}
              />
              <SocialAuthButton
                provider="apple"
                onPress={() => handleSocialAuth('apple')}
              />

              {/* Divider */}
              <View className="flex-row items-center gap-3 py-2">
                <View className="flex-1 h-px bg-neutral-200" />
                <Text className="text-sm text-slate">or</Text>
                <View className="flex-1 h-px bg-neutral-200" />
              </View>

              <SocialAuthButton
                provider="email"
                onPress={() => setShowEmailForm(true)}
              />
            </View>
          )}

          {/* Sign Up Link */}
          <View className="mt-8 flex-row items-center justify-center gap-1">
            <Text className="text-sm text-slate">Don&apos;t have an account?</Text>
            <Pressable
              onPress={() => router.push('/auth/sign-up')}
              accessibilityRole="button"
              accessibilityLabel="Go to sign up"
            >
              <Text className="text-sm font-semibold text-black underline">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Verification Modal */}
      <VerificationModal
        visible={verificationVisible}
        email={userEmail}
        onVerify={handleVerify}
        onResend={handleResend}
        onClose={() => setVerificationVisible(false)}
        loading={loading}
      />
    </SafeAreaView>
  );
}
