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
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-destructive',
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
}: Readonly<ProgressBarProps>) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('space-y-1', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between text-sm">
          {label && (
            <span className="text-muted-foreground">{label}</span>
          )}
          {showLabel && (
            <span className="text-muted-foreground tabular-nums">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-muted',
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
