import { sva } from '@/styles/sva';

/**
 * InputField SVA styles
 *
 * Uses theme colors via SVA for proper light/dark mode support.
 * All color values come from the theme system rather than hardcoded constants.
 */

export const containerStyles = sva({
  base: {
    width: '100%',
  },
});

export const labelStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  }),
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

export const requiredStyles = sva({
  base: (colors) => ({
    color: colors.error,
  }),
});

export const inputContainerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    // Glassmorphic background
    backgroundColor: colors.glassBackground,
    borderRadius: 8,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
  }),
  variants: {
    focused: {
      true: (colors) => ({
        borderWidth: 2,
        borderColor: colors.primary,
        // Glow effect on focus
        shadowColor: colors.glowPrimary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 3,
      }),
    },
    error: {
      true: (colors) => ({
        borderColor: colors.error,
      }),
    },
    disabled: {
      true: (colors) => ({
        backgroundColor: colors.disabledBackground,
        opacity: 0.7,
      }),
    },
  },
});

export const inputStyles = sva({
  base: (colors) => ({
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.foreground,
  }),
  variants: {
    withLeftIcon: {
      true: {
        paddingLeft: 8,
      },
    },
    withRightIcon: {
      true: {
        paddingRight: 8,
      },
    },
    disabled: {
      true: (colors) => ({
        color: colors.textDisabled,
      }),
    },
  },
});

export const iconContainerStyles = sva({
  variants: {
    position: {
      left: {
        paddingLeft: 12,
      },
      right: {
        paddingRight: 12,
      },
    },
  },
});

export const rightActionButtonStyles = sva({
  base: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const errorTextStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  }),
});

export const helperTextStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  }),
});
