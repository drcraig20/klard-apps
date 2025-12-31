import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-default)] text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Klard-specific variants with glassmorphism effects
        klard:
          "bg-gradient-to-br from-primary to-primary/80 dark:from-primary dark:to-primary/70 text-white font-semibold shadow-[var(--rec-glow-primary)] hover:scale-[1.02] hover:shadow-glow-primary active:scale-[0.98]",
        burn:
          "bg-success text-white font-semibold shadow-[var(--rec-glow-success)] hover:bg-success/90 hover:scale-[1.02] hover:shadow-glow-success active:scale-[0.98]",
        // social: Web-only - Mobile uses native auth sheets (Apple/Google Sign-In)
        // See docs/design/component-variants.md for rationale
        social:
          "bg-transparent border border-border text-foreground font-medium hover:border-border/50 hover:bg-muted/50",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        md: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-[var(--radius-default)] px-8 has-[>svg]:px-4",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export { buttonVariants }
