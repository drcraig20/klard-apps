import { cva } from "class-variance-authority"

export const priceDisplayVariants = cva(
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
