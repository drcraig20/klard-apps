import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "@/components/ui/Badge";
import { statusConfig, variantIconColors, type StatusType } from "./status-badge.constants";

export interface StatusBadgeProps {
  status: StatusType;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function StatusBadge({ status, style, testID }: StatusBadgeProps) {
  const config = statusConfig[status];
  const color = variantIconColors[config.variant ?? "default"];

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
  );
}