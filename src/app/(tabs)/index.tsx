import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import {
  Badge,
  Card,
  SearchBar,
  SectionHeader,
  AnimatedScreen,
  FadeInUp,
  ScalePress,
  FloatingAIButton,
} from '../../components/ui';
import { MOCK_TRIPS, IMAGES } from '../../constants/mock-data';
import { theme } from '../../theme';

// Quick Actions mapping
const QUICK_ACTIONS_CONFIG = [
  { label: 'Itinerary', icon: 'MapPin' as const, tab: 'Itinerary' as const },
  { label: 'Documents', icon: 'FileText' as const, tab: 'Documents' as const },
  { label: 'Bookings', icon: 'Calendar' as const, tab: 'Bookings' as const },
  { label: 'Packing List', icon: 'CheckSquare' as const, tab: 'Packing' as const },
];

import { useTripStore } from '../../stores/trip.store';
import { useHaptics } from '../../hooks/useHaptics';

export default function HomeScreen() {
  const router = useRouter();
  const upcomingTrip = MOCK_TRIPS[0];
  const setSelectedTrip = useTripStore((s) => s.setSelectedTrip);
  const setActiveTab = useTripStore((s) => s.setActiveTab);
  const haptics = useHaptics();

  const handleQuickAction = (tab: 'Itinerary' | 'Documents' | 'Bookings' | 'Packing') => {
    haptics.medium();
    setSelectedTrip(upcomingTrip.id);
    setActiveTab(tab);
    router.push(`/trip/${upcomingTrip.id}`);
  };

  const handleTripCardPress = () => {
    haptics.medium();
    setSelectedTrip(upcomingTrip.id);
    setActiveTab('Overview');
    router.push(`/trip/${upcomingTrip.id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <AnimatedScreen className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32"
        >
          {/* Header */}
          <FadeInUp delay={50} duration={350} className="flex-row items-center justify-between px-6 pt-4 pb-2">
            <View>
              <Text className="text-heading1 text-primary font-bold">
                Good morning, John 👋
              </Text>
            </View>
            <ScalePress
              onPress={() => {
                haptics.light();
                router.push('/notifications');
              }}
              scaleValue={0.9}
              haptic={false}
              className="h-10 w-10 items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Notifications"
            >
              <Icon name="Bell" size={22} color={theme.colors.primary} strokeWidth={1.8} />
            </ScalePress>
          </FadeInUp>

          {/* Search */}
          <FadeInUp delay={100} duration={350} className="px-6 mt-2">
            <SearchBar placeholder="Search destinations, trips, travel..." />
          </FadeInUp>

          {/* Upcoming Trip */}
          <FadeInUp delay={150} duration={400} className="px-6 mt-6">
            <SectionHeader title="Upcoming Trip" className="mb-3" />
            <Card className="overflow-hidden">
              <ScalePress
                onPress={handleTripCardPress}
                scaleValue={0.98}
                haptic={false}
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
                    {QUICK_ACTIONS_CONFIG.map((action) => (
                      <ScalePress
                        key={action.label}
                        onPress={() => handleQuickAction(action.tab)}
                        scaleValue={0.94}
                        haptic={false}
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
                      </ScalePress>
                    ))}
                  </View>
                </View>
              </ScalePress>
            </Card>
          </FadeInUp>

          {/* Suggested */}
          <FadeInUp delay={200} duration={400} className="px-6 mt-6">
            <SectionHeader title="Suggested for you" className="mb-3" />
            <Card className="overflow-hidden">
              <ScalePress
                onPress={() => {
                  haptics.medium();
                  router.push('/destination/switzerland');
                }}
                scaleValue={0.98}
                haptic={false}
                accessibilityRole="button"
              >
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
              </ScalePress>
            </Card>
          </FadeInUp>
        </ScrollView>

        {/* Global Floating AI Assistant Button Overlay */}
        <FloatingAIButton />
      </AnimatedScreen>
    </SafeAreaView>
  );
}

