import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

import { Button, EmptyState } from '../../components/ui';

export default function WalletScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <Text className="text-heading1 text-primary font-bold">Wallet</Text>
      </View>

      {/* Coming Soon */}
      <EmptyState
        icon="Wallet"
        title="Coming Soon"
        subtitle="Atlas Wallet is currently under development. We're building something amazing for you!"
        actionLabel="Notify Me"
        onAction={() => {}}
      />
    </SafeAreaView>
  );
}
