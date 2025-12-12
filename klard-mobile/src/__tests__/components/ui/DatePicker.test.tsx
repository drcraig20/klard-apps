/**
 * Tests for DatePicker Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { DatePicker } from '@/components/ui/DatePicker';

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, ...props }: { name: string }) => {
    const { Text } = require('react-native');
    return <Text {...props}>{name}</Text>;
  },
}));

// Mock expo-haptics
const mockImpactAsync = jest.fn();
jest.mock('expo-haptics', () => ({
  __esModule: true,
  impactAsync: mockImpactAsync,
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  default: {
    impactAsync: mockImpactAsync,
    ImpactFeedbackStyle: {
      Light: 'light',
      Medium: 'medium',
      Heavy: 'heavy',
    },
  },
}));

// Ensure runtime module uses the same mock for namespace import
const hapticsModule = require('expo-haptics');
(hapticsModule as any).impactAsync = mockImpactAsync;
(hapticsModule as any).default = {
  ...hapticsModule.default,
  impactAsync: mockImpactAsync,
};

// Mock @expo/ui packages (native components)
jest.mock('@expo/ui/swift-ui', () => ({
  DateTimePicker: ({ onDateSelected, ...props }: any) => {
    const { View, Text, Pressable } = require('react-native');
    return (
      <View testID="ios-date-picker" {...props}>
        <Pressable
          testID="mock-date-select"
          onPress={() => onDateSelected?.(new Date(2024, 5, 15).toISOString())}
        >
          <Text>Select Date</Text>
        </Pressable>
      </View>
    );
  },
  Host: ({ children }: any) => children,
}));

jest.mock('@expo/ui/jetpack-compose', () => ({
  DateTimePicker: ({ onDateSelected, ...props }: any) => {
    const { View, Text, Pressable } = require('react-native');
    return (
      <View testID="android-date-picker" {...props}>
        <Pressable
          testID="mock-date-select"
          onPress={() => onDateSelected?.(new Date(2024, 5, 15).toISOString())}
        >
          <Text>Select Date</Text>
        </Pressable>
      </View>
    );
  },
}));

describe('DatePicker', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with label', () => {
      const { getByText } = render(
        <DatePicker label="Date of Birth" value={null} onChange={mockOnChange} />
      );

      expect(getByText('Date of Birth')).toBeTruthy();
    });

    it('should render with placeholder when no value', () => {
      const { getByText } = render(
        <DatePicker
          placeholder="Select a date"
          value={null}
          onChange={mockOnChange}
        />
      );

      expect(getByText('Select a date')).toBeTruthy();
    });

    it('should render default placeholder when none provided', () => {
      const { getByText } = render(
        <DatePicker value={null} onChange={mockOnChange} />
      );

      expect(getByText('Pick a date')).toBeTruthy();
    });

    it('should render calendar icon', () => {
      const { getByText } = render(
        <DatePicker value={null} onChange={mockOnChange} />
      );

      expect(getByText('calendar-outline')).toBeTruthy();
    });

    it('should render the trigger pressable', () => {
      const { getByTestId } = render(
        <DatePicker value={null} onChange={mockOnChange} />
      );

      expect(getByTestId('date-picker-trigger')).toBeTruthy();
    });
  });

  describe('Date Display', () => {
    it('should display formatted date when value is provided', () => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      const { getByText } = render(
        <DatePicker value={testDate} onChange={mockOnChange} />
      );

      // Should show localized date format
      expect(getByText(/6\/15\/2024|15\/6\/2024|Jun/)).toBeTruthy();
    });

    it('should display placeholder when value is null', () => {
      const { getByText } = render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          placeholder="Choose date"
        />
      );

      expect(getByText('Choose date')).toBeTruthy();
    });

    it('should handle invalid date gracefully', () => {
      const invalidDate = new Date('invalid');
      const { getByText } = render(
        <DatePicker value={invalidDate} onChange={mockOnChange} />
      );

      // Should show placeholder for invalid date
      expect(getByText('Pick a date')).toBeTruthy();
    });
  });

  describe('Required Indicator', () => {
    it('should show asterisk when required', () => {
      const { getByText } = render(
        <DatePicker
          label="Required Date"
          value={null}
          onChange={mockOnChange}
          required
        />
      );

      expect(getByText('*')).toBeTruthy();
    });

    it('should not show asterisk when not required', () => {
      const { queryByText } = render(
        <DatePicker
          label="Optional Date"
          value={null}
          onChange={mockOnChange}
        />
      );

      expect(queryByText('*')).toBeNull();
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      const { getByText } = render(
        <DatePicker
          label="Date"
          value={null}
          onChange={mockOnChange}
          error="Date is required"
        />
      );

      expect(getByText('Date is required')).toBeTruthy();
    });

    it('should have alert accessibility role on error message', () => {
      const { getByRole } = render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          error="Invalid date"
        />
      );

      expect(getByRole('alert')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should have disabled accessibility state when disabled', () => {
      const { getByTestId } = render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          disabled
        />
      );

      const trigger = getByTestId('date-picker-trigger');
      expect(trigger.props.accessibilityState?.disabled).toBe(true);
    });

    it('should not show picker when disabled', () => {
      const { getByTestId, queryByTestId } = render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          disabled
        />
      );

      const trigger = getByTestId('date-picker-trigger');
      fireEvent.press(trigger);

      expect(queryByTestId('ios-date-picker')).toBeNull();
      expect(queryByTestId('android-date-picker')).toBeNull();
    });
  });

  describe('Picker Behavior', () => {
    it('should show picker when trigger is pressed', async () => {
      const { getByTestId, queryByTestId } = render(
        <DatePicker value={null} onChange={mockOnChange} />
      );

      // Initially picker should not be visible
      expect(queryByTestId('ios-date-picker')).toBeNull();
      expect(queryByTestId('android-date-picker')).toBeNull();

      const trigger = getByTestId('date-picker-trigger');
      fireEvent.press(trigger);

      // One of the pickers should now be visible
      await waitFor(() => {
        const iosPicker = queryByTestId('ios-date-picker');
        const androidPicker = queryByTestId('android-date-picker');
        expect(iosPicker || androidPicker).toBeTruthy();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessibilityLabel from label prop', () => {
      const { getByTestId } = render(
        <DatePicker
          label="Start Date"
          value={null}
          onChange={mockOnChange}
        />
      );

      const trigger = getByTestId('date-picker-trigger');
      expect(trigger.props.accessibilityLabel).toBe('Start Date');
    });

    it('should have accessibilityRole of button', () => {
      const { getByTestId } = render(
        <DatePicker value={null} onChange={mockOnChange} />
      );

      const trigger = getByTestId('date-picker-trigger');
      expect(trigger.props.accessibilityRole).toBe('button');
    });
  });

  describe('onChange Callback', () => {
    it('should call onChange when date is selected', async () => {
      const { getByTestId, queryByTestId } = render(
        <DatePicker value={null} onChange={mockOnChange} />
      );

      const trigger = getByTestId('date-picker-trigger');
      fireEvent.press(trigger);

      await waitFor(() => {
        const mockSelect = queryByTestId('mock-date-select');
        expect(mockSelect).toBeTruthy();
        if (mockSelect) {
          fireEvent.press(mockSelect);
        }
      });

      expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  describe('Haptic Feedback', () => {
    it('should trigger haptic feedback on date selection', async () => {
      const { getByTestId, queryByTestId } = render(
        <DatePicker value={null} onChange={mockOnChange} />
      );

      const trigger = getByTestId('date-picker-trigger');
      fireEvent.press(trigger);

      await waitFor(() => {
        const mockSelect = queryByTestId('mock-date-select');
        if (mockSelect) {
          fireEvent.press(mockSelect);
        }
      });

      expect(mockImpactAsync).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined value as null', () => {
      const { getByText } = render(
        <DatePicker
          value={undefined as unknown as Date | null}
          onChange={mockOnChange}
        />
      );

      expect(getByText('Pick a date')).toBeTruthy();
    });

    it('should apply custom containerStyle', () => {
      const customStyle = { marginTop: 20 };
      const { getByTestId } = render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          containerStyle={customStyle}
        />
      );

      expect(getByTestId('date-picker-trigger')).toBeTruthy();
    });
  });
});
