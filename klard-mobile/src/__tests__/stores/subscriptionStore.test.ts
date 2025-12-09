import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSubscriptionStore } from '@/stores/subscriptionStore';
import type { AddSubscription } from '@klard-apps/commons';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

describe('subscriptionStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Reset store state
    const { result } = renderHook(() => useSubscriptionStore());
    act(() => {
      result.current.clearSubscriptions();
    });
  });

  describe('initial state', () => {
    it('should have empty subscriptions array', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      expect(result.current.subscriptions).toEqual([]);
    });
  });

  describe('addSubscription', () => {
    it('should add a subscription with generated id, createdAt, and status', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const addSubscriptionData: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
      };

      act(() => {
        result.current.addSubscription(addSubscriptionData);
      });

      expect(result.current.subscriptions).toHaveLength(1);

      const subscription = result.current.subscriptions[0];
      expect(subscription).toMatchObject({
        name: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextBillingDate: new Date('2025-01-15T00:00:00Z'),
        currency: 'USD',
        status: 'active',
      });

      // Verify generated fields
      expect(subscription.id).toBeDefined();
      expect(subscription.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      expect(subscription.createdAt).toBeInstanceOf(Date);
      expect(subscription.startDate).toBeInstanceOf(Date);
    });

    it('should add multiple subscriptions', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const subscription1: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
      };

      const subscription2: AddSubscription = {
        serviceName: 'Spotify',
        price: 9.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-10T00:00:00Z',
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

    it('should handle optional cancellationUrl', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const addSubscriptionData: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
        cancellationUrl: 'https://netflix.com/cancel',
      };

      act(() => {
        result.current.addSubscription(addSubscriptionData);
      });

      expect(result.current.subscriptions[0].description).toBe('https://netflix.com/cancel');
    });

    it('should convert annual billing cycle to yearly', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const addSubscriptionData: AddSubscription = {
        serviceName: 'Adobe CC',
        price: 599.99,
        billingCycle: 'annual',
        nextRenewalDate: '2026-01-15T00:00:00Z',
        category: 'software',
      };

      act(() => {
        result.current.addSubscription(addSubscriptionData);
      });

      expect(result.current.subscriptions[0].billingCycle).toBe('yearly');
    });
  });

  describe('removeSubscription', () => {
    it('should remove a subscription by id', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const addSubscriptionData: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
      };

      act(() => {
        result.current.addSubscription(addSubscriptionData);
      });

      const subscriptionId = result.current.subscriptions[0].id;

      act(() => {
        result.current.removeSubscription(subscriptionId);
      });

      expect(result.current.subscriptions).toHaveLength(0);
    });

    it('should only remove the specified subscription', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const subscription1: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
      };

      const subscription2: AddSubscription = {
        serviceName: 'Spotify',
        price: 9.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-10T00:00:00Z',
        category: 'music',
      };

      act(() => {
        result.current.addSubscription(subscription1);
        result.current.addSubscription(subscription2);
      });

      const subscription1Id = result.current.subscriptions[0].id;

      act(() => {
        result.current.removeSubscription(subscription1Id);
      });

      expect(result.current.subscriptions).toHaveLength(1);
      expect(result.current.subscriptions[0].name).toBe('Spotify');
    });

    it('should handle removing non-existent subscription gracefully', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      act(() => {
        result.current.removeSubscription('non-existent-id');
      });

      expect(result.current.subscriptions).toHaveLength(0);
    });
  });

  describe('clearSubscriptions', () => {
    it('should clear all subscriptions', () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const subscription1: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
      };

      const subscription2: AddSubscription = {
        serviceName: 'Spotify',
        price: 9.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-10T00:00:00Z',
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
  });

  describe('persistence', () => {
    it('should persist subscriptions to AsyncStorage when adding', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const addSubscriptionData: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
      };

      await act(async () => {
        result.current.addSubscription(addSubscriptionData);
        // Wait for persist to complete
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'klard-subscriptions',
        expect.any(String)
      );
    });

    it('should persist subscriptions to AsyncStorage when removing', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const addSubscriptionData: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
      };

      await act(async () => {
        result.current.addSubscription(addSubscriptionData);
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      const subscriptionId = result.current.subscriptions[0].id;

      jest.clearAllMocks();

      await act(async () => {
        result.current.removeSubscription(subscriptionId);
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'klard-subscriptions',
        expect.any(String)
      );
    });

    it('should persist empty array when clearing subscriptions', async () => {
      const { result } = renderHook(() => useSubscriptionStore());

      const addSubscriptionData: AddSubscription = {
        serviceName: 'Netflix',
        price: 15.99,
        billingCycle: 'monthly',
        nextRenewalDate: '2025-01-15T00:00:00Z',
        category: 'streaming',
      };

      await act(async () => {
        result.current.addSubscription(addSubscriptionData);
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      jest.clearAllMocks();

      await act(async () => {
        result.current.clearSubscriptions();
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'klard-subscriptions',
        expect.stringContaining('"subscriptions":[]')
      );
    });
  });
});
