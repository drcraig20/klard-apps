'use client';

import { useId } from 'react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export interface SwitchFieldProps {
  /** Label text displayed next to the switch */
  label?: string;
  /** Description text displayed below the label */
  description?: string;
  /** Whether the switch is checked */
  checked: boolean;
  /** Callback when the switch value changes */
  onChange: (checked: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Container className override */
  className?: string;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Custom id for the switch */
  id?: string;
}

export function SwitchField({
  label,
  description,
  checked,
  onChange,
  disabled,
  size = 'md',
  className,
  id: providedId,
}: SwitchFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const descriptionId = `${id}-description`;

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'text-sm font-medium leading-none cursor-pointer',
                'text-slate-900 dark:text-slate-100',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              id={descriptionId}
              className={cn(
                'text-sm text-slate-500 dark:text-slate-400',
                disabled && 'opacity-50'
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        size={size}
        aria-describedby={description ? descriptionId : undefined}
      />
    </div>
  );
}