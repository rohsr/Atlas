import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon, type IconName } from '../../components/Icon';
import { Button } from '../../components/ui';
import { ProgressDots } from '../../components/onboarding/ProgressDots';
import { theme } from '../../theme';
import type { InterestCategory } from '../../types/trip';

const INTERESTS: { key: InterestCategory; label: string; icon: IconName; bg: string }[] = [
  { key: 'beaches', label: 'Beaches', icon: 'Sun' as const, bg: '#FEF3C7' },
  { key: 'mountains', label: 'Mountains', icon: 'Mountain' as const, bg: '#E0F2FE' },
  { key: 'adventure', label: 'Adventure', icon: 'Compass' as const, bg: '#DBEAFE' },
  { key: 'food', label: 'Food', icon: 'UtensilsCrossed' as const, bg: '#FEE2E2' },
  { key: 'culture', label: 'Culture', icon: 'Landmark' as const, bg: '#FCE7F3' },
  { key: 'hiking', label: 'Hiking', icon: 'Footprints' as const, bg: '#DCFCE7' },
  { key: 'nature', label: 'Nature', icon: 'TreePine' as const, bg: '#F0FDF4' },
  { key: 'photography', label: 'Photo', icon: 'Camera' as const, bg: '#F1F5F9' },
  { key: 'wildlife', label: 'Wildlife', icon: 'Bird' as const, bg: '#FFF7ED' },
];

export default function InterestsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<InterestCategory[]>([]);

  const toggleInterest = (interest: InterestCategory) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      router.push('/onboarding-flow/budget-style');
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
        <ProgressDots currentStep={3} />
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerClassName="grow px-6 pt-6 pb-8 justify-between"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-3xl font-bold text-primary">What are your interests?</Text>
          <Text className="text-body1 text-slate font-sans mt-2 mb-6">
            Choose the experiences you love (select at least one).
          </Text>

          {/* Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {INTERESTS.map((item) => {
              const isSelected = selected.includes(item.key);
              return (
                <Pressable
                  key={item.key}
                  onPress={() => toggleInterest(item.key)}
                  className={`w-[30%] aspect-square items-center justify-center rounded-card border ${
                    isSelected ? 'bg-blue-50/20 border-accent' : 'bg-white border-border'
                  }`}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isSelected }}
                >
                  {/* Icon */}
                  <View
                    className="h-12 w-12 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon name={item.icon} size="small" color={theme.colors.primary} />
                  </View>
                  <Text className="text-caption font-display text-primary">{item.label}</Text>

                  {/* Top Right Checkmark */}
                  {isSelected && (
                    <View className="absolute top-2 right-2 h-4 w-4 rounded-full bg-accent items-center justify-center">
                      <Icon name="Check" size={10} color="white" strokeWidth={4} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={selected.length === 0}
          className="mt-8"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
