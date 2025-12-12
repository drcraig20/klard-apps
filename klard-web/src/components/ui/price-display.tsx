"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUp, ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"

const priceDisplayVariants = cva(
  "inline-flex items-baseline gap-1 font-medium",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-xl font-semibold",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priceDisplayVariants> {
  amount: number
  currency?: string
  billingCycle?: "monthly" | "yearly" | "weekly" | "one-time"
  showChange?: {
    from: number
    direction: "increase" | "decrease"
  }
}

const cycleLabels: Record<string, string> = {
  monthly: "/mo",
  yearly: "/yr",
  weekly: "/wk",
  "one-time": "",
}

function PriceDisplay({
  amount,
  currency = "USD",
  billingCycle,
  size,
  showChange,
  className,
  ...props
}: PriceDisplayProps) {
  const formatter = React.useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }),
    [currency]
  )

  const formattedAmount = formatter.format(amount)
  const cycleLabel = billingCycle ? cycleLabels[billingCycle] : ""

  const changeAmount = showChange
    ? Math.abs(amount - showChange.from)
    : 0

  return (
    <div
      data-slot="price-display"
      className={cn(priceDisplayVariants({ size }), className)}
      {...props}
    >
      <span>{formattedAmount}</span>
      {cycleLabel && (
        <span className="text-slate-500 dark:text-slate-400 font-normal">
          {cycleLabel}
        </span>
      )}
      {showChange && (
        <span
          data-testid="price-change-indicator"
          className={cn(
            "ml-1 inline-flex items-center gap-0.5 text-sm font-normal",
            showChange.direction === "increase"
              ? "text-red-500 dark:text-red-400"
              : "text-green-500 dark:text-green-400"
          )}
        >
          {showChange.direction === "increase" ? (
            <ArrowUp
              data-testid="arrow-up-icon"
              className="h-3 w-3"
              aria-hidden="true"
            />
          ) : (
            <ArrowDown
              data-testid="arrow-down-icon"
              className="h-3 w-3"
              aria-hidden="true"
            />
          )}
          {formatter.format(changeAmount)}
        </span>
      )}
    </div>
  )
}

export { PriceDisplay, priceDisplayVariants }
