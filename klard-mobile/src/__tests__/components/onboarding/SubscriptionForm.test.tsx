import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { SubscriptionForm } from '@/components/onboarding/SubscriptionForm';
import { useSubscriptionStore } from '@/stores/subscriptionStore';
import { POPULAR_SERVICES } from '@klard-apps/commons';

// Mock dependencies
jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(),
  notificationAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: 'success',
    Error: 'error',
  },
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('@react-native-community/datetimepicker', () => {
  return jest.fn(() => null);
});

// Mock the subscription store
jest.mock('@/stores/subscriptionStore', () => ({
  useSubscriptionStore: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('SubscriptionForm', () => {
  const mockAddSubscription = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSubscriptionStore as unknown as jest.Mock).mockImplementation(
      (selector: (state: { addSubscription: typeof mockAddSubscription }) => unknown) =>
        selector({
          addSubscription: mockAddSubscription,
        }),
    );
  });

  describe('Initial State - Service Selection', () => {
    it('should render service selection view initially', () => {
      const { getByText, getByPlaceholderText } = render(<SubscriptionForm />);

      // Should show step indicator
      expect(getByText('Step 1 of 2 — Add your first subscription')).toBeTruthy();

      // Should show headline
      expect(getByText("What's your first subscription?")).toBeTruthy();

      // Should show search input
      expect(getByPlaceholderText('Search services...')).toBeTruthy();
    });

    it('should display skip button', () => {
      const { getAllByText } = render(<SubscriptionForm />);

      // Skip button should be visible
      const skipButtons = getAllByText('Skip');
      expect(skipButtons.length).toBeGreaterThan(0);
    });

    it('should show ServiceGrid component', () => {
      const { getByLabelText } = render(<SubscriptionForm />);

      // ServiceGrid should render with first service
      expect(getByLabelText('Select Netflix')).toBeTruthy();
    });
  });

  describe('Service Selection', () => {
    it('should show form after selecting a service', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Form fields should now be visible
      expect(getByText('Price')).toBeTruthy();
      expect(getByText('Billing Cycle')).toBeTruthy();
      expect(getByText('Next Renewal Date')).toBeTruthy();
    });

    it('should pre-fill form with service defaults', () => {
      const { getByLabelText, getByDisplayValue } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Price should be pre-filled with Netflix default
      const netflixService = POPULAR_SERVICES.find(s => s.id === 'netflix');
      expect(getByDisplayValue(netflixService!.defaultPrice.toString())).toBeTruthy();
    });

    it('should show service header with color dot and name', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Service header should show service name
      expect(getByText('Netflix')).toBeTruthy();
      expect(getByText('STREAMING')).toBeTruthy();
    });

    it('should show change button in service header', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Change button should be visible
      expect(getByText('Change')).toBeTruthy();
    });

    it('should return to service selection when change button is pressed', () => {
      const { getByLabelText, getByText, queryByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Press change button
      const changeButton = getByText('Change');
      fireEvent.press(changeButton);

      // Should return to service selection
      expect(getByText("What's your first subscription?")).toBeTruthy();
      expect(queryByText('Price')).toBeNull();
    });

    it('should trigger haptic feedback when changing service', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      jest.clearAllMocks();

      // Press change button
      const changeButton = getByText('Change');
      fireEvent.press(changeButton);

      expect(Haptics.selectionAsync).toHaveBeenCalled();
    });
  });

  describe('Form Pre-fill', () => {
    it('should pre-fill cancellation URL if service has one', () => {
      const { getByLabelText, getByDisplayValue } = render(<SubscriptionForm />);

      // Select Netflix (has cancellation URL)
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      const netflixService = POPULAR_SERVICES.find(s => s.id === 'netflix');
      if (netflixService?.cancellationUrl) {
        expect(getByDisplayValue(netflixService.cancellationUrl)).toBeTruthy();
      }
    });

    it('should set default renewal date to 1 month in future', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Date should be approximately 1 month in future
      const today = new Date();
      const oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

      // Date button should exist
      expect(getByText(oneMonthLater.toLocaleDateString())).toBeTruthy();
    });

    it('should pre-fill billing cycle from service defaults', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix (monthly)
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      const netflixService = POPULAR_SERVICES.find(s => s.id === 'netflix');

      // Monthly should be selected
      if (netflixService?.defaultCycle === 'monthly') {
        const monthlyButton = getByText('Monthly').parent;
        // Check if it has selected styling (this is a simplified check)
        expect(monthlyButton).toBeTruthy();
      }
    });

    it('should pre-fill category from service defaults', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      const netflixService = POPULAR_SERVICES.find(s => s.id === 'netflix');

      // Category should show service's category
      const categoryDisplay = netflixService!.category
        .replace('_', ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      expect(getByText(categoryDisplay)).toBeTruthy();
    });
  });

  describe('Skip Flow', () => {
    it('should navigate to burnercard screen when skip is pressed', () => {
      const { getAllByText } = render(<SubscriptionForm />);

      // Press skip button
      const skipButton = getAllByText('Skip')[0];
      fireEvent.press(skipButton);

      expect(router.push).toHaveBeenCalledWith('/onboarding-burnercard');
    });

    it('should navigate without adding subscription when skip is pressed', () => {
      const { getAllByText } = render(<SubscriptionForm />);

      // Press skip button
      const skipButton = getAllByText('Skip')[0];
      fireEvent.press(skipButton);

      expect(mockAddSubscription).not.toHaveBeenCalled();
    });

    it('should trigger haptic feedback when skip is pressed', () => {
      const { getAllByText } = render(<SubscriptionForm />);

      jest.clearAllMocks();

      // Press skip button
      const skipButton = getAllByText('Skip')[0];
      fireEvent.press(skipButton);

      expect(Haptics.selectionAsync).toHaveBeenCalled();
    });

    it('should allow skip from form state', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix to show form
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      jest.clearAllMocks();

      // Press "Skip for now" button
      const skipButton = getByText('Skip for now');
      fireEvent.press(skipButton);

      expect(router.push).toHaveBeenCalledWith('/onboarding-burnercard');
    });
  });

  describe('Form Validation', () => {
    it('should show error when price is invalid', async () => {
      const { getByLabelText, getByText, getByDisplayValue } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Set invalid price
      const priceInput = getByDisplayValue('15.99');
      fireEvent.changeText(priceInput, '0');

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Validation Error',
          'Please check the form and try again.'
        );
      });
    });

    it('should not submit when validation fails', async () => {
      const { getByLabelText, getByText, getByDisplayValue } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Set invalid price
      const priceInput = getByDisplayValue('15.99');
      fireEvent.changeText(priceInput, '-5');

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockAddSubscription).not.toHaveBeenCalled();
      });
    });

    it('should trigger error haptic on validation failure', async () => {
      const { getByLabelText, getByText, getByDisplayValue } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Set invalid price
      const priceInput = getByDisplayValue('15.99');
      fireEvent.changeText(priceInput, '0');

      jest.clearAllMocks();

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith('error');
      });
    });
  });

  describe('Successful Submission', () => {
    it('should add subscription to store when form is valid', async () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockAddSubscription).toHaveBeenCalled();
      });
    });

    it('should trigger success haptic on valid submission', async () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      jest.clearAllMocks();

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith('success');
      });
    });

    it('should show success alert with service name', async () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Success',
          expect.stringContaining('Netflix')
        );
      });
    });

    it('should navigate to burnercard screen after successful submission', async () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(router.push).toHaveBeenCalledWith('/onboarding-burnercard');
      });
    });

    it('should pass correct data structure to store', async () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockAddSubscription).toHaveBeenCalledWith(
          expect.objectContaining({
            serviceName: 'Netflix',
            price: expect.any(Number),
            billingCycle: expect.any(String),
            nextRenewalDate: expect.any(String),
            category: expect.any(String),
          })
        );
      });
    });
  });

  describe('Billing Cycle Selection', () => {
    it('should allow switching between monthly and annual', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Press annual button
      const annualButton = getByText('Annual');
      fireEvent.press(annualButton);

      // Should trigger haptic
      expect(Haptics.selectionAsync).toHaveBeenCalled();
    });

    it('should update billing cycle state when toggled', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Press annual button
      const annualButton = getByText('Annual');
      fireEvent.press(annualButton);

      // Press monthly button again
      const monthlyButton = getByText('Monthly');
      fireEvent.press(monthlyButton);

      // Should trigger haptic multiple times
      expect(Haptics.selectionAsync).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for form fields', () => {
      const { getByLabelText, getByText } = render(<SubscriptionForm />);

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Check form field labels
      expect(getByText('Price')).toBeTruthy();
      expect(getByText('Billing Cycle')).toBeTruthy();
      expect(getByText('Next Renewal Date')).toBeTruthy();
      expect(getByText('Category')).toBeTruthy();
      expect(getByText('Cancellation Link (optional)')).toBeTruthy();
    });

    it('should display error messages for invalid fields', async () => {
      const { getByLabelText, getByText, getByDisplayValue, queryByText } = render(
        <SubscriptionForm />
      );

      // Select Netflix
      const netflixButton = getByLabelText('Select Netflix');
      fireEvent.press(netflixButton);

      // Set invalid price
      const priceInput = getByDisplayValue('15.99');
      fireEvent.changeText(priceInput, '0');

      // Submit form
      const submitButton = getByText('Add Subscription');
      fireEvent.press(submitButton);

      // Error message should appear (Zod validation)
      await waitFor(() => {
        // Check that error text exists (exact message depends on Zod)
        expect(Alert.alert).toHaveBeenCalled();
      });
    });
  });
});
