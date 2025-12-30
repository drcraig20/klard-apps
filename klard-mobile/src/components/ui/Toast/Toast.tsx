import ToastLib from "react-native-toast-message";
import * as Haptics from "expo-haptics";
import {
  hapticFeedback,
  VALID_TOAST_TYPES,
  DEFAULT_TOAST_DURATION,
  CELEBRATION_TOAST_DURATION,
  CELEBRATION_HAPTIC_CONFIG,
  type ToastType,
  type ToastProps,
  type CelebrationToastOptions,
  type CelebrationLevel,
} from "./toast.constants";

/**
 * Normalize toast type to valid type
 */
function normalizeType(type?: ToastType): ToastType {
  return type && VALID_TOAST_TYPES.includes(type) ? type : "info";
}

/**
 * Format currency amount
 */
function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Trigger celebration haptic feedback pattern
 * SRP: Only handles haptic celebration triggering
 */
async function triggerCelebrationHaptics(level: CelebrationLevel): Promise<void> {
  if (level === "none") return;

  const config = CELEBRATION_HAPTIC_CONFIG[level];

  // Fire initial haptic
  await Haptics.notificationAsync(config.pattern);

  // Fire additional haptics for higher celebration levels
  for (let i = 1; i < config.repeatCount; i++) {
    await new Promise((resolve) => setTimeout(resolve, config.delayMs));
    await Haptics.notificationAsync(config.pattern);
  }
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
  position = "bottom",
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
    position: position,
    props: action ? { action } : undefined,
  });
}

/**
 * Display a celebration toast for savings/blocked charges
 * SRP: Toast rendering, helper triggers celebration behavior
 * OCP: New celebration levels via CELEBRATION_HAPTIC_CONFIG
 *
 * @param options - Celebration toast configuration
 * @param options.amount - The amount saved/blocked
 * @param options.merchant - Optional merchant name
 * @param options.celebrationLevel - Level of celebration animation (default: 'full')
 */
export function showCelebrationToast({
  amount,
  merchant,
  celebrationLevel = "full",
}: CelebrationToastOptions): void {
  // Validate amount
  if (typeof amount !== "number" || isNaN(amount)) {
    if (__DEV__) {
      console.warn("[Toast] amount must be a valid number");
    }
    return;
  }

  const formattedAmount = formatAmount(amount);
  const title = `You saved ${formattedAmount}!`;
  const description = merchant
    ? `Blocked charge from ${merchant}`
    : "Subscription charge blocked";

  // Trigger celebration haptics (fire and forget)
  triggerCelebrationHaptics(celebrationLevel);

  // Show celebration toast at top-center for prominence
  ToastLib.show({
    type: "celebration",
    text1: title,
    text2: description,
    visibilityTime: CELEBRATION_TOAST_DURATION,
    position: "top",
    props: {
      amount: formattedAmount,
      merchant,
      celebrationLevel,
    },
  });
}

/**
 * Hide the currently visible toast
 */
export function hideToast(): void {
  ToastLib.hide();
}
