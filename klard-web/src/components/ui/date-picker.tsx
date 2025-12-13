'use client';

import { useState } from 'react';
import { format, isValid } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormFieldIds } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface DatePickerProps {
  /** Currently selected date */
  value: Date | null;
  /** Callback when date changes */
  onChange: (date: Date | null) => void;
  /** Label text displayed above the picker */
  label?: string;
  /** Error message - displays in red below picker */
  error?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Placeholder text when no date selected */
  placeholder?: string;
  /** Selection mode */
  mode?: 'date' | 'time' | 'datetime';
  /** Disables the picker */
  disabled?: boolean;
  /** Shows required asterisk after label */
  required?: boolean;
  /** Custom id for the trigger button */
  id?: string;
  /** Additional className for the wrapper */
  className?: string;
}

function isValidDate(value: Date | null | undefined): value is Date {
  return value instanceof Date && isValid(value);
}

function getFormat(mode: 'date' | 'time' | 'datetime'): string {
  if (mode === 'time') return 'p';
  if (mode === 'datetime') return 'PPPp';
  return 'PPP';
}

export function DatePicker({
  value,
  onChange,
  label,
  error,
  minDate,
  maxDate,
  placeholder = 'Pick a date',
  mode = 'date',
  disabled = false,
  required = false,
  id: providedId,
  className,
}: DatePickerProps) {
  const { inputId, errorId } = useFormFieldIds(providedId, 'date-picker', error);
  const [open, setOpen] = useState(false);

  const validValue = isValidDate(value) ? value : null;
  const displayValue = validValue ? format(validValue, getFormat(mode)) : null;

  const handleSelect = (date: Date | undefined) => {
    if (date && isDateDisabled(date)) {
      return;
    }
    onChange(date ?? null);
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (disabled) return;
    setOpen(nextOpen);
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const defaultMonth = validValue ?? minDate ?? maxDate ?? new Date();

  const handleDayClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const dayElement = target?.closest<HTMLElement>('[data-day]');
    if (!dayElement) return;
    const dayValue = dayElement.getAttribute('data-day');
    if (!dayValue) return;
    const parsed = new Date(dayValue);
    if (!isValidDate(parsed) || isDateDisabled(parsed)) return;
    handleSelect(parsed);
  };

  return (
    <div className={cn('w-full', className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
          {required ? (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            type="button"
            variant="outline"
            disabled={disabled}
            data-slot="date-picker"
            aria-invalid={!!error}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-required={required}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'h-12 w-full justify-start text-left font-normal',
              !displayValue && 'text-slate-500 dark:text-slate-400',
              error && 'border-red-500 focus-visible:ring-red-500/30 focus-visible:border-red-500',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" data-testid="calendar-icon" />
            {displayValue ?? placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" onClickCapture={handleDayClickCapture}>
          <Calendar
            mode="single"
            selected={validValue ?? undefined}
            onSelect={handleSelect}
            disabled={isDateDisabled}
            onDayClick={handleSelect}
            showOutsideDays={false}
            defaultMonth={defaultMonth}
          />
        </PopoverContent>
      </Popover>

      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
