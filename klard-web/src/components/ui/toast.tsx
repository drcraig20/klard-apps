'use client';

import { toast } from "sonner";
import confetti from "canvas-confetti";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition = "top-center" | "center-screen" | "bottom";
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
 * Celebration level configuration for confetti
 * OCP: Extend celebration levels via this config without modifying core logic
 */
const CELEBRATION_CONFIG: Record<Exclude<CelebrationLevel, 'none'>, {
  particleCount: number;
  spread: number;
  startVelocity: number;
  decay: number;
  scalar: number;
}> = {
  full: {
    particleCount: 150,
    spread: 360,
    startVelocity: 45,
    decay: 0.91,
    scalar: 1.2,
  },
  medium: {
    particleCount: 80,
    spread: 180,
    startVelocity: 35,
    decay: 0.92,
    scalar: 1,
  },
  subtle: {
    particleCount: 30,
    spread: 90,
    startVelocity: 25,
    decay: 0.94,
    scalar: 0.8,
  },
};

/**
 * Normalize toast type to valid Sonner type
 */
function normalizeType(type?: ToastType): ToastType {
  const validTypes: ToastType[] = ['success', 'error', 'warning', 'info'];
  return type && validTypes.includes(type) ? type : 'info';
}

/**
 * Format currency amount
 */
function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Trigger confetti animation based on celebration level
 * SRP: Only handles confetti triggering
 */
function triggerConfetti(level: CelebrationLevel): void {
  if (level === 'none') return;

  const config = CELEBRATION_CONFIG[level];

  // Fire confetti from center
  confetti({
    particleCount: config.particleCount,
    spread: config.spread,
    startVelocity: config.startVelocity,
    decay: config.decay,
    scalar: config.scalar,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#0D7C7A', '#15B5B0', '#059669', '#10B981', '#FFD700'],
    ticks: 200,
  });

  // For full celebration, add extra bursts from sides
  if (level === 'full') {
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0D7C7A', '#15B5B0', '#FFD700'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0D7C7A', '#15B5B0', '#FFD700'],
      });
    }, 150);
  }
}

/**
 * Display a toast notification
 */
export function showToast({ type, title, description, duration, action }: ToastProps): void {
  // Validate title
  if (!title || title.trim() === '') {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Toast] title is required');
    }
    return;
  }

  const normalizedType = normalizeType(type);
  const options: Parameters<typeof toast.success>[1] = {};

  if (description) {
    options.description = description;
  }

  if (duration !== undefined) {
    options.duration = duration;
  }

  if (action) {
    options.action = {
      label: action.label,
      onClick: action.onClick,
    };
  }

  toast[normalizedType](title, options);
}

/**
 * Display a celebration toast for savings/blocked charges
 * SRP: Toast rendering, helper triggers celebration behavior
 * OCP: New celebration levels via CELEBRATION_CONFIG
 *
 * @param options - Celebration toast configuration
 * @param options.amount - The amount saved/blocked
 * @param options.merchant - Optional merchant name
 * @param options.celebrationLevel - Level of celebration animation (default: 'full')
 */
export function showCelebrationToast({
  amount,
  merchant,
  celebrationLevel = 'full',
}: CelebrationToastOptions): void {
  // Validate amount
  if (typeof amount !== 'number' || isNaN(amount)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Toast] amount must be a valid number');
    }
    return;
  }

  const formattedAmount = formatAmount(amount);
  const title = `You saved ${formattedAmount}!`;
  const description = merchant ? `Blocked charge from ${merchant}` : 'Subscription charge blocked';

  // Show custom celebration toast with glassmorphism styling
  toast.custom(
    (t) => (
      <div
        role="alert"
        data-testid="celebration-toast"
        className="fixed-center pointer-events-auto flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50/95 to-emerald-50/95 p-6 shadow-2xl backdrop-blur-xl dark:border-green-800 dark:from-green-950/95 dark:to-emerald-950/95"
        onClick={() => toast.dismiss(t)}
      >
        <div className="text-4xl">🎉</div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-700 dark:text-green-300" data-testid="celebration-amount">
            {formattedAmount}
          </p>
          <p className="mt-1 text-base font-semibold text-green-800 dark:text-green-200">
            {title.replace(formattedAmount, 'saved!')}
          </p>
          {merchant && (
            <p className="mt-1 text-sm text-green-600 dark:text-green-400" data-testid="celebration-merchant">
              {merchant}
            </p>
          )}
        </div>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-400" />
      </div>
    ),
    {
      duration: 5000,
      position: 'top-center',
    }
  );

  // Trigger confetti based on celebration level
  triggerConfetti(celebrationLevel);
}