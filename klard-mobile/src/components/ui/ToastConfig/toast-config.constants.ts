import { Ionicons } from "@expo/vector-icons";

// Klard Design System colors
export const colors = {
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

export const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  success: "checkmark-circle",
  error: "close-circle",
  warning: "warning",
  info: "information-circle",
};
