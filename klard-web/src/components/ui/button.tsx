import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

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
        // Klard-specific variants
        klard:
          "bg-gradient-to-br from-[hsl(173,79%,27%)] to-[hsl(173,79%,20%)] dark:from-[hsl(176,78%,39%)] dark:to-[hsl(173,79%,27%)] text-white font-semibold shadow-[0_0_20px_rgba(13,124,122,0.3)] dark:shadow-[0_0_24px_rgba(21,181,176,0.35)] hover:opacity-90",
        social:
          "bg-transparent border border-border text-foreground font-medium hover:border-border/50 hover:bg-muted/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        md: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-[var(--radius-default)] px-8 has-[>svg]:px-4",
        icon: "size-9",
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

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseClassName = cn(
    buttonVariants({ variant, size }),
    fullWidth && "w-full",
    className
  )
  const isDisabled = disabled || loading

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<{ className?: string }>
    const childClassName = childElement.props.className
    const content = (
      <>
        {iconPosition === "left" && !loading && icon}
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          childElement.props.children
        )}
        {iconPosition === "right" && !loading && icon}
      </>
    )

    return (
      <Slot
        data-slot="button"
        className={cn(baseClassName, childClassName)}
        {...props}
      >
        {React.cloneElement(childElement, { disabled: isDisabled }, content)}
      </Slot>
    )
  }

  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={baseClassName}
      disabled={isDisabled}
      {...props}
    >
      {iconPosition === "left" && !loading && icon}
      {loading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        children
      )}
      {iconPosition === "right" && !loading && icon}
    </Comp>
  )
}

export { Button, buttonVariants }
