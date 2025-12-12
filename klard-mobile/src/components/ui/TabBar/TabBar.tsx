import React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { styles } from './tab-bar.styles';

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

export function TabBar({ value, onChange, tabs, style }: TabBarProps) {
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
      style={[styles.scrollView, style]}
      contentContainerStyle={styles.contentContainer}
      accessibilityRole="tablist"
    >
      {tabs.map((tab) => {
        const isActive = value === tab.value;
        const isDisabled = tab.disabled;

        return (
          <Pressable
            key={tab.value}
            testID={`tab-${tab.value}`}
            onPress={() => handlePress(tab)}
            disabled={isDisabled}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive, disabled: isDisabled }}
            style={({ pressed }) => [
              styles.tab,
              isActive && styles.activeTab,
              isDisabled && styles.disabledTab,
              pressed && !isDisabled && styles.pressedTab,
            ]}
          >
            {tab.icon && <View style={styles.iconContainer}>{tab.icon}</View>}
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.activeTabLabel,
                isDisabled && styles.disabledTabLabel,
              ]}
            >
              {tab.label}
            </Text>
            {tab.badge !== undefined && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{tab.badge}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
