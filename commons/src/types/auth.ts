/**
 * Shared auth-related types for onboarding and auth redirect hooks.
 * These interfaces follow ISP - each is focused on a single client need.
 */

/**
 * Options for auth redirect behavior.
 * Follows DIP - routes are injected, not hardcoded.
 */
export interface AuthRedirectOptions {
  /** If true, redirects unauthenticated users to login */
  requireAuth?: boolean;
  /** Route to redirect authenticated users (when requireAuth is false) */
  authenticatedRoute?: string;
  /** Route to redirect unauthenticated users (when requireAuth is true) */
  unauthenticatedRoute?: string;
  /** Route to redirect users who haven't completed onboarding */
  onboardingRoute?: string;
  /** Skip onboarding check (useful for onboarding screen itself) */
  skipOnboardingCheck?: boolean;
}

/**
 * Result from auth redirect hook.
 * Follows ISP - only includes what clients need.
 */
export interface AuthRedirectResult {
  /** Whether the session is still loading */
  isPending: boolean;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Whether the user has completed onboarding */
  hasOnboarded: boolean;
}

/**
 * Options for onboarding hook.
 * Follows DIP - dashboard route is injectable.
 */
export interface OnboardingOptions {
  /** Route to redirect after completing onboarding */
  dashboardRoute?: string;
}

/**
 * Result from onboarding hook.
 * Follows ISP - focused interface for onboarding state management.
 */
export interface OnboardingResult {
  /** Whether the user has completed onboarding */
  hasOnboarded: boolean;
  /** Whether the session is still loading */
  isPending: boolean;
  /** Whether an update operation is in progress */
  isUpdating: boolean;
  /** Mark onboarding as complete and redirect to dashboard */
  completeOnboarding: () => Promise<void>;
  /** Skip onboarding and redirect to dashboard */
  skipOnboarding: () => Promise<void>;
}

/**
 * Passkey error codes for unified error handling across platforms.
 * Follows OCP - extensible without modifying existing code.
 */
export type PasskeyErrorCode =
  | 'BIOMETRIC_UNAVAILABLE'
  | 'USER_CANCELLED'
  | 'CREDENTIAL_FAILED'
  | 'NETWORK_ERROR'
  | 'RATE_LIMITED'
  | 'INVALID_CREDENTIAL';

/**
 * Passkey error interface.
 * Follows ISP - minimal interface for error handling.
 */
export interface PasskeyError {
  code: PasskeyErrorCode;
  message: string;
}

/**
 * Passkey credential interface.
 * Follows SRP - represents a single passkey credential.
 */
export interface Passkey {
  id: string;
  name: string;
  createdAt: Date;
  deviceType?: 'platform' | 'cross-platform';
  backedUp?: boolean;
}

/**
 * Result from passkey authentication operations.
 * Follows ISP - discriminated union for success/error states.
 */
export interface PasskeyAuthResult {
  success: boolean;
  data?: Passkey;
  error?: PasskeyError;
}