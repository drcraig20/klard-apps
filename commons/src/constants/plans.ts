import type { BillingCycle } from '../types/subscription';

export interface PlanDefinition {
  id: string;
  name: string;
  description: string;
  features: string[];
  prices: Record<BillingCycle, number>;
  popular?: boolean;
}

export const PLANS: PlanDefinition[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with basic subscription tracking',
    features: [
      'Track up to 5 subscriptions',
      'Basic analytics',
      'Email reminders',
    ],
    prices: {
      monthly: 0,
      quarterly: 0,
      yearly: 0,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Everything you need to manage all your subscriptions',
    features: [
      'Unlimited subscriptions',
      'Advanced analytics',
      'Priority support',
      'Export reports',
      'Custom categories',
    ],
    prices: {
      monthly: 9.99,
      quarterly: 24.99,
      yearly: 79.99,
    },
    popular: true,
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Share subscription management with your family',
    features: [
      'Everything in Pro',
      'Up to 5 family members',
      'Shared subscriptions',
      'Family dashboard',
      'Spending limits',
    ],
    prices: {
      monthly: 14.99,
      quarterly: 39.99,
      yearly: 119.99,
    },
  },
];

export const DEFAULT_CURRENCY = 'USD';

export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
