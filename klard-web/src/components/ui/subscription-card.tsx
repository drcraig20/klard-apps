'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Avatar } from './avatar';
import { Badge } from './badge';

const subscriptionCardVariants = cva(
  'flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors',
  {
    variants: {
      variant: {
        default: '',
        compact: 'p-3',
        detailed: 'p-5',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-accent/50 hover:border-primary/30',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
);

const statusConfig = {
  active: { label: 'Active', variant: 'success' as const },
  trial: { label: 'Trial', variant: 'warning' as const },
  paused: { label: 'Paused', variant: 'default' as const },
  cancelled: { label: 'Cancelled', variant: 'default' as const },
  expired: { label: 'Expired', variant: 'error' as const },
};

const billingCycleLabels = {
  monthly: '/mo',
  quarterly: '/qtr',
  yearly: '/yr',
};

export interface SubscriptionData {
  id: string;
  name: string;
  logoUrl?: string;
  price: number;
  currency?: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  status: 'active' | 'paused' | 'cancelled' | 'expired' | 'trial';
  nextBillingDate: Date;
  category?: string;
}

export interface SubscriptionCardProps
  extends VariantProps<typeof subscriptionCardVariants> {
  subscription: SubscriptionData;
  showActions?: boolean;
  onPress?: () => void;
  className?: string;
}

function SubscriptionCard({
  subscription,
  variant = 'default',
  showActions = false,
  onPress,
  className,
}: SubscriptionCardProps) {
  const {
    name,
    logoUrl,
    price,
    currency = 'USD',
    billingCycle,
    status,
    nextBillingDate,
    category,
  } = subscription;

  const statusInfo = statusConfig[status];
  const isInteractive = Boolean(onPress);
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);

  const formattedDate = format(new Date(nextBillingDate), 'MMM d');

  const Wrapper = isInteractive ? 'button' : 'div';

  return (
    <Wrapper
      data-slot="subscription-card"
      className={cn(
        subscriptionCardVariants({ variant, interactive: isInteractive }),
        className
      )}
      onClick={onPress}
      {...(isInteractive && {
        type: 'button',
        role: 'button',
        'aria-label': `${name} subscription, ${formattedPrice} ${billingCycleLabels[billingCycle]}`,
      })}
    >
      {/* Service Logo */}
      <Avatar
        src={logoUrl}
        alt={name}
        fallback={name.charAt(0).toUpperCase()}
        size={isCompact ? 'sm' : 'md'}
        shape="circle"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 text-left">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{name}</span>
          {!isCompact && (
            <Badge variant={statusInfo.variant} size="sm">
              {statusInfo.label}
            </Badge>
          )}
        </div>

        {isDetailed && category && (
          <span className="text-xs capitalize text-muted-foreground">
            {category}
          </span>
        )}

        <span className="text-sm text-muted-foreground">
          {isCompact ? (
            formattedDate
          ) : (
            <>Next: {formattedDate}</>
          )}
        </span>
      </div>

      {/* Price */}
      {!isCompact && (
        <div className="text-right">
          <span className="font-semibold text-foreground">{formattedPrice}</span>
          <span className="text-sm text-muted-foreground">
            {billingCycleLabels[billingCycle]}
          </span>
        </div>
      )}
    </Wrapper>
  );
}

export { SubscriptionCard, subscriptionCardVariants };
