'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Bell, RefreshCw, Ban, AlertCircle, DollarSign, Info } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from './button';

// Alert type configuration
const alertTypeConfig = {
  renewal: {
    icon: RefreshCw,
    tone: 'info' as const,
  },
  payment_failed: {
    icon: AlertCircle,
    tone: 'error' as const,
  },
  service_blocked: {
    icon: Ban,
    tone: 'error' as const,
  },
  new_charge: {
    icon: DollarSign,
    tone: 'warning' as const,
  },
  card_expiring: {
    icon: AlertCircle,
    tone: 'warning' as const,
  },
  system: {
    icon: Info,
    tone: 'info' as const,
  },
};

// CVA variants
const alertCardVariants = cva(
  'flex gap-3 rounded-xl border bg-card p-4 transition-all duration-200',
  {
    variants: {
      tone: {
        info: 'border-blue-200 bg-blue-50/50 dark:border-blue-900/40 dark:bg-blue-950/20',
        warning:
          'border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20',
        error: 'border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20',
      },
      size: {
        md: 'p-4',
        sm: 'p-3 gap-2',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-md hover:border-primary/30',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'info',
      size: 'md',
      interactive: false,
    },
  }
);

// Helper: Format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDay / 30)} month${Math.floor(diffDay / 30) !== 1 ? 's' : ''} ago`;
}

// Types
export type AlertType =
  | 'renewal'
  | 'payment_failed'
  | 'service_blocked'
  | 'new_charge'
  | 'card_expiring'
  | 'system';

export interface Subscription {
  name: string;
  logoUrl?: string;
}

export interface AlertNotification {
  id: string;
  type: AlertType;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  subscription?: Subscription;
  ctaLabel?: string;
  onCtaPress?: () => void;
}

export interface AlertCardProps extends VariantProps<typeof alertCardVariants> {
  alert: AlertNotification;
  onPress: () => void;
  onDismiss?: () => void;
  className?: string;
}

function AlertCard({
  alert,
  onPress,
  onDismiss,
  tone: toneProp,
  size = 'md',
  className,
}: AlertCardProps) {
  const config = alertTypeConfig[alert.type];
  const Icon = config.icon;
  const tone = toneProp ?? config.tone;
  const isInteractive = Boolean(onPress);
  const isSmall = size === 'sm';

  const iconSize = isSmall ? 'size-4' : 'size-5';

  const handleCardClick = (e: React.MouseEvent) => {
    if (onPress) {
      onPress();
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss?.();
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert.onCtaPress?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPress?.();
    }
  };

  return (
    <div
      data-slot="alert-card"
      className={cn(alertCardVariants({ tone, size, interactive: isInteractive }), className)}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `${alert.title} alert` : undefined}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <Icon className={cn(iconSize, 'text-muted-foreground')} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Subscription chip (if provided) */}
        {alert.subscription && (
          <div className="flex items-center gap-2 mb-2">
            {alert.subscription.logoUrl ? (
              <Image
                src={alert.subscription.logoUrl}
                alt={alert.subscription.name}
                width={16}
                height={16}
                className="rounded-full"
              />
            ) : (
              <div className="flex size-4 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                {alert.subscription.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-xs font-medium text-muted-foreground">
              {alert.subscription.name}
            </span>
          </div>
        )}

        {/* Title & Body */}
        <div className="space-y-1">
          <h3 className={cn('font-semibold text-foreground', isSmall ? 'text-sm' : 'text-base')}>
            {alert.title}
          </h3>
          <p className={cn('text-muted-foreground', isSmall ? 'text-xs' : 'text-sm')}>
            {alert.body}
          </p>
        </div>

        {/* Footer: Timestamp + CTA */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className={cn('text-muted-foreground', isSmall ? 'text-xs' : 'text-sm')}>
            {formatRelativeTime(alert.timestamp)}
          </span>

          {alert.ctaLabel && alert.onCtaPress && (
            <Button
              variant="outline"
              size={isSmall ? 'sm' : 'default'}
              onClick={handleCtaClick}
            >
              {alert.ctaLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Unread dot */}
      {!alert.read && (
        <div
          className="size-2 rounded-full bg-primary flex-shrink-0 mt-1"
          aria-label="Unread notification"
        />
      )}

      {/* Dismiss button */}
      {onDismiss && (
        <button
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <span className={cn(isSmall ? 'text-base' : 'text-lg')}>&times;</span>
        </button>
      )}
    </div>
  );
}

export { AlertCard, alertCardVariants };
