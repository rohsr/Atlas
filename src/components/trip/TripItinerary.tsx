import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import { Card } from '../ui';
import { MOCK_ITINERARY } from '../../constants/mock-data';
import { theme } from '../../theme';

export function TripItinerary() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const currentDay = MOCK_ITINERARY[selectedDayIndex] || MOCK_ITINERARY[0];

  return (
    <View className="gap-4">
      {/* Day Selector Row */}
      <View className="flex-row gap-2">
        {MOCK_ITINERARY.map((day, index) => {
          const isSelected = index === selectedDayIndex;
          return (
            <Pressable
              key={day.dayLabel}
              onPress={() => setSelectedDayIndex(index)}
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
            </Pressable>
          );
        })}
      </View>

      {/* Events Timeline */}
      <View className="relative mt-2">
        {/* Timeline vertical line */}
        <View className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-border" />

        <View className="gap-6">
          {currentDay.events.map((event) => {
            let eventIcon: any = 'MapPin';
            if (event.type === 'transport') eventIcon = 'Car';
            if (event.type === 'dining') eventIcon = 'UtensilsCrossed';
            if (event.type === 'accommodation') eventIcon = 'Building';
            if (event.type === 'flight') eventIcon = 'Plane';

            return (
              <View key={event.id} className="flex-row items-start">
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
                  <Card className="p-4">
                    <Text className="text-body1 text-primary font-display">{event.title}</Text>
                    {event.subtitle && (
                      <Text className="text-body2 text-slate font-sans mt-0.5">{event.subtitle}</Text>
                    )}
                  </Card>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
