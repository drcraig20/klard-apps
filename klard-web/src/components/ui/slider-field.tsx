'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

export interface SliderFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

function SliderField({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  disabled = false,
  className,
}: SliderFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-sm">
          {label && (
            <span className="text-slate-600 dark:text-slate-400">{label}</span>
          )}
          {showValue && (
            <span className="text-slate-500 dark:text-slate-500 tabular-nums">
              {value}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        value={[value]}
        onValueChange={([next]) => onChange(next)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <SliderPrimitive.Range className="absolute h-full bg-teal-600 dark:bg-teal-500" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-5 w-5 rounded-full border-2 border-teal-600 bg-white shadow-md',
            'ring-offset-white transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            'dark:border-teal-500 dark:bg-slate-900 dark:ring-offset-slate-900',
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
}

export { SliderField };
