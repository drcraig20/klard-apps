'use client';

import { useState } from 'react';
import { Key, Check } from 'lucide-react';
import { usePasskeyAuth } from '@/hooks/usePasskeyAuth';
import { Button } from '@/components/ui/button/button';
import { cn } from '@/lib/utils';

/**
 * PasskeyButton component for WebAuthn/Passkey authentication.
 *
 * SOLID Compliance:
 * - SRP: Only handles passkey button rendering and click events
 * - OCP: Mode-driven behavior (register vs signin), extensible via props
 * - LSP: N/A (not a subtype)
 * - ISP: Focused interface with only necessary props
 * - DIP: Depends on usePasskeyAuth hook abstraction, not concrete implementation
 *
 * Automatically hidden when WebAuthn is not available in the browser.
 *
 * @param {PasskeyButtonProps} props - Component props
 * @returns {JSX.Element | null} Button element or null if WebAuthn unavailable
 */
export interface PasskeyButtonProps {
  /** Mode: register for new passkey, signin to authenticate */
  mode: 'register' | 'signin';
  /** Callback when passkey operation succeeds */
  onSuccess: () => void;
  /** Callback when passkey operation fails */
  onError: (error: string) => void;
  /** Disable the button */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function PasskeyButton({
  mode,
  onSuccess,
  onError,
  disabled = false,
  className,
}: PasskeyButtonProps) {
  const { isAvailable, isLoading, registerPasskey, signInWithPasskey } =
    usePasskeyAuth();

  // AUTH-005-05: Success animation state
  const [showSuccess, setShowSuccess] = useState(false);

  // SRP: Single check for availability - hides component when WebAuthn unavailable
  // AUTH-005-04: Return null to hide button on unsupported browsers
  if (!isAvailable) {
    return null;
  }

  /**
   * Handle button click based on mode.
   *
   * SRP: Only handles click event and delegates to appropriate auth method
   * DIP: Depends on hook methods, not concrete implementations
   * AUTH-005-05: Shows success animation on registration
   */
  const handleClick = async () => {
    let result;

    // OCP: Behavior extends based on mode prop, no modification needed
    if (mode === 'register') {
      result = await registerPasskey();
    } else {
      result = await signInWithPasskey();
    }

    // SRP: Delegates success/error handling to parent via callbacks
    if (result.success) {
      // AUTH-005-05: Show success animation on registration
      if (mode === 'register') {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1500);
      }
      onSuccess();
    } else if (result.error) {
      onError(result.error);
    }
  };

  // OCP: Button text extends based on mode prop
  const buttonText = mode === 'register' ? 'Register Passkey' : 'Sign in with Passkey';

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={disabled || isLoading}
      loading={isLoading}
      icon={
        showSuccess ? (
          <Check className="size-4 text-green-500 transition-opacity duration-200" />
        ) : (
          <Key className="size-4" />
        )
      }
      iconPosition="left"
      className={cn(className)}
    >
      {buttonText}
    </Button>
  );
}
