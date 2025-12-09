/**
 * UUID Generation Utility
 * Cross-platform UUID generation with fallback for React Native
 *
 * SRP: Single responsibility - generate UUIDs
 * DIP: No platform-specific dependencies
 */

// Declare global crypto for TypeScript (available in Node.js 19+ and browsers)
declare const crypto: {
  randomUUID?: () => string;
} | undefined;

/**
 * Generates a UUID v4 string
 * Uses crypto.randomUUID when available, falls back to manual generation for React Native
 */
export function generateUUID(): string {
  // Use native crypto.randomUUID if available (Node.js, modern browsers)
  if (typeof crypto !== 'undefined' && crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for React Native and older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
