"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

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

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
}

function Badge({
  className,
  variant,
  size,
  asChild = false,
  icon,
  removable = false,
  onRemove,
  children,
  ...props
  }: BadgeProps) {
  const baseClassName = badgeVariants({ variant, size })

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<Record<string, unknown>>
    const childClassName = (childElement.props as { className?: string })
      .className
    const childContent = childElement.props.children

    const childWithContent = React.cloneElement(childElement, {
      children: (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {childContent}
          {removable && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onRemove?.()
              }}
              className="ml-0.5 shrink-0 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current"
              aria-label="Remove"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          )}
        </>
      ),
    })

    return (
      <Slot
        data-slot="badge"
        className={cn(
          baseClassName,
          childClassName,
          className
        )}
        {...props}
      >
        {childWithContent}
      </Slot>
    )
  }

  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(baseClassName, className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          className="ml-0.5 shrink-0 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current"
          aria-label="Remove"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      )}
    </Comp>
  )
}

export { Badge, badgeVariants }
