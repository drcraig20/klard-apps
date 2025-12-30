/**
 * Shared Hooks
 *
 * Platform-agnostic utility hooks for business logic.
 * These are pure functions that can be used in React, React Native, or vanilla TS.
 *
 * SOLID Compliance:
 * - SRP: Each hook handles a single concern
 * - OCP: Hooks accept config for extensibility
 * - DIP: Hooks depend on abstractions (ICard, not BurnerCard)
 */

// Celebration intensity calculation
export {
  useCelebration,
  type CelebrationConfig,
  type CelebrationThresholds,
  type CelebrationResult,
} from './useCelebration';

// Health status calculation
export {
  useHealthStatus,
  type HealthStatusInput,
  type HealthStatusThresholds,
  type HealthStatusResult,
} from './useHealthStatus';

// Protection status calculation
export {
  useProtectionStatus,
  type ProtectionConfig,
  type ProtectionResult,
} from './useProtectionStatus';
