import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  ViewStyle,
  TextStyle,
  AccessibilityInfo,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { styles } from './tooltip.styles';

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Trigger element */
  children: React.ReactNode;
  /** Duration in ms before tooltip auto-hides (default: 2000) */
  duration?: number;
  /** Disable tooltip interaction */
  disabled?: boolean;
  /** Callback when tooltip shows */
  onShow?: () => void;
  /** Callback when tooltip hides */
  onHide?: () => void;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility label for trigger */
  accessibilityLabel?: string;
  /** Custom styles for tooltip container */
  style?: ViewStyle;
  /** Custom styles for tooltip text */
  textStyle?: TextStyle;
}

export function Tooltip({
  content,
  children,
  duration = 2000,
  disabled = false,
  onShow,
  onHide,
  testID,
  accessibilityLabel,
  style,
  textStyle,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const showTooltip = useCallback(() => {
    clearHideTimeout();
    setVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    onShow?.();

    hideTimeoutRef.current = setTimeout(() => {
      hideTooltip();
    }, duration);
  }, [duration, onShow, fadeAnim, clearHideTimeout]);

  const hideTooltip = useCallback(() => {
    clearHideTimeout();

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onHide?.();
    });
  }, [onHide, fadeAnim, clearHideTimeout]);

  const handleLongPress = useCallback(async () => {
    if (disabled) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    showTooltip();

    // Announce to screen reader
    if (typeof content === 'string') {
      AccessibilityInfo.announceForAccessibility(content);
    }
  }, [disabled, content, showTooltip]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearHideTimeout();
    };
  }, [clearHideTimeout]);

  const renderContent = () => {
    if (typeof content === 'string') {
      return <Text style={[styles.tooltipText, textStyle]}>{content}</Text>;
    }
    return content;
  };

  return (
    <View testID={testID} style={styles.container}>
      <Pressable
        onLongPress={handleLongPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityHint="Long press to show tooltip"
      >
        {children}
      </Pressable>
      {visible && (
        <Animated.View
          style={[
            styles.tooltip,
            style,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {renderContent()}
          <View style={styles.arrow} />
        </Animated.View>
      )}
    </View>
  );
}
