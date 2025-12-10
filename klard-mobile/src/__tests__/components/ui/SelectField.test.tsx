/**
 * Tests for SelectField Component (Mobile)
 */

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { SelectField } from '@/components/ui/SelectField';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock hooks module to avoid expo-router dependency
jest.mock('@/hooks', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    foreground: '#0F172A',
    textSecondary: '#64748B',
    border: '#CBD5E1',
    placeholder: '#94A3B8',
    background: '#FFFFFF',
    error: '#DC2626',
  }),
}));

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('SelectField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render select trigger without label', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
        />
      );

      expect(screen.getByTestId('select-trigger')).toBeTruthy();
    });

    it('should render select with label', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          label="Select a fruit"
        />
      );

      expect(screen.getByText('Select a fruit')).toBeTruthy();
    });

    it('should render placeholder when no value selected', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          placeholder="Choose..."
        />
      );

      expect(screen.getByText('Choose...')).toBeTruthy();
    });

    it('should display selected value label', () => {
      render(
        <SelectField
          value="apple"
          onChange={() => {}}
          options={mockOptions}
        />
      );

      expect(screen.getByText('Apple')).toBeTruthy();
    });
  });

  describe('Modal Interaction', () => {
    it('should open modal when trigger is pressed', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
        />
      );

      fireEvent.press(screen.getByTestId('select-trigger'));

      // Modal should be visible with options
      expect(screen.getByTestId('select-modal')).toBeTruthy();
    });

    it('should display all options in modal', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
        />
      );

      fireEvent.press(screen.getByTestId('select-trigger'));

      // All options should be visible
      expect(screen.getByText('Apple')).toBeTruthy();
      expect(screen.getByText('Banana')).toBeTruthy();
      expect(screen.getByText('Cherry')).toBeTruthy();
    });
  });

  describe('Selection', () => {
    it('should call onChange when option is selected', async () => {
      const handleChange = jest.fn();

      render(
        <SelectField
          value=""
          onChange={handleChange}
          options={mockOptions}
        />
      );

      // Open modal
      fireEvent.press(screen.getByTestId('select-trigger'));

      // Select option
      fireEvent.press(screen.getByTestId('select-option-banana'));

      // Wait for async haptic call to complete before onChange is called
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('banana');
      });
    });

    it('should trigger haptic feedback on selection', () => {
      const Haptics = require('expo-haptics');
      const handleChange = jest.fn();

      render(
        <SelectField
          value=""
          onChange={handleChange}
          options={mockOptions}
        />
      );

      fireEvent.press(screen.getByTestId('select-trigger'));
      fireEvent.press(screen.getByTestId('select-option-apple'));

      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    });

    it('should close modal after selection', async () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
        />
      );

      fireEvent.press(screen.getByTestId('select-trigger'));
      fireEvent.press(screen.getByTestId('select-option-apple'));

      await waitFor(() => {
        expect(screen.queryByTestId('select-modal')).toBeNull();
      });
    });
  });

  describe('Disabled State', () => {
    it('should not open modal when disabled', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          disabled
        />
      );

      fireEvent.press(screen.getByTestId('select-trigger'));

      expect(screen.queryByTestId('select-modal')).toBeNull();
    });

    it('should have disabled styling', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          disabled
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Selection is required"
        />
      );

      expect(screen.getByText('Selection is required')).toBeTruthy();
    });

    it('should have error styling on trigger', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Selection is required"
        />
      );

      // The trigger container should reflect error state
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have correct accessibility role', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          label="Fruit"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger.props.accessibilityRole).toBe('combobox');
    });

    it('should have accessibility label', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          label="Fruit"
        />
      );

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger.props.accessibilityLabel).toBe('Fruit');
    });
  });
});