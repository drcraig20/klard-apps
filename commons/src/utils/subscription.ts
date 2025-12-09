/**
 * Subscription Utilities
 * Shared subscription transformation and mapping functions
 *
 * SRP: Single responsibility - transform subscription data
 * DIP: Depends on type abstractions only
 */

import type { AddSubscription, Subscription, BillingCycle } from '../types/subscription';
import { generateUUID } from './uuid';

/**
 * Maps onboarding billing cycle to full subscription billing cycle
 */
function mapBillingCycle(cycle: 'monthly' | 'annual'): BillingCycle {
  return cycle === 'annual' ? 'yearly' : 'monthly';
}

/**
 * Creates a Subscription object from AddSubscription onboarding data
 *
 * @param data - The onboarding form data
 * @param userId - Optional user ID (empty string if not authenticated)
 * @returns A complete Subscription object ready for storage
 */
export function createSubscriptionFromOnboarding(
  data: AddSubscription,
  userId: string = ''
): Subscription {
  const now = new Date();

  return {
    id: generateUUID(),
    userId,
    name: data.serviceName,
    description: data.cancellationUrl || undefined,
    price: data.price,
    currency: 'USD',
    billingCycle: mapBillingCycle(data.billingCycle),
    status: 'active',
    startDate: now,
    nextBillingDate: new Date(data.nextRenewalDate),
    createdAt: now,
    updatedAt: now,
  };
}
