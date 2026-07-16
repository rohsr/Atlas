import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Card, MenuItem, AnimatedScreen, FadeInUp, FadeIn } from '../../../components/ui';
import { MOCK_USER } from '../../../constants/mock-data';
import { theme } from '../../../theme';
import { useAuthStore } from '../../../stores/auth.store';
import { useUIStore } from '../../../stores/ui.store';
import { useHaptics } from '../../../hooks/useHaptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

function CountingText({ value }: { value: string }) {
  const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9,\s]/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isNaN(num)) return;

    let start = 0;
    const duration = 800; // 800ms count up
    const startTime = Date.now();

    const timer = setInterval(() => {
      const timePassed = Date.now() - startTime;
      const progress = Math.min(timePassed / duration, 1);
      const easeProgress = progress * (2 - progress); // ease out quad
      const currentCount = Math.floor(easeProgress * num);
      
      setCount(currentCount);

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [num]);

  if (isNaN(num)) {
    return <Text className="text-title text-primary font-bold">{value}</Text>;
  }

  const formattedCount = count.toLocaleString();
  return (
    <Text className="text-title text-primary font-bold">
      {formattedCount}
      {suffix ? ` ${suffix}` : ''}
    </Text>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();
  const storeUser = useAuthStore((s) => s.user);
  const isReduced = useReducedMotion();

  const user = storeUser ?? MOCK_USER;

  // Avatar scale/opacity entry
  const avatarScale = useSharedValue(isReduced ? 1 : 0.6);
  const avatarOpacity = useSharedValue(isReduced ? 1 : 0);

  useEffect(() => {
    if (isReduced) return;
    avatarScale.value = withSpring(1, { damping: 15, stiffness: 120 });
    avatarOpacity.value = withTiming(1, { duration: 300 });
  }, [isReduced, avatarScale, avatarOpacity]);

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    opacity: avatarOpacity.value,
    transform: [{ scale: avatarScale.value }],
  }));

  const handleComingSoon = (feature: string) => {
    haptics.light();
    showToast(`${feature} is coming soon`, 'info');
  };

  const handleAbout = () => {
    haptics.light();
    showToast('Atlas v1.0.0. Built by South Indie House.', 'info');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <AnimatedScreen className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
          {/* Profile Card */}
          <View className="items-center px-6 pt-6 pb-4">
            <Animated.View style={avatarAnimatedStyle}>
              <Avatar uri={user.avatarUrl} name={user.fullName} size="large" />
            </Animated.View>
            <FadeInUp delay={100} duration={350} className="items-center">
              <Text className="text-heading2 text-primary font-bold mt-3">
                {user.fullName}
              </Text>
              <Text className="text-body2 text-slate font-sans mt-0.5">
                {user.email}
              </Text>
            </FadeInUp>
          </View>

          {/* Stats */}
          <FadeInUp delay={150} duration={350} className="px-6 mb-4">
            <Card className="flex-row py-4">
              {[
                { value: user.trips.toString(), label: 'Trips' },
                { value: user.countries.toString(), label: 'Countries' },
                { value: user.distance, label: 'Distance' },
              ].map((stat, i) => (
                <View
                  key={stat.label}
                  className={`flex-1 items-center ${
                    i > 0 ? 'border-l border-border' : ''
                  }`}
                >
                  <CountingText value={stat.value} />
                  <Text className="text-caption text-slate font-sans mt-0.5">{stat.label}</Text>
                </View>
              ))}
            </Card>
          </FadeInUp>

          {/* Menu Group 1 */}
          <FadeInUp delay={200} duration={400} className="px-6 mb-3">
            <Card>
              <MenuItem
                icon="User"
                iconTint="#DBEAFE"
                label="Personal Information"
                onPress={() => handleComingSoon('Personal Information')}
                className="border-b border-border"
              />
              <MenuItem
                icon="Compass"
                iconTint="#DCFCE7"
                label="Travel Preferences"
                onPress={() => handleComingSoon('Travel Preferences')}
                className="border-b border-border"
              />
              <MenuItem
                icon="Bell"
                iconTint="#FEF3C7"
                label="Notification Preferences"
                onPress={() => handleComingSoon('Notification Preferences')}
              />
            </Card>
          </FadeInUp>

          {/* Menu Group 2 */}
          <FadeInUp delay={250} duration={400} className="px-6 mb-3">
            <Card>
              <MenuItem
                icon="Settings"
                iconTint="#F1F5F9"
                label="Settings"
                onPress={() => {
                  haptics.light();
                  router.push('/settings');
                }}
                className="border-b border-border"
              />
              <MenuItem
                icon="HelpCircle"
                iconTint="#E0F2FE"
                label="Help & Support"
                onPress={() => {
                  haptics.light();
                  router.push('/help-support');
                }}
                className="border-b border-border"
              />
              <MenuItem
                icon="Info"
                iconTint="#F3E8FF"
                label="About Atlas"
                onPress={handleAbout}
              />
            </Card>
          </FadeInUp>

          {/* Menu Group 3 */}
          <FadeInUp delay={300} duration={400} className="px-6 mb-3">
            <Card>
              <MenuItem
                icon="DollarSign"
                iconTint="#DCFCE7"
                label="Currency"
                value="USD"
                showChevron
                onPress={() => handleComingSoon('Currency selection')}
                className="border-b border-border"
              />
              <MenuItem
                icon="Globe"
                iconTint="#F3E8FF"
                label="Language"
                value="English"
                showChevron
                onPress={() => handleComingSoon('Language selection')}
              />
            </Card>
          </FadeInUp>
        </ScrollView>
      </AnimatedScreen>
    </SafeAreaView>
  );
}

