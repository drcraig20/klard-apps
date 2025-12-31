/**
 * Tests for FormField Component
 *
 * These tests verify:
 * 1. Renders children correctly
 * 2. Shows label when provided
 * 3. Shows required asterisk when required=true
 * 4. Shows error message when error prop is set
 * 5. Shows helper text when helperText prop is set (no error)
 * 6. Hides helper text when error is present
 * 7. Accessibility: label has htmlFor, error has role="alert"
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from '@/components/ui/form-field';

describe('FormField', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      render(
        <FormField>
          <input data-testid="child-input" />
        </FormField>
      );

      expect(screen.getByTestId('child-input')).toBeTruthy();
    });

    it('should have data-slot attribute', () => {
      render(
        <FormField>
          <input />
        </FormField>
      );

      const container = screen.getByTestId('form-field');
      expect(container.getAttribute('data-slot')).toBe('form-field');
    });
  });

  describe('Label', () => {
    it('should render label when provided', () => {
      render(
        <FormField label="Email Address">
          <input />
        </FormField>
      );

      expect(screen.getByText('Email Address')).toBeTruthy();
    });

    it('should not render label when not provided', () => {
      render(
        <FormField>
          <input />
        </FormField>
      );

      expect(screen.queryByRole('label')).toBeNull();
    });

    it('should associate label with input via id', () => {
      render(
        <FormField label="Email" id="email-field">
          <input id="email-field" />
        </FormField>
      );

      const label = screen.getByText('Email');
      expect(label.getAttribute('for')).toBe('email-field');
    });
  });

  describe('Required Indicator', () => {
    it('should show asterisk when required is true', () => {
      render(
        <FormField label="Email" required>
          <input />
        </FormField>
      );

      expect(screen.getByText('*')).toBeTruthy();
    });

    it('should not show asterisk when required is false', () => {
      render(
        <FormField label="Email" required={false}>
          <input />
        </FormField>
      );

      expect(screen.queryByText('*')).toBeNull();
    });

    it('should have aria-hidden on asterisk', () => {
      render(
        <FormField label="Email" required>
          <input />
        </FormField>
      );

      const asterisk = screen.getByText('*');
      expect(asterisk.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Error Message', () => {
    it('should display error message when error prop is set', () => {
      render(
        <FormField error="This field is required">
          <input />
        </FormField>
      );

      expect(screen.getByText('This field is required')).toBeTruthy();
    });

    it('should have role="alert" on error message', () => {
      render(
        <FormField error="Invalid email">
          <input />
        </FormField>
      );

      const error = screen.getByRole('alert');
      expect(error.textContent).toBe('Invalid email');
    });

    it('should not display error when not provided', () => {
      render(
        <FormField>
          <input />
        </FormField>
      );

      expect(screen.queryByRole('alert')).toBeNull();
    });

    it('should apply error styling (destructive text)', () => {
      render(
        <FormField error="Error message">
          <input />
        </FormField>
      );

      const error = screen.getByRole('alert');
      expect(error.className).toContain('text-destructive');
    });
  });

  describe('Helper Text', () => {
    it('should display helper text when provided', () => {
      render(
        <FormField helperText="Enter your email address">
          <input />
        </FormField>
      );

      expect(screen.getByText('Enter your email address')).toBeTruthy();
    });

    it('should hide helper text when error is present', () => {
      render(
        <FormField helperText="Helper" error="Error">
          <input />
        </FormField>
      );

      expect(screen.queryByText('Helper')).toBeNull();
      expect(screen.getByText('Error')).toBeTruthy();
    });

    it('should apply muted styling to helper text', () => {
      render(
        <FormField helperText="Helper text">
          <input />
        </FormField>
      );

      const helper = screen.getByText('Helper text');
      expect(helper.className).toContain('text-muted-foreground');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with default classes', () => {
      render(
        <FormField className="custom-class">
          <input />
        </FormField>
      );

      const container = screen.getByTestId('form-field');
      expect(container.className).toContain('custom-class');
      expect(container.className).toContain('space-y-2');
    });
  });
});
