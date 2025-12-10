/**
 * Tests for Switch and SwitchField Components
 *
 * These tests verify:
 * 1. Renders with correct role and states
 * 2. Label and description rendering
 * 3. Size variants (sm, md)
 * 4. Checked/unchecked states
 * 5. Disabled state
 * 6. onChange callback behavior
 * 7. Keyboard interactions
 * 8. Accessibility attributes
 * 9. Edge cases
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '@/components/ui/switch';
import { SwitchField } from '@/components/ui/switch-field';

describe('Switch (Primitive)', () => {
  describe('Rendering', () => {
    it('should render with switch role', () => {
      render(<Switch checked={false} onCheckedChange={() => {}} />);

      expect(screen.getByRole('switch')).toBeTruthy();
    });

    it('should render as unchecked by default when checked=false', () => {
      render(<Switch checked={false} onCheckedChange={() => {}} />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('data-state')).toBe('unchecked');
    });

    it('should render as checked when checked=true', () => {
      render(<Switch checked={true} onCheckedChange={() => {}} />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('data-state')).toBe('checked');
    });
  });

  describe('Interaction', () => {
    it('should call onCheckedChange with true when toggled from unchecked', async () => {
      const handleChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={handleChange} />);

      const switchEl = screen.getByRole('switch');
      await userEvent.click(switchEl);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should call onCheckedChange with false when toggled from checked', async () => {
      const handleChange = vi.fn();
      render(<Switch checked={true} onCheckedChange={handleChange} />);

      const switchEl = screen.getByRole('switch');
      await userEvent.click(switchEl);

      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('should not call onCheckedChange when disabled', async () => {
      const handleChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={handleChange} disabled />);

      const switchEl = screen.getByRole('switch');
      await userEvent.click(switchEl);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Interaction', () => {
    it('should toggle with Space key', async () => {
      const handleChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={handleChange} />);

      const switchEl = screen.getByRole('switch');
      switchEl.focus();
      await userEvent.keyboard(' ');

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should toggle with Enter key', async () => {
      const handleChange = vi.fn();
      render(<Switch checked={false} onCheckedChange={handleChange} />);

      const switchEl = screen.getByRole('switch');
      switchEl.focus();
      await userEvent.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Switch checked={false} onCheckedChange={() => {}} disabled />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl).toBeDisabled();
    });

    it('should have data-disabled attribute when disabled', () => {
      render(<Switch checked={false} onCheckedChange={() => {}} disabled />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('data-disabled')).toBeDefined();
    });

    it('should have disabled styling (opacity)', () => {
      render(<Switch checked={false} onCheckedChange={() => {}} disabled />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.className).toContain('disabled:opacity-50');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-checked matching checked state (true)', () => {
      render(<Switch checked={true} onCheckedChange={() => {}} />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-checked matching checked state (false)', () => {
      render(<Switch checked={false} onCheckedChange={() => {}} />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('Edge Cases', () => {
    it('should pass through additional className', () => {
      render(<Switch checked={false} onCheckedChange={() => {}} className="custom-class" />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.className).toContain('custom-class');
    });

    it('should accept id prop', () => {
      render(<Switch checked={false} onCheckedChange={() => {}} id="my-switch" />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('id')).toBe('my-switch');
    });
  });
});

describe('SwitchField (Composed)', () => {
  const defaultProps = {
    checked: false,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render switch element', () => {
      render(<SwitchField {...defaultProps} />);

      expect(screen.getByRole('switch')).toBeTruthy();
    });

    it('should render with label when provided', () => {
      render(<SwitchField {...defaultProps} label="Enable notifications" />);

      expect(screen.getByText('Enable notifications')).toBeTruthy();
    });

    it('should render with description when provided', () => {
      render(<SwitchField {...defaultProps} description="Receive email updates" />);

      expect(screen.getByText('Receive email updates')).toBeTruthy();
    });

    it('should render without label when not provided', () => {
      render(<SwitchField {...defaultProps} />);

      // Should only have the switch, no label text
      expect(screen.getByRole('switch')).toBeTruthy();
      expect(screen.queryByRole('label')).toBeNull();
    });

    it('should render both label and description', () => {
      render(
        <SwitchField
          {...defaultProps}
          label="Dark mode"
          description="Enable dark theme for the application"
        />
      );

      expect(screen.getByText('Dark mode')).toBeTruthy();
      expect(screen.getByText('Enable dark theme for the application')).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    it('should apply size="sm" styling', () => {
      render(<SwitchField {...defaultProps} size="sm" />);

      const switchEl = screen.getByRole('switch');
      // sm size should have specific dimensions (h-4 w-7)
      expect(switchEl.className).toMatch(/h-4/);
      expect(switchEl.className).toMatch(/w-7/);
    });

    it('should apply size="md" styling by default', () => {
      render(<SwitchField {...defaultProps} />);

      const switchEl = screen.getByRole('switch');
      // md (default) size should have standard dimensions (h-5 w-9)
      expect(switchEl.className).toMatch(/h-5/);
      expect(switchEl.className).toMatch(/w-9/);
    });
  });

  describe('State', () => {
    it('should reflect checked=true state', () => {
      render(<SwitchField {...defaultProps} checked={true} />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('data-state')).toBe('checked');
    });

    it('should reflect checked=false state', () => {
      render(<SwitchField {...defaultProps} checked={false} />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('data-state')).toBe('unchecked');
    });

    it('should show disabled state with reduced opacity', () => {
      render(<SwitchField {...defaultProps} disabled />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl).toBeDisabled();
    });
  });

  describe('Interaction', () => {
    it('should call onChange with true when toggled from unchecked', async () => {
      const handleChange = vi.fn();
      render(<SwitchField checked={false} onChange={handleChange} />);

      const switchEl = screen.getByRole('switch');
      await userEvent.click(switchEl);

      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should call onChange with false when toggled from checked', async () => {
      const handleChange = vi.fn();
      render(<SwitchField checked={true} onChange={handleChange} />);

      const switchEl = screen.getByRole('switch');
      await userEvent.click(switchEl);

      expect(handleChange).toHaveBeenCalledWith(false);
    });

    it('should not call onChange when disabled', async () => {
      const handleChange = vi.fn();
      render(<SwitchField checked={false} onChange={handleChange} disabled />);

      const switchEl = screen.getByRole('switch');
      await userEvent.click(switchEl);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('should toggle when label is clicked', async () => {
      const handleChange = vi.fn();
      render(<SwitchField checked={false} onChange={handleChange} label="Click me" />);

      const label = screen.getByText('Click me');
      await userEvent.click(label);

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Accessibility', () => {
    it('should link label to switch via htmlFor/id', () => {
      render(<SwitchField {...defaultProps} label="Test Label" id="test-switch" />);

      const label = screen.getByText('Test Label');
      expect(label.getAttribute('for')).toBe('test-switch');
    });

    it('should generate unique id when not provided', () => {
      render(<SwitchField {...defaultProps} label="Auto ID" />);

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('id')).toBeTruthy();
    });

    it('should link description via aria-describedby', () => {
      render(
        <SwitchField
          {...defaultProps}
          description="Description text"
          id="desc-switch"
        />
      );

      const switchEl = screen.getByRole('switch');
      expect(switchEl.getAttribute('aria-describedby')).toContain('desc');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined label gracefully', () => {
      render(<SwitchField {...defaultProps} label={undefined} />);

      expect(screen.getByRole('switch')).toBeTruthy();
    });

    it('should handle undefined description gracefully', () => {
      render(<SwitchField {...defaultProps} description={undefined} />);

      expect(screen.getByRole('switch')).toBeTruthy();
    });

    it('should pass through additional className', () => {
      render(<SwitchField {...defaultProps} className="custom-field" />);

      // Container should have the custom class
      const container = screen.getByRole('switch').closest('div');
      expect(container?.className).toContain('custom-field');
    });
  });
});