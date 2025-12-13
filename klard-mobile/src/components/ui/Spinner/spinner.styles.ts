import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const labelStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.mutedForeground,
  }),
});

// Helper to get default spinner color
export function getSpinnerColor(isDark: boolean): string {
  return isDark ? '#15B5B0' : '#0D7C7A';
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
