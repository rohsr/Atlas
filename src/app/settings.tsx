import { useRouter } from 'expo-router';
import { ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../components/Icon';
import { Card, MenuItem, AnimatedScreen, FadeInUp, ScalePress } from '../components/ui';
import { theme } from '../theme';
import { useSettingsStore } from '../stores/settings.store';
import { useAuthStore } from '../stores/auth.store';
import { useUIStore } from '../stores/ui.store';
import { useHaptics } from '../hooks/useHaptics';

export default function SettingsScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const showToast = useUIStore((s) => s.showToast);
  const signOut = useAuthStore((s) => s.signOut);

  const smartAlerts = useSettingsStore((s) => s.smartAlerts);
  const locationSharing = useSettingsStore((s) => s.locationSharing);
  const biometrics = useSettingsStore((s) => s.biometrics);

  const toggleSmartAlerts = useSettingsStore((s) => s.toggleSmartAlerts);
  const toggleLocationSharing = useSettingsStore((s) => s.toggleLocationSharing);
  const toggleBiometrics = useSettingsStore((s) => s.toggleBiometrics);

  const handleComingSoon = (feature: string) => {
    haptics.light();
    showToast(`${feature} is coming soon`, 'info');
  };

  const handleLogout = () => {
    haptics.warning();
    signOut();
    router.replace('/onboarding');
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
            <Text className="text-heading1 text-primary font-bold">Settings</Text>
          </View>
        </FadeInUp>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
          {/* Account Settings */}
          <FadeInUp delay={100} duration={350} className="px-6 mt-4 mb-3">
            <Text className="text-caption text-slate font-display uppercase tracking-wider mb-2 ml-4">
              Account settings
            </Text>
            <Card>
              <MenuItem
                icon="User"
                iconTint="#DBEAFE"
                label="Edit Profile"
                onPress={() => handleComingSoon('Edit Profile')}
                className="border-b border-border"
              />
              <MenuItem
                icon="Shield"
                iconTint="#FEE2E2"
                label="Security & Password"
                onPress={() => handleComingSoon('Security')}
                className="border-b border-border"
              />
              <MenuItem
                icon="CreditCard"
                iconTint="#DCFCE7"
                label="Payment Methods"
                onPress={() => handleComingSoon('Payment Methods')}
              />
            </Card>
          </FadeInUp>

          {/* Preferences */}
          <FadeInUp delay={150} duration={350} className="px-6 mb-3">
            <Text className="text-caption text-slate font-display uppercase tracking-wider mb-2 ml-4">
              Preferences
            </Text>
            <Card>
              <MenuItem
                icon="Bell"
                iconTint="#FEF3C7"
                label="Smart Alerts"
                showChevron={false}
                className="border-b border-border"
                rightElement={
                  <Switch
                    value={smartAlerts}
                    onValueChange={() => {
                      haptics.selection();
                      toggleSmartAlerts();
                    }}
                    trackColor={{ false: '#E2E8F0', true: theme.colors.accent }}
                  />
                }
              />
              <MenuItem
                icon="MapPin"
                iconTint="#DCFCE7"
                label="Share Location"
                showChevron={false}
                className="border-b border-border"
                rightElement={
                  <Switch
                    value={locationSharing}
                    onValueChange={() => {
                      haptics.selection();
                      toggleLocationSharing();
                    }}
                    trackColor={{ false: '#E2E8F0', true: theme.colors.accent }}
                  />
                }
              />
              <MenuItem
                icon="Fingerprint"
                iconTint="#F3E8FF"
                label="Biometric Login"
                showChevron={false}
                rightElement={
                  <Switch
                    value={biometrics}
                    onValueChange={() => {
                      haptics.selection();
                      toggleBiometrics();
                    }}
                    trackColor={{ false: '#E2E8F0', true: theme.colors.accent }}
                  />
                }
              />
            </Card>
          </FadeInUp>

          {/* Support */}
          <FadeInUp delay={200} duration={350} className="px-6 mb-6">
            <Text className="text-caption text-slate font-display uppercase tracking-wider mb-2 ml-4">
              Support
            </Text>
            <Card>
              <MenuItem
                icon="HelpCircle"
                iconTint="#E0F2FE"
                label="Help Center"
                onPress={() => {
                  haptics.light();
                  router.push('/help-support');
                }}
                className="border-b border-border"
              />
              <MenuItem
                icon="FileText"
                iconTint="#F1F5F9"
                label="Terms of Service"
                onPress={() => handleComingSoon('Terms of Service')}
                className="border-b border-border"
              />
              <MenuItem
                icon="Lock"
                iconTint="#FFF7ED"
                label="Privacy Policy"
                onPress={() => handleComingSoon('Privacy Policy')}
              />
            </Card>
          </FadeInUp>

          {/* Log Out */}
          <FadeInUp delay={250} duration={350} className="px-6 mt-4">
            <ScalePress
              onPress={handleLogout}
              scaleValue={0.96}
              haptic={false}
              className="h-14 bg-red-50 border border-red-100 rounded-card items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Log out"
            >
              <Text className="text-body1 text-danger font-display">Log Out</Text>
            </ScalePress>
          </FadeInUp>
        </ScrollView>
      </AnimatedScreen>
    </SafeAreaView>
  );
}

