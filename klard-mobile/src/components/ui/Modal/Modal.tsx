import React from "react";
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { colors, spacing } from "@/constants/theme";
import { styles } from "./modal.styles";

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
}: ModalProps) {
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
        style={styles.container}
      >
        {closeOnOverlay ? (
          <Pressable
            style={styles.overlay}
            onPress={handleOverlayPress}
            testID="modal-overlay"
          />
        ) : (
          <View style={styles.overlay} testID="modal-overlay" />
        )}

        <View
          style={[styles.content, { paddingBottom: insets.bottom + spacing.md }]}
        >
          <View style={styles.handle} testID="modal-handle" />

          <View style={styles.header}>
            {title && (
              <Text
                style={styles.title}
                testID="modal-title"
                accessibilityRole="header"
              >
                {title}
              </Text>
            )}
            <Pressable
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
            >
              <Ionicons name="close" size={24} color={colors.slate[500]} />
            </Pressable>
          </View>

          {description && (
            <Text style={styles.description} testID="modal-description">
              {description}
            </Text>
          )}

          <View style={styles.body}>{children}</View>

          {footer && (
            <View style={styles.footer} testID="modal-footer">
              {footer}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

export { Modal };
