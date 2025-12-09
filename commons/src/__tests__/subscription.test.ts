import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  SubscriptionCategory,
  SUBSCRIPTION_CATEGORIES,
  AddSubscriptionSchema,
  type PopularService,
} from '../index';

describe('SubscriptionCategory', () => {
  it('should validate valid category values', () => {
    const validCategories = [
      'streaming',
      'music',
      'software',
      'cloud_storage',
      'shopping',
      'ai_tools',
      'health_fitness',
      'other',
    ];

    validCategories.forEach((category) => {
      expect(SubscriptionCategory.safeParse(category).success).toBe(true);
    });
  });

  it('should reject invalid category values', () => {
    const invalidCategories = ['invalid', 'random', 'test', ''];

    invalidCategories.forEach((category) => {
      expect(SubscriptionCategory.safeParse(category).success).toBe(false);
    });
  });
});

describe('SUBSCRIPTION_CATEGORIES', () => {
  it('should contain all 8 categories', () => {
    expect(SUBSCRIPTION_CATEGORIES).toHaveLength(8);
  });

  it('should include all required categories', () => {
    const expectedCategories = [
      'streaming',
      'music',
      'software',
      'cloud_storage',
      'shopping',
      'ai_tools',
      'health_fitness',
      'other',
    ];

    expectedCategories.forEach((category) => {
      expect(SUBSCRIPTION_CATEGORIES).toContain(category);
    });
  });
});

describe('AddSubscriptionSchema', () => {
  it('should validate a complete valid subscription', () => {
    const validSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'streaming',
    };

    const result = AddSubscriptionSchema.safeParse(validSubscription);
    expect(result.success).toBe(true);
  });

  it('should validate subscription with optional cancellation URL', () => {
    const validSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'streaming',
      cancellationUrl: 'https://netflix.com/cancel',
    };

    const result = AddSubscriptionSchema.safeParse(validSubscription);
    expect(result.success).toBe(true);
  });

  it('should reject empty service name', () => {
    const invalidSubscription = {
      serviceName: '',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'streaming',
    };

    const result = AddSubscriptionSchema.safeParse(invalidSubscription);
    expect(result.success).toBe(false);
  });

  it('should reject negative price', () => {
    const invalidSubscription = {
      serviceName: 'Netflix',
      price: -5,
      billingCycle: 'monthly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'streaming',
    };

    const result = AddSubscriptionSchema.safeParse(invalidSubscription);
    expect(result.success).toBe(false);
  });

  it('should reject zero price', () => {
    const invalidSubscription = {
      serviceName: 'Netflix',
      price: 0,
      billingCycle: 'monthly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'streaming',
    };

    const result = AddSubscriptionSchema.safeParse(invalidSubscription);
    expect(result.success).toBe(false);
  });

  it('should reject invalid billing cycle', () => {
    const invalidSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'weekly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'streaming',
    };

    const result = AddSubscriptionSchema.safeParse(invalidSubscription);
    expect(result.success).toBe(false);
  });

  it('should reject invalid category', () => {
    const invalidSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'invalid_category',
    };

    const result = AddSubscriptionSchema.safeParse(invalidSubscription);
    expect(result.success).toBe(false);
  });

  it('should reject invalid URL for cancellation URL', () => {
    const invalidSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'streaming',
      cancellationUrl: 'not-a-valid-url',
    };

    const result = AddSubscriptionSchema.safeParse(invalidSubscription);
    expect(result.success).toBe(false);
  });

  it('should allow empty string for optional cancellation URL', () => {
    const validSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: '2025-02-01T00:00:00.000Z',
      category: 'streaming',
      cancellationUrl: '',
    };

    const result = AddSubscriptionSchema.safeParse(validSubscription);
    expect(result.success).toBe(true);
  });

  it('should accept annual billing cycle', () => {
    const validSubscription = {
      serviceName: 'Adobe CC',
      price: 599.88,
      billingCycle: 'annual',
      nextRenewalDate: '2026-01-01T00:00:00.000Z',
      category: 'software',
    };

    const result = AddSubscriptionSchema.safeParse(validSubscription);
    expect(result.success).toBe(true);
  });
});

describe('PopularService type', () => {
  it('should match the expected interface shape', () => {
    // This test validates the type structure at compile time
    // If the type is wrong, TypeScript will catch it
    const mockService: PopularService = {
      id: 'netflix',
      name: 'Netflix',
      defaultPrice: 15.99,
      defaultCycle: 'monthly',
      category: 'streaming',
      color: '#E50914',
      cancellationUrl: 'https://netflix.com/cancel',
    };

    expect(mockService).toBeDefined();
    expect(mockService.id).toBe('netflix');
    expect(mockService.name).toBe('Netflix');
    expect(mockService.defaultPrice).toBe(15.99);
    expect(mockService.defaultCycle).toBe('monthly');
    expect(mockService.category).toBe('streaming');
    expect(mockService.color).toBe('#E50914');
    expect(mockService.cancellationUrl).toBe('https://netflix.com/cancel');
  });

  it('should allow optional cancellationUrl', () => {
    const mockService: PopularService = {
      id: 'gym',
      name: 'Gym',
      defaultPrice: 30.0,
      defaultCycle: 'monthly',
      category: 'health_fitness',
      color: '#22C55E',
    };

    expect(mockService).toBeDefined();
    expect(mockService.cancellationUrl).toBeUndefined();
  });
});
