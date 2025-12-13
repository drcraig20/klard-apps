import React from "react";
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { spacing } from "@/constants/theme";
import {
  overlayStyles,
  contentStyles,
  handleStyles,
  titleStyles,
  descriptionStyles,
  footerStyles,
  getCloseIconColor,
  layoutStyles,
} from "./modal.styles";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlay?: boolean;
  testID?: string;
}

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  closeOnOverlay = true,
  testID = "modal",
}: Readonly<ModalProps>) {
  const isDark = useColorScheme() === "dark";
  const insets = useSafeAreaInsets();

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const handleOverlayPress = async () => {
    if (closeOnOverlay) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onClose();
    }
  };

  return (
    <RNModal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      testID={testID}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={layoutStyles.container}
      >
        {closeOnOverlay ? (
          <Pressable
            style={overlayStyles(isDark, {})}
            onPress={handleOverlayPress}
            testID="modal-overlay"
          />
        ) : (
          <View style={overlayStyles(isDark, {})} testID="modal-overlay" />
        )}

        <View
          style={[
            contentStyles(isDark, {}),
            { paddingBottom: insets.bottom + spacing.md },
          ]}
        >
          <View style={handleStyles(isDark, {})} testID="modal-handle" />

          <View style={layoutStyles.header}>
            {title && (
              <Text
                style={titleStyles(isDark, {})}
                testID="modal-title"
                accessibilityRole="header"
              >
                {title}
              </Text>
            )}
            <Pressable
              onPress={handleClose}
              style={layoutStyles.closeButton}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
            >
              <Ionicons
                name="close"
                size={24}
                color={getCloseIconColor(isDark)}
              />
            </Pressable>
          </View>

          {description && (
            <Text style={descriptionStyles(isDark, {})} testID="modal-description">
              {description}
            </Text>
          )}

          <View style={layoutStyles.body}>{children}</View>

          {footer && (
            <View style={footerStyles(isDark, {})} testID="modal-footer">
              {footer}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

export { Modal };
