import { cva } from "class-variance-authority"

/**
 * EmptyState Variants
 *
 * Provides 3 distinct variant tones with glassmorphism styling.
 *
 * SOLID Compliance:
 * - SRP: Only handles empty state variant styling
 * - OCP: Extend via new variants without modifying existing
 * - DIP: Uses design token CSS variables
 */
export const emptyStateVariants = cva(
  [
    // Base layout
    "flex flex-col items-center justify-center text-center",
    // Glassmorphism effect
    "bg-card/80 backdrop-blur-[12px]",
    "border rounded-xl",
    // Shadow
    "shadow-[0_2px_12px_rgba(15,23,42,0.08)]",
  ],
  {
    variants: {
      size: {
        sm: "py-6 gap-3 px-4",
        md: "py-12 gap-4 px-6",
        lg: "py-16 gap-6 px-8",
      },
      variant: {
        /** Educational/onboarding tone - welcoming first-time users */
        "first-time": [
          "border-primary/30",
          "bg-primary/5",
          "shadow-[0_2px_12px_rgba(15,23,42,0.08),0_0_16px_rgba(13,124,122,0.15)]",
          "dark:shadow-[0_2px_12px_rgba(15,23,42,0.08),0_0_16px_rgba(21,181,176,0.2)]",
        ],
        /** Celebratory tone - all items completed/cleared */
        cleared: [
          "border-success/40",
          "bg-success/5",
          "shadow-[0_2px_12px_rgba(15,23,42,0.08),0_0_16px_rgba(5,150,105,0.2)]",
          "dark:shadow-[0_2px_12px_rgba(15,23,42,0.08),0_0_16px_rgba(16,185,129,0.25)]",
        ],
        /** Recovery-focused tone - error state with action needed */
        error: [
          "border-destructive/30",
          "bg-destructive/5",
          "shadow-[0_2px_12px_rgba(15,23,42,0.08),0_0_16px_rgba(220,38,38,0.15)]",
          "dark:shadow-[0_2px_12px_rgba(15,23,42,0.08),0_0_16px_rgba(239,68,68,0.2)]",
        ],
        /** Default variant - no specific tone */
        default: "border-border/50",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export type EmptyStateVariants = Parameters<typeof emptyStateVariants>[0]