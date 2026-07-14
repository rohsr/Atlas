import { View } from 'react-native';

interface ProgressDotsProps {
  currentStep: number;
  totalSteps?: number;
}

/**
 * Step indicator dot tracker for onboarding flow.
 */
export function ProgressDots({ currentStep, totalSteps = 7 }: ProgressDotsProps) {
  return (
    <View className="flex-row justify-center gap-1.5 py-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep - 1;
        return (
          <View
            key={index}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              isActive ? 'w-6 bg-primary' : 'w-1.5 bg-neutral-200'
            }`}
          />
        );
      })}
    </View>
  );
}
