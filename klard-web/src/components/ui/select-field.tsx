'use client';

import { useId } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectFieldProps {
  /** Currently selected value */
  value: string;
  /** Called when selection changes */
  onChange: (value: string) => void;
  /** Available options */
  options: SelectOption[];
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Label text displayed above the select */
  label?: string;
  /** Error message - displays in red below select */
  error?: string;
  /** Helper text displayed below the select when no error */
  helperText?: string;
  /** Disables the select */
  disabled?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Custom id for accessibility */
  id?: string;
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  label,
  error,
  helperText,
  disabled = false,
  className,
  id: providedId,
}: SelectFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <Label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
        >
          {label}
        </Label>
      )}
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={id}
          aria-describedby={error ? errorId : undefined}
          aria-label={label}
          aria-invalid={!!error}
          className={cn(
            'w-full h-12 px-4 text-base',
            'bg-white dark:bg-slate-900',
            'border rounded-xl',
            'transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
            !error && 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600',
            error && 'border-destructive focus:ring-destructive/30 focus:border-destructive',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800'
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              <div className="flex items-center gap-2">
                {option.icon}
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-2 text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
