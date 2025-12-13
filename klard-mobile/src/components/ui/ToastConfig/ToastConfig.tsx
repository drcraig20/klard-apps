import React from "react";
import { View, Text, Pressable, useColorScheme } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import {
  containerStyles,
  titleStyles,
  descriptionStyles,
  actionButtonStyles,
  getIconColor,
  icons,
  layoutStyles
} from "./toast-config.styles";

interface CustomToastProps extends BaseToastProps {
  props?: {
    action?: {
      label: string;
      onClick: () => void;
    };
  };
}

/**
 * Create a styled toast component for a specific type
 */
function createToastComponent(type: 'success' | 'error' | 'warning' | 'info') {
  return function CustomToast({ text1, text2, props }: CustomToastProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const iconName = icons[type];

    // Build accessibility label
    const accessibilityLabel = [
      `${type}:`,
      text1,
      text2,
      props?.action?.label ? `${props.action.label} button available.` : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <View
        style={containerStyles(isDark, { type })}
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="alert"
      >
        <Ionicons
          name={iconName}
          size={24}
          color={getIconColor(type, isDark)}
          style={layoutStyles.icon}
        />
        <View style={layoutStyles.content}>
          {text1 && (
            <Text
              style={titleStyles(isDark, { type })}
              numberOfLines={2}
              testID="toast-title"
            >
              {text1}
            </Text>
          )}
          {text2 && (
            <Text
              style={descriptionStyles(isDark, { type })}
              numberOfLines={3}
              testID="toast-description"
            >
              {text2}
            </Text>
          )}
        </View>
        {props?.action && (
          <Pressable
            onPress={props.action.onClick}
            style={({ pressed }) => [
              actionButtonStyles(isDark, { type }),
              { opacity: pressed ? 0.8 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={props.action.label}
            testID="toast-action"
          >
            <Text style={layoutStyles.actionText}>{props.action.label}</Text>
          </Pressable>
        )}
      </View>
    );
  };
}

/**
 * Klard-styled toast configuration for react-native-toast-message
 */
export const toastConfig = {
  success: createToastComponent("success"),
  error: createToastComponent("error"),
  warning: createToastComponent("warning"),
  info: createToastComponent("info"),
};
