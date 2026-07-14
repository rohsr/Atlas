import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../components/Icon';
import { Card, MenuItem } from '../components/ui';
import { theme } from '../theme';

export default function SettingsScreen() {
  const router = useRouter();
  const [smartAlerts, setSmartAlerts] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const [biometrics, setBiometrics] = useState(true);

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
          <Text className="text-heading1 text-primary font-bold">Settings</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
        {/* Account Settings */}
        <View className="px-6 mt-4 mb-3">
          <Text className="text-caption text-slate font-display uppercase tracking-wider mb-2 ml-4">
            Account settings
          </Text>
          <Card>
            <MenuItem
              icon="User"
              iconTint="#DBEAFE"
              label="Edit Profile"
              className="border-b border-border"
            />
            <MenuItem
              icon="Shield"
              iconTint="#FEE2E2"
              label="Security & Password"
              className="border-b border-border"
            />
            <MenuItem
              icon="CreditCard"
              iconTint="#DCFCE7"
              label="Payment Methods"
            />
          </Card>
        </View>

        {/* Preferences */}
        <View className="px-6 mb-3">
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
                  onValueChange={setSmartAlerts}
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
                  onValueChange={setLocationSharing}
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
                  onValueChange={setBiometrics}
                  trackColor={{ false: '#E2E8F0', true: theme.colors.accent }}
                />
              }
            />
          </Card>
        </View>

        {/* Support */}
        <View className="px-6 mb-6">
          <Text className="text-caption text-slate font-display uppercase tracking-wider mb-2 ml-4">
            Support
          </Text>
          <Card>
            <MenuItem
              icon="HelpCircle"
              iconTint="#E0F2FE"
              label="Help Center"
              onPress={() => router.push('/help-support')}
              className="border-b border-border"
            />
            <MenuItem
              icon="FileText"
              iconTint="#F1F5F9"
              label="Terms of Service"
              className="border-b border-border"
            />
            <MenuItem
              icon="Lock"
              iconTint="#FFF7ED"
              label="Privacy Policy"
            />
          </Card>
        </View>

        {/* Log Out */}
        <View className="px-6 mt-4">
          <Pressable
            onPress={() => {}}
            className="h-14 bg-red-50 border border-red-100 rounded-card items-center justify-center active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel="Log out"
          >
            <Text className="text-body1 text-danger font-display">Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
