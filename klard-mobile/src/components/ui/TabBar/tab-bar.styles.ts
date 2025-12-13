import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const tabContainerStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  variants: {
    state: {
      default: {
        backgroundColor: 'transparent',
      },
      active: (colors) => ({
        backgroundColor: colors.activeBackground,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
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
    gap: 8,
  },
  iconContainer: {
    marginRight: 4,
  },
});