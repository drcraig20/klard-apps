/**
 * useCelebration Hook
 *
 * Determines celebration intensity based on block events and milestones.
 *
 * SOLID Compliance:
 * - SRP: Only handles celebration intensity calculation
 * - OCP: Thresholds are configurable via config parameter
 * - DIP: Uses CelebrationIntensity type from types module
 */

import type { CelebrationIntensity } from '../types/block-event';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Configurable thresholds for milestone detection
 */
export interface CelebrationThresholds {
  /** Savings milestone threshold (default: 100) */
  savingsMilestone: number;
  /** Block count milestone threshold (default: 10) */
  blockMilestone: number;
}

/**
 * Configuration for celebration intensity calculation
 */
export interface CelebrationConfig {
  /** Current number of blocks */
  blockCount: number;
  /** Total amount saved */
  totalSaved: number;
  /** User's preferred celebration intensity */
  userPreference?: CelebrationIntensity;
  /** Custom milestone thresholds (OCP: extend behavior via config) */
  thresholds?: Partial<CelebrationThresholds>;
}

/**
 * Result of celebration intensity calculation
 */
export interface CelebrationResult {
  intensity: CelebrationIntensity;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_THRESHOLDS: CelebrationThresholds = {
  savingsMilestone: 100,
  blockMilestone: 10,
};

// ============================================================================
// IMPLEMENTATION
// ============================================================================

/**
 * Calculates celebration intensity based on block events and user preferences.
 *
 * Rules (in priority order):
 * 1. userPreference === 'off' → 'off' (overrides everything)
 * 2. First block (blockCount === 0) → 'full'
 * 3. Savings milestone (totalSaved % savingsMilestone === 0) → 'full'
 * 4. Block milestone (blockCount % blockMilestone === 0) → 'full'
 * 5. Otherwise → userPreference || 'subtle'
 *
 * @param config - Celebration configuration
 * @returns Object containing the calculated intensity
 */
export function useCelebration(config: CelebrationConfig): CelebrationResult {
  const { blockCount, totalSaved, userPreference, thresholds } = config;

  // Merge with defaults (OCP: custom thresholds extend behavior)
  const mergedThresholds: CelebrationThresholds = {
    ...DEFAULT_THRESHOLDS,
    ...thresholds,
  };

  // Rule 1: User preference 'off' overrides everything
  if (userPreference === 'off') {
    return { intensity: 'off' };
  }

  // Rule 2: First block always gets full celebration
  if (blockCount === 0) {
    return { intensity: 'full' };
  }

  // Rule 3: Savings milestone check
  const isSavingsMilestone =
    totalSaved > 0 &&
    Number.isInteger(totalSaved) &&
    totalSaved % mergedThresholds.savingsMilestone === 0;

  // Rule 4: Block count milestone check
  const isBlockMilestone =
    blockCount > 0 && blockCount % mergedThresholds.blockMilestone === 0;

  // Return full for any milestone
  if (isSavingsMilestone || isBlockMilestone) {
    return { intensity: 'full' };
  }

  // Rule 5: Default to user preference or subtle
  return { intensity: userPreference || 'subtle' };
}
