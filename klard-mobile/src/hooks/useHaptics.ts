import { useCallback, useMemo } from 'react';
import * as Haptics from 'expo-haptics';

/**
 * Hook providing convenient haptic feedback methods
 *
 * @returns Object with methods for different haptic feedback types
 *
 * @example
 * const haptics = useHaptics();
 * haptics.light(); // Light impact
 * haptics.success(); // Success notification
 */
export function useHaptics() {
  const light = useCallback(
    () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    []
  );

  const medium = useCallback(
    () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    []
  );

  const heavy = useCallback(
    () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
    []
  );

  const rigid = useCallback(
    () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
    []
  );

  const soft = useCallback(
    () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
    []
  );

  const success = useCallback(
    () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    []
  );

  const warning = useCallback(
    () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
    []
  );

  const error = useCallback(
    () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
    []
  );

  const selection = useCallback(() => Haptics.selectionAsync(), []);

  return useMemo(
    () => ({
      light,
      medium,
      heavy,
      rigid,
      soft,
      success,
      warning,
      error,
      selection,
    }),
    [light, medium, heavy, rigid, soft, success, warning, error, selection]
  );
}
