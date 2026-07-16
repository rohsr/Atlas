import { Tabs } from 'expo-router';
import { View, Pressable, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Icon, type IconName } from '../../components/Icon';
import { theme } from '../../theme';
import { useHaptics } from '../../hooks/useHaptics';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useEffect } from 'react';

const TAB_ITEMS: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Home', icon: 'House' },
  { name: 'trips', title: 'Trips', icon: 'Briefcase' },
  { name: 'explore', title: 'Explore', icon: 'Compass' },
  { name: 'wallet', title: 'Wallet', icon: 'Wallet' },
  { name: 'profile', title: 'Profile', icon: 'UserRound' },
];

function TabBarButton({
  label,
  isFocused,
  onPress,
  iconName,
}: {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  iconName: IconName;
}) {
  const isReduced = useReducedMotion();
  const scale = useSharedValue(isFocused ? 1.15 : 1);
  const opacity = useSharedValue(isFocused ? 1 : 0.7);

  useEffect(() => {
    if (isReduced) {
      scale.value = isFocused ? 1.15 : 1;
      opacity.value = isFocused ? 1 : 0.7;
      return;
    }
    scale.value = withSpring(isFocused ? 1.15 : 1, { damping: 15, stiffness: 250 });
    opacity.value = withTiming(isFocused ? 1 : 0.7, { duration: 150 });
  }, [isFocused, isReduced, scale, opacity]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View style={iconStyle}>
        <Icon
          name={iconName}
          size={22}
          color={isFocused ? theme.colors.accent : theme.colors.slate}
          strokeWidth={1.8}
        />
      </Animated.View>
      <Animated.Text
        style={[
          labelStyle,
          {
            fontFamily: 'Inter-Medium',
            fontSize: 11,
            marginTop: 4,
            color: isFocused ? theme.colors.accent : theme.colors.slate,
          },
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const haptics = useHaptics();
  const isReduced = useReducedMotion();
  const { width } = useWindowDimensions();

  const tabWidth = width / state.routes.length;
  const indicatorX = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    if (isReduced) {
      indicatorX.value = state.index * tabWidth;
      return;
    }
    indicatorX.value = withSpring(state.index * tabWidth, { damping: 20, stiffness: 200 });
  }, [state.index, tabWidth, isReduced, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        borderTopColor: theme.colors.border,
        borderTopWidth: 1,
        height: 52 + (insets.bottom || 24),
        paddingBottom: insets.bottom || 24,
        paddingTop: 8,
        position: 'relative',
      }}
    >
      {/* Sliding Active Indicator Line at the top of the bar */}
      {!isReduced && (
        <Animated.View
          style={[
            indicatorStyle,
            {
              position: 'absolute',
              top: -1,
              left: 0,
              width: tabWidth,
              height: 2,
              backgroundColor: theme.colors.accent,
            },
          ]}
        />
      )}
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            haptics.selection();
            navigation.navigate(route.name, route.params);
          }
        };

        const resolvedIconName = TAB_ITEMS.find((item) => item.name === route.name)?.icon || 'House';

        return (
          <TabBarButton
            key={route.key}
            label={label}
            isFocused={isFocused}
            onPress={onPress}
            iconName={resolvedIconName}
          />
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
