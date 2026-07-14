import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Button, SearchBar } from '../../components/ui';
import { ProgressDots } from '../../components/onboarding/ProgressDots';
import { MOCK_DESTINATIONS } from '../../constants/mock-data';
import { theme } from '../../theme';

export default function SelectDestinationsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleDestination = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      router.push('/onboarding-flow/notifications');
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
        <ProgressDots currentStep={5} />
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerClassName="grow px-6 pt-6 pb-8 justify-between"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-3xl font-bold text-primary">Select top destinations</Text>
          <Text className="text-body1 text-slate font-sans mt-2 mb-6">
            Choose places you're planning or want to visit.
          </Text>

          {/* Search bar */}
          <SearchBar placeholder="Search countries or regions" className="mb-6" />

          <Text className="text-caption text-slate font-display uppercase tracking-wider mb-3 ml-2">
            Popular destinations
          </Text>

          {/* 2x2 grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {MOCK_DESTINATIONS.map((dest) => {
              const isSelected = selected.includes(dest.id);
              return (
                <Pressable
                  key={dest.id}
                  onPress={() => toggleDestination(dest.id)}
                  className={`w-[48%] aspect-[4/3] rounded-card overflow-hidden border-2 relative active:opacity-90 ${
                    isSelected ? 'border-accent' : 'border-transparent'
                  }`}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isSelected }}
                >
                  <Image source={{ uri: dest.imageUrl }} className="h-full w-full" contentFit="cover" />
                  <View className="absolute inset-0 bg-black/35" />
                  <Text className="absolute bottom-3 left-3 text-body1 text-white font-display">
                    {dest.name}
                  </Text>

                  {/* Checkmark overlay top-right */}
                  {isSelected && (
                    <View className="absolute top-2.5 right-2.5 h-6 w-6 rounded-full bg-accent items-center justify-center">
                      <Icon name="Check" size={14} color="white" strokeWidth={3.5} />
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
