import React from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native"

export interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: string
  label?: string
  style?: StyleProp<ViewStyle>
  testID?: string
}

const sizeMap = {
  sm: "small" as const,
  md: "small" as const,
  lg: "large" as const,
}

export function Spinner({
  size = "md",
  color = "#0D7C7A",
  label,
  style,
  testID,
}: SpinnerProps) {
  const activityIndicatorSize = sizeMap[size]

  if (label) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator
          size={activityIndicatorSize}
          color={color}
          testID={testID}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    )
  }

  return (
    <ActivityIndicator
      size={activityIndicatorSize}
      color={color}
      testID={testID}
      style={style}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#475569",
  },
})
