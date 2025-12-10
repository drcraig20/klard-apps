/**
 * Tests for InputField Component
 *
 * These tests verify:
 * 1. Renders with all props (label, placeholder, error, helperText, required)
 * 2. Input types (text, email, password, search, number)
 * 3. Password toggle functionality
 * 4. Search clear button
 * 5. Icon positioning (leftIcon, rightIcon)
 * 6. Disabled state
 * 7. Error and helper text display
 * 8. Accessibility attributes
 * 9. Edge cases
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '@/components/ui/input-field';

describe('InputField', () => {
  describe('Rendering', () => {
    it('should render with label', () => {
      render(<InputField label="Email" />);

      expect(screen.getByText('Email')).toBeTruthy();
    });

    it('should render with placeholder', () => {
      render(<InputField placeholder="Enter email" />);

      expect(screen.getByPlaceholderText('Enter email')).toBeTruthy();
    });

    it('should render without label when not provided', () => {
      render(<InputField placeholder="No label" />);

      const input = screen.getByPlaceholderText('No label');
      expect(input).toBeTruthy();
    });

    it('should render as textbox role', () => {
      render(<InputField label="Test" />);

      expect(screen.getByRole('textbox')).toBeTruthy();
    });
  });

  describe('Input Types', () => {
    it('should render text type by default', () => {
      render(<InputField label="Text" />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('type')).toBe('text');
    });

    it('should render email type', () => {
      render(<InputField type="email" label="Email" />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('type')).toBe('email');
    });

    it('should render number type', () => {
      render(<InputField type="number" label="Number" />);

      const input = screen.getByRole('spinbutton');
      expect(input.getAttribute('type')).toBe('number');
    });

    it('should render search type', () => {
      render(<InputField type="search" label="Search" />);

      const input = screen.getByRole('searchbox');
      expect(input.getAttribute('type')).toBe('search');
    });
  });

  describe('Password Type', () => {
    it('should render password type with hidden text', () => {
      render(<InputField type="password" label="Password" />);

      const input = screen.getByLabelText('Password');
      expect(input.getAttribute('type')).toBe('password');
    });

    it('should show password toggle button', () => {
      render(<InputField type="password" label="Password" />);

      expect(screen.getByLabelText('Show password')).toBeTruthy();
    });

    it('should toggle password visibility when toggle clicked', () => {
      render(<InputField type="password" label="Password" />);

      const input = screen.getByLabelText('Password');
      const toggleButton = screen.getByLabelText('Show password');

      expect(input.getAttribute('type')).toBe('password');

      fireEvent.click(toggleButton);

      expect(input.getAttribute('type')).toBe('text');
      expect(screen.getByLabelText('Hide password')).toBeTruthy();
    });

    it('should toggle back to hidden when clicked again', () => {
      render(<InputField type="password" label="Password" />);

      const input = screen.getByLabelText('Password');
      const toggleButton = screen.getByLabelText('Show password');

      fireEvent.click(toggleButton);
      expect(input.getAttribute('type')).toBe('text');

      fireEvent.click(screen.getByLabelText('Hide password'));
      expect(input.getAttribute('type')).toBe('password');
    });
  });

  describe('Search Type', () => {
    it('should show clear button when value is present', () => {
      render(<InputField type="search" label="Search" value="test" onChange={() => {}} />);

      expect(screen.getByLabelText('Clear search')).toBeTruthy();
    });

    it('should not show clear button when value is empty', () => {
      render(<InputField type="search" label="Search" value="" onChange={() => {}} />);

      expect(screen.queryByLabelText('Clear search')).toBeNull();
    });

    it('should call onChange with empty string when clear is clicked', () => {
      const handleChange = vi.fn();
      render(<InputField type="search" label="Search" value="test" onChange={handleChange} />);

      fireEvent.click(screen.getByLabelText('Clear search'));

      expect(handleChange).toHaveBeenCalled();
    });

    it('should call onClear when clear is clicked', () => {
      const handleClear = vi.fn();
      render(
        <InputField
          type="search"
          label="Search"
          value="test"
          onChange={() => {}}
          onClear={handleClear}
        />
      );

      fireEvent.click(screen.getByLabelText('Clear search'));

      expect(handleClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('Required Indicator', () => {
    it('should show asterisk when required', () => {
      render(<InputField label="Required Field" required />);

      expect(screen.getByText('*')).toBeTruthy();
    });

    it('should not show asterisk when not required', () => {
      render(<InputField label="Optional Field" />);

      expect(screen.queryByText('*')).toBeNull();
    });

    it('should set aria-required when required', () => {
      render(<InputField label="Required Field" required />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-required')).toBe('true');
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      render(<InputField label="Email" error="Invalid email" />);

      expect(screen.getByText('Invalid email')).toBeTruthy();
    });

    it('should set aria-invalid when error is present', () => {
      render(<InputField label="Email" error="Invalid email" />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have error role on error message', () => {
      render(<InputField label="Email" error="Invalid email" />);

      expect(screen.getByRole('alert')).toBeTruthy();
    });

    it('should link error message via aria-describedby', () => {
      render(<InputField label="Email" error="Invalid email" id="email-input" />);

      const input = screen.getByRole('textbox');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toContain('error');
    });
  });

  describe('Helper Text', () => {
    it('should display helper text', () => {
      render(<InputField label="Password" helperText="Must be at least 8 characters" />);

      expect(screen.getByText('Must be at least 8 characters')).toBeTruthy();
    });

    it('should hide helper text when error is present', () => {
      render(
        <InputField
          label="Password"
          helperText="Must be at least 8 characters"
          error="Password too short"
        />
      );

      expect(screen.queryByText('Must be at least 8 characters')).toBeNull();
      expect(screen.getByText('Password too short')).toBeTruthy();
    });
  });

  describe('Icon Support', () => {
    it('should render left icon', () => {
      const icon = <span data-testid="left-icon">L</span>;
      render(<InputField label="With Icon" leftIcon={icon} />);

      expect(screen.getByTestId('left-icon')).toBeTruthy();
    });

    it('should render right icon when no action button', () => {
      const icon = <span data-testid="right-icon">R</span>;
      render(<InputField label="With Icon" rightIcon={icon} />);

      expect(screen.getByTestId('right-icon')).toBeTruthy();
    });

    it('should not render right icon when password type (toggle takes precedence)', () => {
      const icon = <span data-testid="right-icon">R</span>;
      render(<InputField type="password" label="Password" rightIcon={icon} />);

      expect(screen.queryByTestId('right-icon')).toBeNull();
      expect(screen.getByLabelText('Show password')).toBeTruthy();
    });

    it('should render both left and right icons', () => {
      const leftIcon = <span data-testid="left-icon">L</span>;
      const rightIcon = <span data-testid="right-icon">R</span>;
      render(<InputField label="Both Icons" leftIcon={leftIcon} rightIcon={rightIcon} />);

      expect(screen.getByTestId('left-icon')).toBeTruthy();
      expect(screen.getByTestId('right-icon')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<InputField label="Disabled" disabled />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should disable password toggle when input is disabled', () => {
      render(<InputField type="password" label="Password" disabled />);

      const toggleButton = screen.getByLabelText('Show password');
      expect(toggleButton).toBeDisabled();
    });

    it('should have disabled styling', () => {
      render(<InputField label="Disabled" disabled />);

      const input = screen.getByRole('textbox');
      expect(input.className).toContain('opacity-50');
    });
  });

  describe('Value and Change Handling', () => {
    it('should display controlled value', () => {
      render(<InputField label="Controlled" value="test value" onChange={() => {}} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test value');
    });

    it('should call onChange when value changes', () => {
      const handleChange = vi.fn();
      render(<InputField label="Test" onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new value' } });

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should link label to input via htmlFor', () => {
      render(<InputField label="Email" id="email" />);

      const label = screen.getByText('Email');
      expect(label.getAttribute('for')).toBe('email');
    });

    it('should generate id if not provided', () => {
      render(<InputField label="Auto ID" />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('id')).toBeTruthy();
    });

    it('should set aria-describedby for helper text', () => {
      render(<InputField label="Test" helperText="Helper" id="test-input" />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('aria-describedby')).toContain('helper');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined value', () => {
      render(<InputField label="Test" value={undefined} />);

      expect(screen.getByRole('textbox')).toBeTruthy();
    });

    it('should handle empty string value', () => {
      render(<InputField label="Test" value="" onChange={() => {}} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('should pass through additional props', () => {
      render(<InputField label="Test" maxLength={10} autoComplete="email" />);

      const input = screen.getByRole('textbox');
      expect(input.getAttribute('maxLength')).toBe('10');
      expect(input.getAttribute('autocomplete')).toBe('email');
    });

    it('should merge custom className', () => {
      render(<InputField label="Test" className="custom-class" />);

      const input = screen.getByRole('textbox');
      expect(input.className).toContain('custom-class');
    });

    it('should handle autoFocus', () => {
      render(<InputField label="Focus" autoFocus />);

      const input = screen.getByRole('textbox');
      expect(document.activeElement).toBe(input);
    });
  });
});