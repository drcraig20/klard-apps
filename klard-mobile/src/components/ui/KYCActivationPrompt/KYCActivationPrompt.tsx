import React from 'react';
import {
  View,
  Text,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { lightTheme, darkTheme } from '@/styles/colors';
import {
  containerStyles,
  iconContainerStyles,
  titleStyles,
  descriptionStyles,
  buttonContainerStyles,
} from './kyc-activation-prompt.styles';

export type KYCActivationPromptVariant = 'inline' | 'modal' | 'card-overlay';

export interface KYCActivationPromptProps {
  /** Name of the card being activated */
  cardName: string;
  /** Callback when user clicks activate */
  onActivate: () => void;
  /** Layout variant */
  variant?: KYCActivationPromptVariant;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
}

/**
 * KYCActivationPrompt displays a prompt for KYC verification with positive "activation" framing.
 *
 * Features:
 * - Uses "activation" framing instead of "verification"
 * - Shows card name in description
 * - Three variant layouts: inline, modal, card-overlay
 * - Shield icon for trust
 * - Glassmorphism styling
 *
 * SRP: Only handles display of KYC activation prompt
 * OCP: Extensible via variant prop and style
 * DIP: Depends on Button abstraction via composition
 */
export function KYCActivationPrompt({
  cardName,
  onActivate,
  variant = 'inline',
  style,
}: Readonly<KYCActivationPromptProps>) {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? darkTheme : lightTheme;
  const testId = `kyc-prompt-${variant}`;

  return (
    <View
      testID={testId}
      accessibilityRole="none"
      accessibilityLabel="KYC activation prompt"
      style={[containerStyles(isDark, { variant }), style]}
    >
      {/* Shield Icon */}
      <View style={iconContainerStyles(isDark)}>
        <Ionicons
          name="shield-checkmark"
          size={24}
          color={colors.primary}
          testID="shield-icon"
        />
      </View>

      {/* Title */}
      <Text style={titleStyles(isDark)}>Activate your protection</Text>

      {/* Description */}
      <Text style={descriptionStyles(isDark)}>
        Complete a quick verification to start using {cardName}
      </Text>

      {/* Activate Button */}
      <View style={buttonContainerStyles(isDark)}>
        <Button
          variant="primary"
          size={variant === 'card-overlay' ? 'sm' : 'md'}
          onPress={onActivate}
        >
          Activate Now
        </Button>
      </View>
    </View>
  );
}