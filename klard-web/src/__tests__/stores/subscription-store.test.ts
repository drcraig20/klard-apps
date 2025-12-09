/**
 * Tests for Subscription Store
 *
 * Note: These tests require a testing framework to be set up.
 * To run these tests, first install:
 * - vitest (recommended for Next.js)
 * - @testing-library/react
 * - @testing-library/react-hooks (for testing hooks)
 *
 * Installation:
 * pnpm add -D vitest @testing-library/react @testing-library/react-hooks jsdom
 *
 * Then create vitest.config.ts in klard-web root:
 *
 * import { defineConfig } from 'vitest/config'
 * import path from 'path'
 *
 * export default defineConfig({
 *   test: {
 *     environment: 'jsdom',
 *     globals: true,
 *   },
 *   resolve: {
 *     alias: {
 *       '@': path.resolve(__dirname, './src'),
 *     },
 *   },
 * })
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSubscriptionStore } from '@/stores/subscription-store';
import type { AddSubscription } from '@klard-apps/commons';

describe('SubscriptionStore', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  // Clean up after each test
  afterEach(() => {
    const { result } = renderHook(() => useSubscriptionStore());
    act(() => {
      result.current.clearSubscriptions();
    });
    localStorage.clear();
  });

  it('should have an empty subscriptions array initially', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    expect(result.current.subscriptions).toEqual([]);
  });

  it('should add a subscription with generated id, createdAt, and status', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    const newSubscription: AddSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-09').toISOString(),
      category: 'streaming',
      cancellationUrl: 'https://netflix.com/cancel',
    };

    act(() => {
      result.current.addSubscription(newSubscription);
    });

    expect(result.current.subscriptions).toHaveLength(1);

    const addedSubscription = result.current.subscriptions[0];

    // Verify generated fields
    expect(addedSubscription.id).toBeDefined();
    expect(addedSubscription.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i); // UUID v4 pattern
    expect(addedSubscription.status).toBe('active');
    expect(addedSubscription.createdAt).toBeInstanceOf(Date);

    // Verify mapped fields
    expect(addedSubscription.name).toBe('Netflix');
    expect(addedSubscription.price).toBe(15.99);
    expect(addedSubscription.billingCycle).toBe('monthly');
    expect(addedSubscription.currency).toBe('USD');
  });

  it('should convert annual billing cycle to yearly', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    const newSubscription: AddSubscription = {
      serviceName: 'Spotify',
      price: 99.99,
      billingCycle: 'annual',
      nextRenewalDate: new Date('2026-01-09').toISOString(),
      category: 'music',
    };

    act(() => {
      result.current.addSubscription(newSubscription);
    });

    expect(result.current.subscriptions[0].billingCycle).toBe('yearly');
  });

  it('should add multiple subscriptions', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    const subscription1: AddSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-09').toISOString(),
      category: 'streaming',
    };

    const subscription2: AddSubscription = {
      serviceName: 'Spotify',
      price: 9.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-15').toISOString(),
      category: 'music',
    };

    act(() => {
      result.current.addSubscription(subscription1);
      result.current.addSubscription(subscription2);
    });

    expect(result.current.subscriptions).toHaveLength(2);
    expect(result.current.subscriptions[0].name).toBe('Netflix');
    expect(result.current.subscriptions[1].name).toBe('Spotify');
  });

  it('should remove a subscription by id', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    const newSubscription: AddSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-09').toISOString(),
      category: 'streaming',
    };

    act(() => {
      result.current.addSubscription(newSubscription);
    });

    const subscriptionId = result.current.subscriptions[0].id;

    act(() => {
      result.current.removeSubscription(subscriptionId);
    });

    expect(result.current.subscriptions).toHaveLength(0);
  });

  it('should not remove other subscriptions when removing by id', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    const subscription1: AddSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-09').toISOString(),
      category: 'streaming',
    };

    const subscription2: AddSubscription = {
      serviceName: 'Spotify',
      price: 9.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-15').toISOString(),
      category: 'music',
    };

    act(() => {
      result.current.addSubscription(subscription1);
      result.current.addSubscription(subscription2);
    });

    const firstSubscriptionId = result.current.subscriptions[0].id;

    act(() => {
      result.current.removeSubscription(firstSubscriptionId);
    });

    expect(result.current.subscriptions).toHaveLength(1);
    expect(result.current.subscriptions[0].name).toBe('Spotify');
  });

  it('should clear all subscriptions', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    const subscription1: AddSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-09').toISOString(),
      category: 'streaming',
    };

    const subscription2: AddSubscription = {
      serviceName: 'Spotify',
      price: 9.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-15').toISOString(),
      category: 'music',
    };

    act(() => {
      result.current.addSubscription(subscription1);
      result.current.addSubscription(subscription2);
    });

    expect(result.current.subscriptions).toHaveLength(2);

    act(() => {
      result.current.clearSubscriptions();
    });

    expect(result.current.subscriptions).toHaveLength(0);
  });

  it('should persist subscriptions to localStorage', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    const newSubscription: AddSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-09').toISOString(),
      category: 'streaming',
    };

    act(() => {
      result.current.addSubscription(newSubscription);
    });

    // Check that localStorage has the key
    const storedData = localStorage.getItem('klard-subscriptions');
    expect(storedData).toBeDefined();
    expect(storedData).not.toBeNull();

    // Parse and verify the stored data
    const parsedData = JSON.parse(storedData!);
    expect(parsedData.state.subscriptions).toHaveLength(1);
    expect(parsedData.state.subscriptions[0].name).toBe('Netflix');
  });

  it('should restore subscriptions from localStorage on initialization', () => {
    // First, add a subscription
    const { result: firstRender } = renderHook(() => useSubscriptionStore());

    const newSubscription: AddSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-09').toISOString(),
      category: 'streaming',
    };

    act(() => {
      firstRender.current.addSubscription(newSubscription);
    });

    const subscriptionId = firstRender.current.subscriptions[0].id;

    // Simulate a new render (e.g., page refresh)
    const { result: secondRender } = renderHook(() => useSubscriptionStore());

    // Verify the subscription was restored
    expect(secondRender.current.subscriptions).toHaveLength(1);
    expect(secondRender.current.subscriptions[0].id).toBe(subscriptionId);
    expect(secondRender.current.subscriptions[0].name).toBe('Netflix');
  });

  it('should handle removing a non-existent subscription gracefully', () => {
    const { result } = renderHook(() => useSubscriptionStore());

    const newSubscription: AddSubscription = {
      serviceName: 'Netflix',
      price: 15.99,
      billingCycle: 'monthly',
      nextRenewalDate: new Date('2025-01-09').toISOString(),
      category: 'streaming',
    };

    act(() => {
      result.current.addSubscription(newSubscription);
    });

    const nonExistentId = 'non-existent-id';

    act(() => {
      result.current.removeSubscription(nonExistentId);
    });

    // Original subscription should still be there
    expect(result.current.subscriptions).toHaveLength(1);
  });
});
