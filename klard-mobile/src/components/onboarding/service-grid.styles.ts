import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const searchInputStyles = sva({
  base: (colors) => ({
    backgroundColor: colors.glassBackground,
    borderRadius: 12,
    padding: 16,
    color: colors.foreground,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  }),
});

export const chipStyles = sva({
  base: (colors) => ({
    width: '23%' as unknown as number, // ~4 per row with gaps
    minHeight: 44,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: colors.glassBackground,
    borderColor: colors.border,
  }),
  variants: {
    selected: {
      true: (colors) => ({
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      }),
    },
    pressed: {
      true: { opacity: 0.7 },
    },
  },
});

export const chipTextStyles = sva({
  base: (colors) => ({
    fontSize: 12,
    textAlign: 'center',
    color: colors.foreground,
  }),
  variants: {
    selected: {
      true: (colors) => ({ color: colors.primaryForeground }),
    },
  },
});

// Static layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 12,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
});