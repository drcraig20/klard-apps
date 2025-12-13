import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { styles } from "./spinner.styles";
import { sizeMap, DEFAULT_SPINNER_COLOR } from "./spinner.constants";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Spinner({
  size = "md",
  color = DEFAULT_SPINNER_COLOR,
  label,
  style,
  testID,
}: SpinnerProps) {
  const activityIndicatorSize = sizeMap[size];

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
    );
  }

  return (
    <ActivityIndicator
      size={activityIndicatorSize}
      color={color}
      testID={testID}
      style={style}
    />
  );
}