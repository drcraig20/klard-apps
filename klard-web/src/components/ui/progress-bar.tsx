'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const sizeMap = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
} as const;

const variantMap = {
  default: 'bg-teal-600 dark:bg-teal-500',
  success: 'bg-green-600 dark:bg-green-500',
  warning: 'bg-amber-500 dark:bg-amber-400',
  error: 'bg-red-600 dark:bg-red-500',
} as const;

export type ProgressBarSize = keyof typeof sizeMap;
export type ProgressBarVariant = keyof typeof variantMap;

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('space-y-1', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between text-sm">
          {label && (
            <span className="text-slate-600 dark:text-slate-400">{label}</span>
          )}
          {showLabel && (
            <span className="text-slate-500 dark:text-slate-500 tabular-nums">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700',
          sizeMap[size]
        )}
        value={percentage}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            'h-full w-full flex-1 rounded-full',
            variantMap[variant],
            animated && 'transition-transform duration-300 ease-in-out'
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

export { ProgressBar };
