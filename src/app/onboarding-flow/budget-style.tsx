import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Button } from '../../components/ui';
import { ProgressDots } from '../../components/onboarding/ProgressDots';
import { SelectionCard } from '../../components/onboarding/SelectionCard';
import { theme } from '../../theme';
import type { BudgetStyle } from '../../types/trip';

const OPTIONS = [
  { key: 'budget' as BudgetStyle, label: 'Budget', desc: 'Save more, spend wisely', icon: 'PiggyBank' as const, bg: '#DCFCE7' },
  { key: 'balanced' as BudgetStyle, label: 'Balanced', desc: 'Best of both worlds', icon: 'Scale' as const, bg: '#DBEAFE' },
  { key: 'premium' as BudgetStyle, label: 'Premium', desc: 'High-quality experiences', icon: 'Gem' as const, bg: '#F3E8FF' },
  { key: 'luxury' as BudgetStyle, label: 'Luxury', desc: 'The best of the best', icon: 'Crown' as const, bg: '#FEF3C7' },
];

export default function BudgetStyleScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<BudgetStyle | null>(null);

  const handleContinue = () => {
    if (selected) {
      router.push('/onboarding-flow/destinations');
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
        <ProgressDots currentStep={4} />
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerClassName="grow px-6 pt-6 pb-8 justify-between"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-3xl font-bold text-primary">What's your budget style?</Text>
          <Text className="text-body1 text-slate font-sans mt-2 mb-6">
            Choose the option that fits you best.
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
