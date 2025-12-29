/**
 * expo-local-authentication mock for Storybook web environment
 *
 * Returns false/unavailable for all biometric operations since
 * web browsers don't support native biometric authentication.
 */

export const AuthenticationType = {
  FINGERPRINT: 1,
  FACIAL_RECOGNITION: 2,
  IRIS: 3,
} as const;

export type AuthenticationType = typeof AuthenticationType[keyof typeof AuthenticationType];

export const SecurityLevel = {
  NONE: 0,
  SECRET: 1,
  BIOMETRIC: 2,
} as const;

export type SecurityLevel = typeof SecurityLevel[keyof typeof SecurityLevel];

export interface LocalAuthenticationOptions {
  promptMessage?: string;
  cancelLabel?: string;
  disableDeviceFallback?: boolean;
  fallbackLabel?: string;
  requireConfirmation?: boolean;
  biometricsSecurityLevel?: SecurityLevel;
}

export interface LocalAuthenticationResult {
  success: boolean;
  error?: string;
  warning?: string;
}

export async function hasHardwareAsync(): Promise<boolean> {
  // Web browsers don't have native biometric hardware access
  return false;
}

export async function isEnrolledAsync(): Promise<boolean> {
  // No biometrics enrolled on web
  return false;
}

export async function supportedAuthenticationTypesAsync(): Promise<AuthenticationType[]> {
  // No authentication types supported on web
  return [];
}

export async function authenticateAsync(
  _options?: LocalAuthenticationOptions
): Promise<LocalAuthenticationResult> {
  return {
    success: false,
    error: 'not_available',
  };
}

export function cancelAuthenticate(): void {
  // No-op on web
}

export async function getEnrolledLevelAsync(): Promise<SecurityLevel> {
  return SecurityLevel.NONE;
}

export default {
  AuthenticationType,
  SecurityLevel,
  hasHardwareAsync,
  isEnrolledAsync,
  supportedAuthenticationTypesAsync,
  authenticateAsync,
  cancelAuthenticate,
  getEnrolledLevelAsync,
};
