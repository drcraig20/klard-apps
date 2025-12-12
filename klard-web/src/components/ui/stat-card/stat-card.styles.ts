import { cva, type VariantProps } from "class-variance-authority"

export const statCardVariants = cva(
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

export type StatCardVariants = VariantProps<typeof statCardVariants>
