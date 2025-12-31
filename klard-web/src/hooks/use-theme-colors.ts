'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Theme color values extracted from CSS custom properties.
 * Used for SVG elements that cannot directly use CSS variables.
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  error: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  surface: string;
}

/**
 * Default fallback colors (light theme values).
 * Used during SSR or before CSS variables are available.
 */
const DEFAULT_COLORS: ThemeColors = {
  primary: '#0d7c7a',
  secondary: '#15b5b0',
  success: '#059669',
  error: '#dc2626',
  background: '#ffffff',
  foreground: '#0f172a',
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  card: '#ffffff',
  surface: 'rgba(255, 255, 255, 0.8)',
};

/**
 * Hook that extracts CSS custom property values for use in SVG elements.
 *
 * SVG elements don't always support CSS variables directly (especially in gradients),
 * so this hook reads the computed values and provides them as regular color strings.
 *
 * @returns Theme color values that automatically update when theme changes.
 *
 * @example
 * ```tsx
 * function MyIllustration() {
 *   const colors = useThemeColors();
 *   return (
 *     <svg>
 *       <circle fill={colors.primary} />
 *     </svg>
 *   );
 * }
 * ```
 */
export function useThemeColors(): ThemeColors {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState<ThemeColors>(DEFAULT_COLORS);

  useEffect(() => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const style = getComputedStyle(root);

    const getVar = (name: string, fallback: string): string => {
      const value = style.getPropertyValue(name).trim();
      return value || fallback;
    };

    setColors({
      primary: getVar('--rec-color-primary', DEFAULT_COLORS.primary),
      secondary: getVar('--rec-color-secondary', DEFAULT_COLORS.secondary),
      success: getVar('--rec-color-success', DEFAULT_COLORS.success),
      error: getVar('--rec-color-error', DEFAULT_COLORS.error),
      background: getVar('--rec-color-background', DEFAULT_COLORS.background),
      foreground: getVar('--rec-color-foreground', DEFAULT_COLORS.foreground),
      muted: getVar('--rec-color-muted', DEFAULT_COLORS.muted),
      mutedForeground: getVar('--rec-color-muted-foreground', DEFAULT_COLORS.mutedForeground),
      card: getVar('--rec-color-card', DEFAULT_COLORS.card),
      surface: getVar('--rec-color-surface', DEFAULT_COLORS.surface),
    });
  }, [resolvedTheme]);

  return colors;
}
