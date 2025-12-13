import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        primary:
          "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
        success:
          "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
        warning:
          "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
        error:
          "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
        outline:
          "bg-transparent border border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-400",
        secondary: "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground focus:ring-destructive/20 dark:focus:ring-destructive/40",
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-sm px-2.5 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

export { badgeVariants }
