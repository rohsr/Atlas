import { Text, View } from 'react-native';

import { Icon, type IconName } from '../Icon';
import { Card } from '../ui';
import { MOCK_OVERVIEW } from '../../constants/mock-data';
import { theme } from '../../theme';

const TYPE_CONFIG: Record<string, { icon: IconName; tint: string }> = {
  flight: { icon: 'Plane', tint: '#DBEAFE' },
  transport: { icon: 'Car', tint: '#FEF3C7' },
  activity: { icon: 'MapPin', tint: '#DCFCE7' },
  accommodation: { icon: 'Building', tint: '#F3E8FF' },
  emergency: { icon: 'Phone', tint: '#FEE2E2' },
  'ai-suggestion': { icon: 'Sparkles', tint: '#EDE9FE' },
};

/**
 * Trip Overview tab — section cards for flight, transport, accommodation, etc.
 */
export function TripOverview() {
  return (
    <View className="gap-3">
      {MOCK_OVERVIEW.map((section) => {
        const config = TYPE_CONFIG[section.type] ?? { icon: 'Info', tint: '#F1F5F9' };

        return (
          <Card key={section.id} className="p-4">
            <View className="flex-row items-center mb-3">
              <View
                className="h-10 w-10 rounded-md items-center justify-center mr-3"
                style={{ backgroundColor: config.tint }}
              >
                <Icon name={config.icon} size="small" color={theme.colors.primary} strokeWidth={1.8} />
              </View>
              <View className="flex-1">
                <Text className="text-title text-primary font-display">{section.title}</Text>
                {section.subtitle && (
                  <Text className="text-body2 text-slate font-sans">{section.subtitle}</Text>
                )}
              </View>
            </View>
            {section.details.map((detail, i) => (
              <Text key={i} className="text-body2 text-slate font-sans ml-[52px] mb-0.5">
                {detail}
              </Text>
            ))}
          </Card>
        );
      })}
    </View>
  );
}
