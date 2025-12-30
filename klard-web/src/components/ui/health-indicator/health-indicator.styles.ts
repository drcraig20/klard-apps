import { cva, type VariantProps } from "class-variance-authority"

/**
 * HealthIndicator style variants using CVA
 *
 * SOLID Compliance:
 * - SRP: Only defines visual style variants
 * - OCP: Extend by adding new variants, not modifying existing
 * - DIP: Uses design token abstractions via CSS variables
 */

const healthIndicatorVariants = cva(
  "inline-flex items-center gap-1.5 font-medium",
  {
    variants: {
      status: {
        forgotten: "text-red-600 dark:text-red-400",
        "price-increased": "text-amber-600 dark:text-amber-400",
        healthy: "text-green-600 dark:text-green-400",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: {
      status: "healthy",
      size: "md",
    },
  }
)

const healthIndicatorDotVariants = cva(
  "rounded-full shrink-0",
  {
    variants: {
      status: {
        forgotten:
          "bg-red-500 dark:bg-red-400 shadow-[0_0_8px_rgba(220,38,38,0.5)] dark:shadow-[0_0_8px_rgba(239,68,68,0.5)]",
        "price-increased":
          "bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(217,119,6,0.5)] dark:shadow-[0_0_8px_rgba(245,158,11,0.5)]",
        healthy:
          "bg-green-500 dark:bg-green-400 shadow-[0_0_8px_rgba(5,150,105,0.5)] dark:shadow-[0_0_8px_rgba(16,185,129,0.5)]",
      },
      size: {
        sm: "size-2",
        md: "size-2.5",
      },
    },
    defaultVariants: {
      status: "healthy",
      size: "md",
    },
  }
)

export type HealthIndicatorVariants = VariantProps<typeof healthIndicatorVariants>
export type HealthIndicatorDotVariants = VariantProps<typeof healthIndicatorDotVariants>

export { healthIndicatorVariants, healthIndicatorDotVariants }
