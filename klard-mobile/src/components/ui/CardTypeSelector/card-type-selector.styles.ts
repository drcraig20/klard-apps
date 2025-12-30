import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

/**
 * Container styles for the card type selector grid
 */
export const containerStyles = sva({
  base: {
    gap: 12,
  },
  variants: {
    columns: {
      2: {},
      4: {},
    },
  },
  defaultVariants: {
    columns: 2,
  },
});

/**
 * Row styles for grouping options
 */
export const rowStyles = sva({
  base: {
    flexDirection: 'row',
    gap: 12,
  },
});

/**
 * Card option styles with selection and recommendation states
 */
export const optionStyles = sva({
  base: (colors) => ({
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  }),
  variants: {
    selected: {
      true: (colors) => ({
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: colors.primaryBackground,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      }),
    },
    pressed: {
      true: { opacity: 0.9 },
    },
  },
});

/**
 * Icon container styles
 */
export const iconContainerStyles = sva({
  base: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    selected: {
      true: (colors) => ({
        backgroundColor: colors.primary,
      }),
      false: (colors) => ({
        backgroundColor: colors.muted,
      }),
    },
  },
  defaultVariants: {
    selected: 'false',
  },
});

/**
 * Icon color styles
 */
export const iconColorStyles = sva({
  base: {},
  variants: {
    selected: {
      true: (colors) => ({
        color: colors.primaryForeground,
      }),
      false: (colors) => ({
        color: colors.mutedForeground,
      }),
    },
  },
  defaultVariants: {
    selected: 'false',
  },
});

/**
 * Label text styles
 */
export const labelStyles = sva({
  base: {
    fontSize: 14,
    fontWeight: '600',
  },
  variants: {
    selected: {
      true: (colors) => ({
        color: colors.primary,
      }),
      false: (colors) => ({
        color: colors.foreground,
      }),
    },
  },
  defaultVariants: {
    selected: 'false',
  },
});

/**
 * Description text styles
 */
export const descriptionStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    lineHeight: 16,
    color: colors.mutedForeground,
  }),
});

/**
 * Recommended badge styles
 */
export const recommendedBadgeStyles = sva({
  base: (colors) => ({
    position: 'absolute',
    top: -8,
    right: -8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: colors.primary,
  }),
});

export const recommendedBadgeTextStyles = sva({
  base: (colors) => ({
    fontSize: 10,
    fontWeight: '500',
    color: colors.primaryForeground,
  }),
});

/**
 * Static layout styles
 */
export const layoutStyles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
});