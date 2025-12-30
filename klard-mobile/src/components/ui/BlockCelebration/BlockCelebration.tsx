import React, { createContext, useContext, useEffect, useRef, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {
  containerStyles,
  amountStyles,
  merchantStyles,
  shareZoneStyles,
  shareButtonStyles,
  shareButtonTextStyles,
  layoutStyles,
} from './block-celebration.styles';

/**
 * BlockCelebration Component (Mobile)
 *
 * Compound component for celebrating blocked charges with animations and haptics.
 *
 * SOLID Compliance:
 * - SRP: Root component manages context and animations; sub-components handle display
 * - OCP: New celebration levels can be added via config without modifying core
 * - LSP: All sub-components follow consistent prop patterns
 * - ISP: Each sub-component has focused, minimal interface
 * - DIP: Depends on animation abstractions, not direct implementation
 */

// ===== Types =====

type CelebrationLevel = 'first' | 'milestone' | 'streak' | 'subtle';

interface BlockCelebrationContextValue {
  level: CelebrationLevel;
  isDark: boolean;
  amount?: number;
  currency?: string;
  merchantName?: string;
}

// ===== Context =====

const BlockCelebrationContext = createContext<BlockCelebrationContextValue | null>(null);

function useBlockCelebrationContext() {
  const context = useContext(BlockCelebrationContext);
  if (!context) {
    throw new Error('BlockCelebration compound components must be used within BlockCelebration');
  }
  return context;
}

// ===== Animation & Haptic Configuration =====

const hapticConfigs: Record<CelebrationLevel, Haptics.NotificationFeedbackType | null> = {
  first: Haptics.NotificationFeedbackType.Success,
  milestone: Haptics.NotificationFeedbackType.Success,
  streak: Haptics.NotificationFeedbackType.Warning,
  subtle: null,
};

// ===== Root Component =====

interface BlockCelebrationProps {
  level: CelebrationLevel;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

function BlockCelebrationRoot({
  level,
  children,
  style,
  testID,
}: Readonly<BlockCelebrationProps>) {
  const isDark = useColorScheme() === 'dark';
  const hasTriggeredRef = useRef(false);
  const [contextValue, setContextValue] = useState<BlockCelebrationContextValue>({
    level,
    isDark,
  });

  // Animation values
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  // Trigger animation and haptic on mount
  useEffect(() => {
    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true;

      // Trigger haptic feedback
      const hapticType = hapticConfigs[level];
      if (hapticType !== null) {
        Haptics.notificationAsync(hapticType);
      }

      // Entry animation
      scale.value = withSpring(1, { damping: 12, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });

      // Pulse glow effect for 'first' level
      if (level === 'first') {
        scale.value = withSequence(
          withSpring(1.02, { damping: 8, stiffness: 200 }),
          withDelay(200, withSpring(1, { damping: 12, stiffness: 150 }))
        );
      }
    }
  }, [level, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  // Update context when children provide data
  const updateContext = useCallback((updates: Partial<BlockCelebrationContextValue>) => {
    setContextValue((prev) => ({ ...prev, ...updates }));
  }, []);

  // Build accessibility announcement
  const announcement = useMemo(() => {
    if (!contextValue.amount) return null;
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: contextValue.currency || 'USD',
    }).format(contextValue.amount);
    const merchant = contextValue.merchantName || 'a merchant';
    return `Blocked ${formattedAmount} from ${merchant}`;
  }, [contextValue.amount, contextValue.currency, contextValue.merchantName]);

  // Announce to screen reader
  useEffect(() => {
    if (announcement) {
      AccessibilityInfo.announceForAccessibility(announcement);
    }
  }, [announcement]);

  return (
    <BlockCelebrationContext.Provider value={{ ...contextValue, level, isDark }}>
      <Animated.View
        style={[containerStyles(isDark, { level }), animatedStyle, style]}
        testID={testID}
        accessibilityRole="alert"
        accessibilityLabel={announcement || 'Blocked charge celebration'}
      >
        {/* Render children with update capability */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ _updateContext?: typeof updateContext }>, {
              _updateContext: updateContext,
            });
          }
          return child;
        })}
      </Animated.View>
    </BlockCelebrationContext.Provider>
  );
}

// ===== Amount Sub-component =====

interface AmountProps {
  value: number;
  currency?: string;
  _updateContext?: (updates: Partial<BlockCelebrationContextValue>) => void;
}

function Amount({ value, currency = 'USD', _updateContext }: Readonly<AmountProps>) {
  const { isDark } = useBlockCelebrationContext();

  // Register amount with context
  useEffect(() => {
    _updateContext?.({ amount: value, currency });
  }, [value, currency, _updateContext]);

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);

  return (
    <Text
      style={amountStyles(isDark, { size: 'default' })}
      testID="block-celebration-amount"
      accessibilityLabel={`Blocked amount: ${formattedAmount}`}
    >
      {formattedAmount}
    </Text>
  );
}

// ===== Merchant Sub-component =====

interface MerchantProps {
  name: string;
  anonymize?: boolean;
  _updateContext?: (updates: Partial<BlockCelebrationContextValue>) => void;
}

function Merchant({ name, anonymize = false, _updateContext }: Readonly<MerchantProps>) {
  const { isDark } = useBlockCelebrationContext();
  const displayName = anonymize ? '[Hidden]' : name;

  // Register merchant with context
  useEffect(() => {
    _updateContext?.({ merchantName: displayName });
  }, [displayName, _updateContext]);

  return (
    <Text
      style={merchantStyles(isDark, { anonymized: anonymize ? 'true' : undefined })}
      testID="block-celebration-merchant"
      accessibilityLabel={`From merchant: ${displayName}`}
    >
      {displayName}
    </Text>
  );
}

// ===== ShareZone Sub-component =====

interface ShareZoneProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function ShareZone({ children, style }: Readonly<ShareZoneProps>) {
  const { isDark } = useBlockCelebrationContext();

  return (
    <View
      style={[shareZoneStyles(isDark), style]}
      testID="block-celebration-share-zone"
    >
      {children}
    </View>
  );
}

// ===== ShareButton Sub-component =====

interface ShareButtonProps {
  onShare: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

function ShareButton({
  onShare,
  label = 'Share',
  style,
}: Readonly<ShareButtonProps>) {
  const { isDark } = useBlockCelebrationContext();

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onShare();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        shareButtonStyles(isDark, { pressed: pressed ? 'true' : undefined }),
        style,
      ]}
      testID="block-celebration-share-button"
      accessibilityRole="button"
      accessibilityLabel="Share blocked charge celebration"
      accessibilityHint="Opens share options to share your blocked charge"
    >
      <Ionicons
        name="share-outline"
        size={16}
        color="#FFFFFF"
      />
      <Text style={shareButtonTextStyles(isDark)}>
        {label}
      </Text>
    </Pressable>
  );
}

// ===== Compound Export =====

export const BlockCelebration = Object.assign(BlockCelebrationRoot, {
  Amount,
  Merchant,
  ShareZone,
  ShareButton,
});

export type {
  BlockCelebrationProps,
  AmountProps,
  MerchantProps,
  ShareZoneProps,
  ShareButtonProps,
  CelebrationLevel,
};