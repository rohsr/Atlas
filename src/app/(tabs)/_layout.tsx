import { Tabs } from 'expo-router';
import { Icon, type IconName } from '../../components/Icon';
import { theme } from '../../theme';

const TAB_ITEMS: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Home', icon: 'House' },
  { name: 'trips', title: 'Trips', icon: 'Briefcase' },
  { name: 'explore', title: 'Explore', icon: 'Compass' },
  { name: 'wallet', title: 'Wallet', icon: 'Wallet' },
  { name: 'profile', title: 'Profile', icon: 'UserRound' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.slate,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 88,
          paddingTop: 8,
          paddingBottom: 28,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      {TAB_ITEMS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <Icon name={tab.icon} size={22} color={color} strokeWidth={1.8} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
