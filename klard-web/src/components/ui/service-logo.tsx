'use client';

import * as React from 'react';
import { Avatar, type AvatarSize } from './avatar';
import { cn } from '@/lib/utils';

export interface Service {
  name: string;
  logoUrl?: string;
}

export type ServiceLogoSize = Extract<AvatarSize, 'xs' | 'sm' | 'md' | 'lg'>;

export interface ServiceLogoProps {
  service: Service;
  size: ServiceLogoSize;
  className?: string;
}

function ServiceLogo({ service, size, className }: ServiceLogoProps) {
  const fallback = service.name.charAt(0).toUpperCase();

  return (
    <div data-slot="service-logo" className={cn(className)}>
      <Avatar
        src={service.logoUrl}
        alt={service.name}
        fallback={fallback}
        size={size}
        shape="circle"
      />
    </div>
  );
}

export { ServiceLogo };
