/**
 * Tests for Mobile PasswordInput Component
 *
 * These tests verify:
 * 1. Renders password input with visibility toggle
 * 2. Toggles password visibility on press
 * 3. Shows strength indicator when showStrength is true
 * 4. Shows requirements checklist when requirements prop provided
 * 5. Passes through InputField props correctly
 * 6. Accessibility labels are correct
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { PasswordInput } from '@/components/ui/PasswordInput';

// Mock i18n
jest.mock('@/lib/i18n', () => ({
  t: (key: string, fallback?: string) => fallback || key,
}));

// Mock theme context
jest.mock('@/contexts/ThemeContext', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    error: '#DC2626',
    warning: '#D97706',
    success: '#059669',
    muted: '#E2E8F0',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    textDisabled: '#94A3B8',
    foreground: '#0F172A',
    background: '#FFFFFF',
    border: '#E2E8F0',
    disabledBackground: '#F1F5F9',
    placeholder: '#94A3B8',
  }),
  useTheme: () => ({
    colors: {
      primary: '#0D7C7A',
      error: '#DC2626',
      textTertiary: '#94A3B8',
    },
    isDark: false,
  }),
}));

// Mock calculatePasswordStrength
jest.mock('@klard-apps/commons', () => ({
  calculatePasswordStrength: (password: string) => {
    if (!password) return { level: 'weak', score: 0, feedback: [] };
    if (password.length < 6) return { level: 'weak', score: 10, feedback: ['Too short'] };
    if (password.length < 10) return { level: 'fair', score: 40, feedback: [] };
    if (password.length < 14) return { level: 'good', score: 70, feedback: [] };
    return { level: 'strong', score: 90, feedback: [] };
  },
}));

describe('PasswordInput', () => {
  describe('Rendering', () => {
    it('should render a password input field', () => {
      render(<PasswordInput testID="password-input" />);

      const input = screen.getByTestId('password-input');
      expect(input).toBeTruthy();
    });

    it('should render with label when provided', () => {
      render(<PasswordInput label="Password" testID="password-input" />);

      expect(screen.getByText('Password')).toBeTruthy();
    });

    it('should render visibility toggle button', () => {
      render(<PasswordInput testID="password-input" />);

      const toggleButton = screen.getByLabelText('Show password');
      expect(toggleButton).toBeTruthy();
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should start with password hidden (secureTextEntry=true)', () => {
      render(<PasswordInput testID="password-input" />);

      const input = screen.getByTestId('password-input');
      expect(input.props.secureTextEntry).toBe(true);
    });

    it('should show password when toggle is pressed', () => {
      render(<PasswordInput testID="password-input" />);

      const toggleButton = screen.getByLabelText('Show password');
      fireEvent.press(toggleButton);

      const input = screen.getByTestId('password-input');
      expect(input.props.secureTextEntry).toBe(false);
    });

    it('should hide password when toggle is pressed twice', () => {
      render(<PasswordInput testID="password-input" />);

      const showButton = screen.getByLabelText('Show password');
      fireEvent.press(showButton);

      const hideButton = screen.getByLabelText('Hide password');
      fireEvent.press(hideButton);

      const input = screen.getByTestId('password-input');
      expect(input.props.secureTextEntry).toBe(true);
    });
  });

  describe('Strength Indicator', () => {
    it('should not show strength indicator by default', () => {
      render(<PasswordInput value="test123" onChangeText={() => {}} testID="password-input" />);

      expect(screen.queryByTestId('password-strength-indicator')).toBeNull();
    });

    it('should show strength indicator when showStrength is true', () => {
      render(<PasswordInput value="test123" onChangeText={() => {}} showStrength testID="password-input" />);

      expect(screen.getByTestId('password-strength-indicator')).toBeTruthy();
    });

    it('should not show strength indicator when password is empty', () => {
      render(<PasswordInput value="" onChangeText={() => {}} showStrength testID="password-input" />);

      expect(screen.queryByTestId('password-strength-indicator')).toBeNull();
    });
  });

  describe('Password Requirements', () => {
    const requirements = {
      minLength: true,
      hasUppercase: false,
      hasLowercase: true,
      hasNumber: true,
      hasSpecial: false,
    };

    it('should not show requirements by default', () => {
      render(<PasswordInput testID="password-input" />);

      expect(screen.queryByTestId('password-requirements')).toBeNull();
    });

    it('should show requirements when provided', () => {
      render(<PasswordInput requirements={requirements} testID="password-input" />);

      expect(screen.getByTestId('password-requirements')).toBeTruthy();
    });
  });

  describe('Props Passthrough', () => {
    it('should pass error prop and display error message', () => {
      render(<PasswordInput error="Password is required" testID="password-input" />);

      expect(screen.getByText('Password is required')).toBeTruthy();
    });

    it('should pass editable=false when disabled', () => {
      render(<PasswordInput editable={false} testID="password-input" />);

      const input = screen.getByTestId('password-input');
      expect(input.props.editable).toBe(false);
    });

    it('should call onChangeText when typing', () => {
      const handleChange = jest.fn();
      render(<PasswordInput onChangeText={handleChange} testID="password-input" />);

      const input = screen.getByTestId('password-input');
      fireEvent.changeText(input, 'newpassword');

      expect(handleChange).toHaveBeenCalledWith('newpassword');
    });

    it('should display helper text when no error', () => {
      render(<PasswordInput helperText="Must be 8+ characters" testID="password-input" />);

      expect(screen.getByText('Must be 8+ characters')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibilityLabel on toggle button', () => {
      render(<PasswordInput testID="password-input" />);

      const toggleButton = screen.getByLabelText('Show password');
      expect(toggleButton).toBeTruthy();
    });

    it('should have accessibilityRole button on toggle', () => {
      render(<PasswordInput testID="password-input" />);

      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toBeTruthy();
    });
  });
});