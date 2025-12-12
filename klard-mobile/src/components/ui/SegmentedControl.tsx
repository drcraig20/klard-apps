import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9', // slate-100
    borderRadius: 8,
    padding: 2,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  segment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    gap: 4,
  },
  segmentFullWidth: {
    flex: 1,
  },
  firstSegment: {
    // Additional styling for first segment if needed
  },
  lastSegment: {
    // Additional styling for last segment if needed
  },
  selectedSegment: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pressedSegment: {
    opacity: 0.7,
  },
  disabledSegment: {
    opacity: 0.5,
  },
  iconContainer: {
    flexShrink: 0,
  },
  label: {
    fontWeight: '500',
    color: '#64748B', // slate-500
  },
  selectedLabel: {
    color: '#0D7C7A', // teal-700 (Klard primary)
  },
  disabledLabel: {
    color: '#94A3B8', // slate-400
  },
});

const sizeStyles = {
  sm: StyleSheet.create({
    container: {
      height: 32,
    },
    segment: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    label: {
      fontSize: 13,
    },
  }),
  md: StyleSheet.create({
    container: {
      height: 40,
    },
    segment: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    label: {
      fontSize: 14,
    },
  }),
};