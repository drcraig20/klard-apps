/**
 * Block Event Type Definitions
 *
 * SOLID Compliance:
 * - SRP: Only block event related types
 * - OCP: Extend via new event types, not modifying existing
 */

// ============================================================================
// BLOCK EVENT TYPES
// ============================================================================

/**
 * Reasons why a charge was blocked
 */
export type BlockReason =
  | 'limit-exceeded' // Charge amount exceeds card limit
  | 'card-locked' // Card is locked by user
  | 'one-time-used' // One-time card already used
  | 'merchant-mismatch' // Merchant doesn't match locked merchant
  | 'category-mismatch' // Category doesn't match locked category
  | 'expired' // Card has expired
  | 'suspicious'; // Flagged as suspicious activity

/**
 * A blocked charge event
 */
export interface BlockEvent {
  id: string;
  cardId: string;
  cardName: string;
  merchantName: string;
  merchantCategory?: string;
  amount: number;
  currency: string;
  reason: BlockReason;
  blockedAt: Date;
  isFirstBlock: boolean;
  isMilestone: boolean;
  milestoneType?: MilestoneType;
}

/**
 * Types of milestone achievements
 */
export type MilestoneType =
  | 'first-block' // First ever block
  | 'block-count-10' // 10 blocks
  | 'block-count-50' // 50 blocks
  | 'block-count-100' // 100 blocks
  | 'savings-100' // $100 saved
  | 'savings-500' // $500 saved
  | 'savings-1000'; // $1000 saved

// ============================================================================
// CELEBRATION EVENT TYPES
// ============================================================================

/**
 * Celebration intensity levels
 */
export type CelebrationIntensity = 'full' | 'subtle' | 'off';

/**
 * Celebration event triggered after a block
 */
export interface CelebrationEvent {
  type: 'first-block' | 'routine-block' | 'milestone';
  blockEvent: BlockEvent;
  totalSaved: number;
  blockCount: number;
  intensity: CelebrationIntensity;
}

/**
 * User celebration preferences
 */
export interface CelebrationPreferences {
  enabled: boolean;
  intensity: CelebrationIntensity;
  sound: boolean;
  haptic: boolean;
}

// ============================================================================
// BLOCK STATISTICS
// ============================================================================

/**
 * Aggregated block statistics
 */
export interface BlockStatistics {
  totalBlocked: number;
  totalSaved: number;
  blockCount: number;
  firstBlockDate?: Date;
  lastBlockDate?: Date;
  topMerchants: MerchantBlockStats[];
}

/**
 * Per-merchant block statistics
 */
export interface MerchantBlockStats {
  merchantName: string;
  blockCount: number;
  totalSaved: number;
}
