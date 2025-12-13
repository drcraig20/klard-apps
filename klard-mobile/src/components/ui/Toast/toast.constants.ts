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
export const hapticFeedback: Record<ToastType, Haptics.NotificationFeedbackType | null> = {
  success: Haptics.NotificationFeedbackType.Success,
  error: Haptics.NotificationFeedbackType.Error,
  warning: Haptics.NotificationFeedbackType.Warning,
  info: null, // No haptic for info
};

/**
 * Valid toast types for normalization
 */
export const VALID_TOAST_TYPES: ToastType[] = ["success", "error", "warning", "info"];

/**
 * Default toast duration in milliseconds
 */
export const DEFAULT_TOAST_DURATION = 3000;
