import ToastLib from "react-native-toast-message";
import * as Haptics from "expo-haptics";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: ToastAction;
}

/**
 * Haptic feedback mapping for toast types
 */
const hapticFeedback: Record<ToastType, Haptics.NotificationFeedbackType | null> = {
  success: Haptics.NotificationFeedbackType.Success,
  error: Haptics.NotificationFeedbackType.Error,
  warning: Haptics.NotificationFeedbackType.Warning,
  info: null, // No haptic for info
};

/**
 * Normalize toast type to valid type
 */
function normalizeType(type?: ToastType): ToastType {
  const validTypes: ToastType[] = ['success', 'error', 'warning', 'info'];
  return type && validTypes.includes(type) ? type : 'info';
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
  if (!title || title.trim() === '') {
    if (__DEV__) {
      console.warn('[Toast] title is required');
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
    visibilityTime: duration ?? 3000,
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