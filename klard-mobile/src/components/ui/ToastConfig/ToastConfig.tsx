import React from "react";
import { View, Text, Pressable } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./toast-config.styles";
import { colors, icons } from "./toast-config.constants";

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
function createToastComponent(type: keyof typeof colors) {
  return function CustomToast({ text1, text2, props }: CustomToastProps) {
    const color = colors[type];
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
        style={[styles.container, { backgroundColor: color.bg, borderLeftColor: color.border }]}
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="alert"
      >
        <Ionicons name={iconName} size={24} color={color.icon} style={styles.icon} />
        <View style={styles.content}>
          {text1 && (
            <Text
              style={[styles.title, { color: color.text }]}
              numberOfLines={2}
              testID="toast-title"
            >
              {text1}
            </Text>
          )}
          {text2 && (
            <Text
              style={[styles.description, { color: color.text }]}
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
              styles.actionButton,
              { backgroundColor: color.border, opacity: pressed ? 0.8 : 1 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={props.action.label}
            testID="toast-action"
          >
            <Text style={styles.actionText}>{props.action.label}</Text>
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
