import { View, Text, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as Haptics from 'expo-haptics';
import { useThemeColors } from '@/hooks';
import { styles } from './checkbox-field.styles';

export interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

export function CheckboxField({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}: CheckboxFieldProps) {
  const colors = useThemeColors();

  const handleChange = async (value: boolean) => {
    if (disabled) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(value);
  };

  const handlePress = () => {
    handleChange(!checked);
  };

  return (
    <Pressable
      testID="checkbox-pressable"
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
      style={styles.container}
    >
      <Checkbox
        testID="checkbox"
        value={checked}
        onValueChange={handleChange}
        disabled={disabled}
        color={checked ? colors.primary : undefined}
        style={styles.checkbox}
      />
      {(label || description) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text
              style={[
                styles.label,
                { color: colors.foreground },
                disabled && styles.labelDisabled,
              ]}
            >
              {label}
            </Text>
          )}
          {description && (
            <Text
              style={[
                styles.description,
                { color: colors.textSecondary },
                disabled && styles.descriptionDisabled,
              ]}
            >
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}