import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const labelStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.mutedForeground,
  }),
});

import type { ThemeColors } from '@/styles/colors/semantic';

// Helper to get default spinner color
export function getSpinnerColor(colors: ThemeColors): string {
  return colors.primary;
}

// Size mapping for ActivityIndicator
export const sizeMap = {
  sm: 'small' as const,
  md: 'small' as const,
  lg: 'large' as const,
};

// Static layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
