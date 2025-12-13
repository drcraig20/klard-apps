import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { emptyStateVariants } from "./empty-state.styles"

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

function EmptyState({
  className,
  size,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(emptyStateVariants({ size }), className)}
      aria-live="polite"
      {...props}
    >
      {children}
    </div>
  )
}

function EmptyStateMedia({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="empty-state-media"
      className={cn("mb-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function EmptyStateTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn(
        "text-lg font-semibold text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

function EmptyStateDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(
        "text-sm text-muted-foreground max-w-sm",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

function EmptyStateActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="empty-state-actions"
      className={cn("flex gap-3 mt-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  EmptyState,
  EmptyStateMedia,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
}
