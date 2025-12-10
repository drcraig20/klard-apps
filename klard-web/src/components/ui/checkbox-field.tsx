'use client';

import { useId } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface CheckboxFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export function CheckboxField({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  indeterminate = false,
  className,
}: CheckboxFieldProps) {
  const id = useId();
  const descriptionId = useId();

  const checkboxState = indeterminate ? 'indeterminate' : checked;

  return (
    <div className={cn('flex items-start space-x-3', className)}>
      <Checkbox
        id={id}
        checked={checkboxState}
        onCheckedChange={(value) => {
          if (!disabled && typeof value === 'boolean') {
            onChange(value);
          }
        }}
        disabled={disabled}
        aria-describedby={description ? descriptionId : undefined}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      {(label || description) && (
        <div className="space-y-1 leading-none">
          {label && (
            <Label
              htmlFor={id}
              className={cn(
                'cursor-pointer text-sm font-medium',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </Label>
          )}
          {description && (
            <p
              id={descriptionId}
              className={cn(
                'text-sm text-muted-foreground',
                disabled && 'opacity-50'
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}