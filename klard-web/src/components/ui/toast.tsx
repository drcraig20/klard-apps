'use client';

import { toast } from "sonner";

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
 * Normalize toast type to valid Sonner type
 */
function normalizeType(type?: ToastType): ToastType {
  const validTypes: ToastType[] = ['success', 'error', 'warning', 'info'];
  return type && validTypes.includes(type) ? type : 'info';
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