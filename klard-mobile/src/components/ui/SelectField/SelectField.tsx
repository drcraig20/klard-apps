import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  useColorScheme,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {
  labelStyles,
  triggerStyles,
  triggerTextStyles,
  errorStyles,
  overlayStyles,
  modalContentStyles,
  modalHeaderStyles,
  modalTitleStyles,
  optionStyles,
  optionTextStyles,
  getIconColor,
  getCloseIconColor,
  getPrimaryColor,
  layoutStyles,
} from './select-field.styles';

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
  const isDark = useColorScheme() === 'dark';
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

  const chevronColor = getIconColor(disabled, isDark);
  const closeIconColor = getCloseIconColor(isDark);
  const primaryColor = getPrimaryColor(isDark);

  return (
    <View style={[layoutStyles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={labelStyles(isDark, { disabled: disabled ? 'true' : undefined })}>
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
        style={triggerStyles(isDark, {
          error: error ? 'true' : undefined,
          disabled: disabled ? 'true' : undefined,
        })}
      >
        <Text
          style={triggerTextStyles(isDark, {
            placeholder: !selectedOption ? 'true' : undefined,
            disabled: disabled ? 'true' : undefined,
          })}
        >
          {displayText}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={chevronColor}
        />
      </Pressable>

      {/* Error message */}
      {error && (
        <Text style={errorStyles(isDark, {})} accessibilityRole="alert">
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
          <Pressable style={overlayStyles(isDark, {})} onPress={handleClose}>
            <View style={modalContentStyles(isDark, {})}>
              <View style={modalHeaderStyles(isDark, {})}>
                <Text style={modalTitleStyles(isDark, {})}>{label || 'Select'}</Text>
                <Pressable onPress={handleClose} style={layoutStyles.closeButton}>
                  <Ionicons name="close" size={24} color={closeIconColor} />
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
                    style={optionStyles(isDark, {
                      selected: item.value === value ? 'true' : undefined,
                      disabled: item.disabled ? 'true' : undefined,
                    })}
                  >
                    {item.icon && <View style={layoutStyles.optionIcon}>{item.icon}</View>}
                    <Text
                      style={optionTextStyles(isDark, {
                        selected: item.value === value ? 'true' : undefined,
                        disabled: item.disabled ? 'true' : undefined,
                      })}
                    >
                      {item.label}
                    </Text>
                    {item.value === value && (
                      <Ionicons name="checkmark" size={20} color={primaryColor} />
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
