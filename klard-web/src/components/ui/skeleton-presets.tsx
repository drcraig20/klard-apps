'use client';

import * as React from 'react';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

export interface AvatarSkeletonProps {
  size?: number;
  className?: string;
}

export function AvatarSkeleton({ size = 40, className }: Readonly<AvatarSkeletonProps>) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
}

export interface TextLineSkeletonProps {
  width?: number | string;
  className?: string;
}

export function TextLineSkeleton({
  width = '100%',
  className,
}: Readonly<TextLineSkeletonProps>) {
  return <Skeleton variant="text" width={width} className={className} />;
}

export interface SubscriptionCardSkeletonProps {
  className?: string;
}

export function SubscriptionCardSkeleton({
  className,
}: Readonly<SubscriptionCardSkeletonProps>) {
  return (
    <div
      data-slot="skeleton.subscription-card"
      className={cn(
        'flex items-center gap-4 p-4 border rounded-lg border-slate-200 dark:border-slate-700',
        className
      )}
    >
      <AvatarSkeleton size={48} />
      <div className="space-y-2 flex-1">
        <TextLineSkeleton width={128} />
        <TextLineSkeleton width={96} />
      </div>
      <Skeleton width={64} height={24} />
    </div>
  );
}
