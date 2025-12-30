"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * ConfirmButton - Two-step destructive action pattern
 *
 * SRP: Handles only the confirmation flow logic for destructive actions.
 * OCP: Extensible via variant prop and confirmText customization.
 * DIP: Depends on Button abstraction, not concrete implementation.
 *
 * Pattern: [Delete] -> click -> [Are you sure? Yes / No] -> 5s auto-reset OR confirm -> action
 */
export interface ConfirmButtonProps {
  /** Content to display in initial state */
  children: React.ReactNode;
  /** Callback executed when user confirms the action */
  onConfirm: () => void;
  /** Text to show in confirmation state (default: "Are you sure?") */
  confirmText?: string;
  /** Time in ms before auto-reset (default: 5000) */
  resetTimeout?: number;
  /** Button variant for styling */
  variant?: "destructive" | "warning";
  /** Additional class names */
  className?: string;
}

export function ConfirmButton({
  children,
  onConfirm,
  confirmText = "Are you sure?",
  resetTimeout = 5000,
  variant = "destructive",
  className,
}: Readonly<ConfirmButtonProps>) {
  const [isConfirming, setIsConfirming] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimeoutRef = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = React.useCallback(() => {
    clearTimeoutRef();
    setIsConfirming(false);
  }, [clearTimeoutRef]);

  const handleInitialClick = React.useCallback(() => {
    setIsConfirming(true);
    timeoutRef.current = setTimeout(() => {
      setIsConfirming(false);
    }, resetTimeout);
  }, [resetTimeout]);

  const handleConfirm = React.useCallback(() => {
    reset();
    onConfirm();
  }, [reset, onConfirm]);

  const handleCancel = React.useCallback(() => {
    reset();
  }, [reset]);

  // Handle Escape key to reset
  React.useEffect(() => {
    if (!isConfirming) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        reset();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConfirming, reset]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      clearTimeoutRef();
    };
  }, [clearTimeoutRef]);

  // Get button variant for shadcn/ui Button
  const getButtonVariant = () => {
    if (variant === "warning") {
      return "secondary";
    }
    return "destructive";
  };

  if (isConfirming) {
    return (
      <div
        data-testid="confirm-button"
        className={cn("inline-flex items-center gap-2", className)}
      >
        <span className="text-sm font-medium text-muted-foreground">
          {confirmText}
        </span>
        <Button
          variant={getButtonVariant()}
          size="sm"
          onClick={handleConfirm}
          aria-label="Yes"
        >
          Yes
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          aria-label="No"
        >
          No
        </Button>
      </div>
    );
  }

  return (
    <Button
      data-testid="confirm-button"
      variant={getButtonVariant()}
      onClick={handleInitialClick}
      className={className}
    >
      {children}
    </Button>
  );
}
