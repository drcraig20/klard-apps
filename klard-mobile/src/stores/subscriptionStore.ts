import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Subscription, AddSubscription, BillingCycle } from '@klard-apps/commons';

interface SubscriptionStore {
  subscriptions: Subscription[];
  addSubscription: (data: AddSubscription) => void;
  removeSubscription: (id: string) => void;
  clearSubscriptions: () => void;
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set) => ({
      subscriptions: [],

      addSubscription: (data: AddSubscription) => {
        const now = new Date();

        // Convert onboarding billing cycle (annual) to subscription billing cycle (yearly)
        const billingCycle: BillingCycle = data.billingCycle === 'annual' ? 'yearly' : 'monthly';

        const newSubscription: Subscription = {
          id: generateUUID(),
          userId: '', // Will be set by backend when synced
          name: data.serviceName,
          description: data.cancellationUrl || undefined,
          price: data.price,
          currency: 'USD',
          billingCycle,
          status: 'active',
          startDate: now,
          nextBillingDate: new Date(data.nextRenewalDate),
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          subscriptions: [...state.subscriptions, newSubscription],
        }));
      },

      removeSubscription: (id: string) => {
        set((state) => ({
          subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
        }));
      },

      clearSubscriptions: () => {
        set({ subscriptions: [] });
      },
    }),
    {
      name: 'klard-subscriptions',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
