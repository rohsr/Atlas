import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../components/Icon';
import { Card, SearchBar, MenuItem, AnimatedScreen, FadeInUp, ScalePress } from '../components/ui';
import { theme } from '../theme';
import { useUIStore } from '../stores/ui.store';
import { useHaptics } from '../hooks/useHaptics';

const TOPICS = [
  { label: 'Booking Trips', icon: 'Calendar' as const, tint: '#DBEAFE' },
  { label: 'Flight Tracking', icon: 'Plane' as const, tint: '#FEF3C7' },
  { label: 'Payment Options', icon: 'CreditCard' as const, tint: '#DCFCE7' },
  { label: 'Atlas Wallet', icon: 'Wallet' as const, tint: '#F3E8FF' },
];

export default function HelpSupportScreen() {
  const router = useRouter();
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();

  const handleTopicPress = (topicLabel: string) => {
    haptics.light();
    showToast(`Topic "${topicLabel}" article coming soon`, 'info');
  };

  const handleFAQPress = (faqTitle: string, answer: string) => {
    haptics.light();
    showToast(answer, 'info');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <AnimatedScreen className="flex-1">
        {/* Header */}
        <FadeInUp delay={50} duration={300} className="flex-row items-center justify-between px-6 pt-4 pb-2">
          <View className="flex-row items-center gap-3">
            <ScalePress
              onPress={() => {
                haptics.light();
                router.back();
              }}
              scaleValue={0.9}
              haptic={false}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="h-10 w-10 items-center justify-center -ml-3"
            >
              <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
            </ScalePress>
            <Text className="text-heading1 text-primary font-bold">Help & Support</Text>
          </View>
        </FadeInUp>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
          {/* Search */}
          <FadeInUp delay={100} duration={350} className="px-6 mt-2">
            <SearchBar placeholder="Search help articles..." />
          </FadeInUp>

          {/* Popular Topics Grid */}
          <View className="px-6 mt-6 mb-4">
            <FadeInUp delay={150} duration={350}>
              <Text className="text-caption text-slate font-display uppercase tracking-wider mb-3 ml-4">
                Popular Topics
              </Text>
            </FadeInUp>
            <View className="flex-row flex-wrap gap-4">
              {TOPICS.map((topic, index) => (
                <FadeInUp
                  key={topic.label}
                  delay={180 + index * 40}
                  duration={350}
                  className="w-[47%]"
                >
                  <ScalePress
                    onPress={() => handleTopicPress(topic.label)}
                    scaleValue={0.95}
                    haptic={false}
                    className="w-full bg-white rounded-card border border-border p-4 flex-row items-center shadow-card"
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
                  </ScalePress>
                </FadeInUp>
              ))}
            </View>
          </View>

          {/* FAQs */}
          <FadeInUp delay={220} duration={350} className="px-6 mb-6">
            <Text className="text-caption text-slate font-display uppercase tracking-wider mb-2 ml-4">
              Frequently Asked Questions
            </Text>
            <Card>
              <MenuItem
                icon="FileText"
                iconTint="#F1F5F9"
                label="How do I change my booking details?"
                onPress={() => handleFAQPress(
                  "How do I change my booking details?",
                  "To edit booking details, select the booking under Bookings tab and tap Edit."
                )}
                className="border-b border-border"
              />
              <MenuItem
                icon="FileText"
                iconTint="#F1F5F9"
                label="Can I access documents offline?"
                onPress={() => handleFAQPress(
                  "Can I access documents offline?",
                  "Yes! All saved trip documents are cached automatically and accessible offline."
                )}
                className="border-b border-border"
              />
              <MenuItem
                icon="FileText"
                iconTint="#F1F5F9"
                label="How do I set flight alerts?"
                onPress={() => handleFAQPress(
                  "How do I set flight alerts?",
                  "Ensure Smart Notifications are enabled in settings to receive flight updates."
                )}
              />
            </Card>
          </FadeInUp>

          {/* Contact Support */}
          <FadeInUp delay={280} duration={350} className="px-6">
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
              <ScalePress
                onPress={() => {
                  haptics.medium();
                  router.push('/ai-assistant');
                }}
                scaleValue={0.95}
                haptic={false}
                className="h-11 px-6 rounded-button bg-accent items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel="Start chat"
              >
                <Text className="text-body2 text-white font-display">Start Chat</Text>
              </ScalePress>
            </Card>
          </FadeInUp>
        </ScrollView>
      </AnimatedScreen>
    </SafeAreaView>
  );
}

