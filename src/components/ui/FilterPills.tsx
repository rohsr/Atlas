import { ScrollView, Text } from 'react-native';
import { ScalePress } from './Animation';

interface FilterPillsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  className?: string;
}

/**
 * Horizontal scrollable pill row with active/inactive states.
 * Active: dark background, white text. Inactive: white bg, border, gray text.
 */
export function FilterPills({
  options,
  selected,
  onSelect,
  className = '',
}: FilterPillsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={className}
      contentContainerClassName="gap-2"
    >
      {options.map((option) => {
        const isActive = option === selected;
        return (
          <ScalePress
            key={option}
            onPress={() => onSelect(option)}
            scaleValue={0.94}
            haptic={true}
            className={`h-9 items-center justify-center rounded-button px-4 ${
              isActive
                ? 'bg-primary'
                : 'bg-white border border-border'
            }`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              className={`text-body2 ${
                isActive ? 'text-white font-display' : 'text-slate font-sans'
              }`}
            >
              {option}
            </Text>
          </ScalePress>
        );
      })}
    </ScrollView>
  );
}

