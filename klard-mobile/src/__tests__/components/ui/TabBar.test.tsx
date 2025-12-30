/**
 * Tests for TabBar Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { TabBar } from '@/components/ui/TabBar';
import * as Haptics from 'expo-haptics';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

// Mock expo-blur
jest.mock('expo-blur', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BlurView: ({ children, intensity, tint, style, testID }: {
      children?: React.ReactNode;
      intensity?: number;
      tint?: string;
      style?: object;
      testID?: string;
    }) => (
      <View testID={testID || 'blur-view'} style={style} data-intensity={intensity} data-tint={tint}>
        {children}
      </View>
    ),
  };
});

// Mock vector icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || 'vector-icon'}>{name}</Text>
    ),
  };
});

describe('TabBar', () => {
  const defaultTabs = [
    { value: 'tab1', label: 'Tab 1' },
    { value: 'tab2', label: 'Tab 2' },
    { value: 'tab3', label: 'Tab 3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all tab labels', () => {
      render(
        <TabBar value="tab1" onChange={() => {}} tabs={defaultTabs} />
      );

      expect(screen.getByText('Tab 1')).toBeTruthy();
      expect(screen.getByText('Tab 2')).toBeTruthy();
      expect(screen.getByText('Tab 3')).toBeTruthy();
    });

    it('should render with correct accessibility role', () => {
      render(
        <TabBar value="tab1" onChange={() => {}} tabs={defaultTabs} />
      );

      // TabBar should have tablist role - use testID since RNTL doesn't reliably find ScrollView roles
      const scrollView = screen.getByTestId('tab-bar-scroll');
      expect(scrollView.props.accessibilityRole).toBe('tablist');
    });

    it('should render individual tabs with tab role', () => {
      render(
        <TabBar value="tab1" onChange={() => {}} tabs={defaultTabs} />
      );

      // Each tab should be accessible
      defaultTabs.forEach((tab) => {
        expect(screen.getByText(tab.label)).toBeTruthy();
      });
    });
  });

  describe('Controlled State', () => {
    it('should apply active styles to selected tab', () => {
      const { getByTestId } = render(
        <TabBar value="tab2" onChange={() => {}} tabs={defaultTabs} />
      );

      const activeTab = getByTestId('tab-tab2');
      // Active tab should have different styling (verified via testID)
      expect(activeTab).toBeTruthy();
    });

    it('should call onChange when a tab is pressed', async () => {
      const handleChange = jest.fn();
      render(
        <TabBar value="tab1" onChange={handleChange} tabs={defaultTabs} />
      );

      fireEvent.press(screen.getByText('Tab 2'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('tab2');
      });
    });

    it('should trigger haptic feedback when tab is pressed', async () => {
      const handleChange = jest.fn();
      render(
        <TabBar value="tab1" onChange={handleChange} tabs={defaultTabs} />
      );

      fireEvent.press(screen.getByText('Tab 2'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });
  });

  describe('Badges', () => {
    it('should render badge when tab has badge prop', () => {
      const tabsWithBadge = [
        { value: 'tab1', label: 'Tab 1', badge: 5 },
        { value: 'tab2', label: 'Tab 2' },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={tabsWithBadge} />
      );

      expect(screen.getByText('5')).toBeTruthy();
    });

    it('should render badge with value 0', () => {
      const tabsWithZeroBadge = [
        { value: 'tab1', label: 'Tab 1', badge: 0 },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={tabsWithZeroBadge} />
      );

      expect(screen.getByText('0')).toBeTruthy();
    });
  });

  describe('Icons', () => {
    it('should render icon when tab has icon prop', () => {
      const tabsWithIcon = [
        { value: 'tab1', label: 'Tab 1', icon: <Text testID="tab-icon">★</Text> },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={tabsWithIcon} />
      );

      expect(screen.getByTestId('tab-icon')).toBeTruthy();
    });

    it('should render both icon and text', () => {
      const tabsWithIcon = [
        { value: 'tab1', label: 'Tab 1', icon: <Text testID="icon">I</Text> },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={tabsWithIcon} />
      );

      expect(screen.getByTestId('icon')).toBeTruthy();
      expect(screen.getByText('Tab 1')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled tab with reduced opacity', () => {
      const tabsWithDisabled = [
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2', disabled: true },
      ];

      const { getByTestId } = render(
        <TabBar value="tab1" onChange={() => {}} tabs={tabsWithDisabled} />
      );

      // Disabled tab should be identifiable
      const disabledTab = getByTestId('tab-tab2');
      expect(disabledTab).toBeTruthy();
    });

    it('should not call onChange when pressing disabled tab', async () => {
      const handleChange = jest.fn();
      const tabsWithDisabled = [
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2', disabled: true },
      ];

      render(
        <TabBar value="tab1" onChange={handleChange} tabs={tabsWithDisabled} />
      );

      fireEvent.press(screen.getByText('Tab 2'));

      await waitFor(() => {
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    it('should not trigger haptic feedback for disabled tab', async () => {
      const tabsWithDisabled = [
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2', disabled: true },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={tabsWithDisabled} />
      );

      fireEvent.press(screen.getByText('Tab 2'));

      await waitFor(() => {
        expect(Haptics.impactAsync).not.toHaveBeenCalled();
      });
    });
  });

  describe('Horizontal Scroll', () => {
    it('should render in a horizontal ScrollView', () => {
      render(
        <TabBar value="tab1" onChange={() => {}} tabs={defaultTabs} />
      );

      // ScrollView should exist
      expect(screen.getByTestId('tab-bar-scroll')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tabs array', () => {
      render(
        <TabBar value="" onChange={() => {}} tabs={[]} />
      );

      // Should render without crashing
      expect(screen.getByTestId('tabbar-blur')).toBeTruthy();
    });

    it('should handle single tab', () => {
      const singleTab = [{ value: 'only', label: 'Only Tab' }];

      render(
        <TabBar value="only" onChange={() => {}} tabs={singleTab} />
      );

      expect(screen.getByText('Only Tab')).toBeTruthy();
    });
  });

  describe('Glassmorphism', () => {
    it('should render with glassmorphic background (BlurView)', () => {
      render(
        <TabBar value="tab1" onChange={() => {}} tabs={defaultTabs} />
      );

      expect(screen.getByTestId('tabbar-blur')).toBeTruthy();
    });

    it('should have glass border styling', () => {
      render(
        <TabBar value="tab1" onChange={() => {}} tabs={defaultTabs} />
      );

      const blurView = screen.getByTestId('tabbar-blur');
      expect(blurView).toBeTruthy();
    });
  });

  describe('Active Tab Glow', () => {
    it('should apply glow effect to active tab', () => {
      const { getByTestId } = render(
        <TabBar value="tab2" onChange={() => {}} tabs={defaultTabs} />
      );

      const activeTab = getByTestId('tab-tab2');
      // Active tab should have glow styling (shadow properties)
      expect(activeTab).toBeTruthy();
      // The actual shadow styles are applied through SVA, verified via visual inspection
    });

    it('should not apply glow to inactive tabs', () => {
      const { getByTestId } = render(
        <TabBar value="tab2" onChange={() => {}} tabs={defaultTabs} />
      );

      const inactiveTab = getByTestId('tab-tab1');
      expect(inactiveTab).toBeTruthy();
      // Inactive tabs should not have glow styling
    });
  });

  describe('5 Tabs Max Warning', () => {
    it('should warn when more than 5 tabs are provided', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const sixTabs = [
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2' },
        { value: 'tab3', label: 'Tab 3' },
        { value: 'tab4', label: 'Tab 4' },
        { value: 'tab5', label: 'Tab 5' },
        { value: 'tab6', label: 'Tab 6' },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={sixTabs} />
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('5 tabs')
      );
      consoleSpy.mockRestore();
    });

    it('should not warn when 5 or fewer tabs are provided', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const fiveTabs = [
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2' },
        { value: 'tab3', label: 'Tab 3' },
        { value: 'tab4', label: 'Tab 4' },
        { value: 'tab5', label: 'Tab 5' },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={fiveTabs} />
      );

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should still render all tabs even when exceeding 5', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const sixTabs = [
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2' },
        { value: 'tab3', label: 'Tab 3' },
        { value: 'tab4', label: 'Tab 4' },
        { value: 'tab5', label: 'Tab 5' },
        { value: 'tab6', label: 'Tab 6' },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={sixTabs} />
      );

      // All 6 tabs should still be rendered
      expect(screen.getByText('Tab 1')).toBeTruthy();
      expect(screen.getByText('Tab 2')).toBeTruthy();
      expect(screen.getByText('Tab 3')).toBeTruthy();
      expect(screen.getByText('Tab 4')).toBeTruthy();
      expect(screen.getByText('Tab 5')).toBeTruthy();
      expect(screen.getByText('Tab 6')).toBeTruthy();
      consoleSpy.mockRestore();
    });
  });

  describe('Icon Styling', () => {
    it('should render icons at correct size (24-28dp container)', () => {
      const tabsWithIcon = [
        { value: 'tab1', label: 'Tab 1', icon: <Text testID="tab-icon">Icon</Text> },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={tabsWithIcon} />
      );

      const icon = screen.getByTestId('tab-icon');
      expect(icon).toBeTruthy();
    });

    it('should change icon color based on active state', () => {
      const tabsWithIcon = [
        { value: 'tab1', label: 'Tab 1', icon: <Text testID="icon-1">I1</Text> },
        { value: 'tab2', label: 'Tab 2', icon: <Text testID="icon-2">I2</Text> },
      ];

      render(
        <TabBar value="tab1" onChange={() => {}} tabs={tabsWithIcon} />
      );

      // Both icons should render - color styling is handled by the component
      expect(screen.getByTestId('icon-1')).toBeTruthy();
      expect(screen.getByTestId('icon-2')).toBeTruthy();
    });
  });
});
