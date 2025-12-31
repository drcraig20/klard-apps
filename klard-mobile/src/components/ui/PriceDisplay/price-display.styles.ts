import { sva, type ThemeColors } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const amountStyles = sva({
  base: (colors) => ({
    fontWeight: '500',
    color: colors.foreground,
  }),
  variants: {
    size: {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 20, fontWeight: '600' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const cycleLabelStyles = sva({
  base: (colors) => ({
    fontWeight: '400',
    color: colors.mutedForeground,
  }),
  variants: {
    size: {
      sm: { fontSize: 12 },
      md: { fontSize: 14 },
      lg: { fontSize: 16 },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const changeAmountStyles = sva({
  base: {
    fontWeight: '400',
  },
  variants: {
    size: {
      sm: { fontSize: 12 },
      md: { fontSize: 14 },
      lg: { fontSize: 16 },
    },
    direction: {
      increase: (colors) => ({ color: colors.error }),
      decrease: (colors) => ({ color: colors.success }),
    },
  },
  defaultVariants: {
    size: 'md',
    direction: 'increase',
  },
});

// Helper to get change color from theme
export function getChangeColor(direction: 'increase' | 'decrease', colors: ThemeColors): string {
  const colorMap = {
    increase: colors.error,
    decrease: colors.success,
  };
  return colorMap[direction];
}

// Icon sizes per display size
export const changeSizes = {
  sm: { iconSize: 10 },
  md: { iconSize: 12 },
  lg: { iconSize: 14 },
};

// Cycle labels (not themed)
export const cycleLabels: Record<string, string> = {
  monthly: '/mo',
  yearly: '/yr',
  weekly: '/wk',
  'one-time': '',
};

// Static layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 4,
  },
});