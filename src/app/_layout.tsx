import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toast } from '../components/ui';
import '../../global.css';

/**
 * Atlas — Root Layout
 *
 * Wraps the entire app in:
 * 1. GestureHandlerRootView — required by react-native-gesture-handler & bottom-sheet
 * 2. SafeAreaProvider — provides safe area insets to all screens
 * 3. Toast overlay — global toast notification layer
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
