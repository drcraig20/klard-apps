/**
 * expo-secure-store mock for Storybook web environment
 *
 * Uses localStorage as a fallback for secure storage on web.
 */

export async function getItemAsync(key: string): Promise<string | null> {
  try {
    return localStorage.getItem(`secure-store:${key}`);
  } catch {
    return null;
  }
}

export async function setItemAsync(key: string, value: string): Promise<void> {
  try {
    localStorage.setItem(`secure-store:${key}`, value);
  } catch {
    // Ignore storage errors in Storybook
  }
}

export async function deleteItemAsync(key: string): Promise<void> {
  try {
    localStorage.removeItem(`secure-store:${key}`);
  } catch {
    // Ignore storage errors in Storybook
  }
}

export async function isAvailableAsync(): Promise<boolean> {
  return typeof localStorage !== 'undefined';
}

export const AFTER_FIRST_UNLOCK = 'afterFirstUnlock';
export const AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY = 'afterFirstUnlockThisDeviceOnly';
export const ALWAYS = 'always';
export const ALWAYS_THIS_DEVICE_ONLY = 'alwaysThisDeviceOnly';
export const WHEN_PASSCODE_SET_THIS_DEVICE_ONLY = 'whenPasscodeSetThisDeviceOnly';
export const WHEN_UNLOCKED = 'whenUnlocked';
export const WHEN_UNLOCKED_THIS_DEVICE_ONLY = 'whenUnlockedThisDeviceOnly';

export default {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
  isAvailableAsync,
  AFTER_FIRST_UNLOCK,
  AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
  ALWAYS,
  ALWAYS_THIS_DEVICE_ONLY,
  WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
  WHEN_UNLOCKED,
  WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};
