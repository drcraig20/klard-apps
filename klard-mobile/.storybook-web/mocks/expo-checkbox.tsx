/**
 * expo-checkbox mock for Storybook web environment
 *
 * Renders an HTML checkbox input styled to match the Expo component.
 */

import React from 'react';
import { type ViewStyle } from 'react-native';

export interface CheckboxProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value = false,
  onValueChange,
  disabled = false,
  color = '#007AFF',
  style,
  accessibilityLabel,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={value}
      onChange={handleChange}
      disabled={disabled}
      aria-label={accessibilityLabel}
      style={{
        width: 22,
        height: 22,
        accentColor: color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        margin: 0,
        ...(style as React.CSSProperties),
      }}
    />
  );
};

export default Checkbox;
