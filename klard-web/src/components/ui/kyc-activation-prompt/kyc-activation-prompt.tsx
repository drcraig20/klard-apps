"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  kycActivationPromptVariants,
  kycIconContainerStyles,
  kycTitleStyles,
  kycDescriptionStyles,
} from "./kyc-activation-prompt.styles"

export interface KYCActivationPromptProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof kycActivationPromptVariants> {
  /** Name of the card being activated */
  cardName: string
  /** Callback when user clicks activate */
  onActivate: () => void
}

/**
 * KYCActivationPrompt displays a prompt for KYC verification with positive "activation" framing.
 *
 * Features:
 * - Uses "activation" framing instead of "verification"
 * - Shows card name in description
 * - Three variant layouts: inline, modal, card-overlay
 * - Shield icon for trust
 * - Glassmorphism styling
 *
 * SRP: Only handles display of KYC activation prompt
 * OCP: Extensible via variant prop and className
 * DIP: Depends on Button abstraction via composition
 */
function KYCActivationPrompt({
  cardName,
  onActivate,
  variant = "inline",
  className,
  ...props
}: Readonly<KYCActivationPromptProps>) {
  const testId = `kyc-prompt-${variant}`

  return (
    <div
      data-slot="kyc-activation-prompt"
      data-testid={testId}
      role="region"
      aria-label="KYC activation prompt"
      className={cn(kycActivationPromptVariants({ variant }), className)}
      {...props}
    >
      {/* Shield Icon */}
      <div className={cn(kycIconContainerStyles())}>
        <svg
          data-testid="shield-icon"
          className="h-6 w-6 text-teal-600 dark:text-teal-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>

      {/* Title */}
      <h3 className={cn(kycTitleStyles())}>Activate your protection</h3>

      {/* Description */}
      <p className={cn(kycDescriptionStyles())}>
        Complete a quick verification to start using {cardName}
      </p>

      {/* Activate Button */}
      <Button
        variant="klard"
        size={variant === "card-overlay" ? "sm" : "default"}
        onClick={onActivate}
      >
        Activate Now
      </Button>
    </div>
  )
}

export { KYCActivationPrompt }