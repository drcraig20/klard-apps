import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  useColorScheme,
  type ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

import {
  tabContainerStyles,
  tabLabelStyles,
  badgeStyles,
  badgeTextStyles,
  blurContainerStyles,
  layoutStyles,
} from './tab-bar.styles';

/** Maximum recommended number of tabs for optimal UX */
const MAX_TABS = 5;

export interface TabItem {
  value: string;
  label: string;
  badge?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabBarProps {
  value: string;
  onChange: (value: string) => void;
  tabs: TabItem[];
  style?: ViewStyle;
}

export function TabBar({ value, onChange, tabs, style }: Readonly<TabBarProps>) {
  const isDark = useColorScheme() === 'dark';

  // Warn in development when exceeding max tabs
  useEffect(() => {
    if (__DEV__ && tabs.length > MAX_TABS) {
      console.warn(
        `[TabBar] Providing more than ${MAX_TABS} tabs (currently ${tabs.length}) is not recommended. ` +
        `Consider using a different navigation pattern for better UX.`
      );
    }
  }, [tabs.length]);

  const handlePress = async (tab: TabItem) => {
    if (tab.disabled) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(tab.value);
  };

  return (
    <BlurView
      testID="tabbar-blur"
      intensity={isDark ? 40 : 60}
      tint={isDark ? 'dark' : 'light'}
      style={[blurContainerStyles(isDark, {}), style]}
    >
      <ScrollView
        testID="tab-bar-scroll"
        horizontal
        showsHorizontalScrollIndicator={false}
        style={layoutStyles.scrollView}
        contentContainerStyle={layoutStyles.contentContainer}
        accessibilityRole="tablist"
      >
        {tabs.map((tab) => {
          const isActive = value === tab.value;
          const isDisabled = tab.disabled;

          // Determine tab state
          const getTabState = (pressed: boolean) => {
            if (isDisabled) return 'disabled';
            if (pressed) return 'pressed';
            if (isActive) return 'active';
            return 'default';
          };

          // Determine label state (no pressed state for text)
          const labelState = isDisabled ? 'disabled' : isActive ? 'active' : 'default';

          return (
            <Pressable
              key={tab.value}
              testID={`tab-${tab.value}`}
              onPress={() => handlePress(tab)}
              disabled={isDisabled}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive, disabled: isDisabled }}
              style={({ pressed }) => tabContainerStyles(isDark, { state: getTabState(pressed) })}
            >
              {tab.icon && <View style={layoutStyles.iconContainer}>{tab.icon}</View>}
              <Text style={tabLabelStyles(isDark, { state: labelState })}>
                {tab.label}
              </Text>
              {tab.badge !== undefined && (
                <View style={badgeStyles(isDark, {})}>
                  <Text style={badgeTextStyles(isDark, {})}>{tab.badge}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </BlurView>
  );
}