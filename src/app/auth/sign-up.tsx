import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { AuthTextInput, VerificationModal } from '../../components/auth';
import { Icon } from '../../components/Icon';

// Validation schema
const signUpSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password confirmation is required'),
    agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the Terms of Service and Privacy Policy'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const router = useRouter();
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUserEmail(data.email);
      setVerificationVisible(true);
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      setLoading(true);
      // Simulate verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Navigate to home on success
      setVerificationVisible(false);
      router.replace('/onboarding-flow/complete-profile');
    } catch (error) {
      console.error('Verification error:', error);
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
            <Text className="text-3xl font-semibold text-black">Create your account</Text>
            <Text className="mt-2 text-base text-slate">Let&apos;s get you started.</Text>
          </View>

          {/* Form */}
          <View className="gap-5">
            {/* Full Name Input */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <AuthTextInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.fullName?.message}
                  autoCapitalize="words"
                />
              )}
            />

            {/* Email Input */}
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

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <AuthTextInput
                  label="Password"
                  placeholder="Create a strong password"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  secureTextEntry
                  autoCapitalize="none"
                />
              )}
            />

            {/* Confirm Password Input */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <AuthTextInput
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                  autoCapitalize="none"
                />
              )}
            />

            {/* T&C Checkbox */}
            <Pressable
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              className="flex-row items-center gap-3"
              accessibilityRole="checkbox"
              accessibilityLabel="I agree to the Terms of Service and Privacy Policy"
            >
              <View
                className={`h-6 w-6 rounded-lg border-2 items-center justify-center ${
                  agreeToTerms
                    ? 'border-black bg-black'
                    : 'border-neutral-300 bg-white'
                }`}
              >
                {agreeToTerms && (
                  <Icon name="Check" size={14} color="white" strokeWidth={3} />
                )}
              </View>
              <Text className="flex-1 text-sm text-slate">
                I agree to the{' '}
                <Text className="font-semibold text-black">Terms of Service</Text>
                {' '}and{' '}
                <Text className="font-semibold text-black">Privacy Policy</Text>
              </Text>
            </Pressable>

            {errors.agreeToTerms && (
              <Text className="text-xs font-medium text-red-500">{errors.agreeToTerms.message}</Text>
            )}
          </View>

          {/* Create Account Button */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || loading || !agreeToTerms}
            className={`mt-8 h-14 items-center justify-center rounded-2xl ${
              isSubmitting || loading || !agreeToTerms ? 'bg-neutral-200' : 'bg-black'
            }`}
            accessibilityRole="button"
            accessibilityLabel="Create account"
          >
            <Text
              className={`text-base font-semibold ${
                isSubmitting || loading || !agreeToTerms ? 'text-slate' : 'text-white'
              }`}
            >
              {isSubmitting || loading ? 'Creating...' : 'Create Account'}
            </Text>
          </Pressable>

          {/* Sign In Link */}
          <View className="mt-6 flex-row items-center justify-center gap-1">
            <Text className="text-sm text-slate">Already have an account?</Text>
            <Pressable
              onPress={() => router.push('/auth/sign-in')}
              accessibilityRole="button"
              accessibilityLabel="Go to sign in"
            >
              <Text className="text-sm font-semibold text-black underline">Log in</Text>
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
