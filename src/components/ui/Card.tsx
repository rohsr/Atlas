import { View } from 'react-native';
import type { ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable card with 22px radius, white background, and soft shadow.
 * Matches the Atlas design system card style.
 */
export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View
      className={`bg-card rounded-card border border-border shadow-card ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
