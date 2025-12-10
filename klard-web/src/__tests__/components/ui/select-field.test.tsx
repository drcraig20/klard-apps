/**
 * Tests for SelectField Component (Web)
 *
 * These tests verify:
 * 1. Renders with all props (label, placeholder, error)
 * 2. Disabled state
 * 3. Error message display
 * 4. Accessibility attributes
 *
 * Note: Tests involving opening the dropdown are limited due to Radix UI's
 * reliance on browser APIs not available in JSDOM. Integration tests should
 * cover full interaction behavior.
 */

import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SelectField } from '@/components/ui/select-field';

// Mock browser APIs for Radix UI compatibility in JSDOM
beforeAll(() => {
  // Pointer capture
  Element.prototype.hasPointerCapture = vi.fn(() => false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();

  // ScrollIntoView
  Element.prototype.scrollIntoView = vi.fn();

  // ResizeObserver mock
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('SelectField', () => {
  describe('Rendering', () => {
    it('should render select without label', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
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

      expect(screen.getByText('Select a fruit')).toBeInTheDocument();
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

      expect(screen.getByText('Choose...')).toBeInTheDocument();
    });

    it('should display selected value', () => {
      render(
        <SelectField
          value="apple"
          onChange={() => {}}
          options={mockOptions}
        />
      );

      expect(screen.getByText('Apple')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          disabled
        />
      );

      expect(screen.getByRole('combobox')).toBeDisabled();
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

      const trigger = screen.getByRole('combobox');
      expect(trigger.className).toContain('cursor-not-allowed');
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

      expect(screen.getByText('Selection is required')).toBeInTheDocument();
    });

    it('should have error role on error message', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Selection is required"
        />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
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

      const trigger = screen.getByRole('combobox');
      expect(trigger.className).toContain('border-destructive');
    });

    it('should have aria-invalid when error is present', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          error="Selection is required"
        />
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label association', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          label="Fruit"
        />
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAccessibleName('Fruit');
    });

    it('should have aria-expanded attribute set to false when closed', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
        />
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have combobox role', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
        />
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should have button type', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
        />
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('type', 'button');
    });
  });

  describe('Props', () => {
    it('should accept custom className', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          className="custom-class"
        />
      );

      const container = screen.getByRole('combobox').closest('.custom-class');
      expect(container).toBeInTheDocument();
    });

    it('should accept custom id', () => {
      render(
        <SelectField
          value=""
          onChange={() => {}}
          options={mockOptions}
          id="my-select"
        />
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('id', 'my-select');
    });
  });
});