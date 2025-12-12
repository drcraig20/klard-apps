/**
 * Tests for SegmentedControl Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
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

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('SegmentedControl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all options', () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
        />
      );

      expect(screen.getByText('Option 1')).toBeTruthy();
      expect(screen.getByText('Option 2')).toBeTruthy();
      expect(screen.getByText('Option 3')).toBeTruthy();
    });

    it('should render with testID when provided', () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          testID="segmented-control"
        />
      );

      expect(screen.getByTestId('segmented-control')).toBeTruthy();
    });

    it('should have correct accessibility role', () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          testID="segmented"
        />
      );

      const container = screen.getByTestId('segmented');
      expect(container.props.accessibilityRole).toBe('tablist');
    });
  });

  describe('Selection', () => {
    it('should highlight the selected option visually', () => {
      const { getByTestId } = render(
        <SegmentedControl
          value="option2"
          onChange={() => {}}
          options={defaultOptions}
          testID="segmented"
        />
      );

      // The selected segment should have different styling
      const segment = getByTestId('segment-option2');
      expect(segment).toBeTruthy();
    });

    it('should call onChange when an option is pressed', async () => {
      const handleChange = jest.fn();
      render(
        <SegmentedControl
          value="option1"
          onChange={handleChange}
          options={defaultOptions}
        />
      );

      fireEvent.press(screen.getByText('Option 2'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('option2');
      });
    });

    it('should trigger haptic feedback on selection', async () => {
      const handleChange = jest.fn();
      render(
        <SegmentedControl
          value="option1"
          onChange={handleChange}
          options={defaultOptions}
        />
      );

      fireEvent.press(screen.getByText('Option 2'));

      await waitFor(() => {
        expect(Haptics.impactAsync).toHaveBeenCalledWith(
          Haptics.ImpactFeedbackStyle.Light
        );
      });
    });
  });

  describe('Sizes', () => {
    it('should render with md size by default', () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          testID="segmented"
        />
      );

      expect(screen.getByTestId('segmented')).toBeTruthy();
    });

    it('should render with sm size when specified', () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          size="sm"
          testID="segmented"
        />
      );

      expect(screen.getByTestId('segmented')).toBeTruthy();
    });
  });

  describe('Icons', () => {
    it('should render icon when provided', () => {
      const optionsWithIcon = [
        { value: 'opt1', label: 'With Icon', icon: <Text testID="test-icon">★</Text> },
        { value: 'opt2', label: 'No Icon' },
      ];

      render(
        <SegmentedControl
          value="opt1"
          onChange={() => {}}
          options={optionsWithIcon}
        />
      );

      expect(screen.getByTestId('test-icon')).toBeTruthy();
    });

    it('should render both icon and label', () => {
      const optionsWithIcon = [
        { value: 'opt1', label: 'Label', icon: <Text testID="icon">I</Text> },
      ];

      render(
        <SegmentedControl
          value="opt1"
          onChange={() => {}}
          options={optionsWithIcon}
        />
      );

      expect(screen.getByTestId('icon')).toBeTruthy();
      expect(screen.getByText('Label')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should not call onChange when disabled', async () => {
      const handleChange = jest.fn();
      render(
        <SegmentedControl
          value="option1"
          onChange={handleChange}
          options={defaultOptions}
          disabled
        />
      );

      fireEvent.press(screen.getByText('Option 2'));

      await waitFor(() => {
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    it('should not trigger haptics when disabled', async () => {
      render(
        <SegmentedControl
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          disabled
        />
      );

      fireEvent.press(screen.getByText('Option 2'));

      await waitFor(() => {
        expect(Haptics.impactAsync).not.toHaveBeenCalled();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle single option', () => {
      render(
        <SegmentedControl
          value="only"
          onChange={() => {}}
          options={[{ value: 'only', label: 'Only Option' }]}
        />
      );

      expect(screen.getByText('Only Option')).toBeTruthy();
    });

    it('should handle empty options gracefully', () => {
      render(
        <SegmentedControl
          value=""
          onChange={() => {}}
          options={[]}
          testID="empty-segmented"
        />
      );

      expect(screen.getByTestId('empty-segmented')).toBeTruthy();
    });
  });
});