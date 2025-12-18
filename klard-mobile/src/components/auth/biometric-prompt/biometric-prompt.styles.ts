import { sva } from '@/styles/sva';

/**
 * BiometricPrompt component styles
 * Follows SVA pattern with light/dark theme support
 */

export const containerStyles = sva({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});

export const iconContainerStyles = sva({
  base: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  variants: {
    variant: {
      default: (colors) => ({
        backgroundColor: colors.primaryBackground,
        borderWidth: 2,
        borderColor: colors.primaryBorder,
      }),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const iconStyles = sva({
  base: {
    width: 40,
    height: 40,
  },
  variants: {
    variant: {
      default: (colors) => ({
        color: colors.primary,
      }),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const titleStyles = sva({
  base: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  variants: {
    variant: {
      default: (colors) => ({
        color: colors.foreground,
      }),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const descriptionStyles = sva({
  base: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  variants: {
    variant: {
      default: (colors) => ({
        color: colors.mutedForeground,
      }),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const buttonContainerStyles = sva({
  base: {
    width: '100%',
  },
});
