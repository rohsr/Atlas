import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Avatar, Badge, FilterPills, ProgressBar } from '../../components/ui';
import { TripOverview } from '../../components/trip/TripOverview';
import { TripItinerary } from '../../components/trip/TripItinerary';
import { TripBookings } from '../../components/trip/TripBookings';
import { TripDocuments } from '../../components/trip/TripDocuments';
import { TripPackingList } from '../../components/trip/TripPackingList';
import { MOCK_TRIPS } from '../../constants/mock-data';
import { theme } from '../../theme';

const TAB_OPTIONS = ['Overview', 'Itinerary', 'Bookings', 'Documents', 'Packing'];

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');

  const trip = MOCK_TRIPS.find((t) => t.id === id) ?? MOCK_TRIPS[0];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <TripOverview />;
      case 'Itinerary':
        return <TripItinerary />;
      case 'Bookings':
        return <TripBookings />;
      case 'Documents':
        return <TripDocuments />;
      case 'Packing':
        return <TripPackingList />;
      default:
        return <TripOverview />;
    }
  };

  return (
    <View className="flex-1 bg-surface">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        {/* Hero Image */}
        <View className="h-64 w-full relative">
          <Image
            source={{ uri: trip.imageUrl }}
            className="h-full w-full"
            contentFit="cover"
          />
          {/* Dark overlay */}
          <View className="absolute inset-0 bg-black/20" />

          {/* Top actions */}
          <SafeAreaView className="absolute top-0 left-0 right-0" edges={['top']}>
            <View className="flex-row items-center justify-between px-4 pt-2">
              <Pressable
                onPress={() => router.back()}
                className="h-10 w-10 rounded-full bg-black/30 items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <Icon name="ArrowLeft" size={20} color="#FFFFFF" />
              </Pressable>
              <View className="flex-row gap-2">
                <Pressable className="h-10 w-10 rounded-full bg-black/30 items-center justify-center">
                  <Icon name="Share2" size={18} color="#FFFFFF" />
                </Pressable>
                <Pressable className="h-10 w-10 rounded-full bg-black/30 items-center justify-center">
                  <Icon name="Heart" size={18} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* Trip Info */}
        <View className="px-6 -mt-6">
          <View className="bg-white rounded-card shadow-card border border-border p-4">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-heading2 text-primary font-bold">
                  {trip.destination}, {trip.country}
                </Text>
                <Text className="text-body2 text-slate font-sans mt-1">
                  {trip.startDate} – {trip.endDate}
                </Text>
              </View>
              {trip.temperature && (
                <View className="items-center ml-3">
                  <Text className="text-heading2 text-primary font-bold">{trip.temperature}</Text>
                  <Text className="text-caption text-slate font-sans">{trip.weather}</Text>
                </View>
              )}
            </View>

            {/* Budget & Travelers */}
            <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-border">
              <View>
                <Text className="text-caption text-slate font-sans">Budget</Text>
                <Text className="text-title text-primary font-display">
                  ${trip.budget?.toLocaleString()} {trip.currency}
                </Text>
              </View>
              <View className="flex-row items-center">
                {trip.travelers.map((traveler, i) => (
                  <Avatar
                    key={traveler.id}
                    uri={traveler.avatarUrl}
                    name={traveler.name}
                    size="small"
                    className={i > 0 ? '-ml-2' : ''}
                  />
                ))}
                <View className="h-8 w-8 rounded-full bg-blue-50 items-center justify-center -ml-2 border-2 border-white">
                  <Icon name="Plus" size={14} color={theme.colors.accent} />
                </View>
              </View>
            </View>

            {/* Progress */}
            <View className="mt-4">
              <ProgressBar
                percent={trip.progressPercent}
                label={`${trip.progressPercent}% planned`}
              />
            </View>
          </View>
        </View>

        {/* Sub Tabs */}
        <View className="px-6 mt-4 mb-2">
          <FilterPills
            options={TAB_OPTIONS}
            selected={activeTab}
            onSelect={setActiveTab}
          />
        </View>

        {/* Content */}
        <View className="px-6 mt-2">{renderContent()}</View>
      </ScrollView>
    </View>
  );
}
