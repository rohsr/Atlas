import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Button } from '../../components/ui';
import { ProgressDots } from '../../components/onboarding/ProgressDots';
import { theme } from '../../theme';

export default function ProfilePhotoScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/onboarding-flow/all-set');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center -ml-3"
        >
          <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
        </Pressable>
        <ProgressDots currentStep={7} />
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerClassName="grow px-6 pt-6 pb-8 justify-between"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center">
          <Text className="text-3xl font-bold text-primary text-center">Add your profile photo</Text>
          <Text className="text-body1 text-slate font-sans mt-2 mb-12 text-center">
            This helps personalize your profile setup.
          </Text>

          {/* Dotted Avatar Circle */}
          <View className="h-44 w-44 rounded-full border-2 border-dashed border-neutral-300 bg-neutral-50 items-center justify-center relative shadow-card">
            <View className="h-12 w-12 rounded-full bg-white border border-border items-center justify-center shadow-card">
              <Icon name="Camera" size={20} color={theme.colors.primary} />
            </View>

            {/* Sub-label overlay inside or below */}
          </View>
        </View>

        <View className="mt-8 gap-3">
          <Button
            title="Upload Photo"
            icon="Camera"
            onPress={handleContinue}
          />
          <Pressable
            onPress={handleContinue}
            className="h-12 items-center justify-center active:opacity-75"
            accessibilityRole="button"
            accessibilityLabel="Skip profile photo setup"
          >
            <Text className="text-body2 text-slate font-medium">Skip for now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
