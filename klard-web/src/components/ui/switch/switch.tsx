"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { switchVariants, thumbVariants } from "./switch.styles"

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(thumbVariants({ size }))}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
