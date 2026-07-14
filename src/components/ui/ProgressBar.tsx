import { Text, View } from 'react-native';

interface ProgressBarProps {
  percent: number;
  label?: string;
  className?: string;
}

/**
 * Rounded progress bar with blue fill on gray track.
 */
export function ProgressBar({ percent, label, className = '' }: ProgressBarProps) {
  const clampedPercent = Math.max(0, Math.min(100, percent));

  return (
    <View className={className}>
      <View className="h-2 rounded-full bg-border overflow-hidden">
        <View
          className="h-full rounded-full bg-accent"
          style={{ width: `${clampedPercent}%` }}
        />
      </View>
      {label && (
        <Text className="mt-1.5 text-caption text-slate font-sans">{label}</Text>
      )}
    </View>
  );
}
