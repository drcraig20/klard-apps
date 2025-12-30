"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { protectionStatusVariants } from "./protection-status.styles"

export interface ProtectionStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof protectionStatusVariants> {
  /** Number of active cards watching */
  activeCards: number
  /** Show pulse animation */
  showPulse?: boolean
}

/**
 * ProtectionStatus displays the number of active cards watching subscriptions.
 *
 * Features:
 * - Displays card count with singular/plural message
 * - Optional pulse animation for active monitoring
 * - Teal glow effect to indicate protection status
 *
 * SRP: Only handles display of protection/watching status
 * OCP: Extensible via className prop
 */
function ProtectionStatus({
  activeCards,
  showPulse = false,
  className,
  ...props
}: Readonly<ProtectionStatusProps>) {
  const message = activeCards === 1
    ? "1 card watching"
    : `${activeCards} cards watching`

  return (
    <div
      data-slot="protection-status"
      data-testid="protection-status"
      role="status"
      aria-live="polite"
      aria-label={message}
      className={cn(
        protectionStatusVariants({ showPulse }),
        className
      )}
      {...props}
    >
      <svg
        className="h-4 w-4 text-teal-600 dark:text-teal-400"
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
      <span>{message}</span>
    </div>
  )
}

export { ProtectionStatus }
