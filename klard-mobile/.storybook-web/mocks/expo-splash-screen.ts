/**
 * expo-splash-screen mock for Storybook web environment
 *
 * No-op implementations since splash screen doesn't apply to web.
 */

export async function preventAutoHideAsync(): Promise<boolean> {
  // No-op on web
  return true;
}

export async function hideAsync(): Promise<boolean> {
  // No-op on web
  return true;
}

export function setOptions(_options: {
  duration?: number;
  fade?: boolean;
}): void {
  // No-op on web
}

export default {
  preventAutoHideAsync,
  hideAsync,
  setOptions,
};
