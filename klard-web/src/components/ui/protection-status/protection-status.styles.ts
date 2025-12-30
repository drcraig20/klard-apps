import { cva, type VariantProps } from "class-variance-authority"

export const protectionStatusVariants = cva(
  [
    "inline-flex items-center gap-2 rounded-full px-4 py-2",
    "text-sm font-medium",
    "bg-teal-50 dark:bg-teal-900/20",
    "text-teal-700 dark:text-teal-300",
    "border border-teal-200 dark:border-teal-700/50",
    "shadow-[0_0_12px_rgba(13,124,122,0.15)] dark:shadow-[0_0_12px_rgba(21,181,176,0.25)]",
    "transition-all duration-200",
  ],
  {
    variants: {
      showPulse: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      showPulse: false,
    },
  }
)

export type ProtectionStatusVariants = VariantProps<typeof protectionStatusVariants>
