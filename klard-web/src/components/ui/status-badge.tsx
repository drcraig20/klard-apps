"use client"

import {
  CheckCircle,
  Clock,
  PauseCircle,
  Ban,
  XCircle,
  Lock,
  Hourglass,
  type LucideIcon,
} from "lucide-react"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusType =
  | "active"
  | "trial"
  | "paused"
  | "blocked"
  | "cancelled"
  | "locked"
  | "expired"
  | "pending"

type StatusConfig = {
  label: string
  variant: BadgeProps["variant"]
  icon: LucideIcon
}

const statusConfig: Record<StatusType, StatusConfig> = {
  active: { label: "Active", variant: "success", icon: CheckCircle },
  trial: { label: "Trial", variant: "warning", icon: Clock },
  paused: { label: "Paused", variant: "default", icon: PauseCircle },
  blocked: { label: "Blocked", variant: "error", icon: Ban },
  cancelled: { label: "Cancelled", variant: "default", icon: XCircle },
  locked: { label: "Locked", variant: "warning", icon: Lock },
  expired: { label: "Expired", variant: "default", icon: Clock },
  pending: { label: "Pending", variant: "default", icon: Hourglass },
}

export interface StatusBadgeProps
  extends Omit<BadgeProps, "variant" | "icon" | "children"> {
  status: StatusType
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge
      variant={config.variant}
      icon={<Icon className="h-3 w-3" aria-hidden="true" />}
      className={cn(className)}
      {...props}
    >
      {config.label}
    </Badge>
  )
}

export { statusConfig }
