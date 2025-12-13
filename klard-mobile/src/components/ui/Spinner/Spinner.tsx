import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  useColorScheme,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { labelStyles, getSpinnerColor, sizeMap, layoutStyles } from "./spinner.styles";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Spinner({
  size = "md",
  color,
  label,
  style,
  testID,
}: Readonly<SpinnerProps>) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const spinnerColor = color ?? getSpinnerColor(isDark);
  const activityIndicatorSize = sizeMap[size];

  if (label) {
    return (
      <View style={[layoutStyles.container, style]}>
        <ActivityIndicator
          size={activityIndicatorSize}
          color={spinnerColor}
          testID={testID}
        />
        <Text style={labelStyles(isDark, {})}>{label}</Text>
      </View>
    );
  }

  return (
    <ActivityIndicator
      size={activityIndicatorSize}
      color={spinnerColor}
      testID={testID}
      style={style}
    />
  );
}