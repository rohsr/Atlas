import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useSignUp, useOAuth } from '@clerk/expo';

import { AuthTextInput, SocialAuthButton } from '../../components/auth';

WebBrowser.maybeCompleteAuthSession();

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

const defaultValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
};

const resolver = zodResolver(signUpSchema);

export default function SignUpScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { isLoaded, signUp } = useSignUp();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startAppleOAuth } = useOAuth({ strategy: 'oauth_apple' });

  const {
    control,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver,
    defaultValues,
  });

  const onSubmit = async (data: SignUpFormData) => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      const nameParts = data.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      router.push({
        pathname: '/auth/verify',
        params: { email: data.email },
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      const errorMessage = error?.errors?.[0]?.message || error?.message || 'An error occurred during sign up.';
      Alert.alert('Sign Up Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    if (provider === 'email') {
      handleEmailButtonPress();
      return;
    }
    if (!isLoaded) return;
    try {
      setLoading(true);
      const startOAuthFlow = provider === 'google' ? startGoogleOAuth : startAppleOAuth;
      const { createdSessionId, setActive: setOAuthActive } = await startOAuthFlow();
      if (createdSessionId && setOAuthActive) {
        await setOAuthActive({ session: createdSessionId });
        router.replace('/');
      } else {
        console.warn(`OAuth sign up status incomplete for provider: ${provider}`);
      }
    } catch (error: any) {
      console.error(`${provider} OAuth error:`, error);
      const errorMessage = error?.errors?.[0]?.message || error?.message || `An error occurred signing up with ${provider}.`;
      Alert.alert('Authentication Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailButtonPress = () => {
    // Focus on fullName input field for a premium, smooth transition
    setFocus('fullName');
  };

  const toggleAgreeToTerms = () => {
    const newValue = !agreeToTerms;
    setAgreeToTerms(newValue);
    setValue('agreeToTerms', newValue, { shouldValidate: true });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="grow"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 py-4">
          {/* Back Button */}
          <Pressable
            onPress={() => router.back()}
            className="self-start py-2 pr-4"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>

          {/* Header */}
          <View className="mt-6 mb-6">
            <Text className="text-[32px] font-bold text-black font-sans leading-[40px]">Create your account</Text>
            <Text className="mt-2 text-base text-slate font-sans">{"Let's get you started."}</Text>
          </View>

          {/* Social Auth Options */}
          <View className="gap-3">
            <SocialAuthButton
              provider="google"
              onPress={() => handleSocialAuth('google')}
            />
            <SocialAuthButton
              provider="apple"
              onPress={() => handleSocialAuth('apple')}
            />
            <SocialAuthButton
              provider="email"
              onPress={handleEmailButtonPress}
            />
          </View>

          {/* Divider */}
          <View className="flex-row items-center gap-4 py-6">
            <View className="flex-1 h-px bg-neutral-100" />
            <Text className="text-sm font-semibold text-neutral-400 font-sans">or</Text>
            <View className="flex-1 h-px bg-neutral-100" />
          </View>

          {/* Form */}
          <View className="gap-4">
            {/* Full Name Input */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <AuthTextInput
                  ref={ref}
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.fullName?.message}
                  autoCapitalize="words"
                />
              )}
            />

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <AuthTextInput
                  ref={ref}
                  label="Email"
                  placeholder="you@example.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
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
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <AuthTextInput
                  ref={ref}
                  label="Password"
                  placeholder="Create a strong password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
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
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <AuthTextInput
                  ref={ref}
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                  autoCapitalize="none"
                />
              )}
            />

            {/* T&C Checkbox */}
            <Pressable
              onPress={toggleAgreeToTerms}
              className="flex-row items-start gap-3 mt-2"
              accessibilityRole="checkbox"
              accessibilityLabel="I agree to the Terms of Service and Privacy Policy"
            >
              <View
                className={`h-6 w-6 rounded-lg border items-center justify-center mt-0.5 ${
                  agreeToTerms
                    ? 'border-atlas bg-atlas'
                    : 'border-neutral-300 bg-white'
                }`}
              >
                {agreeToTerms && (
                  <Feather name="check" size={14} color="white" />
                )}
              </View>
              <Text className="flex-1 text-sm text-slate leading-5 font-sans">
                I agree to the{' '}
                <Text className="font-semibold text-black">Terms of Service</Text>
                {' '}and{' '}
                <Text className="font-semibold text-black">Privacy Policy</Text>
              </Text>
            </Pressable>

            {errors.agreeToTerms && (
              <Text className="text-xs font-semibold text-red-500 font-sans mt-1">{errors.agreeToTerms.message}</Text>
            )}
          </View>

          {/* Create Account Button */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || loading || !agreeToTerms}
            className={`mt-8 h-14 items-center justify-center rounded-full active:opacity-90 ${
              isSubmitting || loading || !agreeToTerms ? 'bg-neutral-200' : 'bg-black'
            }`}
            accessibilityRole="button"
            accessibilityLabel="Create account"
          >
            <Text
              className={`text-base font-semibold font-sans ${
                isSubmitting || loading || !agreeToTerms ? 'text-slate' : 'text-white'
              }`}
            >
              {isSubmitting || loading ? 'Creating...' : 'Create Account'}
            </Text>
          </Pressable>

          {/* Sign In Link */}
          <View className="mt-6 mb-4 flex-row items-center justify-center gap-1">
            <Text className="text-sm text-slate font-sans">Already have an account?</Text>
            <Pressable
              onPress={() => router.push('/auth/sign-in')}
              accessibilityRole="button"
              accessibilityLabel="Go to sign in"
            >
              <Text className="text-sm font-semibold text-black underline font-sans">Log in</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
