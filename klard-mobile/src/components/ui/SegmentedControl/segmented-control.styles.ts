import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const containerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    backgroundColor: colors.muted,
    borderRadius: 8,
    padding: 2,
  }),
  variants: {
    size: {
      sm: { height: 32 },
      md: { height: 40 },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const segmentStyles = sva({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    gap: 4,
  },
  variants: {
    size: {
      sm: { paddingHorizontal: 8, paddingVertical: 4 },
      md: { paddingHorizontal: 12, paddingVertical: 6 },
    },
    selected: {
      true: (colors) => ({
        backgroundColor: colors.card,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }),
    },
    pressed: {
      true: { opacity: 0.7 },
    },
    disabled: {
      true: { opacity: 0.5 },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const labelStyles = sva({
  base: (colors) => ({
    fontWeight: '500',
    color: colors.mutedForeground,
  }),
  variants: {
    size: {
      sm: { fontSize: 13 },
      md: { fontSize: 14 },
    },
    selected: {
      true: (colors) => ({ color: colors.primary }),
    },
    disabled: {
      true: (colors) => ({ color: colors.textDisabled }),
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Static layout styles
export const layoutStyles = StyleSheet.create({
  fullWidth: {
    alignSelf: 'stretch',
  },
  segmentFullWidth: {
    flex: 1,
  },
  iconContainer: {
    flexShrink: 0,
  },
});
