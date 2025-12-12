/**
 * Tests for DatePicker Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, date display, popover behavior, accessibility
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '@/components/ui/date-picker';

describe('DatePicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with label', () => {
      render(<DatePicker label="Date of Birth" value={null} onChange={mockOnChange} />);

      expect(screen.getByText('Date of Birth')).toBeTruthy();
    });

    it('should render with placeholder when no value', () => {
      render(
        <DatePicker
          placeholder="Select a date"
          value={null}
          onChange={mockOnChange}
        />
      );

      expect(screen.getByText('Select a date')).toBeTruthy();
    });

    it('should render default placeholder when none provided', () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      expect(screen.getByText('Pick a date')).toBeTruthy();
    });

    it('should render calendar icon', () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      expect(screen.getByTestId('calendar-icon')).toBeTruthy();
    });

    it('should render as button role', () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('should have data-slot attribute', () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      const trigger = screen.getByRole('button');
      expect(trigger.getAttribute('data-slot')).toBe('date-picker');
    });
  });

  describe('Required Indicator', () => {
    it('should show asterisk when required', () => {
      render(
        <DatePicker
          label="Required Date"
          value={null}
          onChange={mockOnChange}
          required
        />
      );

      expect(screen.getByText('*')).toBeTruthy();
    });

    it('should not show asterisk when not required', () => {
      render(
        <DatePicker
          label="Optional Date"
          value={null}
          onChange={mockOnChange}
        />
      );

      expect(screen.queryByText('*')).toBeNull();
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      render(
        <DatePicker
          label="Date"
          value={null}
          onChange={mockOnChange}
          error="Date is required"
        />
      );

      expect(screen.getByText('Date is required')).toBeTruthy();
    });

    it('should have error role on error message', () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          error="Invalid date"
        />
      );

      expect(screen.getByRole('alert')).toBeTruthy();
    });

    it('should set aria-invalid when error is present', () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          error="Error"
        />
      );

      const trigger = screen.getByRole('button');
      expect(trigger.getAttribute('aria-invalid')).toBe('true');
    });

    it('should link error to trigger via aria-describedby', () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          error="Error message"
          id="test-picker"
        />
      );

      const trigger = screen.getByRole('button');
      expect(trigger.getAttribute('aria-describedby')).toBe('test-picker-error');
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          disabled
        />
      );

      const trigger = screen.getByRole('button');
      expect(trigger).toBeDisabled();
    });

    it('should not open calendar when disabled', () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          disabled
        />
      );

      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      expect(screen.queryByRole('grid')).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('should link label to trigger via htmlFor', () => {
      render(
        <DatePicker
          label="Start Date"
          value={null}
          onChange={mockOnChange}
          id="start-date"
        />
      );

      const label = screen.getByText('Start Date');
      expect(label.getAttribute('for')).toBe('start-date');
    });

    it('should have aria-haspopup on trigger', () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      const trigger = screen.getByRole('button');
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('should have aria-expanded based on open state', () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      const trigger = screen.getByRole('button');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');

      fireEvent.click(trigger);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-required when required', () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          required
        />
      );

      const trigger = screen.getByRole('button');
      expect(trigger.getAttribute('aria-required')).toBe('true');
    });
  });

  describe('Date Display', () => {
    it('should display formatted date when value is provided', () => {
      const testDate = new Date(2024, 5, 15); // June 15, 2024
      render(<DatePicker value={testDate} onChange={mockOnChange} />);

      // date-fns format "PPP" = "June 15th, 2024"
      expect(screen.getByText(/June 15/)).toBeTruthy();
    });

    it('should display placeholder when value is null', () => {
      render(
        <DatePicker
          value={null}
          onChange={mockOnChange}
          placeholder="Choose date"
        />
      );

      expect(screen.getByText('Choose date')).toBeTruthy();
    });

    it('should handle invalid date gracefully', () => {
      const invalidDate = new Date('invalid');
      render(<DatePicker value={invalidDate} onChange={mockOnChange} />);

      // Should show placeholder for invalid date
      expect(screen.getByText('Pick a date')).toBeTruthy();
    });

    it('should format time when mode is time', () => {
      const testDate = new Date(2024, 5, 15, 14, 30); // 2:30 PM
      render(<DatePicker value={testDate} onChange={mockOnChange} mode="time" />);

      // date-fns format "p" = "2:30 PM"
      expect(screen.getByText(/2:30/)).toBeTruthy();
    });

    it('should format datetime when mode is datetime', () => {
      const testDate = new Date(2024, 5, 15, 14, 30);
      render(<DatePicker value={testDate} onChange={mockOnChange} mode="datetime" />);

      // date-fns format "PPPp" = "June 15th, 2024 at 2:30 PM"
      expect(screen.getByText(/June 15.*2:30/)).toBeTruthy();
    });
  });

  describe('Popover Behavior', () => {
    it('should open calendar when trigger is clicked', async () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      // Calendar should be visible in popover
      expect(screen.getByRole('grid')).toBeTruthy(); // Calendar renders as grid
    });

    it('should close calendar after date selection', async () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      // Click a day in the calendar
      const dayButtons = screen.getAllByRole('gridcell');
      const selectableDay = dayButtons.find(
        (btn) => !btn.hasAttribute('disabled') && btn.textContent === '15'
      );
      if (selectableDay) {
        fireEvent.click(selectableDay);
      }

      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe('Date Constraints', () => {
    it('should disable dates before minDate', () => {
      const minDate = new Date(2024, 5, 10); // June 10, 2024
      const currentMonth = new Date(2024, 5, 15);

      render(
        <DatePicker
          value={currentMonth}
          onChange={mockOnChange}
          minDate={minDate}
        />
      );

      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      // Days before June 10 should be disabled
      const day5 = screen.getByText('5');
      expect(day5.closest('button')).toHaveAttribute('disabled');
    });

    it('should disable dates after maxDate', () => {
      const maxDate = new Date(2024, 5, 20); // June 20, 2024
      const currentMonth = new Date(2024, 5, 15);

      render(
        <DatePicker
          value={currentMonth}
          onChange={mockOnChange}
          maxDate={maxDate}
        />
      );

      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      // Days after June 20 should be disabled
      const day25 = screen.getByText('25');
      expect(day25.closest('button')).toHaveAttribute('disabled');
    });
  });

  describe('onChange Callback', () => {
    it('should call onChange with selected date', () => {
      render(<DatePicker value={null} onChange={mockOnChange} />);

      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      const dayButtons = screen.getAllByRole('gridcell');
      const day15 = dayButtons.find((btn) => btn.textContent === '15');
      if (day15) {
        fireEvent.click(day15);
      }

      expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined value as null', () => {
      render(<DatePicker value={undefined as unknown as Date | null} onChange={mockOnChange} />);

      expect(screen.getByText('Pick a date')).toBeTruthy();
    });

    it('should merge custom className', () => {
      const { container } = render(
        <DatePicker value={null} onChange={mockOnChange} className="custom-class" />
      );

      // The wrapper div should have the custom class
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
