import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../../components/Icon';
import { Badge, Card, FilterPills, AnimatedScreen, AnimatedCard, ScalePress, FadeInUp } from '../../../components/ui';
import { MOCK_TRIPS } from '../../../constants/mock-data';
import { theme } from '../../../theme';
import { useUIStore } from '../../../stores/ui.store';
import { useHaptics } from '../../../hooks/useHaptics';

const FILTER_OPTIONS = ['Upcoming', 'Current', 'Past', 'Archived'];

export default function TripsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Upcoming');
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();

  const handleAddTrip = () => {
    haptics.light();
    showToast('Trip creation coming soon', 'info');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <AnimatedScreen className="flex-1">
        {/* Header */}
        <FadeInUp delay={50} duration={350} className="flex-row items-center justify-between px-6 pt-4 pb-2">
          <Text className="text-heading1 text-primary font-bold">Trips</Text>
          <ScalePress
            onPress={handleAddTrip}
            scaleValue={0.9}
            haptic={false}
            className="h-10 w-10 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Add trip"
          >
            <Icon name="Plus" size={22} color={theme.colors.primary} strokeWidth={1.8} />
          </ScalePress>
        </FadeInUp>

        {/* Filters */}
        <FadeInUp delay={100} duration={350} className="px-6 mt-2 mb-4">
          <FilterPills
            options={FILTER_OPTIONS}
            selected={selectedFilter}
            onSelect={setSelectedFilter}
          />
        </FadeInUp>

        {/* Trip Cards */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 pb-24 gap-3"
        >
          {MOCK_TRIPS.map((trip, index) => (
            <AnimatedCard
              key={trip.id}
              index={index}
              onPress={() => router.push(`/trip/${trip.id}`)}
              className="p-4"
            >
              <View className="flex-row items-center w-full">
                <Image
                  source={{ uri: trip.imageUrl }}
                  className="h-20 w-20 rounded-md"
                  contentFit="cover"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-title text-primary font-display">
                    {trip.destination}, {trip.country}
                  </Text>
                  <Text className="text-body2 text-slate font-sans mt-0.5">
                    {trip.startDate} – {trip.endDate}
                  </Text>
                </View>
                <Badge label="in 29 days" variant="accent" />
              </View>
            </AnimatedCard>
          ))}
        </ScrollView>

        {/* FAB */}
        <ScalePress
          onPress={handleAddTrip}
          scaleValue={0.9}
          haptic={false}
          className="absolute bottom-28 right-6 h-14 w-14 rounded-full bg-accent items-center justify-center shadow-panel"
          accessibilityRole="button"
          accessibilityLabel="Create new trip"
        >
          <Icon name="Plus" size={24} color="#FFFFFF" strokeWidth={2} />
        </ScalePress>
      </AnimatedScreen>
    </SafeAreaView>
  );
}

