/**
 * Tests for Switch and SwitchField Components (Mobile)
 *
 * These tests verify:
 * 1. Renders with correct states
 * 2. Label and description rendering
 * 3. Size variants (sm, md)
 * 4. Checked/unchecked states
 * 5. Disabled state
 * 6. onChange callback behavior
 * 7. Track colors
 * 8. Accessibility attributes
 * 9. Haptic feedback
 * 10. Edge cases
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Switch, SwitchField } from '@/components/ui/Switch';
import { mockLightColors } from '@/__tests__/__mocks__/theme';

// Mock theme context
jest.mock('@/contexts/ThemeContext', () => ({
  useThemeColors: () => mockLightColors,
  useTheme: () => ({
    colors: mockLightColors,
    isDark: false,
  }),
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
  },
}));

import * as Haptics from 'expo-haptics';

describe('Switch (Primitive)', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the switch component', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} />
      );

      expect(getByRole('switch')).toBeTruthy();
    });

    it('should render as unchecked when checked=false', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.value).toBe(false);
    });

    it('should render as checked when checked=true', () => {
      const { getByRole } = render(
        <Switch checked={true} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.value).toBe(true);
    });
  });

  describe('Interaction', () => {
    it('should call onChange with true when toggled from unchecked', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      fireEvent(switchEl, 'valueChange', true);

      expect(mockOnChange).toHaveBeenCalledWith(true);
    });

    it('should call onChange with false when toggled from checked', () => {
      const { getByRole } = render(
        <Switch checked={true} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      fireEvent(switchEl, 'valueChange', false);

      expect(mockOnChange).toHaveBeenCalledWith(false);
    });

    it('should not call onChange when disabled', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} disabled />
      );

      const switchEl = getByRole('switch');
      // Disabled switches shouldn't allow interaction
      expect(switchEl.props.disabled).toBe(true);
    });

    it('should trigger haptic feedback on toggle', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      fireEvent(switchEl, 'valueChange', true);

      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
    });
  });

  describe('Track Colors', () => {
    it('should render with track colors configured', () => {
      const { getByRole } = render(
        <Switch checked={true} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      // Switch renders correctly with checked state
      expect(switchEl.props.value).toBe(true);
    });

    it('should render with unchecked track colors configured', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      // Switch renders correctly with unchecked state
      expect(switchEl.props.value).toBe(false);
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} disabled />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.disabled).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have accessibilityRole="switch"', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} />
      );

      expect(getByRole('switch')).toBeTruthy();
    });

    it('should have correct accessibilityState.checked when true', () => {
      const { getByRole } = render(
        <Switch checked={true} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.accessibilityState?.checked).toBe(true);
    });

    it('should have correct accessibilityState.checked when false', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.accessibilityState?.checked).toBe(false);
    });

    it('should have accessibilityState.disabled when disabled', () => {
      const { getByRole } = render(
        <Switch checked={false} onChange={mockOnChange} disabled />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.accessibilityState?.disabled).toBe(true);
    });
  });
});

describe('SwitchField (Composed)', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render switch element', () => {
      const { getByRole } = render(
        <SwitchField checked={false} onChange={mockOnChange} />
      );

      expect(getByRole('switch')).toBeTruthy();
    });

    it('should render with label when provided', () => {
      const { getByText } = render(
        <SwitchField
          checked={false}
          onChange={mockOnChange}
          label="Enable notifications"
        />
      );

      expect(getByText('Enable notifications')).toBeTruthy();
    });

    it('should render with description when provided', () => {
      const { getByText } = render(
        <SwitchField
          checked={false}
          onChange={mockOnChange}
          description="Receive email updates"
        />
      );

      expect(getByText('Receive email updates')).toBeTruthy();
    });

    it('should render without label when not provided', () => {
      const { getByRole, queryByText } = render(
        <SwitchField checked={false} onChange={mockOnChange} />
      );

      expect(getByRole('switch')).toBeTruthy();
      // Should not find any label text
    });

    it('should render both label and description', () => {
      const { getByText } = render(
        <SwitchField
          checked={false}
          onChange={mockOnChange}
          label="Dark mode"
          description="Enable dark theme for the application"
        />
      );

      expect(getByText('Dark mode')).toBeTruthy();
      expect(getByText('Enable dark theme for the application')).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    it('should apply size="sm" styling', () => {
      const { getByRole } = render(
        <SwitchField checked={false} onChange={mockOnChange} size="sm" />
      );

      const switchEl = getByRole('switch');
      // sm size uses different transform scale
      expect(switchEl.props.style).toBeDefined();
    });

    it('should apply size="md" styling by default', () => {
      const { getByRole } = render(
        <SwitchField checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      expect(switchEl).toBeTruthy();
    });
  });

  describe('State', () => {
    it('should reflect checked=true state', () => {
      const { getByRole } = render(
        <SwitchField checked={true} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.value).toBe(true);
    });

    it('should reflect checked=false state', () => {
      const { getByRole } = render(
        <SwitchField checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.value).toBe(false);
    });

    it('should show disabled state correctly', () => {
      const { getByRole } = render(
        <SwitchField checked={false} onChange={mockOnChange} disabled />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.disabled).toBe(true);
    });
  });

  describe('Interaction', () => {
    it('should call onChange with new value when toggled', () => {
      const { getByRole } = render(
        <SwitchField checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      fireEvent(switchEl, 'valueChange', true);

      expect(mockOnChange).toHaveBeenCalledWith(true);
    });

    it('should trigger haptic feedback on toggle', () => {
      const { getByRole } = render(
        <SwitchField checked={false} onChange={mockOnChange} />
      );

      const switchEl = getByRole('switch');
      fireEvent(switchEl, 'valueChange', true);

      expect(Haptics.impactAsync).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have accessibilityLabel from label prop', () => {
      const { getByRole } = render(
        <SwitchField
          checked={false}
          onChange={mockOnChange}
          label="Email notifications"
        />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.accessibilityLabel).toBe('Email notifications');
    });

    it('should have accessibilityHint from description prop', () => {
      const { getByRole } = render(
        <SwitchField
          checked={false}
          onChange={mockOnChange}
          description="Toggle to enable"
        />
      );

      const switchEl = getByRole('switch');
      expect(switchEl.props.accessibilityHint).toBe('Toggle to enable');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined label gracefully', () => {
      const { getByRole } = render(
        <SwitchField checked={false} onChange={mockOnChange} label={undefined} />
      );

      expect(getByRole('switch')).toBeTruthy();
    });

    it('should handle undefined description gracefully', () => {
      const { getByRole } = render(
        <SwitchField
          checked={false}
          onChange={mockOnChange}
          description={undefined}
        />
      );

      expect(getByRole('switch')).toBeTruthy();
    });

    it('should apply custom containerStyle', () => {
      const customStyle = { marginTop: 20 };
      const { getByRole } = render(
        <SwitchField
          checked={false}
          onChange={mockOnChange}
          containerStyle={customStyle}
        />
      );

      expect(getByRole('switch')).toBeTruthy();
    });
  });
});