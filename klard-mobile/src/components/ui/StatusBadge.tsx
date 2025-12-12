import React from "react"
import { type StyleProp, type ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Badge, type BadgeProps } from "@/components/ui/Badge"

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
  icon: React.ComponentProps<typeof Ionicons>["name"]
}

const statusConfig: Record<StatusType, StatusConfig> = {
  active: { label: "Active", variant: "success", icon: "checkmark-circle" },
  trial: { label: "Trial", variant: "warning", icon: "time" },
  paused: { label: "Paused", variant: "default", icon: "pause-circle" },
  blocked: { label: "Blocked", variant: "error", icon: "ban" },
  cancelled: { label: "Cancelled", variant: "default", icon: "close-circle" },
  locked: { label: "Locked", variant: "warning", icon: "lock-closed" },
  expired: { label: "Expired", variant: "default", icon: "time" },
  pending: { label: "Pending", variant: "default", icon: "hourglass" },
}

// Icon colors based on variant
const variantIconColors: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "#334155", // slate-700
  primary: "#0D7C7A", // teal-700
  success: "#15803D", // green-700
  warning: "#B45309", // amber-700
  error: "#B91C1C", // red-700
  outline: "#475569", // slate-600
}

export interface StatusBadgeProps {
  status: StatusType
  style?: StyleProp<ViewStyle>
  testID?: string
}

export function StatusBadge({ status, style, testID }: StatusBadgeProps) {
  const config = statusConfig[status]
  const color = variantIconColors[config.variant ?? "default"]

  return (
    <Badge
      variant={config.variant}
      icon={
        <Ionicons
          name={config.icon}
          size={12}
          color={color}
          testID="status-icon"
        />
      }
      style={style}
      testID={testID}
    >
      {config.label}
    </Badge>
  )
}

export { statusConfig }
