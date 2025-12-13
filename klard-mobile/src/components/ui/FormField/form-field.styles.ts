import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const labelStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    fontWeight: '500',
    color: colors.mutedForeground,
  }),
});

export const requiredStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.error,
  }),
});

export const errorStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.error,
  }),
});

export const helperStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.textSecondary,
  }),
});

// Static layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
