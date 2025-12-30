import { sva } from '@/styles/sva';

/**
 * FAB (Floating Action Button) container styles
 *
 * Standard FAB: 56dp circle
 * Extended FAB: Auto-width with horizontal padding
 */
export const fabContainerStyles = sva({
  base: (colors) => ({
    position: 'absolute',
    minWidth: 56,
    minHeight: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  }),
  variants: {
    position: {
      'bottom-right': {
        bottom: 24,
        right: 24,
      },
      'bottom-center': {
        bottom: 24,
        left: '50%',
        // Note: React Native doesn't support CSS transforms with % in translateX
        // Parent container should handle centering or use flexbox
      },
    },
    extended: {
      true: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 8,
      },
      false: {
        width: 56,
        height: 56,
      },
    },
    pressed: {
      true: (colors) => ({
        opacity: 0.9,
        transform: [{ scale: 0.96 }],
        backgroundColor: colors.primaryPressed,
      }),
    },
  },
  defaultVariants: {
    position: 'bottom-right',
    extended: 'false',
  },
});

/**
 * FAB label text styles (for extended FAB)
 */
export const fabLabelStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryForeground,
  }),
});