import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Default confetti colors as fallback when CSS variables are not available
 * (e.g., during SSR or when document is not ready)
 */
const DEFAULT_CONFETTI_COLORS = {
  primary: '#0D7C7A',
  secondary: '#15B5B0',
  success: '#059669',
  gold: '#FFD700',
};

/**
 * Get theme-aware confetti colors from CSS variables.
 * Falls back to default light theme colors if CSS variables are unavailable.
 *
 * @returns Array of hex color strings for confetti
 */
export function getConfettiColors(): string[] {
  if (typeof document === 'undefined') {
    return [
      DEFAULT_CONFETTI_COLORS.primary,
      DEFAULT_CONFETTI_COLORS.secondary,
      DEFAULT_CONFETTI_COLORS.success,
      DEFAULT_CONFETTI_COLORS.gold,
    ];
  }

  const style = getComputedStyle(document.documentElement);

  const primary = style.getPropertyValue('--rec-color-primary').trim() || DEFAULT_CONFETTI_COLORS.primary;
  const secondary = style.getPropertyValue('--rec-color-secondary').trim() || DEFAULT_CONFETTI_COLORS.secondary;
  const success = style.getPropertyValue('--rec-color-success').trim() || DEFAULT_CONFETTI_COLORS.success;

  return [primary, secondary, success, DEFAULT_CONFETTI_COLORS.gold];
}
