import { Link } from 'expo-router';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const backgroundImage = require('../../assets/images/bgimg.png');
const logoImage = require('../../assets/images/logo.png');

export default function Onboarding() {
  return (
    <View className="flex-1 bg-white">
      <ImageBackground source={backgroundImage} className="flex-1" resizeMode="cover">
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-6 justify-between py-6">
            {/* Logo and Tagline */}
            <View className="items-center justify-center flex-1 pt-12">
              <Image source={logoImage} className="h-48 w-48" resizeMode="contain" />

              <Text className="mt-12 text-center text-[32px] font-bold text-black leading-[44px] font-sans px-4">
                Everything you need for every journey.
              </Text>
              <Text className="mt-4 text-center text-base text-slate max-w-[280px] font-sans">
                Plan better. Travel smarter.
              </Text>
            </View>

            {/* Actions */}
            <View className="pb-4">
              <Link href="/auth/sign-up" asChild>
                <Pressable
                  className="h-14 items-center justify-center rounded-full bg-black active:opacity-90"
                  style={{
                    shadowColor: '#111111',
                    shadowOffset: { width: 0, height: 16 },
                    shadowOpacity: 0.08,
                    shadowRadius: 40,
                    elevation: 8,
                  }}
                >
                  <Text className="text-base font-semibold text-white">Get Started</Text>
                </Pressable>
              </Link>

              <View className="mt-5 flex-row items-center justify-center gap-1">
                <Text className="text-sm text-slate">Already have an account?</Text>
                <Link href="/auth/sign-in" asChild>
                  <Pressable>
                    <Text className="text-sm font-semibold text-black underline">Log in</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
