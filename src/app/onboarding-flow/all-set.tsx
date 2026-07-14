import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../../components/Icon';
import { Button } from '../../components/ui';
import { theme } from '../../theme';

const CHECKLIST = [
  'Personalized recommendations',
  'Real-time travel updates',
  'All your trip details in one place',
  'Your smart travel companion',
];

export default function OnboardingCompleteScreen() {
  const router = useRouter();

  const handleStart = () => {
    // Navigate to tabs/home
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerClassName="grow px-6 pt-12 pb-8 justify-between"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center">
          {/* Header */}
          <Text className="text-display text-primary font-bold text-center">You're all set! 🎉</Text>
          <Text className="text-body1 text-slate font-sans mt-2 mb-10 text-center">
            Let's make every journey extraordinary.
          </Text>

          {/* luggage 3D-like illustration placeholder */}
          <View className="h-48 w-48 rounded-full bg-blue-50 items-center justify-center mb-10 border border-blue-100 shadow-card">
            <Icon name="Luggage" size={64} color={theme.colors.accent} strokeWidth={1.5} />
          </View>

          {/* Checklist */}
          <View className="w-full gap-3 bg-white p-5 rounded-card border border-border shadow-card">
            {CHECKLIST.map((item) => (
              <View key={item} className="flex-row items-center gap-3">
                <View className="h-5 w-5 rounded-full bg-green-50 items-center justify-center border border-green-200">
                  <Icon name="Check" size={10} color="#22C55E" strokeWidth={4} />
                </View>
                <Text className="text-body2 text-primary font-sans">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          title="Start Exploring"
          variant="accent"
          onPress={handleStart}
          className="mt-12"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
