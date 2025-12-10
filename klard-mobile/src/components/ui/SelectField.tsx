import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectFieldProps {
  /** Currently selected value */
  value: string;
  /** Called when selection changes */
  onChange: (value: string) => void;
  /** Available options */
  options: SelectOption[];
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Label text displayed above the select */
  label?: string;
  /** Error message - displays in red below select */
  error?: string;
  /** Disables the select */
  disabled?: boolean;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  label,
  error,
  disabled = false,
  containerStyle,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleSelect = async (optionValue: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getBorderColor = () => {
    if (error) return colors.error;
    return colors.border;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}

      {/* Trigger */}
      <Pressable
        testID="select-trigger"
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityLabel={label}
        accessibilityState={{ disabled, expanded: isOpen }}
        style={[
          styles.trigger,
          { borderColor: getBorderColor() },
          disabled && styles.triggerDisabled,
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            !selectedOption && styles.placeholder,
            disabled && styles.textDisabled,
          ]}
        >
          {displayText}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={disabled ? colors.icon : colors.textSecondary}
        />
      </Pressable>

      {/* Error message */}
      {error && (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}

      {/* Selection Modal */}
      {isOpen && (
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={handleClose}
          testID="select-modal"
        >
          <Pressable style={styles.overlay} onPress={handleClose}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{label || 'Select'}</Text>
                <Pressable onPress={handleClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </Pressable>
              </View>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    testID={`select-option-${item.value}`}
                    onPress={() => !item.disabled && handleSelect(item.value)}
                    disabled={item.disabled}
                    style={[
                      styles.option,
                      item.value === value && styles.optionSelected,
                      item.disabled && styles.optionDisabled,
                    ]}
                  >
                    {item.icon && <View style={styles.optionIcon}>{item.icon}</View>}
                    <Text
                      style={[
                        styles.optionText,
                        item.value === value && styles.optionTextSelected,
                        item.disabled && styles.optionTextDisabled,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.value === value && (
                      <Ionicons name="checkmark" size={20} color={colors.primary} />
                    )}
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

// Color constants aligned with Klard design system
const colors = {
  primary: '#0D7C7A',
  error: '#DC2626',
  border: '#CBD5E1',
  placeholder: '#94A3B8',
  icon: '#64748B',
  text: '#0F172A',
  textSecondary: '#475569',
  background: '#FFFFFF',
  backgroundDisabled: '#F1F5F9',
  overlay: 'rgba(15, 23, 42, 0.5)',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
  },
  triggerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.7,
  },
  triggerText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  placeholder: {
    color: colors.placeholder,
  },
  textDisabled: {
    color: colors.icon,
  },
  error: {
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  optionSelected: {
    backgroundColor: '#F0FDFA',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '500',
  },
  optionTextDisabled: {
    color: colors.icon,
  },
});