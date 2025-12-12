"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  segmentedControlVariants,
  tabsListVariants,
  tabsTriggerVariants
} from "./segmented-control.styles"

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

export function SegmentedControl({
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
