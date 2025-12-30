import { StyleSheet, Platform } from 'react-native';

import { sva } from '@/styles/sva';
import { Colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing, borderRadius } from '@/styles/spacing';

/**
 * EmptyState Styles
 *
 * Provides 3 distinct variant tones with glassmorphism styling.
 *
 * SOLID Compliance:
 * - SRP: Only handles empty state styling
 * - OCP: Extend via variants without modifying existing
 * - DIP: Uses color abstractions
 */

export const containerStyles = sva({
  base: (colors) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    // Glassmorphism effect
    backgroundColor: colors.glassBackground,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    // Shadow
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
    variant: {
      /** Educational/onboarding tone - welcoming first-time users */
      'first-time': (colors) => ({
        borderColor: colors.primaryBorder,
        backgroundColor: colors.primaryBackground,
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
            }
          : {
              elevation: 6,
            }),
      }),
      /** Celebratory tone - all items completed/cleared */
      cleared: (colors) => ({
        borderColor: colors.successBorder,
        backgroundColor: colors.successBackground,
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: colors.success,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 16,
            }
          : {
              elevation: 6,
            }),
      }),
      /** Recovery-focused tone - error state with action needed */
      error: (colors) => ({
        borderColor: colors.errorBorder,
        backgroundColor: colors.errorBackground,
        ...(Platform.OS === 'ios'
          ? {
              shadowColor: colors.error,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
            }
          : {
              elevation: 6,
            }),
      }),
      /** Default variant - no specific tone */
      default: {},
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const illustrationStyles = sva({
  base: () => ({
    width: 160,
    height: 160,
    marginBottom: spacing.lg,
  }),
});

export const iconContainerStyles = sva({
  base: (colors) => ({
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  }),
  variants: {
    variant: {
      'first-time': (colors) => ({
        backgroundColor: colors.primaryBackground,
      }),
      cleared: (colors) => ({
        backgroundColor: colors.successBackground,
      }),
      error: (colors) => ({
        backgroundColor: colors.errorBackground,
      }),
      default: (colors) => ({
        backgroundColor: colors.muted,
      }),
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const titleStyles = sva({
  base: (colors) => ({
    ...typography.h3,
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: spacing.sm,
  }),
});

export const descriptionStyles = sva({
  base: (colors) => ({
    ...typography.body,
    color: colors.mutedForeground,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.md,
  }),
});

export const actionsStyles = sva({
  base: () => ({
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  }),
});

// Static layout styles (theme-independent)
export const layoutStyles = StyleSheet.create({
  illustration: {
    width: 160,
    height: 160,
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
});

// Legacy static styles for backward compatibility
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  illustration: {
    width: 160,
    height: 160,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: Colors.light.foreground,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: Colors.light.mutedForeground,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
});

export type EmptyStateVariant = 'first-time' | 'cleared' | 'error' | 'default';