import React from 'react';
import {
  View,
  Text,
  Pressable,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import {
  containerStyles,
  segmentStyles,
  labelStyles,
  layoutStyles,
} from './segmented-control.styles';

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
}: Readonly<SegmentedControlProps>) {
  const isDark = useColorScheme() === 'dark';

  const handlePress = async (optionValue: string) => {
    if (disabled || optionValue === value) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(optionValue);
  };

  return (
    <View
      style={[
        containerStyles(isDark, { size }),
        fullWidth && layoutStyles.fullWidth,
        style,
      ]}
      testID={testID}
      accessibilityRole="tablist"
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            testID={`segment-${option.value}`}
            onPress={() => handlePress(option.value)}
            disabled={disabled}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected, disabled }}
            style={({ pressed }) => [
              segmentStyles(isDark, {
                size,
                selected: isSelected ? 'true' : undefined,
                pressed: pressed ? 'true' : undefined,
                disabled: disabled ? 'true' : undefined,
              }),
              fullWidth && layoutStyles.segmentFullWidth,
            ]}
          >
            {option.icon && (
              <View style={layoutStyles.iconContainer}>{option.icon}</View>
            )}
            <Text
              style={labelStyles(isDark, {
                size,
                selected: isSelected ? 'true' : undefined,
                disabled: disabled ? 'true' : undefined,
              })}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
