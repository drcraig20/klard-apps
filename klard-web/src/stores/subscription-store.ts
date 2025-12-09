import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Subscription, AddSubscription } from '@klard-apps/commons';

interface SubscriptionState {
  subscriptions: Subscription[];
}

interface SubscriptionActions {
  addSubscription: (data: AddSubscription) => void;
  removeSubscription: (id: string) => void;
  clearSubscriptions: () => void;
}

export type SubscriptionStore = SubscriptionState & SubscriptionActions;

const initialState: SubscriptionState = {
  subscriptions: [],
};

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set) => ({
      ...initialState,

      addSubscription: (data: AddSubscription) => {
        const subscription: Subscription = {
          id: crypto.randomUUID(),
          userId: '', // Will be set by backend after authentication
          name: data.serviceName,
          description: undefined,
          price: data.price,
          currency: 'USD',
          billingCycle: data.billingCycle === 'annual' ? 'yearly' : 'monthly',
          status: 'active',
          startDate: new Date(),
          nextBillingDate: new Date(data.nextRenewalDate),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          subscriptions: [...state.subscriptions, subscription],
        }));
      },

      removeSubscription: (id: string) => {
        set((state) => ({
          subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
        }));
      },

      clearSubscriptions: () => {
        set(initialState);
      },
    }),
    {
      name: 'klard-subscriptions',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
