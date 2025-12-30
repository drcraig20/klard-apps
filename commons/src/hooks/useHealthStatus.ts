/**
 * useHealthStatus Hook
 *
 * Determines subscription health status based on login activity and price changes.
 *
 * SOLID Compliance:
 * - SRP: Only handles health status calculation
 * - OCP: Thresholds are configurable via config parameter
 * - DIP: Uses HealthStatus and PriceHistory types from types module
 */

import type { HealthStatus, PriceHistory } from '../types/price-change';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Configurable thresholds for health status detection
 */
export interface HealthStatusThresholds {
  /** Days of inactivity to mark as forgotten (default: 90) */
  forgottenDays: number;
  /** Percentage increase threshold to flag price increase (default: 0) */
  priceIncreaseThreshold: number;
}

/**
 * Input configuration for health status calculation
 * Named 'Input' to avoid conflict with HealthStatusConfig from types
 */
export interface HealthStatusInput {
  /** Date of the last user login */
  lastLogin: Date;
  /** Price history for comparison */
  priceHistory: PriceHistory[];
  /** Custom thresholds (OCP: extend behavior via config) */
  config?: Partial<HealthStatusThresholds>;
}

/**
 * Result of health status calculation
 */
export interface HealthStatusResult {
  status: HealthStatus;
  label: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_THRESHOLDS: HealthStatusThresholds = {
  forgottenDays: 90,
  priceIncreaseThreshold: 0,
};

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

// ============================================================================
// IMPLEMENTATION
// ============================================================================

/**
 * Calculates health status based on login activity and price history.
 *
 * Rules (in priority order):
 * 1. 90+ days since lastLogin → 'forgotten', 'Forgotten?'
 * 2. Price increased → 'price-increased', 'Price went up'
 * 3. Otherwise → 'healthy', 'All good'
 *
 * @param config - Health status configuration
 * @returns Object containing status and label
 */
export function useHealthStatus(config: HealthStatusInput): HealthStatusResult {
  const { lastLogin, priceHistory, config: thresholdConfig } = config;

  // Merge with defaults (OCP: custom thresholds extend behavior)
  const mergedThresholds: HealthStatusThresholds = {
    ...DEFAULT_THRESHOLDS,
    ...thresholdConfig,
  };

  // Rule 1: Check for forgotten status (90+ days since login)
  const daysSinceLogin = calculateDaysSince(lastLogin);
  if (daysSinceLogin >= mergedThresholds.forgottenDays) {
    return {
      status: 'forgotten',
      label: 'Forgotten?',
    };
  }

  // Rule 2: Check for price increase
  if (hasPriceIncreased(priceHistory, mergedThresholds.priceIncreaseThreshold)) {
    return {
      status: 'price-increased',
      label: 'Price went up',
    };
  }

  // Rule 3: Default to healthy
  return {
    status: 'healthy',
    label: 'All good',
  };
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculates the number of days since a given date
 */
function calculateDaysSince(date: Date): number {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / MILLISECONDS_PER_DAY);
}

/**
 * Checks if price has increased based on history
 */
function hasPriceIncreased(
  priceHistory: PriceHistory[],
  thresholdPercent: number
): boolean {
  // Need at least 2 entries to compare
  if (priceHistory.length < 2) {
    return false;
  }

  // Compare the last two entries (most recent vs previous)
  const previousPrice = priceHistory[priceHistory.length - 2].price;
  const currentPrice = priceHistory[priceHistory.length - 1].price;

  // If threshold is 0, any increase counts
  if (thresholdPercent === 0) {
    return currentPrice > previousPrice;
  }

  // Otherwise check if increase exceeds threshold percentage
  const increasePercent = ((currentPrice - previousPrice) / previousPrice) * 100;
  return increasePercent >= thresholdPercent;
}
