'use client';

import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';
import { Shield } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar } from '../avatar';
import { Badge } from '../badge';
import { HealthIndicator, type HealthStatus } from '../health-indicator';

import { subscriptionCardVariants, protectedBadgeVariants } from './subscription-card.styles';
import { statusConfig, billingCycleLabels } from './subscription-card.constants';

/**
 * SubscriptionCard Component
 *
 * Displays subscription information with optional health status and protection indicators.
 *
 * SOLID Compliance:
 * - SRP: Only renders subscription card UI
 * - OCP: Extend via props (healthStatus, isProtected) not modification
 * - DIP: Depends on design token abstractions via styles
 */

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
  /** Health status indicator for the subscription */
  healthStatus?: HealthStatus;
  /** Whether the subscription is protected by Klard */
  isProtected?: boolean;
  showActions?: boolean;
  onPress?: () => void;
  className?: string;
}

function SubscriptionCard({
  subscription,
  variant = 'default',
  healthStatus,
  isProtected = false,
  showActions = false,
  onPress,
  className,
}: Readonly<SubscriptionCardProps>) {
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
        subscriptionCardVariants({
          variant,
          interactive: isInteractive,
          protected: isProtected,
        }),
        className
      )}
      onClick={onPress}
      {...(isInteractive && {
        type: 'button',
        role: 'button',
        'aria-label': `${name} subscription, ${formattedPrice} ${billingCycleLabels[billingCycle]}${isProtected ? ', Protected' : ''}`,
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

      {/* Right Section: Price, Health Status, Protected Badge */}
      <div className="flex flex-col items-end gap-2">
        {/* Health Indicator and Protected Badge row */}
        {(healthStatus || isProtected) && (
          <div className="flex items-center gap-2">
            {healthStatus && (
              <HealthIndicator status={healthStatus} size="sm" showLabel />
            )}
            {isProtected && (
              <span className={protectedBadgeVariants({ glow: true })}>
                <Shield className="h-3 w-3" aria-hidden="true" />
                Protected
              </span>
            )}
          </div>
        )}

        {/* Price */}
        {!isCompact && (
          <div className="text-right">
            <span className="font-semibold text-foreground">{formattedPrice}</span>
            <span className="text-sm text-muted-foreground">
              {billingCycleLabels[billingCycle]}
            </span>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export { SubscriptionCard };
