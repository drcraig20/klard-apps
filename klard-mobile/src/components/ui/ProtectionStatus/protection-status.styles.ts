import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const containerStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.primaryBackground,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    // Teal glow effect
    shadowColor: colors.glowPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  }),
});

export const textStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  }),
});

export const iconStyles = sva({
  base: (colors) => ({
    color: colors.primary,
  }),
});

export const pulseIndicatorStyles = sva({
  base: (colors) => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  }),
});

// Static layout styles
export const layoutStyles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
});
