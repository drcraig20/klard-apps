import { cn } from "@/lib/utils"

import { Spinner } from "./spinner"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "white"
  className?: string
}

/**
 * @deprecated Use Spinner from './spinner' instead
 */
export function LoadingSpinner({
  size = "md",
  variant = "primary",
  className = "",
}: Readonly<LoadingSpinnerProps>) {
  const colorClass = variant === "white" ? "text-white" : "text-primary"

  return (
    <Spinner
      size={size}
      className={cn(colorClass, className)}
    />
  )
}
