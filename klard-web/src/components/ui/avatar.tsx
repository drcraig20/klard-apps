'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

const sizeMap = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
} as const;

export type AvatarSize = keyof typeof sizeMap;
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size: AvatarSize;
  shape?: AvatarShape;
  className?: string;
}

function Avatar({
  src,
  alt,
  fallback,
  size,
  shape = 'circle',
  className,
}: Readonly<AvatarProps>) {
  const [hasError, setHasError] = React.useState(false);
  const showImage = Boolean(src) && !hasError;

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex shrink-0 overflow-hidden',
        sizeMap[size],
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',
        className
      )}
    >
      {showImage ? (
        <img
          data-slot="avatar-image"
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <AvatarPrimitive.Fallback
          data-slot="avatar-fallback"
          className={cn(
            'flex h-full w-full items-center justify-center bg-teal-100 text-teal-700 font-medium',
            shape === 'circle' ? 'rounded-full' : 'rounded-lg'
          )}
        >
          {fallback}
        </AvatarPrimitive.Fallback>
      )}
    </AvatarPrimitive.Root>
  );
}

export { Avatar };
