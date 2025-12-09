/**
 * Date Utilities
 * Shared date calculation functions for subscriptions
 *
 * SRP: Single responsibility - calculate dates
 */

import type { OnboardingBillingCycle } from '../types/subscription';

/**
 * Calculates the default renewal date based on billing cycle
 *
 * @param cycle - 'monthly' or 'annual'
 * @param fromDate - Starting date (defaults to now)
 * @returns Date object set to the next renewal date
 */
export function calculateDefaultRenewalDate(
  cycle: OnboardingBillingCycle,
  fromDate: Date = new Date()
): Date {
  const date = new Date(fromDate);

  if (cycle === 'annual') {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }

  return date;
}

/**
 * Formats a date to ISO string for form storage
 */
export function toISODateString(date: Date): string {
  return date.toISOString();
}

/**
 * Parses an ISO date string to Date object
 */
export function fromISODateString(isoString: string): Date {
  return new Date(isoString);
}
