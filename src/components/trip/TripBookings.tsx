import { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../Icon';
import { Card, Badge, FilterPills, AnimatedCard } from '../ui';
import { MOCK_BOOKINGS } from '../../constants/mock-data';
import { theme } from '../../theme';

const CATEGORIES = ['All', 'Flights', 'Hotels', 'Activities', 'Transport'];

export function TripBookings() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Flights') return booking.category === 'flight';
    if (selectedCategory === 'Hotels') return booking.category === 'hotel';
    if (selectedCategory === 'Activities') return booking.category === 'activity';
    if (selectedCategory === 'Transport') return booking.category === 'transport';
    return true;
  });

  return (
    <View className="gap-4">
      {/* Category Filter Pills */}
      <FilterPills
        options={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Bookings List */}
      <View className="gap-3">
        {filteredBookings.map((booking, index) => {
          let categoryIcon: any = 'Calendar';
          let iconBg = '#F1F5F9';
          if (booking.category === 'flight') {
            categoryIcon = 'Plane';
            iconBg = '#DBEAFE';
          } else if (booking.category === 'hotel') {
            categoryIcon = 'Building';
            iconBg = '#F3E8FF';
          } else if (booking.category === 'activity') {
            categoryIcon = 'Compass';
            iconBg = '#DCFCE7';
          } else if (booking.category === 'transport') {
            categoryIcon = 'Car';
            iconBg = '#FEF3C7';
          }

          return (
            <AnimatedCard index={index} key={booking.id} className="p-4 flex-row items-center">
              {/* Category Icon */}
              <View
                className="h-12 w-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: iconBg }}
              >
                <Icon name={categoryIcon} size={22} color={theme.colors.primary} />
              </View>

              {/* Booking Info */}
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="text-body1 text-primary font-display">{booking.title}</Text>
                  <Badge
                    label={booking.status}
                    variant={booking.status === 'confirmed' ? 'success' : 'warning'}
                  />
                </View>
                <Text className="text-body2 text-slate font-sans mt-0.5">{booking.subtitle}</Text>
                <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-border">
                  <Text className="text-caption text-slate font-sans">{booking.date}</Text>
                  <Text className="text-caption text-primary font-medium">Ref: {booking.reference}</Text>
                </View>
              </View>
            </AnimatedCard>
          );
        })}
      </View>
    </View>
  );
}

