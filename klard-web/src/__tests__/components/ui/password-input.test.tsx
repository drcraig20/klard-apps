/**
 * Tests for PasswordInput Component
 *
 * These tests verify:
 * 1. Renders password input with visibility toggle
 * 2. Toggles password visibility on button click
 * 3. Shows strength indicator when showStrength is true
 * 4. Shows requirements checklist when requirements prop provided
 * 5. Passes through standard input props correctly
 * 6. Accessibility attributes are correct
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordInput } from '@/components/ui/password-input';

describe('PasswordInput', () => {
  describe('Rendering', () => {
    it('should render a password input field', () => {
      render(<PasswordInput placeholder="Enter password" />);

      const input = screen.getByPlaceholderText('Enter password');
      expect(input).toBeTruthy();
      expect(input.getAttribute('type')).toBe('password');
    });

    it('should render with label when provided', () => {
      render(<PasswordInput label="Password" placeholder="Enter password" />);

      expect(screen.getByText('Password')).toBeTruthy();
    });

    it('should render visibility toggle button', () => {
      render(<PasswordInput placeholder="Enter password" />);

      const toggleButton = screen.getByRole('button', { name: /show password/i });
      expect(toggleButton).toBeTruthy();
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should start with password hidden (type=password)', () => {
      render(<PasswordInput placeholder="Enter password" />);

      const input = screen.getByPlaceholderText('Enter password');
      expect(input.getAttribute('type')).toBe('password');
    });

    it('should show password when toggle is clicked', () => {
      render(<PasswordInput placeholder="Enter password" />);

      const toggleButton = screen.getByRole('button', { name: /show password/i });
      fireEvent.click(toggleButton);

      const input = screen.getByPlaceholderText('Enter password');
      expect(input.getAttribute('type')).toBe('text');
    });

    it('should hide password when toggle is clicked twice', () => {
      render(<PasswordInput placeholder="Enter password" />);

      const toggleButton = screen.getByRole('button', { name: /show password/i });
      fireEvent.click(toggleButton);

      const hideButton = screen.getByRole('button', { name: /hide password/i });
      fireEvent.click(hideButton);

      const input = screen.getByPlaceholderText('Enter password');
      expect(input.getAttribute('type')).toBe('password');
    });

    it('should update aria-label on toggle', () => {
      render(<PasswordInput placeholder="Enter password" />);

      const toggleButton = screen.getByRole('button', { name: /show password/i });
      expect(toggleButton.getAttribute('aria-label')).toBe('Show password');

      fireEvent.click(toggleButton);

      const hideButton = screen.getByRole('button', { name: /hide password/i });
      expect(hideButton.getAttribute('aria-label')).toBe('Hide password');
    });
  });

  describe('Strength Indicator', () => {
    it('should not show strength indicator by default', () => {
      render(<PasswordInput value="test123" onChange={() => {}} />);

      expect(screen.queryByTestId('password-strength-indicator')).toBeNull();
    });

    it('should show strength indicator when showStrength is true', () => {
      render(<PasswordInput value="test123" onChange={() => {}} showStrength />);

      expect(screen.getByTestId('password-strength-indicator')).toBeTruthy();
    });

    it('should not show strength indicator when password is empty', () => {
      render(<PasswordInput value="" onChange={() => {}} showStrength />);

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
      render(<PasswordInput />);

      expect(screen.queryByTestId('password-requirements')).toBeNull();
    });

    it('should show requirements when provided', () => {
      render(<PasswordInput requirements={requirements} />);

      expect(screen.getByTestId('password-requirements')).toBeTruthy();
    });

    it('should display all requirement items', () => {
      render(<PasswordInput requirements={requirements} />);

      const requirementsList = screen.getByTestId('password-requirements');
      expect(requirementsList.querySelectorAll('[data-requirement]').length).toBe(5);
    });
  });

  describe('Props Passthrough', () => {
    it('should pass error prop and display error message', () => {
      render(<PasswordInput error="Password is required" />);

      expect(screen.getByText('Password is required')).toBeTruthy();
      expect(screen.getByRole('alert')).toBeTruthy();
    });

    it('should pass disabled prop correctly', () => {
      render(<PasswordInput disabled placeholder="Disabled" />);

      const input = screen.getByPlaceholderText('Disabled');
      expect(input).toBeDisabled();
    });

    it('should call onChange when typing', () => {
      const handleChange = vi.fn();
      render(<PasswordInput onChange={handleChange} placeholder="Type here" />);

      const input = screen.getByPlaceholderText('Type here');
      fireEvent.change(input, { target: { value: 'newpassword' } });

      expect(handleChange).toHaveBeenCalled();
    });

    it('should display helper text when no error', () => {
      render(<PasswordInput helperText="Must be 8+ characters" />);

      expect(screen.getByText('Must be 8+ characters')).toBeTruthy();
    });

    it('should hide helper text when error is present', () => {
      render(<PasswordInput helperText="Must be 8+ characters" error="Invalid password" />);

      expect(screen.queryByText('Must be 8+ characters')).toBeNull();
      expect(screen.getByText('Invalid password')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label on toggle button', () => {
      render(<PasswordInput />);

      const toggleButton = screen.getByRole('button');
      expect(toggleButton.getAttribute('aria-label')).toBeTruthy();
    });

    it('should connect label to input via htmlFor', () => {
      render(<PasswordInput label="Password" id="password-field" />);

      const label = screen.getByText('Password');
      expect(label.getAttribute('for')).toBe('password-field');
    });

    it('should have aria-invalid when error is present', () => {
      render(<PasswordInput error="Invalid" placeholder="Password" />);

      const input = screen.getByPlaceholderText('Password');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-describedby pointing to error message', () => {
      render(<PasswordInput error="Invalid" id="pwd" placeholder="Password" />);

      const input = screen.getByPlaceholderText('Password');
      expect(input.getAttribute('aria-describedby')).toContain('pwd-error');
    });
  });
});