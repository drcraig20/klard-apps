/**
 * useProtectionStatus Hook
 *
 * Calculates protection status based on active cards.
 *
 * SOLID Compliance:
 * - SRP: Only handles protection status calculation
 * - DIP: Depends on ICard abstraction, not concrete BurnerCard
 */

import type { ICard } from '../types/card';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Configuration for protection status calculation
 * DIP: Uses readonly ICard abstraction, not concrete types
 */
export interface ProtectionConfig {
  /** Cards to analyze (depends on ICard abstraction) */
  readonly cards: readonly ICard[];
}

/**
 * Result of protection status calculation
 */
export interface ProtectionResult {
  /** Number of active cards */
  activeCount: number;
  /** Formatted message describing protection status */
  message: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ACTIVE_STATUS = 'active';

// ============================================================================
// IMPLEMENTATION
// ============================================================================

/**
 * Calculates protection status based on active card count.
 *
 * Rules:
 * - Count cards where status === 'active' (exact match, case-sensitive)
 * - Message format: `${count} card${count === 1 ? '' : 's'} watching`
 *
 * @param config - Protection configuration with cards array
 * @returns Object containing activeCount and formatted message
 */
export function useProtectionStatus(config: ProtectionConfig): ProtectionResult {
  const { cards } = config;

  // Count active cards (DIP: works with any ICard implementation)
  const activeCount = cards.filter((card) => card.status === ACTIVE_STATUS).length;

  // Format message with proper pluralization
  const cardWord = activeCount === 1 ? 'card' : 'cards';
  const message = `${activeCount} ${cardWord} watching`;

  return {
    activeCount,
    message,
  };
}
