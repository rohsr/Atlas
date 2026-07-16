import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ScrollView, Share, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Avatar, Badge, FilterPills, ProgressBar, AnimatedScreen, TabTransition, ScalePress } from '../../components/ui';
import { TripOverview } from '../../components/trip/TripOverview';
import { TripItinerary } from '../../components/trip/TripItinerary';
import { TripBookings } from '../../components/trip/TripBookings';
import { TripDocuments } from '../../components/trip/TripDocuments';
import { TripPackingList } from '../../components/trip/TripPackingList';
import { MOCK_TRIPS } from '../../constants/mock-data';
import { theme } from '../../theme';
import { useTripStore } from '../../stores/trip.store';
import { useUIStore } from '../../stores/ui.store';
import { useHaptics } from '../../hooks/useHaptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TAB_OPTIONS = ['Overview', 'Itinerary', 'Bookings', 'Documents', 'Packing'];
const HERO_HEIGHT = 256; // h-64

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const activeTab = useTripStore((s) => s.activeTab);
  const setActiveTab = useTripStore((s) => s.setActiveTab);
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();
  const insets = useSafeAreaInsets();
  const isReduced = useReducedMotion();

  const [isLiked, setIsLiked] = useState(false);

  const trip = MOCK_TRIPS.find((t) => t.id === id) ?? MOCK_TRIPS[0];

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleShare = async () => {
    haptics.light();
    try {
      await Share.share({
        message: `Check out my trip to ${trip.destination}, ${trip.country} planned on Atlas!`,
      });
    } catch (error) {
      // Ignore
    }
  };

  const handleLikeToggle = () => {
    haptics.success();
    const nextState = !isLiked;
    setIsLiked(nextState);
    showToast(nextState ? 'Added to favorites' : 'Removed from favorites', 'success');
  };

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

  // Parallax Hero Image style
  const imageAnimatedStyle = useAnimatedStyle(() => {
    if (isReduced) return {};
    return {
      transform: [
        {
          translateY: scrollY.value > 0 ? scrollY.value * 0.5 : 0,
        },
        {
          scale: scrollY.value < 0 ? 1 - scrollY.value / HERO_HEIGHT : 1,
        },
      ],
    };
  });

  // Sticky Header Backdrop style
  const headerBgStyle = useAnimatedStyle(() => {
    if (isReduced) return { backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: theme.colors.border };
    const opacity = interpolate(
      scrollY.value,
      [120, 180],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      borderBottomColor: `rgba(236, 236, 236, ${opacity})`,
      borderBottomWidth: opacity > 0.5 ? 1 : 0,
    };
  });

  return (
    <AnimatedScreen className="flex-1 bg-surface">
      {/* Sticky Header Backdrop */}
      <Animated.View
        style={[
          headerBgStyle,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60 + insets.top,
            zIndex: 100,
          },
        ]}
      />

      {/* Header buttons (overlaying the sticky backdrop) */}
      <SafeAreaView
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 101 }}
        edges={['top']}
      >
        <View className="flex-row items-center justify-between px-4 pt-2">
          <ScalePress
            onPress={() => {
              haptics.light();
              router.back();
            }}
            scaleValue={0.9}
            haptic={false}
            className="h-10 w-10 rounded-full bg-black/30 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Icon name="ArrowLeft" size={20} color="#FFFFFF" />
          </ScalePress>
          <View className="flex-row gap-2">
            <ScalePress
              onPress={handleShare}
              scaleValue={0.9}
              haptic={false}
              className="h-10 w-10 rounded-full bg-black/30 items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Share trip"
            >
              <Icon name="Share2" size={18} color="#FFFFFF" />
            </ScalePress>
            <ScalePress
              onPress={handleLikeToggle}
              scaleValue={0.9}
              haptic={false}
              className="h-10 w-10 rounded-full bg-black/30 items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel={isLiked ? "Unlike trip" : "Like trip"}
            >
              <Icon
                name={isLiked ? "Heart" : "Heart"}
                size={18}
                color={isLiked ? "#EF4444" : "#FFFFFF"}
                fill={isLiked ? "#EF4444" : "none"}
              />
            </ScalePress>
          </View>
        </View>
      </SafeAreaView>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
      >
        {/* Hero Image Container */}
        <Animated.View style={[imageAnimatedStyle, { height: HERO_HEIGHT }]} className="w-full relative">
          <Image
            source={{ uri: trip.imageUrl }}
            className="h-full w-full"
            contentFit="cover"
          />
          {/* Dark overlay */}
          <View className="absolute inset-0 bg-black/20" />
        </Animated.View>

        {/* Trip Info */}
        <View className="px-6 -mt-6 z-10">
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
                <ScalePress
                  onPress={() => {
                    haptics.light();
                    showToast('Add traveler coming soon', 'info');
                  }}
                  scaleValue={0.9}
                  haptic={false}
                  className="h-8 w-8 rounded-full bg-blue-50 items-center justify-center -ml-2 border-2 border-white"
                  accessibilityRole="button"
                  accessibilityLabel="Add traveler"
                >
                  <Icon name="Plus" size={14} color={theme.colors.accent} />
                </ScalePress>
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
        <View className="px-6 mt-4 mb-2 z-10">
          <FilterPills
            options={TAB_OPTIONS}
            selected={activeTab}
            onSelect={(option) => setActiveTab(option as any)}
          />
        </View>

        {/* Content */}
        <View className="px-6 mt-2 z-10">
          <TabTransition activeKey={activeTab}>
            {renderContent()}
          </TabTransition>
        </View>
      </Animated.ScrollView>
    </AnimatedScreen>
  );
}

