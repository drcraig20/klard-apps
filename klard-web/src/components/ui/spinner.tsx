import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const

export interface SpinnerProps
  extends Omit<React.ComponentProps<typeof LoaderIcon>, "size"> {
  size?: keyof typeof sizeMap
  label?: string
}

function Spinner({ className, size = "md", label, ...props }: Readonly<SpinnerProps>) {
  const spinner = (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn(sizeMap[size], "animate-spin", className)}
      {...props}
    />
  )

  if (label) {
    return (
      <div className="flex items-center gap-2">
        {spinner}
        <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
      </div>
    )
  }

  return spinner
}

export { Spinner }
import type * as React from "react"
