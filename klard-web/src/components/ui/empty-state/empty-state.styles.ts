import { cva } from "class-variance-authority"

export const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "py-6 gap-3",
        md: "py-12 gap-4",
        lg: "py-16 gap-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)
