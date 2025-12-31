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
        forgotten: "text-error",
        "price-increased": "text-warning",
        healthy: "text-success",
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
        forgotten: "bg-error shadow-glow-error",
        "price-increased": "bg-warning shadow-glow-warning",
        healthy: "bg-success shadow-glow-success",
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
