import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Button } from '../../components/ui';
import { ProgressDots } from '../../components/onboarding/ProgressDots';
import { SelectionCard } from '../../components/onboarding/SelectionCard';
import { theme } from '../../theme';
import type { TravelStyle } from '../../types/trip';

const OPTIONS = [
  { key: 'solo' as TravelStyle, label: 'Solo Traveler', desc: 'Traveling alone', icon: 'User' as const, bg: '#F0FDF4' },
  { key: 'couple' as TravelStyle, label: 'Couple', desc: 'Traveling with partner', icon: 'Heart' as const, bg: '#FCE7F3' },
  { key: 'family' as TravelStyle, label: 'Family', desc: 'Traveling with family', icon: 'Users' as const, bg: '#DBEAFE' },
  { key: 'friends' as TravelStyle, label: 'Friends', desc: 'Traveling with friends', icon: 'Smile' as const, bg: '#DCFCE7' },
  { key: 'business' as TravelStyle, label: 'Business', desc: 'Business travel', icon: 'Briefcase' as const, bg: '#F3E8FF' },
];

export default function TravelStyleScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<TravelStyle | null>(null);

  const handleContinue = () => {
    if (selected) {
      router.push('/onboarding-flow/interests');
    }
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
        <ProgressDots currentStep={2} />
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerClassName="grow px-6 pt-6 pb-8 justify-between"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-3xl font-bold text-primary">What's your travel style?</Text>
          <Text className="text-body1 text-slate font-sans mt-2 mb-6">
            Choose the option that matches you best.
          </Text>

          <View className="gap-3">
            {OPTIONS.map((opt) => (
              <SelectionCard
                key={opt.key}
                icon={opt.icon}
                iconBg={opt.bg}
                title={opt.label}
                subtitle={opt.desc}
                selected={selected === opt.key}
                onPress={() => setSelected(opt.key)}
              />
            ))}
          </View>
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selected}
          className="mt-8"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
