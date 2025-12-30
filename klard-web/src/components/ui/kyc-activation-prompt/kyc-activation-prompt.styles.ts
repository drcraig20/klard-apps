import { cva, type VariantProps } from "class-variance-authority"

/**
 * Base styles for KYC activation prompt with variant-specific layouts
 */
export const kycActivationPromptVariants = cva(
  [
    // Common styles
    "relative",
    "text-center",
  ],
  {
    variants: {
      variant: {
        inline: [
          "flex flex-col items-center gap-4 p-6",
          "rounded-lg",
          "bg-teal-50/80 dark:bg-teal-900/20",
          "border border-teal-200 dark:border-teal-700/50",
          "backdrop-blur-sm",
          "shadow-[0_2px_12px_rgba(13,124,122,0.1)] dark:shadow-[0_2px_12px_rgba(21,181,176,0.15)]",
        ],
        modal: [
          "flex flex-col items-center gap-6 p-8",
          "rounded-xl",
          "bg-background/95 dark:bg-card/95",
          "border border-border",
          "backdrop-blur-lg",
          "shadow-lg",
        ],
        "card-overlay": [
          "absolute inset-0",
          "flex flex-col items-center justify-center gap-4 p-4",
          "rounded-lg",
          "bg-background/90 dark:bg-card/90",
          "backdrop-blur-md",
          "z-10",
        ],
      },
    },
    defaultVariants: {
      variant: "inline",
    },
  }
)

/**
 * Icon container styles with teal glow
 */
export const kycIconContainerStyles = cva([
  "flex items-center justify-center",
  "w-12 h-12",
  "rounded-full",
  "bg-teal-100 dark:bg-teal-900/40",
  "shadow-[0_0_16px_rgba(13,124,122,0.25)] dark:shadow-[0_0_16px_rgba(21,181,176,0.3)]",
])

/**
 * Title text styles
 */
export const kycTitleStyles = cva([
  "text-lg font-semibold",
  "text-foreground",
])

/**
 * Description text styles
 */
export const kycDescriptionStyles = cva([
  "text-sm",
  "text-muted-foreground",
  "max-w-xs",
])

export type KYCActivationPromptVariants = VariantProps<typeof kycActivationPromptVariants>