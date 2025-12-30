import { sva } from '@/styles/sva';
import { StyleSheet, Platform } from 'react-native';

/**
 * BlockCelebration Styles
 *
 * Celebration card for blocked charges with level-based glow effects.
 *
 * SOLID Compliance:
 * - SRP: Only handles celebration card styling
 * - OCP: Extend via variants without modifying existing
 * - DIP: Uses color abstractions
 */

export const containerStyles = sva({
  base: (colors) => ({
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderRadius: 16,
    // Glassmorphism effect
    backgroundColor: colors.cardGlass ?? colors.card,
    borderWidth: 1,
    borderColor: colors.glassBorder ?? colors.border,
    // Base shadow
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        }
      : {
          elevation: 4,
        }),
  }),
  variants: {
    level: {
      first: (colors) => ({
        borderColor: colors.successBorder ?? `${colors.success}80`,
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: colors.success,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 24,
            }
          : {
              elevation: 8,
            }),
      }),
      milestone: (colors) => ({
        borderColor: colors.successBorder ?? `${colors.success}66`,
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: colors.success,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 18,
            }
          : {
              elevation: 6,
            }),
      }),
      streak: (colors) => ({
        borderColor: colors.primaryBorder ?? `${colors.primary}66`,
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 14,
            }
          : {
              elevation: 5,
            }),
      }),
      subtle: (colors) => ({
        borderColor: colors.glassBorder ?? colors.border,
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: '#0F172A',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
            }
          : {
              elevation: 4,
            }),
      }),
    },
  },
  defaultVariants: {
    level: 'first',
  },
});

/**
 * Amount display styling
 */
export const amountStyles = sva({
  base: (colors) => ({
    fontWeight: '700',
    letterSpacing: -1,
    color: colors.success,
  }),
  variants: {
    size: {
      default: {
        fontSize: 48,
        lineHeight: 56,
      },
      compact: {
        fontSize: 32,
        lineHeight: 40,
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * Merchant display styling
 */
export const merchantStyles = sva({
  base: (colors) => ({
    fontSize: 18,
    fontWeight: '500',
    color: colors.foreground,
  }),
  variants: {
    anonymized: {
      true: (colors) => ({
        color: colors.mutedForeground,
        fontStyle: 'italic',
      }),
    },
  },
});

/**
 * ShareZone styling - area for screenshot capture
 */
export const shareZoneStyles = sva({
  base: (colors) => ({
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.successBackground ?? `${colors.success}0D`, // 5% opacity
    borderWidth: 1,
    borderColor: colors.successBorder ?? `${colors.success}33`, // 20% opacity
  }),
});

/**
 * ShareButton styling
 */
export const shareButtonStyles = sva({
  base: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.success,
  }),
  variants: {
    pressed: {
      true: (colors) => ({
        backgroundColor: colors.successForeground ? colors.success : `${colors.success}E6`,
        opacity: 0.9,
      }),
    },
  },
});

export const shareButtonTextStyles = sva({
  base: () => ({
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  }),
});

// Static layout styles
export const layoutStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  screenReaderOnly: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
  },
});