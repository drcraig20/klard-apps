/**
 * Formatting Utilities
 * Shared string formatting functions
 *
 * SRP: Single responsibility - format strings for display
 */

import type { SubscriptionCategory } from '../types/subscription';

/**
 * Formats a subscription category for display
 * Converts snake_case to Title Case
 *
 * @example formatCategoryLabel('health_fitness') => 'Health Fitness'
 */
export function formatCategoryLabel(category: SubscriptionCategory): string {
  return category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Formats a category for uppercase display (mobile style)
 *
 * @example formatCategoryUppercase('health_fitness') => 'HEALTH FITNESS'
 */
export function formatCategoryUppercase(category: SubscriptionCategory): string {
  return category.replace(/_/g, ' ').toUpperCase();
}

/**
 * Formats a number as currency
 * Uses Intl.NumberFormat for localization support
 *
 * @example formatCurrency(1234.56) => '$1,234.56'
 * @example formatCurrency(99.99, 'EUR') => '€99.99'
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
