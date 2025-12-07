import { z } from 'zod';
import {
  SubscriptionSchema,
  CreateSubscriptionSchema,
  UpdateSubscriptionSchema,
} from '../types/subscription';

export function validateSubscription(data: unknown) {
  return SubscriptionSchema.safeParse(data);
}

export function validateCreateSubscription(data: unknown) {
  return CreateSubscriptionSchema.safeParse(data);
}

export function validateUpdateSubscription(data: unknown) {
  return UpdateSubscriptionSchema.safeParse(data);
}

export function parseSubscription(data: unknown) {
  return SubscriptionSchema.parse(data);
}

export function parseCreateSubscription(data: unknown) {
  return CreateSubscriptionSchema.parse(data);
}

export function parseUpdateSubscription(data: unknown) {
  return UpdateSubscriptionSchema.parse(data);
}
