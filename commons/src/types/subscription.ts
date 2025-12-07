import { z } from 'zod';

export const SubscriptionStatus = z.enum([
  'active',
  'paused',
  'cancelled',
  'expired',
  'trial',
]);
export type SubscriptionStatus = z.infer<typeof SubscriptionStatus>;

export const BillingCycle = z.enum(['monthly', 'quarterly', 'yearly']);
export type BillingCycle = z.infer<typeof BillingCycle>;

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
