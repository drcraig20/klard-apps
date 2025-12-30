import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

export const containerStyles = sva({
  base: (colors) => ({
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 12,
    borderRadius: 12,
    // Success green glow via shadow
    shadowColor: colors.glowSuccess,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  }),
});

export const labelStyles = sva({
  base: (colors) => ({
    color: colors.mutedForeground,
    fontWeight: '500',
    textAlign: 'center',
  }),
});

export const amountStyles = sva({
  base: (colors) => ({
    color: colors.success,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
  }),
});

// Size configuration
export const sizeConfig = {
  sm: {
    labelFontSize: 12,
    amountFontSize: 20,
    padding: 8,
  },
  md: {
    labelFontSize: 14,
    amountFontSize: 28,
    padding: 12,
  },
  lg: {
    labelFontSize: 16,
    amountFontSize: 40,
    padding: 16,
  },
} as const;

// Static layout styles
export const layoutStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
});
