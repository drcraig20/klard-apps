import React from 'react';
import {
  View,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

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

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  } as ViewStyle,
  contentContainer: {
    paddingHorizontal: 16,
    gap: 8,
  } as ViewStyle,
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    gap: 8,
  } as ViewStyle,
  activeTab: {
    backgroundColor: '#F1F5F9', // slate-100
    borderBottomWidth: 2,
    borderBottomColor: '#0D7C7A', // primary teal
  } as ViewStyle,
  disabledTab: {
    opacity: 0.5,
  } as ViewStyle,
  pressedTab: {
    opacity: 0.7,
  } as ViewStyle,
  iconContainer: {
    marginRight: 4,
  } as ViewStyle,
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B', // slate-500
  } as TextStyle,
  activeTabLabel: {
    color: '#0D7C7A', // primary teal
    fontWeight: '600',
  } as TextStyle,
  disabledTabLabel: {
    color: '#94A3B8', // slate-400
  } as TextStyle,
  badge: {
    backgroundColor: '#F1F5F9', // slate-100
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  } as ViewStyle,
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B', // slate-500
  } as TextStyle,
});
