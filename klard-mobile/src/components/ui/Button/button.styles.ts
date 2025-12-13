import { sva } from '@/styles/sva';

export const buttonContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
  },
  variants: {
    variant: {
      primary: (colors) => ({
        backgroundColor: colors.primary,
        shadowColor: colors.glowPrimary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
      }),
      secondary: (colors) => ({
        backgroundColor: colors.secondary,
      }),
      outline: (colors) => ({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
      }),
      ghost: {
        backgroundColor: 'transparent',
      },
      destructive: (colors) => ({
        backgroundColor: colors.destructive,
      }),
      link: {
        backgroundColor: 'transparent',
      },
    },
    size: {
      sm: {
        height: 32,
        paddingHorizontal: 12,
      },
      md: {
        height: 40,
        paddingHorizontal: 16,
      },
      lg: {
        height: 48,
        paddingHorizontal: 24,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    pressed: {
      true: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export const buttonTextStyles = sva({
  base: {
    fontWeight: '600',
  },
  variants: {
    variant: {
      primary: (colors) => ({
        color: colors.primaryForeground,
      }),
      secondary: (colors) => ({
        color: colors.secondaryForeground,
      }),
      outline: (colors) => ({
        color: colors.foreground,
      }),
      ghost: (colors) => ({
        color: colors.foreground,
      }),
      destructive: (colors) => ({
        color: colors.destructiveForeground,
      }),
      link: (colors) => ({
        color: colors.primary,
        textDecorationLine: 'underline',
      }),
    },
    size: {
      sm: {
        fontSize: 12,
      },
      md: {
        fontSize: 14,
      },
      lg: {
        fontSize: 16,
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});