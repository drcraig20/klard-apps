"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

// TabsList and TabsTrigger variants for TabsContainer
const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  {
    variants: {
      size: {
        md: "h-10 gap-1",
        sm: "h-8 gap-0.5 text-sm",
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
  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-primary",
  {
    variants: {
      size: {
        md: "py-1.5 text-sm",
        sm: "py-1 text-xs",
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

// TabItem interface for TabsContainer
export interface TabItem {
  value: string
  label: string
  badge?: number
  icon?: React.ReactNode
  disabled?: boolean
}

// TabsContainerProps interface
export interface TabsContainerProps {
  value: string
  onChange: (value: string) => void
  tabs: TabItem[]
  children: React.ReactNode
  size?: "sm" | "md"
  fullWidth?: boolean
  className?: string
}

// TabsContainer component
function TabsContainer({
  value,
  onChange,
  tabs,
  children,
  size = "md",
  fullWidth = false,
  className,
}: TabsContainerProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      value={value}
      onValueChange={onChange}
      className={cn("flex flex-col gap-2", className)}
    >
      <TabsList
        className={tabsListVariants({ size, fullWidth })}
        data-size={size}
        data-full-width={fullWidth ? "true" : undefined}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={cn(tabsTriggerVariants({ size, fullWidth }), "gap-2")}
            data-slot="tabs.trigger"
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <Badge variant="secondary" size="sm" className="ml-1">
                {tab.badge}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </TabsPrimitive.Root>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsContainer }
