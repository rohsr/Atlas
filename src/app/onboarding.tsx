import { Link } from 'expo-router';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const backgroundImage = require('../../assets/images/bgimg.png');
const logoImage = require('../../assets/images/logo.png');

export default function Onboarding() {
  return (
    <View className="flex-1 bg-primary">
      <ImageBackground source={backgroundImage} className="flex-1" resizeMode="cover">
        {/* Dark overlay for rich visual contrast and premium feel */}
        <View className="absolute inset-0 bg-black/40" />

        <SafeAreaView className="flex-1 justify-between px-6 py-8">
          {/* Logo Section */}
          <View className="items-center justify-center flex-1 pt-8">
            <Image 
              source={logoImage} 
              className="h-44 w-44" 
              resizeMode="contain" 
            />
          </View>

          {/* Content & Action Section */}
          <View className="pb-8">
            <Text className="text-center text-white font-display text-heading1 leading-[44px]">
              Everything you need for every journey.
            </Text>
            
            <Text className="mt-3 text-center text-white/80 font-sans text-body1 max-w-[300px] self-center">
              Plan better. Travel smarter.
            </Text>

            <View className="mt-8">
              <Link href="/auth/sign-up" asChild>
                <Pressable className="h-14 items-center justify-center rounded-lg bg-white shadow-soft active:opacity-90">
                  <Text className="text-base font-semibold text-primary">Get Started</Text>
                </Pressable>
              </Link>

              <View className="mt-5 flex-row items-center justify-center gap-1">
                <Text className="text-sm text-white/60 font-sans">Already have an account?</Text>
                <Link href="/auth/sign-in" asChild>
                  <Pressable className="active:opacity-80">
                    <Text className="text-sm font-semibold text-white underline">Log in</Text>
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

