import { useState, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import { Card, ScalePress, FadeInUp, Button } from '../ui';
import { MOCK_ITINERARY } from '../../constants/mock-data';
import { theme } from '../../theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeInUp as ReanimatedFadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useUIStore } from '../../stores/ui.store';
import { useHaptics } from '../../hooks/useHaptics';

export function TripItinerary() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  
  const currentDay = MOCK_ITINERARY[selectedDayIndex] || MOCK_ITINERARY[0];
  const isReduced = useReducedMotion();
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();

  // Timeline line growth
  const timelineHeight = useSharedValue(0);

  useEffect(() => {
    timelineHeight.value = 0;
    timelineHeight.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.quad) });
  }, [selectedDayIndex, timelineHeight]);

  const lineAnimatedStyle = useAnimatedStyle(() => ({
    height: `${timelineHeight.value * 100}%`,
  }));

  const toggleExpand = (id: string) => {
    haptics.light();
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View className="gap-4">
      {/* Day Selector Row */}
      <View className="flex-row gap-2">
        {MOCK_ITINERARY.map((day, index) => {
          const isSelected = index === selectedDayIndex;
          return (
            <ScalePress
              key={day.dayLabel}
              onPress={() => setSelectedDayIndex(index)}
              scaleValue={0.95}
              haptic={true}
              className={`h-12 flex-1 items-center justify-center rounded-button ${
                isSelected ? 'bg-primary' : 'bg-white border border-border'
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text className={`text-caption font-sans ${isSelected ? 'text-white' : 'text-slate'}`}>
                Day {index + 1}
              </Text>
              <Text className={`text-body2 font-display ${isSelected ? 'text-white' : 'text-primary'}`}>
                {day.date}
              </Text>
            </ScalePress>
          );
        })}
      </View>

      {/* Events Timeline */}
      <View className="relative mt-2">
        {/* Timeline vertical line */}
        <Animated.View
          style={[lineAnimatedStyle, { transformOrigin: 'top' }]}
          className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-border"
        />

        <View className="gap-6">
          {currentDay.events.map((event, index) => {
            let eventIcon: any = 'MapPin';
            if (event.type === 'transport') eventIcon = 'Car';
            if (event.type === 'dining') eventIcon = 'UtensilsCrossed';
            if (event.type === 'accommodation') eventIcon = 'Building';
            if (event.type === 'flight') eventIcon = 'Plane';

            const isExpanded = !!expandedIds[event.id];

            return (
              <FadeInUp key={event.id} delay={index * 50} duration={350}>
                <View className="flex-row items-start">
                  {/* Time Indicator */}
                  <View className="w-12 pt-1.5 mr-2 items-end">
                    <Text className="text-caption font-sans text-slate">{event.time}</Text>
                  </View>

                  {/* Timeline node */}
                  <View className="h-9 w-9 rounded-full bg-white border border-border items-center justify-center z-10 mr-4">
                    <Icon name={eventIcon} size={16} color={theme.colors.primary} />
                  </View>

                  {/* Event Card */}
                  <View className="flex-1">
                    <ScalePress
                      onPress={() => toggleExpand(event.id)}
                      scaleValue={0.98}
                      haptic={false}
                      className="w-full"
                    >
                      <Card className="p-4">
                        <View className="flex-row justify-between items-center">
                          <Text className="text-body1 text-primary font-display flex-1">{event.title}</Text>
                          <Icon
                            name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                            size={16}
                            color={theme.colors.slate}
                          />
                        </View>
                        {event.subtitle && (
                          <Text className="text-body2 text-slate font-sans mt-0.5">{event.subtitle}</Text>
                        )}
                        {/* Expandable note details */}
                        {isExpanded && (
                          <Animated.View
                            entering={isReduced ? undefined : ReanimatedFadeInUp.duration(200)}
                            exiting={isReduced ? undefined : FadeOutUp.duration(150)}
                            className="mt-3 pt-3 border-t border-neutral-100"
                          >
                            <Text className="text-caption text-slate font-sans leading-4">
                              Notes: Verify operating hours and weather conditions. Keep your booking details handy.
                            </Text>
                          </Animated.View>
                        )}
                      </Card>
                    </ScalePress>
                  </View>
                </View>
              </FadeInUp>
            );
          })}
        </View>
      </View>

      {/* Add Activity Button (Scale Animated via Button.tsx refactoring) */}
      <FadeInUp delay={200} duration={350}>
        <Button
          title="Add Activity"
          icon="Plus"
          variant="secondary"
          onPress={() => showToast('Activity creation coming soon', 'info')}
          className="mt-2 ml-14"
        />
      </FadeInUp>
    </View>
  );
}

