import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useSignIn, useOAuth } from '@clerk/expo';

import { AuthTextInput, SocialAuthButton } from '../../components/auth';

WebBrowser.maybeCompleteAuthSession();

// Validation schema
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormData = z.infer<typeof signInSchema>;

const defaultValues = {
  email: '',
  password: '',
};

const resolver = zodResolver(signInSchema);

export default function SignInScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();
  
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: startAppleOAuth } = useOAuth({ strategy: 'oauth_apple' });

  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver,
    defaultValues,
  });

  const onSubmit = async (data: SignInFormData) => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.warn('Sign-in status incomplete:', signInAttempt.status);
        Alert.alert('Authentication Incomplete', `Status: ${signInAttempt.status}`);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      const errorMessage = error?.errors?.[0]?.message || error?.message || 'An error occurred during sign in.';
      Alert.alert('Sign In Failed', errorMessage);
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
        console.warn(`OAuth sign in status incomplete for provider: ${provider}`);
      }
    } catch (error: any) {
      console.error(`${provider} OAuth error:`, error);
      const errorMessage = error?.errors?.[0]?.message || error?.message || `An error occurred signing in with ${provider}.`;
      Alert.alert('Authentication Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailButtonPress = () => {
    // Focus on email input field for a premium, smooth transition
    setFocus('email');
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
            <Text className="text-[32px] font-bold text-black font-sans leading-[40px]">Welcome back</Text>
            <Text className="mt-2 text-base text-slate font-sans">Log in to continue your journeys.</Text>
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

          {/* Email/Password Form */}
          <View className="gap-4">
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

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <AuthTextInput
                  ref={ref}
                  label="Password"
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                  autoCapitalize="none"
                />
              )}
            />

            {/* Forgot Password */}
            <Pressable
              onPress={() => console.log('Forgot password')}
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
              className="self-end"
            >
              <Text className="text-sm font-semibold text-black underline font-sans">Forgot password?</Text>
            </Pressable>

            {/* Log In Button */}
            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || loading}
              className={`mt-4 h-14 items-center justify-center rounded-full active:opacity-90 ${
                isSubmitting || loading ? 'bg-neutral-200' : 'bg-black'
              }`}
              accessibilityRole="button"
              accessibilityLabel="Log in"
            >
              <Text
                className={`text-base font-semibold font-sans ${
                  isSubmitting || loading ? 'text-slate' : 'text-white'
                }`}
              >
                {isSubmitting || loading ? 'Logging in...' : 'Log In'}
              </Text>
            </Pressable>
          </View>

          {/* Sign Up Link */}
          <View className="mt-8 mb-4 flex-row items-center justify-center gap-1">
            <Text className="text-sm text-slate font-sans">{"Don't have an account?"}</Text>
            <Pressable
              onPress={() => router.push('/auth/sign-up')}
              accessibilityRole="button"
              accessibilityLabel="Go to sign up"
            >
              <Text className="text-sm font-semibold text-black underline font-sans">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
