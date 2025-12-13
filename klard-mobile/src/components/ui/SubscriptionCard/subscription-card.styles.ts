import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const cardStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  }),
  variants: {
    variant: {
      default: {},
      compact: { padding: 12, gap: 12 },
      detailed: { padding: 20 },
    },
    pressed: {
      true: (colors) => ({
        backgroundColor: colors.muted,
        borderColor: colors.primaryBorder,
      }),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const logoFallbackStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.primaryBackground,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

export const logoFallbackTextStyles = sva({
  base: (colors) => ({
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  }),
});

export const nameStyles = sva({
  base: (colors) => ({
    fontSize: 16,
    fontWeight: '500',
    color: colors.foreground,
  }),
});

export const categoryStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    color: colors.mutedForeground,
    textTransform: 'capitalize',
  }),
});

export const dateStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.mutedForeground,
  }),
});

export const priceStyles = sva({
  base: (colors) => ({
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
  }),
});

export const cycleStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.mutedForeground,
  }),
});

// Static layout styles
export const layoutStyles = StyleSheet.create({
  logoContainer: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  logo: {
    borderRadius: 9999,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
});

// Re-export constants
export const statusConfig = {
  active: { label: 'Active', variant: 'success' as const },
  trial: { label: 'Trial', variant: 'warning' as const },
  paused: { label: 'Paused', variant: 'default' as const },
  cancelled: { label: 'Cancelled', variant: 'default' as const },
  expired: { label: 'Expired', variant: 'error' as const },
};

export const billingCycleLabels = {
  monthly: '/mo',
  quarterly: '/qtr',
  yearly: '/yr',
};
