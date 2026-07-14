import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Badge, Card, SearchBar, SectionHeader } from '../../components/ui';
import { MOCK_TRIPS, IMAGES } from '../../constants/mock-data';
import { theme } from '../../theme';

const QUICK_ACTIONS = [
  { label: 'Itinerary', icon: 'MapPin' as const },
  { label: 'Documents', icon: 'FileText' as const },
  { label: 'Bookings', icon: 'Calendar' as const },
  { label: 'Packing List', icon: 'CheckSquare' as const },
];

export default function HomeScreen() {
  const router = useRouter();
  const upcomingTrip = MOCK_TRIPS[0];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-6"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
          <View>
            <Text className="text-heading1 text-primary font-bold">
              Good morning, John 👋
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/notifications')}
            className="h-10 w-10 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Icon name="Bell" size={22} color={theme.colors.primary} strokeWidth={1.8} />
          </Pressable>
        </View>

        {/* Search */}
        <View className="px-6 mt-2">
          <SearchBar placeholder="Search destinations, trips, travel..." />
        </View>

        {/* Upcoming Trip */}
        <View className="px-6 mt-6">
          <SectionHeader title="Upcoming Trip" className="mb-3" />
          <Card className="overflow-hidden">
            <Pressable
              onPress={() => router.push(`/trip/${upcomingTrip.id}`)}
              accessibilityRole="button"
              accessibilityLabel={`View ${upcomingTrip.destination} trip`}
            >
              {/* Trip Image */}
              <View className="h-48 w-full">
                <Image
                  source={{ uri: upcomingTrip.imageUrl }}
                  className="h-full w-full"
                  contentFit="cover"
                />
                {/* Active badge */}
                <View className="absolute bottom-3 left-3">
                  <Badge label="Active Now" variant="success" dot />
                </View>
              </View>

              {/* Trip Info */}
              <View className="p-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-title text-primary font-display">
                      {upcomingTrip.destination}, {upcomingTrip.country}
                    </Text>
                    <Text className="text-body2 text-slate font-sans mt-0.5">
                      {upcomingTrip.startDate} – {upcomingTrip.endDate}
                    </Text>
                  </View>
                  <Badge label="in 29 days" variant="accent" />
                </View>

                {/* Quick Actions */}
                <View className="flex-row mt-4 gap-4">
                  {QUICK_ACTIONS.map((action) => (
                    <Pressable
                      key={action.label}
                      className="items-center flex-1"
                      accessibilityRole="button"
                      accessibilityLabel={action.label}
                    >
                      <View className="h-10 w-10 rounded-xl bg-gray-50 items-center justify-center">
                        <Icon
                          name={action.icon}
                          size="small"
                          color={theme.colors.slate}
                          strokeWidth={1.8}
                        />
                      </View>
                      <Text className="text-caption text-slate font-sans mt-1.5">
                        {action.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </Pressable>
          </Card>
        </View>

        {/* Suggested */}
        <View className="px-6 mt-6">
          <SectionHeader title="Suggested for you" className="mb-3" />
          <Card className="overflow-hidden">
            <Pressable accessibilityRole="button">
              <Image
                source={{ uri: IMAGES.switzerland }}
                className="h-36 w-full"
                contentFit="cover"
              />
              <View className="p-4">
                <Text className="text-title text-primary font-display">
                  Explore Switzerland
                </Text>
                <Text className="text-body2 text-slate font-sans mt-0.5">
                  8 days trip
                </Text>
              </View>
            </Pressable>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
