import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const containerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  }),
  variants: {
    pressed: {
      true: (colors) => ({
        borderColor: colors.primary,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }),
    },
    muted: {
      true: (colors) => ({
        opacity: 0.75,
        borderColor: colors.border,
      }),
    },
  },
});

export const labelStyles = sva({
  base: (colors) => ({
    color: colors.mutedForeground,
    fontWeight: '400',
  }),
  variants: {
    muted: {
      true: { opacity: 0.7 },
    },
  },
});

export const valueStyles = sva({
  base: (colors) => ({
    color: colors.foreground,
    fontWeight: '600',
    letterSpacing: -0.5,
  }),
  variants: {
    muted: {
      true: { opacity: 0.7 },
    },
  },
});

export const trendValueStyles = sva({
  base: {
    fontWeight: '500',
  },
  variants: {
    direction: {
      up: (colors) => ({ color: colors.success }),
      down: (colors) => ({ color: colors.error }),
      neutral: (colors) => ({ color: colors.mutedForeground }),
    },
  },
  defaultVariants: {
    direction: 'neutral',
  },
});

export const iconContainerStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

// Helper to get trend color
export function getTrendColor(direction: 'up' | 'down' | 'neutral', isDark: boolean): string {
  const colors = {
    light: { up: '#059669', down: '#DC2626', neutral: '#64748B' },
    dark: { up: '#10B981', down: '#EF4444', neutral: '#CBD5E1' },
  };
  return isDark ? colors.dark[direction] : colors.light[direction];
}

// Trend icon names
export const trendIconNames = {
  up: 'trending-up' as const,
  down: 'trending-down' as const,
  neutral: 'remove' as const,
};

// Size config
export const sizeConfig = {
  sm: { padding: 12, fontSize: 14, valueFontSize: 18, iconSize: 16 },
  md: { padding: 16, fontSize: 16, valueFontSize: 24, iconSize: 18 },
  lg: { padding: 20, fontSize: 18, valueFontSize: 28, iconSize: 20 },
};

// Static layout styles
export const layoutStyles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
});
