import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary:
          "bg-primary/10 text-primary dark:bg-primary/20 shadow-[0_0_8px_rgba(21,181,176,0.3)]",
        success:
          "bg-success/10 text-success dark:bg-success/20 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
        warning:
          "bg-warning/10 text-warning dark:bg-warning/20 shadow-[0_0_8px_rgba(245,158,11,0.3)]",
        error:
          "bg-error/10 text-error dark:bg-error/20 shadow-[0_0_8px_rgba(239,68,68,0.3)]",
        outline: "bg-transparent border border-border text-muted-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground focus:ring-destructive/20 dark:focus:ring-destructive/40 shadow-[0_0_8px_rgba(239,68,68,0.3)]",
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
