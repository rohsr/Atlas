import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-heading1 text-primary text-center">Atlas</Text>
        <Text className="mt-4 text-body1 text-slate text-center max-w-md">
          Atlas helps you manage every part of every journey with calm, premium design.
        </Text>
        <Link href="/onboarding" asChild>
          <Pressable className="mt-8 rounded-[20px] bg-primary px-6 py-4">
            <Text className="text-center text-base font-semibold text-white">Open Onboarding</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
