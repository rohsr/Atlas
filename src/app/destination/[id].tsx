import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Card, SectionHeader } from '../../components/ui';
import { PARIS_DETAIL } from '../../constants/mock-data';
import { theme } from '../../theme';

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // For mock purpose, use PARIS_DETAIL
  const dest = PARIS_DETAIL;

  return (
    <View className="flex-1 bg-surface">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        {/* Hero Image */}
        <View className="h-[320px] w-full relative">
          <Image
            source={{ uri: dest.imageUrl }}
            className="h-full w-full"
            contentFit="cover"
          />
          {/* Dark overlay */}
          <View className="absolute inset-0 bg-black/30" />

          {/* Top Actions */}
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
              <Pressable className="h-10 w-10 rounded-full bg-black/30 items-center justify-center">
                <Icon name="Heart" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
          </SafeAreaView>

          {/* Bottom Title overlay */}
          <View className="absolute bottom-6 left-6 right-6">
            <Text className="text-display text-white font-bold">{dest.name}</Text>
            <Text className="text-title text-white/95 font-medium mt-1">{dest.subtitle}</Text>
          </View>
        </View>

        {/* Quick Info Grid */}
        <View className="px-6 mt-6">
          <Card className="flex-row py-4">
            <View className="flex-1 items-center border-r border-border">
              <Icon name="Star" size={18} color="#EAB308" />
              <Text className="text-body1 text-primary font-bold mt-1">{dest.rating}</Text>
              <Text className="text-caption text-slate font-sans">({dest.reviewCount} reviews)</Text>
            </View>
            <View className="flex-1 items-center border-r border-border">
              <Icon name="Clock3" size={18} color={theme.colors.slate} />
              <Text className="text-body2 text-primary font-bold mt-1.5 text-center">Best time</Text>
              <Text className="text-caption text-slate font-sans text-center px-1">{dest.bestTime}</Text>
            </View>
            <View className="flex-1 items-center">
              <Icon name="Languages" size={18} color={theme.colors.slate} />
              <Text className="text-body2 text-primary font-bold mt-1.5">{dest.language}</Text>
              <Text className="text-caption text-slate font-sans">Currency: {dest.currency}</Text>
            </View>
          </Card>
        </View>

        {/* Description */}
        <View className="px-6 mt-6">
          <SectionHeader title="About" className="mb-3" />
          <Text className="text-body1 text-slate font-sans leading-6">
            {dest.description}
          </Text>
        </View>

        {/* Top Attractions */}
        <View className="mt-6">
          <SectionHeader title="Top Attractions" className="px-6 mb-3" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-6 gap-4"
          >
            {dest.attractions?.map((attraction) => (
              <View key={attraction.id} className="w-[200px]">
                <Image
                  source={{ uri: attraction.imageUrl }}
                  className="h-[140px] w-full rounded-card border border-border"
                  contentFit="cover"
                />
                <Text className="text-body1 text-primary font-display mt-2">{attraction.name}</Text>
                {attraction.description && (
                  <Text className="text-caption text-slate font-sans mt-0.5" numberOfLines={2}>
                    {attraction.description}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
