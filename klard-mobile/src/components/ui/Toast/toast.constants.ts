import * as Haptics from "expo-haptics";

export type ToastType = "success" | "error" | "warning" | "info" | "celebration";
export type ToastPosition = "top" | "bottom";
export type CelebrationLevel = "full" | "medium" | "subtle" | "none";

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
  position?: ToastPosition;
}

export interface CelebrationToastOptions {
  amount: number;
  merchant?: string;
  celebrationLevel?: CelebrationLevel;
}

/**
 * Haptic feedback mapping for toast types
 */
export const hapticFeedback: Record<ToastType, Haptics.NotificationFeedbackType | null> = {
  success: Haptics.NotificationFeedbackType.Success,
  error: Haptics.NotificationFeedbackType.Error,
  warning: Haptics.NotificationFeedbackType.Warning,
  info: null, // No haptic for info
  celebration: Haptics.NotificationFeedbackType.Success, // Use success haptic for celebration
};

/**
 * Celebration haptic patterns
 * OCP: Extend celebration levels via this config without modifying core logic
 */
export const CELEBRATION_HAPTIC_CONFIG: Record<Exclude<CelebrationLevel, 'none'>, {
  pattern: Haptics.NotificationFeedbackType;
  repeatCount: number;
  delayMs: number;
}> = {
  full: {
    pattern: Haptics.NotificationFeedbackType.Success,
    repeatCount: 3,
    delayMs: 150,
  },
  medium: {
    pattern: Haptics.NotificationFeedbackType.Success,
    repeatCount: 2,
    delayMs: 200,
  },
  subtle: {
    pattern: Haptics.NotificationFeedbackType.Success,
    repeatCount: 1,
    delayMs: 0,
  },
};

/**
 * Valid toast types for normalization
 */
export const VALID_TOAST_TYPES: ToastType[] = ["success", "error", "warning", "info", "celebration"];

/**
 * Default toast duration in milliseconds
 */
export const DEFAULT_TOAST_DURATION = 3000;

/**
 * Celebration toast duration (longer for emphasis)
 */
export const CELEBRATION_TOAST_DURATION = 5000;
