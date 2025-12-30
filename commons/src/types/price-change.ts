/**
 * Price Change Type Definitions
 *
 * SOLID Compliance:
 * - SRP: Only price change related types
 * - OCP: Extend via new detection types, not modifying existing
 */

// ============================================================================
// PRICE HISTORY TYPES
// ============================================================================

/**
 * A single price point in history
 */
export interface PriceHistory {
  price: number;
  date: string; // ISO date string
  currency: string;
  source: PriceSource;
}

/**
 * How the price was detected
 */
export type PriceSource =
  | 'transaction' // From actual charge
  | 'manual' // User entered
  | 'detected' // Auto-detected from email/notification
  | 'api'; // From merchant API

// ============================================================================
// PRICE CHANGE EVENT TYPES
// ============================================================================

/**
 * A detected price change event
 */
export interface PriceChangeEvent {
  id: string;
  subscriptionId: string;
  subscriptionName: string;
  previousPrice: number;
  newPrice: number;
  currency: string;
  changePercent: number;
  changeDirection: PriceChangeDirection;
  detectedAt: Date;
  source: PriceSource;
}

/**
 * Direction of price change
 */
export type PriceChangeDirection = 'increase' | 'decrease' | 'unchanged';

// ============================================================================
// HEALTH STATUS TYPES
// ============================================================================

/**
 * Subscription health status
 */
export type HealthStatus =
  | 'healthy' // All good, active usage
  | 'forgotten' // Not used in 90+ days
  | 'price-increased' // Price went up
  | 'expiring-soon' // About to expire
  | 'attention-needed'; // Requires user action

/**
 * Health status details
 */
export interface HealthStatusInfo {
  status: HealthStatus;
  label: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  suggestedAction?: string;
}

/**
 * Health status configuration for calculations
 */
export interface HealthStatusConfig {
  forgottenDays: number; // Days of inactivity to mark as forgotten (default: 90)
  priceIncreaseThreshold: number; // Percentage increase to flag (default: 0)
  expiringDays: number; // Days before expiry to warn (default: 30)
}

/**
 * Default health status configuration
 */
export const DEFAULT_HEALTH_CONFIG: HealthStatusConfig = {
  forgottenDays: 90,
  priceIncreaseThreshold: 0,
  expiringDays: 30,
};

// ============================================================================
// PROTECTION STATUS TYPES
// ============================================================================

/**
 * Protection status for a subscription
 */
export interface ProtectionStatus {
  isProtected: boolean;
  activeCardCount: number;
  cardIds: string[];
  message: string;
}
