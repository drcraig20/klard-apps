import { sva } from '@/styles/sva';
import { StyleSheet, Platform } from 'react-native';

/**
 * SubscriptionCard Styles
 *
 * Glassmorphism-enabled card with support for protected state glow effects.
 *
 * SOLID Compliance:
 * - SRP: Only handles card styling
 * - OCP: Extend via variants without modifying existing
 * - DIP: Uses color abstractions
 */

export const cardStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    // Glassmorphism effect
    backgroundColor: colors.cardGlass ?? colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.glassBorder ?? colors.border,
    // Shadow
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        }
      : {
          elevation: 4,
        }),
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
    protected: {
      true: (colors) => ({
        borderColor: colors.successBorder ?? colors.success,
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: colors.success,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
            }
          : {
              elevation: 6,
            }),
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

/**
 * Protected badge styles
 */
export const protectedBadgeStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    backgroundColor: colors.successBackground ?? `${colors.success}1A`, // 10% opacity fallback
    borderWidth: 1,
    borderColor: colors.successBorder ?? `${colors.success}33`, // 20% opacity fallback
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: colors.success,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }
      : {
          elevation: 2,
        }),
  }),
});

export const protectedBadgeTextStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    fontWeight: '500',
    color: colors.success,
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
  rightSection: {
    alignItems: 'flex-end',
    gap: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
