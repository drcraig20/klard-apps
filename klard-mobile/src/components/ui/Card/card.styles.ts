import { sva } from '@/styles/sva';

export const cardStyles = sva({
  base: {
    borderRadius: 12,
  },
  variants: {
    variant: {
      default: (colors) => ({
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }),
      elevated: (colors) => ({
        backgroundColor: colors.card,
        borderWidth: 0,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 4,
      }),
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
      interactive: (colors) => ({
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.shadowColorSm,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 2,
      }),
      // Glassmorphic variant with blur effect (requires BlurView wrapper)
      glass: (colors) => ({
        backgroundColor: colors.glassBackground,
        borderWidth: 1,
        borderColor: colors.glassBorder,
        shadowColor: colors.shadowColorMd,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
      }),
    },
    padding: {
      none: { padding: 0 },
      sm: { padding: 12 },
      md: { padding: 16 },
      lg: { padding: 24 },
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

// Static styles (non-themed)
export const staticStyles = {
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
} as const;