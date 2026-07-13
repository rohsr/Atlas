import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/expo';

export default function Index() {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-[40px] font-bold text-black font-sans leading-[48px] text-center">Atlas</Text>
        <Text className="mt-4 text-base text-slate text-center max-w-md font-sans leading-6">
          Atlas helps you manage every part of every journey with calm, premium design.
        </Text>

        {isSignedIn ? (
          <View className="mt-12 items-center w-full max-w-xs">
            <Text className="text-lg font-semibold text-slate font-sans mb-1">
              Welcome back,
            </Text>
            <Text className="text-base font-bold text-black font-sans mb-8">
              {user?.emailAddresses[0]?.emailAddress}
            </Text>

            <Pressable
              onPress={() => signOut()}
              className="w-full h-14 items-center justify-center rounded-full bg-black active:opacity-90"
              accessibilityRole="button"
              accessibilityLabel="Sign out"
            >
              <Text className="text-base font-semibold text-white font-sans">
                Sign Out
              </Text>
            </Pressable>
          </View>
        ) : (
          <View className="mt-12 w-full max-w-xs gap-4">
            <Link href="/auth/sign-in" asChild>
              <Pressable
                className="h-14 items-center justify-center rounded-full bg-black active:opacity-90"
                accessibilityRole="button"
                accessibilityLabel="Go to sign in"
              >
                <Text className="text-base font-semibold text-white font-sans">
                  Sign In
                </Text>
              </Pressable>
            </Link>

            <Link href="/auth/sign-up" asChild>
              <Pressable
                className="h-14 items-center justify-center rounded-full border border-neutral-200 bg-white active:opacity-90"
                accessibilityRole="button"
                accessibilityLabel="Go to sign up"
              >
                <Text className="text-base font-semibold text-black font-sans">
                  Create Account
                </Text>
              </Pressable>
            </Link>

            <Link href="/onboarding" asChild>
              <Pressable
                className="mt-4 py-2 items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel="Open onboarding"
              >
                <Text className="text-sm font-semibold text-slate underline font-sans">
                  Open Onboarding
                </Text>
              </Pressable>
            </Link>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
