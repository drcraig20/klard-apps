import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Platform-specific imports
let SwiftUIDateTimePicker: any;
let Host: any;
let JetpackDateTimePicker: any;

if (Platform.OS === 'ios') {
  const swiftUI = require('@expo/ui/swift-ui');
  SwiftUIDateTimePicker = swiftUI.DateTimePicker;
  Host = swiftUI.Host;
} else if (Platform.OS === 'android') {
  const jetpack = require('@expo/ui/jetpack-compose');
  JetpackDateTimePicker = jetpack.DateTimePicker;
}

export interface DatePickerProps {
  /** Currently selected date */
  value: Date | null;
  /** Callback when date changes */
  onChange: (date: Date | null) => void;
  /** Label text displayed above the picker */
  label?: string;
  /** Error message - displays in red below picker */
  error?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Placeholder text when no date selected */
  placeholder?: string;
  /** Selection mode */
  mode?: 'date' | 'time' | 'datetime';
  /** Disables the picker */
  disabled?: boolean;
  /** Shows required asterisk after label */
  required?: boolean;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
}

function isValidDate(value: Date | null | undefined): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function getDisplayedComponents(mode: 'date' | 'time' | 'datetime'): string {
  if (mode === 'time') return 'hourAndMinute';
  if (mode === 'datetime') return 'date';
  return 'date';
}

export function DatePicker({
  value,
  onChange,
  label,
  error,
  minDate,
  maxDate,
  placeholder = 'Pick a date',
  mode = 'date',
  disabled = false,
  required = false,
  containerStyle,
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const validValue = isValidDate(value) ? value : null;
  const displayValue = validValue
    ? mode === 'time'
      ? validValue.toLocaleTimeString()
      : validValue.toLocaleDateString()
    : null;

  const handleDateSelected = async (dateString: string) => {
    const selectedDate = new Date(dateString);
    if (isValidDate(selectedDate)) {
      if (minDate && selectedDate < minDate) return;
      if (maxDate && selectedDate > maxDate) return;
      onChange(selectedDate);
      const impact =
        typeof Haptics.impactAsync === 'function'
          ? Haptics.impactAsync
          : (Haptics as { default?: { impactAsync?: typeof Haptics.impactAsync } }).default
              ?.impactAsync;
      if (typeof impact === 'function') {
        await impact(Haptics.ImpactFeedbackStyle.Light);
      }
    }
    setShowPicker(false);
  };

  const handlePress = () => {
    if (disabled) return;
    setShowPicker(true);
  };

  const displayedComponents = getDisplayedComponents(mode);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
          {required ? <Text style={styles.required}> *</Text> : null}
        </Text>
      ) : null}

      <Pressable
        onPress={handlePress}
        disabled={disabled}
        testID="date-picker-trigger"
        accessibilityLabel={label}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={[
          styles.trigger,
          { borderColor: error ? colors.error : colors.border, borderWidth: error ? 2 : 1 },
          disabled && styles.triggerDisabled,
        ]}
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color={disabled ? colors.iconDisabled : colors.icon}
        />
        <Text
          style={[
            styles.value,
            !validValue && styles.placeholder,
            disabled && styles.valueDisabled,
          ]}
        >
          {displayValue ?? placeholder}
        </Text>
      </Pressable>

      {showPicker && Platform.OS === 'ios' && SwiftUIDateTimePicker && Host ? (
        <View style={styles.pickerContainer} testID="date-picker-modal">
          <Host matchContents>
            <SwiftUIDateTimePicker
              onDateSelected={handleDateSelected}
              displayedComponents={displayedComponents}
              initialDate={(validValue ?? new Date()).toISOString()}
              variant="wheel"
              minimumDate={minDate?.toISOString()}
              maximumDate={maxDate?.toISOString()}
            />
          </Host>
        </View>
      ) : null}

      {showPicker && Platform.OS === 'android' && JetpackDateTimePicker ? (
        <JetpackDateTimePicker
          testID="date-picker-modal"
          onDateSelected={handleDateSelected}
          displayedComponents={displayedComponents}
          initialDate={(validValue ?? new Date()).toISOString()}
          variant="picker"
          minimumDate={minDate?.toISOString()}
          maximumDate={maxDate?.toISOString()}
        />
      ) : null}

      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const colors = {
  primary: '#0D7C7A',
  error: '#DC2626',
  border: '#CBD5E1',
  placeholder: '#94A3B8',
  icon: '#64748B',
  iconDisabled: '#94A3B8',
  text: '#0F172A',
  textSecondary: '#475569',
  background: '#FFFFFF',
  backgroundDisabled: '#F1F5F9',
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
  required: {
    color: colors.error,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    gap: 12,
  },
  triggerDisabled: {
    backgroundColor: colors.backgroundDisabled,
    opacity: 0.7,
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  placeholder: {
    color: colors.placeholder,
  },
  valueDisabled: {
    color: colors.icon,
  },
  pickerContainer: {
    marginTop: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
  },
  error: {
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  },
});
