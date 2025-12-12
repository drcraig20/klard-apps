import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

// Klard Design System colors
const colors = {
  success: {
    bg: "#ECFDF5", // green-50
    border: "#059669", // green-600
    text: "#065F46", // green-800
    icon: "#059669",
  },
  error: {
    bg: "#FEF2F2", // red-50
    border: "#DC2626", // red-600
    text: "#991B1B", // red-800
    icon: "#DC2626",
  },
  warning: {
    bg: "#FFFBEB", // amber-50
    border: "#D97706", // amber-600
    text: "#92400E", // amber-800
    icon: "#D97706",
  },
  info: {
    bg: "#F0FDFA", // teal-50
    border: "#0D7C7A", // teal-600
    text: "#115E59", // teal-800
    icon: "#0D7C7A",
  },
};

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  success: "checkmark-circle",
  error: "close-circle",
  warning: "warning",
  info: "information-circle",
};

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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    opacity: 0.9,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
    minHeight: 44, // Accessibility: minimum touch target
    minWidth: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
