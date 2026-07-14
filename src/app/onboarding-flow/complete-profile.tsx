import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Icon } from '../../components/Icon';
import { AuthTextInput } from '../../components/auth';
import { Button } from '../../components/ui';
import { ProgressDots } from '../../components/onboarding/ProgressDots';
import { theme } from '../../theme';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  city: z.string().min(2, 'Home city is required'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function CompleteProfileScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      city: '',
    },
  });

  const onSubmit = () => {
    router.push('/onboarding-flow/travel-style');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Top Header Navigation */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center -ml-3"
        >
          <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
        </Pressable>
        <ProgressDots currentStep={1} />
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerClassName="grow px-6 pt-6 pb-8 justify-between"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-3xl font-bold text-primary">Complete your profile</Text>
          <Text className="text-body1 text-slate font-sans mt-2 mb-8">
            Tell us a bit about yourself to get started.
          </Text>

          <View className="gap-5">
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <AuthTextInput
                  label="Username"
                  placeholder="Choose a travel tag (e.g. wanderer)"
                  value={value}
                  onChangeText={onChange}
                  error={errors.username?.message}
                  autoCapitalize="none"
                />
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <AuthTextInput
                  label="Home City"
                  placeholder="Where do you travel from?"
                  value={value}
                  onChangeText={onChange}
                  error={errors.city?.message}
                  autoCapitalize="words"
                />
              )}
            />
          </View>
        </View>

        <Button
          title="Continue"
          onPress={handleSubmit(onSubmit)}
          className="mt-12"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
