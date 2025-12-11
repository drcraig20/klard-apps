/**
 * Tests for FormField Component (Mobile)
 *
 * These tests verify:
 * 1. Renders children correctly
 * 2. Shows label when provided
 * 3. Shows required asterisk when required=true
 * 4. Shows error message when error prop is set
 * 5. Shows helper text when helperText prop is set (no error)
 * 6. Hides helper text when error is present
 * 7. Proper accessibility attributes
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, TextInput } from 'react-native';
import { FormField } from '@/components/ui/FormField';

describe('FormField', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      const { getByTestId } = render(
        <FormField>
          <TextInput testID="child-input" />
        </FormField>
      );

      expect(getByTestId('child-input')).toBeTruthy();
    });

    it('should have correct testID', () => {
      const { getByTestId } = render(
        <FormField>
          <TextInput />
        </FormField>
      );

      expect(getByTestId('form-field')).toBeTruthy();
    });
  });

  describe('Label', () => {
    it('should render label when provided', () => {
      const { getByText } = render(
        <FormField label="Email Address">
          <TextInput />
        </FormField>
      );

      expect(getByText('Email Address')).toBeTruthy();
    });

    it('should not render label when not provided', () => {
      const { queryByTestId } = render(
        <FormField>
          <TextInput />
        </FormField>
      );

      expect(queryByTestId('form-field-label')).toBeNull();
    });
  });

  describe('Required Indicator', () => {
    it('should show asterisk when required is true', () => {
      const { getByText } = render(
        <FormField label="Email" required>
          <TextInput />
        </FormField>
      );

      expect(getByText('*')).toBeTruthy();
    });

    it('should not show asterisk when required is false', () => {
      const { queryByText } = render(
        <FormField label="Email" required={false}>
          <TextInput />
        </FormField>
      );

      expect(queryByText('*')).toBeNull();
    });
  });

  describe('Error Message', () => {
    it('should display error message when error prop is set', () => {
      const { getByText } = render(
        <FormField error="This field is required">
          <TextInput />
        </FormField>
      );

      expect(getByText('This field is required')).toBeTruthy();
    });

    it('should have accessibilityRole="alert" on error message', () => {
      const { getByRole } = render(
        <FormField error="Invalid email">
          <TextInput />
        </FormField>
      );

      expect(getByRole('alert')).toBeTruthy();
    });

    it('should not display error when not provided', () => {
      const { queryByTestId } = render(
        <FormField>
          <TextInput />
        </FormField>
      );

      expect(queryByTestId('form-field-error')).toBeNull();
    });
  });

  describe('Helper Text', () => {
    it('should display helper text when provided', () => {
      const { getByText } = render(
        <FormField helperText="Enter your email address">
          <TextInput />
        </FormField>
      );

      expect(getByText('Enter your email address')).toBeTruthy();
    });

    it('should hide helper text when error is present', () => {
      const { queryByText, getByText } = render(
        <FormField helperText="Helper" error="Error">
          <TextInput />
        </FormField>
      );

      expect(queryByText('Helper')).toBeNull();
      expect(getByText('Error')).toBeTruthy();
    });
  });

  describe('Custom Style', () => {
    it('should apply custom containerStyle', () => {
      const { getByTestId } = render(
        <FormField containerStyle={{ marginTop: 20 }}>
          <TextInput />
        </FormField>
      );

      const container = getByTestId('form-field');
      expect(container.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ marginTop: 20 })])
      );
    });
  });
});
