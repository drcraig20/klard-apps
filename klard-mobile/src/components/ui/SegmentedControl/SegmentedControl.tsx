import React from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { styles, sizeStyles } from './segmented-control.styles';

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  options: SegmentedControlOption[];
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function SegmentedControl({
  value,
  onChange,
  options,
  size = 'md',
  fullWidth = false,
  disabled = false,
  style,
  testID,
}: SegmentedControlProps) {
  const handlePress = async (optionValue: string) => {
    if (disabled || optionValue === value) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(optionValue);
  };

  return (
    <View
      style={[
        styles.container,
        sizeStyles[size].container,
        fullWidth && styles.fullWidth,
        style,
      ]}
      testID={testID}
      accessibilityRole="tablist"
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <Pressable
            key={option.value}
            testID={`segment-${option.value}`}
            onPress={() => handlePress(option.value)}
            disabled={disabled}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected, disabled }}
            style={({ pressed }) => [
              styles.segment,
              sizeStyles[size].segment,
              fullWidth && styles.segmentFullWidth,
              isFirst && styles.firstSegment,
              isLast && styles.lastSegment,
              isSelected && styles.selectedSegment,
              pressed && !disabled && styles.pressedSegment,
              disabled && styles.disabledSegment,
            ]}
          >
            {option.icon && (
              <View style={styles.iconContainer}>{option.icon}</View>
            )}
            <Text
              style={[
                styles.label,
                sizeStyles[size].label,
                isSelected && styles.selectedLabel,
                disabled && styles.disabledLabel,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
