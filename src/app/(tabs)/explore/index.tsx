import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../../components/Icon';
import { SearchBar, SectionHeader } from '../../../components/ui';
import { EXPLORE_CATEGORIES, MOCK_DESTINATIONS } from '../../../constants/mock-data';
import { theme } from '../../../theme';

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
          <Text className="text-heading1 text-primary font-bold">Explore</Text>
          <Pressable className="h-10 w-10 items-center justify-center">
            <Icon name="SlidersHorizontal" size={22} color={theme.colors.primary} strokeWidth={1.8} />
          </Pressable>
        </View>

        {/* Search */}
        <View className="px-6 mt-2">
          <SearchBar placeholder="Search destinations..." />
        </View>

        {/* Popular Destinations */}
        <View className="mt-6">
          <SectionHeader title="Popular Destinations" className="px-6 mb-3" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-6 gap-3"
          >
            {MOCK_DESTINATIONS.map((dest) => (
              <Pressable
                key={dest.id}
                onPress={() => router.push(`/destination/${dest.id}`)}
                className="w-32"
                accessibilityRole="button"
              >
                <Image
                  source={{ uri: dest.imageUrl }}
                  className="h-32 w-32 rounded-md"
                  contentFit="cover"
                />
                <Text className="text-body2 text-primary font-display mt-2">{dest.name}</Text>
                <Text className="text-caption text-slate font-sans">{dest.country}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View className="px-6 mt-6">
          <SectionHeader title="Categories" className="mb-3" />
          <View className="flex-row flex-wrap gap-4">
            {EXPLORE_CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                className="items-center w-[28%]"
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
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
