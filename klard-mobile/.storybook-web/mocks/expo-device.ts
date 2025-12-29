/**
 * expo-device mock for Storybook web environment
 *
 * Returns desktop/web browser device information.
 */

export const DeviceType = {
  UNKNOWN: 0,
  PHONE: 1,
  TABLET: 2,
  DESKTOP: 3,
  TV: 4,
} as const;

export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

// Static device properties
export const isDevice = false;
export const brand: string | null = 'Web';
export const manufacturer: string | null = 'Storybook';
export const modelName: string | null = 'Web Browser';
export const modelId: string | null = null;
export const designName: string | null = null;
export const productName: string | null = null;
export const deviceYearClass: number | null = null;
export const totalMemory: number | null = null;
export const supportedCpuArchitectures: string[] | null = null;
export const osName: string | null = 'Web';
export const osVersion: string | null = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
export const osBuildId: string | null = null;
export const osInternalBuildId: string | null = null;
export const osBuildFingerprint: string | null = null;
export const platformApiLevel: number | null = null;
export const deviceName: string | null = 'Storybook Browser';

export async function getDeviceTypeAsync(): Promise<DeviceType> {
  return DeviceType.DESKTOP;
}

export async function getUptimeAsync(): Promise<number> {
  return 0;
}

export async function getMaxMemoryAsync(): Promise<number | null> {
  return null;
}

export async function isRootedExperimentalAsync(): Promise<boolean> {
  return false;
}

export async function isSideLoadingEnabledAsync(): Promise<boolean> {
  return false;
}

export async function getPlatformFeaturesAsync(): Promise<string[]> {
  return [];
}

export default {
  DeviceType,
  isDevice,
  brand,
  manufacturer,
  modelName,
  modelId,
  designName,
  productName,
  deviceYearClass,
  totalMemory,
  supportedCpuArchitectures,
  osName,
  osVersion,
  osBuildId,
  osInternalBuildId,
  osBuildFingerprint,
  platformApiLevel,
  deviceName,
  getDeviceTypeAsync,
  getUptimeAsync,
  getMaxMemoryAsync,
  isRootedExperimentalAsync,
  isSideLoadingEnabledAsync,
  getPlatformFeaturesAsync,
};
