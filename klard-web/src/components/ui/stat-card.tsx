"use client"

import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statCardVariants = cva(
  "bg-card text-card-foreground flex items-center justify-between gap-4 rounded-xl border shadow-sm transition-all",
  {
    variants: {
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-base",
        lg: "p-5 text-lg",
      },
      muted: {
        true: "opacity-75 border-muted",
        false: "",
      },
      clickable: {
        true: "cursor-pointer hover:border-teal-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      muted: false,
      clickable: false,
    },
  }
)

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

const trendConfig = {
  up: {
    icon: TrendingUp,
    className: "text-green-600 dark:text-green-400",
  },
  down: {
    icon: TrendingDown,
    className: "text-red-600 dark:text-red-400",
  },
  neutral: {
    icon: Minus,
    className: "text-slate-500 dark:text-slate-400",
  },
} as const

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
}: StatCardProps) {
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

export { StatCard, statCardVariants }
