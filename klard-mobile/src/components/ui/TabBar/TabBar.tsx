import React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  useColorScheme,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import {
  tabContainerStyles,
  tabLabelStyles,
  badgeStyles,
  badgeTextStyles,
  layoutStyles,
} from './tab-bar.styles';

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

  const handlePress = async (tab: TabItem) => {
    if (tab.disabled) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(tab.value);
  };

  return (
    <ScrollView
      testID="tab-bar-scroll"
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[layoutStyles.scrollView, style]}
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
  );
}