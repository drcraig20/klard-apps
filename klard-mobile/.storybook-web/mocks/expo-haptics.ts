/**
 * expo-haptics mock for Storybook web environment
 *
 * Provides no-op implementations since haptics are not supported on web.
 */

export const ImpactFeedbackStyle = {
  Light: 'light',
  Medium: 'medium',
  Heavy: 'heavy',
  Rigid: 'rigid',
  Soft: 'soft',
} as const;

export const NotificationFeedbackType = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
} as const;

export async function impactAsync(
  _style?: (typeof ImpactFeedbackStyle)[keyof typeof ImpactFeedbackStyle]
): Promise<void> {
  // No-op on web - haptics not supported
}

export async function notificationAsync(
  _type?: (typeof NotificationFeedbackType)[keyof typeof NotificationFeedbackType]
): Promise<void> {
  // No-op on web - haptics not supported
}

export async function selectionAsync(): Promise<void> {
  // No-op on web - haptics not supported
}

export default {
  impactAsync,
  notificationAsync,
  selectionAsync,
  ImpactFeedbackStyle,
  NotificationFeedbackType,
};
