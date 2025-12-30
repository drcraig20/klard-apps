"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  healthIndicatorVariants,
  healthIndicatorDotVariants,
  type HealthIndicatorVariants,
} from "./health-indicator.styles"

/**
 * HealthIndicator Component
 *
 * Displays subscription health status with color-coded indicator and optional label.
 *
 * SOLID Compliance:
 * - SRP: Only renders health indicator UI
 * - OCP: Extend via status variants, not modification
 * - DIP: Depends on design token abstractions
 */

export type HealthStatus = "forgotten" | "price-increased" | "healthy"

const STATUS_LABELS: Record<HealthStatus, string> = {
  forgotten: "Forgotten?",
  "price-increased": "Price went up",
  healthy: "All good",
}

export interface HealthIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    HealthIndicatorVariants {
  /** Health status to display */
  status: HealthStatus
  /** Whether to show the text label (default: true) */
  showLabel?: boolean
  /** Size variant */
  size?: "sm" | "md"
}

function HealthIndicator({
  className,
  status,
  showLabel = true,
  size = "md",
  ...props
}: Readonly<HealthIndicatorProps>) {
  const label = STATUS_LABELS[status]

  return (
    <span
      data-testid="health-indicator"
      data-slot="health-indicator"
      role="status"
      aria-label={label}
      className={cn(healthIndicatorVariants({ status, size }), className)}
      {...props}
    >
      <span
        data-testid="health-indicator-dot"
        className={healthIndicatorDotVariants({ status, size })}
        aria-hidden="true"
      />
      {showLabel && <span>{label}</span>}
    </span>
  )
}

export { HealthIndicator }
