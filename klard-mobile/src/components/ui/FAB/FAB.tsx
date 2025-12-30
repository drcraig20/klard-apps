import React from 'react';
import {
  Pressable,
  Text,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { fabContainerStyles, fabLabelStyles } from './fab.styles';

export interface FABProps {
  /** Icon element to display in the FAB */
  icon: React.ReactNode;
  /** Callback when FAB is pressed */
  onPress: () => void;
  /** Optional label for extended FAB */
  label?: string;
  /** Position of the FAB on screen */
  position?: 'bottom-right' | 'bottom-center';
  /** Whether to trigger haptic feedback on press */
  hapticFeedback?: boolean;
  /** Custom styles to apply to the FAB */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
  /** Custom accessibility label */
  accessibilityLabel?: string;
}

/**
 * FAB (Floating Action Button) Component
 *
 * A circular button that floats above the UI for the primary action.
 * Supports extended mode with label for more descriptive actions.
 *
 * @example
 * // Standard FAB
 * <FAB icon={<PlusIcon />} onPress={handleCreate} />
 *
 * @example
 * // Extended FAB with label
 * <FAB icon={<PlusIcon />} label="Create Card" onPress={handleCreate} hapticFeedback />
 *
 * @example
 * // Centered FAB
 * <FAB icon={<PlusIcon />} onPress={handleCreate} position="bottom-center" />
 */
export function FAB({
  icon,
  onPress,
  label,
  position = 'bottom-right',
  hapticFeedback = false,
  style,
  testID,
  accessibilityLabel,
}: Readonly<FABProps>) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const isExtended = Boolean(label && label.length > 0);

  const handlePress = async () => {
    if (hapticFeedback) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? 'Floating action button'}
      style={({ pressed }) => [
        ...fabContainerStyles(isDark, {
          position,
          extended: isExtended ? 'true' : 'false',
          pressed: pressed ? 'true' : undefined,
        }),
        style,
      ]}
    >
      {icon}
      {isExtended && (
        <Text style={fabLabelStyles(isDark, {})}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}