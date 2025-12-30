import { sva } from '@/styles/sva';

export const confirmButtonContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  variants: {},
});

export const confirmButtonTextStyles = sva({
  base: {
    fontSize: 14,
    fontWeight: '500',
  },
  variants: {
    variant: {
      destructive: (colors) => ({
        color: colors.mutedForeground,
      }),
      warning: (colors) => ({
        color: colors.mutedForeground,
      }),
    },
  },
  defaultVariants: {
    variant: 'destructive',
  },
});

export const actionButtonContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  variants: {
    type: {
      confirm: (colors) => ({
        backgroundColor: colors.destructive,
      }),
      cancel: (colors) => ({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
      }),
    },
    pressed: {
      true: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
      },
    },
    variant: {
      destructive: (colors) => ({
        backgroundColor: colors.destructive,
      }),
      warning: (colors) => ({
        backgroundColor: colors.warning,
      }),
    },
  },
  compoundVariants: [
    {
      type: 'confirm',
      variant: 'destructive',
      style: (colors) => ({
        backgroundColor: colors.destructive,
      }),
    },
    {
      type: 'confirm',
      variant: 'warning',
      style: (colors) => ({
        backgroundColor: colors.warning,
      }),
    },
  ],
  defaultVariants: {
    type: 'confirm',
    variant: 'destructive',
  },
});

export const actionButtonTextStyles = sva({
  base: {
    fontSize: 12,
    fontWeight: '600',
  },
  variants: {
    type: {
      confirm: (colors) => ({
        color: colors.primaryForeground,
      }),
      cancel: (colors) => ({
        color: colors.foreground,
      }),
    },
  },
  defaultVariants: {
    type: 'confirm',
  },
});
