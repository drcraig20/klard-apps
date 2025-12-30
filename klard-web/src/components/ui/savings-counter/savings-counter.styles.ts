import { cva, type VariantProps } from "class-variance-authority"

export const savingsCounterVariants = cva(
  "inline-flex flex-col items-center gap-1 text-[var(--rec-color-success)] shadow-[var(--rec-glow-success)] rounded-lg p-3 transition-all",
  {
    variants: {
      size: {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl",
      },
      animate: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      animate: false,
    },
  }
)

export type SavingsCounterVariants = VariantProps<typeof savingsCounterVariants>
