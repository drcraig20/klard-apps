/**
 * CardTypeSelector Component (Mobile)
 *
 * Allows users to choose between different card types with context-aware recommendations.
 *
 * SOLID Compliance:
 * - SRP: Handles card type selection only
 * - OCP: Extensible via CARD_TYPES config, no modification needed for new types
 * - DIP: Depends on CardType abstraction
 */

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
import { Ionicons } from '@expo/vector-icons';

import {
  containerStyles,
  rowStyles,
  optionStyles,
  iconContainerStyles,
  iconColorStyles,
  labelStyles,
  descriptionStyles,
  recommendedBadgeStyles,
  recommendedBadgeTextStyles,
  layoutStyles,
} from './card-type-selector.styles';

/**
 * Available card types for burner card creation
 */
export type CardType =
  | 'one-time'
  | 'recurring'
  | 'category-locked'
  | 'merchant-locked';

/**
 * Context for card type recommendations
 */
export type CardContext = 'trial' | 'subscription' | 'general';

/**
 * Ionicons icon name type
 */
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

/**
 * Card type configuration
 */
interface CardTypeConfig {
  type: CardType;
  label: string;
  description: string;
  iconName: IoniconsName;
  advanced?: boolean;
}

/**
 * Card types configuration - extend by adding to this array (OCP)
 */
const CARD_TYPES: readonly CardTypeConfig[] = [
  {
    type: 'one-time',
    label: 'One-Time',
    description: 'Single use, auto-closes after charge',
    iconName: 'flash-outline',
    advanced: false,
  },
  {
    type: 'recurring',
    label: 'Recurring',
    description: 'For subscriptions, stays open',
    iconName: 'sync-outline',
    advanced: false,
  },
  {
    type: 'category-locked',
    label: 'Category-Locked',
    description: 'Locked to merchant category',
    iconName: 'pricetag-outline',
    advanced: true,
  },
  {
    type: 'merchant-locked',
    label: 'Merchant-Locked',
    description: 'Locked to specific merchant',
    iconName: 'storefront-outline',
    advanced: true,
  },
] as const;

/**
 * Context-to-recommended-type mapping (OCP)
 */
const CONTEXT_RECOMMENDATIONS: Record<CardContext, CardType | null> = {
  trial: 'one-time',
  subscription: 'recurring',
  general: null,
};

export interface CardTypeSelectorProps {
  /** Context for recommendations */
  context?: CardContext;
  /** Callback when a card type is selected */
  onSelect: (type: CardType) => void;
  /** Whether to show advanced options */
  showAdvanced?: boolean;
  /** Currently selected value */
  value?: CardType;
  /** Additional style */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * CardTypeSelector - Card type selection with context-aware recommendations
 *
 * @example
 * // Trial context - recommends One-Time
 * <CardTypeSelector context="trial" onSelect={handleSelect} />
 *
 * @example
 * // Show all options including advanced
 * <CardTypeSelector showAdvanced onSelect={handleSelect} value="recurring" />
 */
export function CardTypeSelector({
  context,
  onSelect,
  showAdvanced = false,
  value,
  style,
  testID = 'card-type-selector',
}: Readonly<CardTypeSelectorProps>) {
  const isDark = useColorScheme() === 'dark';

  // Filter card types based on showAdvanced
  const visibleTypes = showAdvanced
    ? CARD_TYPES
    : CARD_TYPES.filter((type) => !type.advanced);

  // Get recommended type based on context
  const recommendedType = context ? CONTEXT_RECOMMENDATIONS[context] : null;

  // Group types into rows of 2 for grid layout
  const rows: CardTypeConfig[][] = [];
  for (let i = 0; i < visibleTypes.length; i += 2) {
    rows.push(visibleTypes.slice(i, i + 2));
  }

  const handlePress = async (cardType: CardType) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect(cardType);
  };

  return (
    <View
      testID={testID}
      style={[containerStyles(isDark, { columns: showAdvanced ? 4 : 2 }), style]}
    >
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={rowStyles(isDark, {})}>
          {row.map((cardType) => {
            const isSelected = value === cardType.type;
            const isRecommended = recommendedType === cardType.type;

            // Get icon color from styles
            const iconColorStyle = iconColorStyles(isDark, {
              selected: isSelected ? 'true' : 'false',
            });
            const iconColor = (iconColorStyle[0] as { color?: string })?.color || '#64748B';

            return (
              <Pressable
                key={cardType.type}
                testID={`card-type-option-${cardType.type}`}
                onPress={() => handlePress(cardType.type)}
                accessibilityRole="button"
                accessibilityLabel={`${cardType.label}: ${cardType.description}`}
                accessibilityState={{ selected: isSelected }}
                accessibilityHint={
                  isRecommended
                    ? `Recommended for ${context}`
                    : `Select ${cardType.label} card type`
                }
                style={({ pressed }) => [
                  optionStyles(isDark, {
                    selected: isSelected ? 'true' : undefined,
                    pressed: pressed ? 'true' : undefined,
                  }),
                ]}
              >
                {isRecommended && (
                  <View style={recommendedBadgeStyles(isDark, {})}>
                    <Text style={recommendedBadgeTextStyles(isDark, {})}>
                      Recommended
                    </Text>
                  </View>
                )}

                <View style={layoutStyles.content}>
                  <View
                    style={iconContainerStyles(isDark, {
                      selected: isSelected ? 'true' : 'false',
                    })}
                  >
                    <Ionicons
                      name={cardType.iconName}
                      size={20}
                      color={iconColor}
                    />
                  </View>

                  <View style={layoutStyles.textContainer}>
                    <Text
                      style={labelStyles(isDark, {
                        selected: isSelected ? 'true' : 'false',
                      })}
                    >
                      {cardType.label}
                    </Text>
                    <Text style={descriptionStyles(isDark, {})}>
                      {cardType.description}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}