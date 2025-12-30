"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { savingsCounterVariants } from "./savings-counter.styles"

/**
 * Formats a number as currency using Intl.NumberFormat
 *
 * @param amount - The numeric value to format
 * @param currency - ISO 4217 currency code (default: 'USD')
 * @returns Formatted currency string
 */
function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export interface SavingsCounterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof savingsCounterVariants> {
  /** The savings amount to display */
  amount: number
  /** ISO 4217 currency code (default: 'USD') */
  currency?: string
  /** Whether to animate the counter (count-up effect) */
  animate?: boolean
  /** Optional label to display above the amount */
  label?: string
}

/**
 * SavingsCounter Component
 *
 * Displays a formatted currency amount with success green styling and glow effect.
 * Used to highlight savings achievements in the Klard design system.
 *
 * SRP: Only responsible for displaying formatted savings with success styling
 * OCP: Extensible via className and variants
 * DIP: Depends on abstractions (Intl.NumberFormat) for currency formatting
 */
function SavingsCounter({
  amount,
  currency = "USD",
  animate = false,
  label,
  size,
  className,
  ...props
}: Readonly<SavingsCounterProps>) {
  const formattedAmount = formatCurrency(amount, currency)

  // Build accessible label
  const accessibleLabel = label
    ? `${label}: ${formattedAmount}`
    : `Savings: ${formattedAmount}`

  return (
    <div
      data-testid="savings-counter"
      data-slot="savings-counter"
      aria-label={accessibleLabel}
      className={cn(savingsCounterVariants({ size, animate }), className)}
      {...props}
    >
      {label && (
        <span
          data-testid="savings-counter-label"
          className="text-sm font-medium text-muted-foreground"
        >
          {label}
        </span>
      )}
      <span
        data-testid="savings-counter-amount"
        className={cn(
          "font-bold tracking-tight",
          size === "sm" && "text-xl",
          size === "md" && "text-3xl",
          size === "lg" && "text-5xl"
        )}
      >
        {formattedAmount}
      </span>
    </div>
  )
}

export { SavingsCounter }
