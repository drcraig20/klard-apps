import { z } from 'zod';

// ============================================
// Subscription Status
// ============================================
export const SubscriptionStatus = z.enum([
  'active',
  'paused',
  'cancelled',
  'expired',
  'trial',
]);
export type SubscriptionStatus = z.infer<typeof SubscriptionStatus>;

// ============================================
// Billing Cycles
// ============================================
export const BillingCycle = z.enum(['monthly', 'quarterly', 'yearly']);
export type BillingCycle = z.infer<typeof BillingCycle>;

// Onboarding uses simplified billing cycle (monthly/annual)
export const OnboardingBillingCycle = z.enum(['monthly', 'annual']);
export type OnboardingBillingCycle = z.infer<typeof OnboardingBillingCycle>;

// ============================================
// Subscription Categories (for onboarding)
// ============================================
export const SUBSCRIPTION_CATEGORIES = [
  'streaming',
  'music',
  'software',
  'cloud_storage',
  'shopping',
  'ai_tools',
  'health_fitness',
  'other',
] as const;

export const SubscriptionCategory = z.enum(SUBSCRIPTION_CATEGORIES);
export type SubscriptionCategory = z.infer<typeof SubscriptionCategory>;

// ============================================
// Popular Service (for onboarding service grid)
// ============================================
export interface PopularService {
  id: string;
  name: string;
  defaultPrice: number;
  defaultCycle: OnboardingBillingCycle;
  category: SubscriptionCategory;
  color: string;
  cancellationUrl?: string;
}

// ============================================
// Add Subscription Schema (onboarding form)
// ============================================
export const AddSubscriptionSchema = z.object({
  serviceName: z.string().min(1, 'Service name is required'),
  price: z.number().positive('Price must be greater than 0'),
  billingCycle: OnboardingBillingCycle,
  nextRenewalDate: z.string().datetime(),
  category: SubscriptionCategory,
  cancellationUrl: z.string().url().optional().or(z.literal('')),
});
export type AddSubscription = z.infer<typeof AddSubscriptionSchema>;

export const SubscriptionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  currency: z.string().length(3).default('USD'),
  billingCycle: BillingCycle,
  status: SubscriptionStatus,
  startDate: z.coerce.date(),
  nextBillingDate: z.coerce.date(),
  cancelledAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const CreateSubscriptionSchema = SubscriptionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateSubscription = z.infer<typeof CreateSubscriptionSchema>;

export const UpdateSubscriptionSchema = SubscriptionSchema.partial().omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type UpdateSubscription = z.infer<typeof UpdateSubscriptionSchema>;
