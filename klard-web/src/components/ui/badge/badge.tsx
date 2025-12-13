"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { badgeVariants, type BadgeVariants } from "./badge.styles"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BadgeVariants {
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

export { Badge }
