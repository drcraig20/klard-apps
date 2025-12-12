/**
 * Tests for Tooltip Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { Tooltip } from '@/components/ui/Tooltip';
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

// Mock Animated to avoid timing issues in tests
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.timing = () => ({
    start: (callback?: () => void) => callback?.(),
  });
  return RN;
});

describe('Tooltip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render children', () => {
      render(
        <Tooltip content="Tooltip text">
          <Text>Trigger</Text>
        </Tooltip>
      );

      expect(screen.getByText('Trigger')).toBeTruthy();
    });

    it('should not show tooltip content initially', () => {
      render(
        <Tooltip content="Hidden content">
          <Text>Trigger</Text>
        </Tooltip>
      );

      expect(screen.queryByText('Hidden content')).toBeNull();
    });

    it('should have correct testID when provided', () => {
      render(
        <Tooltip content="Content" testID="my-tooltip">
          <Text>Trigger</Text>
        </Tooltip>
      );

      expect(screen.getByTestId('my-tooltip')).toBeTruthy();
    });
  });

  describe('Long Press Interaction', () => {
    it('should show tooltip on long press', async () => {
      render(
        <Tooltip content="Visible content">
          <Text>Press and hold</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Press and hold');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(screen.getByText('Visible content')).toBeTruthy();
    });

    it('should trigger haptic feedback on long press', async () => {
      render(
        <Tooltip content="Haptic tooltip">
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(Haptics.impactAsync).toHaveBeenCalledWith(
        Haptics.ImpactFeedbackStyle.Light
      );
    });

    it('should hide tooltip after duration', async () => {
      render(
        <Tooltip content="Disappearing content" duration={2000}>
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(screen.getByText('Disappearing content')).toBeTruthy();

      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(screen.queryByText('Disappearing content')).toBeNull();
    });

    it('should use default duration of 2000ms', async () => {
      render(
        <Tooltip content="Default duration">
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(screen.getByText('Default duration')).toBeTruthy();

      // Should still be visible at 1900ms
      await act(async () => {
        jest.advanceTimersByTime(1900);
      });
      expect(screen.getByText('Default duration')).toBeTruthy();

      // Should be hidden at 2000ms
      await act(async () => {
        jest.advanceTimersByTime(100);
      });
      expect(screen.queryByText('Default duration')).toBeNull();
    });
  });

  describe('Content Types', () => {
    it('should render string content', async () => {
      render(
        <Tooltip content="String content">
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(screen.getByText('String content')).toBeTruthy();
    });

    it('should render React node content', async () => {
      render(
        <Tooltip
          content={
            <View testID="complex-content">
              <Text>Complex</Text>
            </View>
          }
        >
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(screen.getByTestId('complex-content')).toBeTruthy();
      expect(screen.getByText('Complex')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label on trigger', () => {
      render(
        <Tooltip content="Help text" accessibilityLabel="Show help">
          <Text>?</Text>
        </Tooltip>
      );

      expect(screen.getByLabelText('Show help')).toBeTruthy();
    });

    it('should announce tooltip content to screen reader', async () => {
      render(
        <Tooltip content="Screen reader content">
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      const tooltip = screen.getByText('Screen reader content');
      expect(tooltip).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should not show tooltip when disabled', async () => {
      render(
        <Tooltip content="Disabled content" disabled>
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(screen.queryByText('Disabled content')).toBeNull();
    });

    it('should not trigger haptics when disabled', async () => {
      render(
        <Tooltip content="No haptics" disabled>
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(Haptics.impactAsync).not.toHaveBeenCalled();
    });
  });

  describe('Callbacks', () => {
    it('should call onShow when tooltip appears', async () => {
      const onShow = jest.fn();

      render(
        <Tooltip content="Callback test" onShow={onShow}>
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(onShow).toHaveBeenCalledTimes(1);
    });

    it('should call onHide when tooltip disappears', async () => {
      const onHide = jest.fn();

      render(
        <Tooltip content="Hide callback" duration={1000} onHide={onHide}>
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      expect(onHide).not.toHaveBeenCalled();

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect(onHide).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid long presses', async () => {
      render(
        <Tooltip content="Rapid press test" duration={500}>
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      // First long press
      await act(async () => {
        fireEvent(trigger, 'longPress');
      });
      expect(screen.getByText('Rapid press test')).toBeTruthy();

      // Second long press before timeout
      await act(async () => {
        jest.advanceTimersByTime(200);
        fireEvent(trigger, 'longPress');
      });

      // Should still be visible
      expect(screen.getByText('Rapid press test')).toBeTruthy();
    });

    it('should handle empty content gracefully', async () => {
      render(
        <Tooltip content="">
          <Text>Trigger</Text>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await act(async () => {
        fireEvent(trigger, 'longPress');
      });

      // Should not crash, trigger still visible
      expect(screen.getByText('Trigger')).toBeTruthy();
    });
  });
});
