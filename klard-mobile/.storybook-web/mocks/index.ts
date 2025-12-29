/**
 * Storybook Web Mocks Index
 *
 * These mocks are registered via webpack aliases in main.ts.
 * This file provides a list of mocked modules for documentation/debugging.
 */

/**
 * List of mocked modules.
 * These are registered via webpack aliases in main.ts.
 */
export const MOCKED_MODULES = [
  'expo-haptics',
  'expo-secure-store',
  '@gorhom/bottom-sheet',
  'expo-linear-gradient',
  'expo-blur',
  'expo-image',
  'expo-status-bar',
  'expo-checkbox',
  'expo-router',
  'expo-localization',
  'expo-local-authentication',
  'expo-device',
  'expo-splash-screen',
  'expo-apple-authentication',
  'react-native-safe-area-context',
  'react-native-reanimated',
  '@expo/vector-icons',
  'react-native-gesture-handler',
] as const;

/**
 * Logs the registered mocks for debugging purposes.
 */
export function logMockedModules(): void {
  console.log('[Storybook] Mocked modules registered via webpack aliases:');
  MOCKED_MODULES.forEach((module) => {
    console.log(`  - ${module}`);
  });
}
