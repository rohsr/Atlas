import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../components/Icon';
import { Card, SearchBar, MenuItem } from '../components/ui';
import { theme } from '../theme';

const TOPICS = [
  { label: 'Booking Trips', icon: 'Calendar' as const, tint: '#DBEAFE' },
  { label: 'Flight Tracking', icon: 'Plane' as const, tint: '#FEF3C7' },
  { label: 'Payment Options', icon: 'CreditCard' as const, tint: '#DCFCE7' },
  { label: 'Atlas Wallet', icon: 'Wallet' as const, tint: '#F3E8FF' },
];

export default function HelpSupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className="h-10 w-10 items-center justify-center -ml-3"
          >
            <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
          </Pressable>
          <Text className="text-heading1 text-primary font-bold">Help & Support</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
        {/* Search */}
        <View className="px-6 mt-2">
          <SearchBar placeholder="Search help articles..." />
        </View>

        {/* Popular Topics Grid */}
        <View className="px-6 mt-6 mb-4">
          <Text className="text-caption text-slate font-display uppercase tracking-wider mb-3 ml-4">
            Popular Topics
          </Text>
          <View className="flex-row flex-wrap gap-4">
            {TOPICS.map((topic) => (
              <Pressable
                key={topic.label}
                className="w-[47%] bg-white rounded-card border border-border p-4 flex-row items-center active:opacity-85 shadow-card"
                accessibilityRole="button"
                accessibilityLabel={topic.label}
              >
                <View
                  className="h-9 w-9 rounded-md items-center justify-center mr-3"
                  style={{ backgroundColor: topic.tint }}
                >
                  <Icon name={topic.icon} size={16} color={theme.colors.primary} />
                </View>
                <Text className="flex-1 text-body2 text-primary font-display" numberOfLines={2}>
                  {topic.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View className="px-6 mb-6">
          <Text className="text-caption text-slate font-display uppercase tracking-wider mb-2 ml-4">
            Frequently Asked Questions
          </Text>
          <Card>
            <MenuItem
              icon="FileText"
              iconTint="#F1F5F9"
              label="How do I change my booking details?"
              className="border-b border-border"
            />
            <MenuItem
              icon="FileText"
              iconTint="#F1F5F9"
              label="Can I access documents offline?"
              className="border-b border-border"
            />
            <MenuItem
              icon="FileText"
              iconTint="#F1F5F9"
              label="How do I set flight alerts?"
            />
          </Card>
        </View>

        {/* Contact Support */}
        <View className="px-6">
          <Text className="text-caption text-slate font-display uppercase tracking-wider mb-2 ml-4">
            Still need help?
          </Text>
          <Card className="p-4 items-center">
            <View className="h-12 w-12 rounded-full bg-blue-50 items-center justify-center mb-3">
              <Icon name="MessagesSquare" size={24} color={theme.colors.accent} />
            </View>
            <Text className="text-body1 text-primary font-display text-center">
              Chat with our team
            </Text>
            <Text className="text-body2 text-slate font-sans text-center mt-1 mb-4">
              Our travel support specialists are available 24/7.
            </Text>
            <Pressable
              onPress={() => router.push('/ai-assistant')}
              className="h-11 px-6 rounded-button bg-accent items-center justify-center active:opacity-85"
              accessibilityRole="button"
              accessibilityLabel="Start chat"
            >
              <Text className="text-body2 text-white font-display">Start Chat</Text>
            </Pressable>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
