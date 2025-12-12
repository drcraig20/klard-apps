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
import {
  inputFieldVariants,
  labelStyles,
  errorStyles,
  helperTextStyles,
} from '@/lib/form-field-styles';

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
          className={labelStyles}
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
          className={inputFieldVariants({
            hasError: !!error,
            disabled,
          })}
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
          className={errorStyles}
          role="alert"
        >
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className={helperTextStyles}>{helperText}</p>
      )}
    </div>
  );
}
