import { TextInput, View } from 'react-native';
import { Icon } from '../Icon';
import { theme } from '../../theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  className?: string;
}

/**
 * Search input with magnifying glass icon, 20px radius, 48px height.
 */
export function SearchBar({
  placeholder = 'Search...',
  value,
  onChangeText,
  className = '',
}: SearchBarProps) {
  return (
    <View
      className={`flex-row items-center h-12 px-4 bg-white rounded-button border border-border shadow-card ${className}`}
    >
      <Icon name="Search" size="small" color={theme.colors.slate} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.slate}
        className="flex-1 ml-3 text-body2 text-primary font-sans"
        accessibilityLabel="Search input"
      />
    </View>
  );
}
