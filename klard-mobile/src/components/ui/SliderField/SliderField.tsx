import { View, Text, Platform, type StyleProp, type ViewStyle } from 'react-native';
import { useThemeColors } from '@/hooks';
import { styles } from './slider-field.styles';

// iOS - Native SwiftUI Slider
import { Host, Slider as SwiftUISlider } from '@expo/ui/swift-ui';

// Android - Community Slider
import CommunitySlider from '@react-native-community/slider';

export interface SliderFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function SliderField({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  disabled = false,
  style,
}: SliderFieldProps) {
  const colors = useThemeColors();

  // Normalize value to 0-1 range for @expo/ui Slider
  const normalizedValue = (value - min) / (max - min || 1);

  const handleIOSChange = (normalizedVal: number) => {
    const range = max - min || 1;
    const actualValue = min + normalizedVal * range;
    const steppedValue = Math.round(actualValue / step) * step;
    onChange(Math.min(Math.max(steppedValue, min), max));
  };

  return (
    <View
      testID="slider-field-container"
      accessibilityRole="adjustable"
      accessibilityValue={{ now: value, min, max }}
      style={[styles.container, style]}
    >
      {(label || showValue) && (
        <View style={styles.labelRow}>
          {label && (
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              {label}
            </Text>
          )}
          {showValue && (
            <Text style={[styles.value, { color: colors.textSecondary }]}>
              {value}
            </Text>
          )}
        </View>
      )}

      {Platform.OS === 'ios' ? (
        <Host testID="host" style={styles.sliderContainer}>
          <SwiftUISlider
            testID="slider-ios"
            value={normalizedValue}
            onValueChange={handleIOSChange}
            // SwiftUI slider component does not accept disabled prop; Host wrapping handles visual state.
          />
        </Host>
      ) : (
        <CommunitySlider
          testID="slider-android"
          style={styles.sliderContainer}
          value={value}
          onValueChange={onChange}
          minimumValue={min}
          maximumValue={max}
          step={step}
          disabled={disabled}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.muted}
          thumbTintColor={colors.primary}
        />
      )}
    </View>
  );
}
