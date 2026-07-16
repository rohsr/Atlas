import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, EmptyState } from '../../components/ui';
import { Icon } from '../../components/Icon';
import { useUIStore } from '../../stores/ui.store';
import { useHaptics } from '../../hooks/useHaptics';
import { theme } from '../../theme';

export default function WalletScreen() {
  const router = useRouter();
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();

  const handleNotifyMe = () => {
    haptics.success();
    showToast("You'll be notified when Atlas Wallet launches!", 'success');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      {/* Top Header Navigation with Back Button */}
      <View className="flex-row items-center px-6 pt-4 pb-2">
        <Pressable
          onPress={() => {
            haptics.light();
            router.back();
          }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center -ml-3"
        >
          <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
        </Pressable>
      </View>

      {/* Coming Soon & Illustration */}
      <EmptyState
        icon="Wallet"
        title="Coming Soon"
        subtitle="Atlas Wallet is currently under development. We're building a premium, secure storage for all your travel cards, boarding passes, and documents."
        actionLabel="Notify Me"
        onAction={handleNotifyMe}
      />
    </SafeAreaView>
  );
}

