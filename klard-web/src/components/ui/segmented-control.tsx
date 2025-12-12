"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const segmentedControlVariants = cva("", {
  variants: {
    size: {
      sm: "",
      md: "",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    fullWidth: false,
  },
})

const tabsListVariants = cva(
  "bg-slate-100 dark:bg-slate-800",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  }
)

const tabsTriggerVariants = cva(
  "data-[state=active]:bg-white data-[state=active]:text-teal-700 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-teal-400",
  {
    variants: {
      size: {
        sm: "text-sm px-2",
        md: "text-sm px-3",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: false,
    },
  }
)

export interface SegmentedControlOption {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface SegmentedControlProps
  extends VariantProps<typeof segmentedControlVariants> {
  value: string
  onChange: (value: string) => void
  options: SegmentedControlOption[]
  disabled?: boolean
  className?: string
}

function SegmentedControl({
  value,
  onChange,
  options,
  size,
  fullWidth,
  disabled = false,
  className,
}: SegmentedControlProps) {
  return (
    <Tabs
      value={value}
      onValueChange={onChange}
      data-slot="segmented-control"
      className={cn(segmentedControlVariants({ size, fullWidth }), className)}
    >
      <TabsList className={cn(tabsListVariants({ size, fullWidth }))}>
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            disabled={disabled}
            className={cn(tabsTriggerVariants({ size, fullWidth }))}
          >
            {option.icon && <span className="shrink-0 mr-1.5">{option.icon}</span>}
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export { SegmentedControl, segmentedControlVariants }