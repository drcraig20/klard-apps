import React from 'react';
import {
  View,
  Text,
  Switch as RNSwitch,
  type SwitchProps as RNSwitchProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { styles, colors } from './switch.styles';

export interface SwitchProps {
  /** Whether the switch is checked */
  checked: boolean;
  /** Callback when the switch value changes */
  onChange: (checked: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Style override */
  style?: RNSwitchProps['style'];
}

export function Switch({
  checked,
  onChange,
  disabled,
  size = 'md',
  style,
  ...props
}: SwitchProps) {
  const handleChange = (value: boolean) => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onChange(value);
    }
  };

  const sizeStyle = size === 'sm' ? styles.switchSm : undefined;

  return (
    <RNSwitch
      value={checked}
      onValueChange={handleChange}
      disabled={disabled}
      trackColor={{
        false: colors.trackOff,
        true: colors.trackOn,
      }}
      thumbColor={colors.thumbColor}
      ios_backgroundColor={colors.trackOff}
      accessibilityRole="switch"
      accessibilityState={{
        checked,
        disabled,
      }}
      style={[sizeStyle, style]}
      {...props}
    />
  );
}

export interface SwitchFieldProps extends SwitchProps {
  /** Label text displayed next to the switch */
  label?: string;
  /** Description text displayed below the label */
  description?: string;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
}

export function SwitchField({
  label,
  description,
  checked,
  onChange,
  disabled,
  size = 'md',
  containerStyle,
  ...props
}: SwitchFieldProps) {
  const handleChange = (value: boolean) => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onChange(value);
    }
  };

  const sizeStyle = size === 'sm' ? styles.switchSm : undefined;

  return (
    <View style={[styles.container, containerStyle]}>
      {(label || description) && (
        <View style={styles.textContainer}>
          {label && (
            <Text style={[styles.label, disabled && styles.labelDisabled]}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={[styles.description, disabled && styles.descriptionDisabled]}>
              {description}
            </Text>
          )}
        </View>
      )}
      <RNSwitch
        value={checked}
        onValueChange={handleChange}
        disabled={disabled}
        trackColor={{
          false: colors.trackOff,
          true: colors.trackOn,
        }}
        thumbColor={colors.thumbColor}
        ios_backgroundColor={colors.trackOff}
        accessibilityRole="switch"
        accessibilityLabel={label}
        accessibilityHint={description}
        accessibilityState={{
          checked,
          disabled,
        }}
        style={sizeStyle}
        {...props}
      />
    </View>
  );
}
