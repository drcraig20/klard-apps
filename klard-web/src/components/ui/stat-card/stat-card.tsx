"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { trendConfig } from "./stat-card.constants"
import { statCardVariants } from "./stat-card.styles"

export interface StatCardProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof statCardVariants> {
  /** Label describing the metric */
  label: string
  /** The metric value to display */
  value: string | number
  /** Optional trend indicator */
  trend?: {
    direction: "up" | "down" | "neutral"
    value: string
  }
  /** Optional icon to display */
  icon?: React.ReactNode
  /** Click handler - makes card interactive */
  onClick?: () => void
}

function StatCard({
  label,
  value,
  trend,
  icon,
  onClick,
  size,
  muted,
  className,
  ...props
}: Readonly<StatCardProps>) {
  const isClickable = !!onClick
  const Component = isClickable ? "button" : "div"

  return (
    <Component
      data-slot="stat-card"
      onClick={onClick}
      className={cn(
        statCardVariants({ size, muted, clickable: isClickable }),
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={cn(
          "font-semibold tracking-tight",
          size === "sm" && "text-base",
          size === "md" && "text-2xl",
          size === "lg" && "text-3xl"
        )}>{value}</span>
        {trend && (
          <div
            data-trend={trend.direction}
            data-testid="trend-indicator"
            className={cn(
              "flex items-center gap-1 text-sm",
              trendConfig[trend.direction].className
            )}
          >
            {React.createElement(trendConfig[trend.direction].icon, {
              className: cn(
                size === "sm" && "h-3 w-3",
                size === "md" && "h-4 w-4",
                size === "lg" && "h-5 w-5"
              ),
              "aria-hidden": true,
            })}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      {icon && (
        <div
          data-testid="stat-card-icon"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
            size === "sm" && "h-10 w-10",
            size === "md" && "h-12 w-12",
            size === "lg" && "h-14 w-14"
          )}
        >
          {icon}
        </div>
      )}
    </Component>
  )
}

export { StatCard }
