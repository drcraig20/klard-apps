'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const variantMap = {
  rectangular: 'rounded-md',
  circular: 'rounded-full',
  text: 'h-4 rounded',
} as const;

export type SkeletonVariant = keyof typeof variantMap;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animated?: boolean;
}

function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animated = true,
  style,
  ...props
}: Readonly<SkeletonProps>) {
  const dimensionStyle: React.CSSProperties = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      role="status"
      className={cn(
        'bg-slate-200/80 dark:bg-slate-700/60',
        animated && 'animate-pulse',
        variantMap[variant],
        className
      )}
      style={dimensionStyle}
      {...props}
    />
  );
}

export { Skeleton };
