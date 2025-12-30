import { sva } from '@/styles/sva';
import { StyleSheet } from 'react-native';

/**
 * Container styles for KYC activation prompt with variant support
 */
export const containerStyles = sva({
  base: (colors) => ({
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  }),
  variants: {
    variant: {
      inline: (colors) => ({
        padding: 24,
        borderRadius: 12,
        backgroundColor: colors.primaryBackground,
        borderWidth: 1,
        borderColor: colors.primaryBorder,
        // Glassmorphism shadow
        shadowColor: colors.glowPrimary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
      }),
      modal: (colors) => ({
        padding: 32,
        borderRadius: 16,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
      }),
      'card-overlay': (colors) => ({
        ...StyleSheet.absoluteFillObject,
        padding: 16,
        borderRadius: 12,
        backgroundColor: colors.overlay,
        zIndex: 10,
      }),
    },
  },
  defaultVariants: {
    variant: 'inline',
  },
});

/**
 * Icon container styles with teal glow
 */
export const iconContainerStyles = sva({
  base: (colors) => ({
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    // Glow effect
    shadowColor: colors.glowPrimary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
  }),
});

/**
 * Title text styles
 */
export const titleStyles = sva({
  base: (colors) => ({
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    textAlign: 'center',
  }),
});

/**
 * Description text styles
 */
export const descriptionStyles = sva({
  base: (colors) => ({
    fontSize: 14,
    color: colors.mutedForeground,
    textAlign: 'center',
    maxWidth: 280,
  }),
});

/**
 * Button styles for small variant
 */
export const buttonContainerStyles = sva({
  base: () => ({
    marginTop: 8,
  }),
});

// Static layout styles
export const layoutStyles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});