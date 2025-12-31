import { sva, type ThemeColors } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export type AlertType = 'renewal' | 'price-increase' | 'price-decrease' | 'blocked' | 'savings' | 'system';

export const containerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    position: 'relative',
  }),
  variants: {
    size: {
      md: { padding: 14 },
      sm: { padding: 10, gap: 10 },
    },
    pressed: {
      true: {
        opacity: 0.95,
        transform: [{ scale: 0.99 }],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const iconBubbleStyles = sva({
  base: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  variants: {
    type: {
      renewal: (colors) => ({ backgroundColor: colors.primaryBackground }),
      'price-increase': (colors) => ({ backgroundColor: colors.warningBackground }),
      'price-decrease': (colors) => ({ backgroundColor: colors.successBackground }),
      blocked: (colors) => ({ backgroundColor: colors.errorBackground }),
      savings: (colors) => ({ backgroundColor: colors.successBackground }),
      system: (colors) => ({ backgroundColor: colors.muted }),
    },
  },
  defaultVariants: {
    type: 'system',
  },
});

export const titleStyles = sva({
  base: (colors) => ({
    fontWeight: '600',
    color: colors.foreground,
    flex: 1,
  }),
  variants: {
    size: {
      md: { fontSize: 15 },
      sm: { fontSize: 14 },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const bodyStyles = sva({
  base: (colors) => ({
    color: colors.mutedForeground,
    lineHeight: 20,
  }),
  variants: {
    size: {
      md: { fontSize: 14 },
      sm: { fontSize: 13 },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const timeStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    color: colors.textSecondary,
  }),
});

export const unreadDotStyles = sva({
  base: (colors) => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  }),
});

export const subscriptionChipStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.muted,
    borderRadius: 999,
  }),
});

export const subscriptionTextStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    fontWeight: '600',
    color: colors.foreground,
  }),
});

export const subscriptionFallbackStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

export const subscriptionInitialStyles = sva({
  base: (colors) => ({
    fontSize: 10,
    fontWeight: '600',
    color: colors.foreground,
  }),
});

export const ctaStyles = sva({
  base: (colors) => ({
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.muted,
    borderRadius: 10,
  }),
});

export const ctaTextStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  }),
});

// Helper to get icon color by type from theme
export function getIconColor(type: AlertType, colors: ThemeColors): string {
  const colorMap = {
    renewal: colors.primary,
    'price-increase': colors.warning,
    'price-decrease': colors.success,
    blocked: colors.error,
    savings: colors.success,
    system: colors.textSecondary,
  };
  return colorMap[type];
}

// Static layout styles (not themed)
export const layoutStyles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  subscriptionLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  dismissButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
});