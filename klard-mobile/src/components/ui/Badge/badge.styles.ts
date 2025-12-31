import { sva } from '@/styles/sva';
import type { ThemeColors } from '@/styles';

export const badgeContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9999,
    gap: 4,
  },
  variants: {
    variant: {
      default: (colors: ThemeColors) => ({
        backgroundColor: colors.muted,
      }),
      primary: (colors: ThemeColors) => ({
        backgroundColor: colors.primaryBackground,
        shadowColor: colors.glowPrimary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
      }),
      success: (colors: ThemeColors) => ({
        backgroundColor: colors.successBackground,
        shadowColor: colors.glowSuccess,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
      }),
      warning: (colors: ThemeColors) => ({
        backgroundColor: colors.warningBackground,
        shadowColor: colors.glowWarning,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
      }),
      error: (colors: ThemeColors) => ({
        backgroundColor: colors.errorBackground,
        shadowColor: colors.glowError,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
      }),
      secondary: (colors: ThemeColors) => ({
        backgroundColor: colors.muted,
      }),
      destructive: (colors: ThemeColors) => ({
        backgroundColor: colors.errorBackground,
        shadowColor: colors.glowError,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
      }),
      outline: (colors: ThemeColors) => ({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
      }),
    },
    size: {
      sm: {
        paddingHorizontal: 6,
        paddingVertical: 2,
      },
      md: {
        paddingHorizontal: 10,
        paddingVertical: 2,
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export const badgeTextStyles = sva({
  base: {
    fontWeight: '500',
  },
  variants: {
    variant: {
      default: (colors: ThemeColors) => ({
        color: colors.mutedForeground,
      }),
      primary: (colors: ThemeColors) => ({
        color: colors.primary,
      }),
      success: (colors: ThemeColors) => ({
        color: colors.success,
      }),
      warning: (colors: ThemeColors) => ({
        color: colors.warning,
      }),
      error: (colors: ThemeColors) => ({
        color: colors.error,
      }),
      secondary: (colors: ThemeColors) => ({
        color: colors.secondary,
      }),
      destructive: (colors: ThemeColors) => ({
        color: colors.error,
      }),
      outline: (colors: ThemeColors) => ({
        color: colors.textSecondary,
      }),
    },
    size: {
      sm: {
        fontSize: 12,
      },
      md: {
        fontSize: 14,
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// Static styles that don't need theme colors
export const staticStyles = {
  iconContainer: {
    flexShrink: 0,
  },
  removeButton: {
    marginLeft: 2,
    padding: 2,
    borderRadius: 9999,
  },
} as const;
