import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon, type IconName } from '../../components/Icon';
import { Button, Card } from '../../components/ui';
import { ProgressDots } from '../../components/onboarding/ProgressDots';
import { theme } from '../../theme';

interface ToggleRow {
  key: string;
  label: string;
  desc: string;
  icon: IconName;
  bg: string;
  value: boolean;
}

export default function OnboardingNotificationsScreen() {
  const router = useRouter();
  const [toggles, setToggles] = useState<ToggleRow[]>([
    { key: 'flights', label: 'Flight updates', desc: 'Real-time flight updates', icon: 'Plane', bg: '#DBEAFE', value: true },
    { key: 'weather', label: 'Weather alerts', desc: 'Weather condition updates', icon: 'CloudSun', bg: '#FEF3C7', value: true },
    { key: 'reminders', label: 'Travel reminders', desc: 'Important trip reminders', icon: 'Bell', bg: '#DCFCE7', value: true },
    { key: 'documents', label: 'Visa & passport expiry', desc: 'Important document alerts', icon: 'FileText', bg: '#FEE2E2', value: false },
    { key: 'deals', label: 'Price drop alerts', desc: 'Best deals & offers', icon: 'TrendingDown', bg: '#F3E8FF', value: false },
  ]);

  const toggleSwitch = (key: string) => {
    setToggles((prev) =>
      prev.map((t) => (t.key === key ? { ...t, value: !t.value } : t))
    );
  };

  const handleContinue = () => {
    router.push('/onboarding-flow/profile-photo');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center -ml-3"
        >
          <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
        </Pressable>
        <ProgressDots currentStep={6} />
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerClassName="grow px-6 pt-6 pb-8 justify-between"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-3xl font-bold text-primary">Enable Smart Notifications</Text>
          <Text className="text-body1 text-slate font-sans mt-2 mb-6">
            Stay updated and never miss important details.
          </Text>

          <Card className="divide-y divide-border overflow-hidden">
            {toggles.map((item) => (
              <View
                key={item.key}
                className="flex-row items-center justify-between h-[68px] px-4"
              >
                <View className="flex-row items-center flex-1 mr-3">
                  <View
                    className="h-10 w-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Icon name={item.icon} size="small" color={theme.colors.primary} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-body2 text-primary font-display">{item.label}</Text>
                    <Text className="text-caption text-slate font-sans mt-0.5">{item.desc}</Text>
                  </View>
                </View>
                <Switch
                  value={item.value}
                  onValueChange={() => toggleSwitch(item.key)}
                  trackColor={{ false: '#E2E8F0', true: theme.colors.accent }}
                />
              </View>
            ))}
          </Card>
        </View>

        <View className="mt-8 gap-3">
          <Button title="Enable Notifications" onPress={handleContinue} />
          <Pressable
            onPress={handleContinue}
            className="h-12 items-center justify-center active:opacity-75"
            accessibilityRole="button"
            accessibilityLabel="Maybe later"
          >
            <Text className="text-body2 text-slate font-medium">Maybe Later</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
