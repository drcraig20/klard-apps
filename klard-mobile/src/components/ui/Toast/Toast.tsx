import ToastLib from "react-native-toast-message";
import * as Haptics from "expo-haptics";
import {
  hapticFeedback,
  VALID_TOAST_TYPES,
  DEFAULT_TOAST_DURATION,
  type ToastType,
  type ToastProps,
} from "./toast.constants";

/**
 * Normalize toast type to valid type
 */
function normalizeType(type?: ToastType): ToastType {
  return type && VALID_TOAST_TYPES.includes(type) ? type : "info";
}

/**
 * Display a toast notification on mobile with haptic feedback
 */
export function showToast({
  type,
  title,
  description,
  duration,
  action,
}: ToastProps): void {
  // Validate title
  if (!title || title.trim() === "") {
    if (__DEV__) {
      console.warn("[Toast] title is required");
    }
    return;
  }

  const normalizedType = normalizeType(type);

  // Trigger haptic feedback
  const feedback = hapticFeedback[normalizedType];
  if (feedback) {
    Haptics.notificationAsync(feedback);
  }

  ToastLib.show({
    type: normalizedType,
    text1: title,
    text2: description,
    visibilityTime: duration ?? DEFAULT_TOAST_DURATION,
    position: "bottom",
    props: action ? { action } : undefined,
  });
}

/**
 * Hide the currently visible toast
 */
export function hideToast(): void {
  ToastLib.hide();
}
