/**
 * Card Type Definitions
 *
 * SOLID Compliance:
 * - SRP: Only card-related type definitions
 * - OCP: Extend via new types, not modifying existing
 * - LSP: BurnerCard extends ICard, fully substitutable
 * - DIP: Components depend on ICard abstraction
 */

// ============================================================================
// BASE CARD INTERFACE (Abstraction for DIP)
// ============================================================================

/**
 * Abstract base interface for all card types.
 * Components should depend on this abstraction, not concrete types.
 */
export interface ICard {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly createdAt: Date;
}

// ============================================================================
// BURNER CARD TYPES
// ============================================================================

/**
 * Burner card status values
 */
export type BurnerCardStatus =
  | 'active' // Card is active and ready to use
  | 'locked' // Card is temporarily locked by user
  | 'awaiting' // Awaiting KYC activation
  | 'expired' // Card has expired
  | 'burned'; // Card has been permanently destroyed

/**
 * Burner card type variants
 */
export type BurnerCardType =
  | 'one-time' // Single use, auto-burns after first charge
  | 'recurring' // For subscriptions, allows multiple charges
  | 'category-locked' // Restricted to specific merchant categories
  | 'merchant-locked'; // Restricted to specific merchant

/**
 * Concrete burner card type extending ICard.
 * Full card representation with all properties.
 */
export interface BurnerCard extends ICard {
  type: BurnerCardType;
  status: BurnerCardStatus;
  maskedPan: string; // e.g., "**** **** **** 1234"
  expiryMonth: number;
  expiryYear: number;
  spendingLimit?: number;
  linkedSubscriptionId?: string;
  linkedMerchantId?: string;
  totalSpent: number;
  blockCount: number;
  activatedAt?: Date;
  lastUsedAt?: Date;
}

/**
 * Minimal card representation for lists and summaries
 */
export interface BurnerCardSummary {
  id: string;
  name: string;
  type: BurnerCardType;
  status: BurnerCardStatus;
  maskedPan: string;
  blockCount: number;
}

/**
 * Card creation input
 */
export interface CreateBurnerCardInput {
  name: string;
  type: BurnerCardType;
  spendingLimit?: number;
  linkedSubscriptionId?: string;
  linkedMerchantId?: string;
}

// ============================================================================
// CARD ACTION TYPES
// ============================================================================

/**
 * Actions that can be performed on a card
 */
export type CardAction =
  | 'lock'
  | 'unlock'
  | 'burn'
  | 'copy-number'
  | 'view-details'
  | 'edit-limit';

/**
 * Card lock reasons
 */
export type CardLockReason =
  | 'user-requested'
  | 'suspicious-activity'
  | 'limit-exceeded'
  | 'auto-lock';
