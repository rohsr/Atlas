import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../../components/Icon';
import { SearchBar, SectionHeader, AnimatedScreen, FadeInUp, ScalePress } from '../../../components/ui';
import { EXPLORE_CATEGORIES, MOCK_DESTINATIONS } from '../../../constants/mock-data';
import { theme } from '../../../theme';
import { useUIStore } from '../../../stores/ui.store';
import { useHaptics } from '../../../hooks/useHaptics';

export default function ExploreScreen() {
  const router = useRouter();
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();

  const handleFilterPress = () => {
    haptics.light();
    showToast('Filters coming soon', 'info');
  };

  const handleCategoryPress = (categoryName: string) => {
    haptics.light();
    showToast(`Exploring ${categoryName} coming soon`, 'info');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <AnimatedScreen className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-12">
          {/* Header */}
          <FadeInUp delay={50} duration={350} className="flex-row items-center justify-between px-6 pt-4 pb-2">
            <Text className="text-heading1 text-primary font-bold">Explore</Text>
            <ScalePress
              onPress={handleFilterPress}
              scaleValue={0.9}
              haptic={false}
              className="h-10 w-10 items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Filter"
            >
              <Icon name="SlidersHorizontal" size={22} color={theme.colors.primary} strokeWidth={1.8} />
            </ScalePress>
          </FadeInUp>

          {/* Search */}
          <FadeInUp delay={100} duration={350} className="px-6 mt-2">
            <SearchBar placeholder="Search destinations..." />
          </FadeInUp>

          {/* Popular Destinations */}
          <View className="mt-6">
            <FadeInUp delay={150} duration={350}>
              <SectionHeader title="Popular Destinations" className="px-6 mb-3" />
            </FadeInUp>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="px-6 gap-3"
            >
              {MOCK_DESTINATIONS.map((dest, index) => (
                <FadeInUp
                  key={dest.id}
                  delay={180 + index * 50}
                  duration={400}
                  className="w-32"
                >
                  <ScalePress
                    onPress={() => router.push(`/destination/${dest.id}`)}
                    scaleValue={0.96}
                    haptic={false}
                    accessibilityRole="button"
                  >
                    <Image
                      source={{ uri: dest.imageUrl }}
                      className="h-32 w-32 rounded-md"
                      contentFit="cover"
                    />
                    <Text className="text-body2 text-primary font-display mt-2">{dest.name}</Text>
                    <Text className="text-caption text-slate font-sans">{dest.country}</Text>
                  </ScalePress>
                </FadeInUp>
              ))}
            </ScrollView>
          </View>

          {/* Categories */}
          <View className="px-6 mt-6">
            <FadeInUp delay={200} duration={350}>
              <SectionHeader title="Categories" className="mb-3" />
            </FadeInUp>
            <View className="flex-row flex-wrap gap-4">
              {EXPLORE_CATEGORIES.map((cat, index) => (
                <FadeInUp
                  key={cat.id}
                  delay={240 + index * 40}
                  duration={400}
                  className="w-[28%]"
                >
                  <ScalePress
                    onPress={() => handleCategoryPress(cat.name)}
                    scaleValue={0.93}
                    haptic={false}
                    className="items-center"
                    accessibilityRole="button"
                    accessibilityLabel={cat.name}
                  >
                    <View
                      className="h-14 w-14 rounded-xl items-center justify-center"
                      style={{ backgroundColor: cat.tintColor }}
                    >
                      <Icon name={cat.iconName as any} size={22} color={theme.colors.primary} strokeWidth={1.8} />
                    </View>
                    <Text className="text-caption text-primary font-sans mt-1.5">{cat.name}</Text>
                  </ScalePress>
                </FadeInUp>
              ))}
            </View>
          </View>
        </ScrollView>
      </AnimatedScreen>
    </SafeAreaView>
  );
}

