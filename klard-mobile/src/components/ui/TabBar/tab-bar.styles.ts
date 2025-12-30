import { sva } from '@/styles/sva';
import { StyleSheet, Platform } from 'react-native';

/**
 * Glassmorphic blur container for the TabBar
 * Uses expo-blur BlurView with glass border styling
 */
export const blurContainerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    backgroundColor: colors.glassBackground,
    overflow: 'hidden',
  }),
});

export const tabContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
  },
  variants: {
    state: {
      default: {
        backgroundColor: 'transparent',
      },
      active: (colors) => ({
        backgroundColor: colors.activeBackground,
        // Glow effect using shadow on active tab
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        ...Platform.select({
          android: {
            elevation: 4,
          },
        }),
      }),
      disabled: {
        opacity: 0.5,
      },
      pressed: {
        opacity: 0.7,
      },
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const tabLabelStyles = sva({
  base: {
    fontSize: 14,
    fontWeight: '500',
  },
  variants: {
    state: {
      default: (colors) => ({
        color: colors.mutedForeground,
      }),
      active: (colors) => ({
        color: colors.primary,
        fontWeight: '600',
      }),
      disabled: (colors) => ({
        color: colors.textDisabled,
      }),
    },
  },
  defaultVariants: {
    state: 'default',
  },
});

export const badgeStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.muted,
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  }),
});

export const badgeTextStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    fontWeight: '500',
    color: colors.mutedForeground,
  }),
});

// Static layout styles (not themed)
export const layoutStyles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});