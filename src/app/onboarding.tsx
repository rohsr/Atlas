import { Link } from 'expo-router';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const backgroundImage = require('../../assets/images/bgimg.png');
const logoImage = require('../../assets/images/logo.png');

export default function Onboarding() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground source={backgroundImage} className="flex-1" resizeMode="cover">
        <View className="flex-1 px-6 py-8">
          <View className="items-center justify-center flex-1 pt-12">
            <Image source={logoImage} className="h-60 w-60" resizeMode="contain" />

            <Text className="mt-16 text-center text-3xl font-semibold text-black leading-[42px]">
              Everything you need for every journey.
            </Text>
            <Text className="mt-4 text-center text-base text-slate max-w-[320px]">
              Plan better. Travel smarter.
            </Text>
          </View>

          <View className="pb-6">
            <Link href="/auth/sign-up" asChild>
              <Pressable className="h-14 items-center justify-center rounded-[24px] bg-black">
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
      </ImageBackground>
    </SafeAreaView>
  );
}
