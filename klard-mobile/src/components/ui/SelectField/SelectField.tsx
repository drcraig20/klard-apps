import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { styles, colors } from './select-field.styles';

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
