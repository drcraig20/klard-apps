'use client';

import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { emptyStateVariants } from "./empty-state.styles"

/**
 * EmptyState Component
 *
 * Displays an empty state with 3 distinct variant tones:
 * - first-time: Educational/onboarding tone for first-time users
 * - cleared: Celebratory tone when all items are completed
 * - error: Recovery-focused tone for error states
 *
 * SOLID Compliance:
 * - SRP: Only renders empty state container UI
 * - OCP: Extensible via variant prop without modification
 * - DIP: Depends on design token abstractions via styles
 */

export type EmptyStateVariant = 'first-time' | 'cleared' | 'error' | 'default';

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  /** The visual tone of the empty state */
  variant?: EmptyStateVariant;
}

function EmptyState({
  className,
  size,
  variant = 'default',
  children,
  ...props
}: Readonly<EmptyStateProps>) {
  // Generate testID based on variant for testing
  const testId = variant && variant !== 'default'
    ? `empty-state-${variant}`
    : undefined;

  return (
    <div
      data-slot="empty-state"
      data-testid={testId}
      className={cn(emptyStateVariants({ size, variant }), className)}
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