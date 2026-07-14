import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Card, MenuItem } from '../../../components/ui';
import { MOCK_USER } from '../../../constants/mock-data';
import { theme } from '../../../theme';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-6">
        {/* Profile Card */}
        <View className="items-center px-6 pt-6 pb-4">
          <Avatar uri={MOCK_USER.avatarUrl} name={MOCK_USER.fullName} size="large" />
          <Text className="text-heading2 text-primary font-bold mt-3">
            {MOCK_USER.fullName}
          </Text>
          <Text className="text-body2 text-slate font-sans mt-0.5">
            {MOCK_USER.email}
          </Text>
        </View>

        {/* Stats */}
        <View className="px-6 mb-4">
          <Card className="flex-row py-4">
            {[
              { value: MOCK_USER.trips.toString(), label: 'Trips' },
              { value: MOCK_USER.countries.toString(), label: 'Countries' },
              { value: MOCK_USER.distance, label: 'Distance' },
            ].map((stat, i) => (
              <View
                key={stat.label}
                className={`flex-1 items-center ${
                  i > 0 ? 'border-l border-border' : ''
                }`}
              >
                <Text className="text-title text-primary font-bold">{stat.value}</Text>
                <Text className="text-caption text-slate font-sans mt-0.5">{stat.label}</Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Menu Group 1 */}
        <View className="px-6 mb-3">
          <Card>
            <MenuItem
              icon="User"
              iconTint="#DBEAFE"
              label="Personal Information"
              className="border-b border-border"
            />
            <MenuItem
              icon="Compass"
              iconTint="#DCFCE7"
              label="Travel Preferences"
              className="border-b border-border"
            />
            <MenuItem
              icon="Bell"
              iconTint="#FEF3C7"
              label="Notification Preferences"
            />
          </Card>
        </View>

        {/* Menu Group 2 */}
        <View className="px-6 mb-3">
          <Card>
            <MenuItem
              icon="Settings"
              iconTint="#F1F5F9"
              label="Settings"
              onPress={() => router.push('/settings')}
              className="border-b border-border"
            />
            <MenuItem
              icon="HelpCircle"
              iconTint="#E0F2FE"
              label="Help & Support"
              onPress={() => router.push('/help-support')}
              className="border-b border-border"
            />
            <MenuItem
              icon="Info"
              iconTint="#F3E8FF"
              label="About Atlas"
            />
          </Card>
        </View>

        {/* Menu Group 3 */}
        <View className="px-6 mb-3">
          <Card>
            <MenuItem
              icon="DollarSign"
              iconTint="#DCFCE7"
              label="Currency"
              value="USD"
              showChevron
              className="border-b border-border"
            />
            <MenuItem
              icon="Globe"
              iconTint="#F3E8FF"
              label="Language"
              value="English"
              showChevron
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
