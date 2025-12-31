import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  labelStyles,
  requiredStyles,
  triggerStyles,
  valueStyles,
  pickerContainerStyles,
  errorStyles,
  getIconColor,
  layoutStyles,
} from './date-picker.styles';
import { isValidDate, getDisplayedComponents } from './date-picker.utils';

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
}: Readonly<DatePickerProps>) {
  const { isDark, ...colors } = useThemeColors();
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
  const iconColor = getIconColor(colors, disabled);

  return (
    <View style={[layoutStyles.container, containerStyle]}>
      {label ? (
        <Text style={labelStyles(isDark, { disabled: disabled ? 'true' : undefined })}>
          {label}
          {required ? <Text style={requiredStyles(isDark, {})}> *</Text> : null}
        </Text>
      ) : null}

      <Pressable
        onPress={handlePress}
        disabled={disabled}
        testID="date-picker-trigger"
        accessibilityLabel={label}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={triggerStyles(isDark, {
          error: error ? 'true' : undefined,
          disabled: disabled ? 'true' : undefined,
        })}
      >
        <Ionicons
          name="calendar-outline"
          size={20}
          color={iconColor}
        />
        <Text
          style={valueStyles(isDark, {
            placeholder: !validValue ? 'true' : undefined,
            disabled: disabled ? 'true' : undefined,
          })}
        >
          {displayValue ?? placeholder}
        </Text>
      </Pressable>

      {showPicker && Platform.OS === 'ios' && SwiftUIDateTimePicker && Host ? (
        <View style={pickerContainerStyles(isDark, {})} testID="date-picker-modal">
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
        <Text style={errorStyles(isDark, {})} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
