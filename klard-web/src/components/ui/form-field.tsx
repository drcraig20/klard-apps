'use client';

import { useId } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  /** Label text displayed above the input */
  label?: string;
  /** Shows required asterisk after label */
  required?: boolean;
  /** Error message - displays in red below input */
  error?: string;
  /** Helper text - displays below input when no error */
  helperText?: string;
  /** Children input element(s) */
  children: React.ReactNode;
  /** Optional id for label association */
  id?: string;
  /** Additional className */
  className?: string;
}

export function FormField({
  label,
  required,
  error,
  helperText,
  children,
  id: providedId,
  className,
}: Readonly<FormFieldProps>) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  // Build aria-describedby for accessibility
  const describedBy =
    [error ? `${id}-error` : null, helperText && !error ? `${id}-helper` : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div
      data-slot="form-field"
      data-testid="form-field"
      className={cn('space-y-2', className)}
    >
      {label && (
        <Label
          htmlFor={id}
          className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
          {required && (
            <span className="text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${id}-helper`} className="text-sm text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
