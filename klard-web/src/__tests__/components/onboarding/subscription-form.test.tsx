/**
 * Tests for SubscriptionForm Component
 *
 * These tests verify:
 * 1. Form renders with pre-filled service data
 * 2. Form validates with Zod schema
 * 3. Form submission adds to store
 * 4. Form submission navigates to BurnerCard tutorial
 * 5. Back button returns to service selection
 * 6. Error messages display for validation failures
 * 7. Success toast appears on submission
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SubscriptionForm } from '@/components/onboarding/subscription-form';
import { useSubscriptionStore } from '@/stores/subscription-store';
import { useRouter } from 'next/navigation';
import { POPULAR_SERVICES } from '@klard-apps/commons';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock subscription store
vi.mock('@/stores/subscription-store', () => ({
  useSubscriptionStore: vi.fn(),
}));

describe('SubscriptionForm', () => {
  const mockPush = vi.fn();
  const mockAddSubscription = vi.fn();
  const mockOnBack = vi.fn();
  const testService = POPULAR_SERVICES[0]; // Netflix

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup router mock
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as ReturnType<typeof useRouter>);

    // Setup store mock
    vi.mocked(useSubscriptionStore).mockReturnValue(mockAddSubscription);
  });

  describe('Rendering', () => {
    it('should render service header with service name and category', () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      expect(screen.getByText(testService.name)).toBeTruthy();
      expect(screen.getByText('Streaming')).toBeTruthy(); // Formatted category
    });

    it('should render change button in service header', () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      const changeButton = screen.getByText('Change');
      expect(changeButton).toBeTruthy();
    });

    it('should render all form fields with correct labels', () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      expect(screen.getByText('Price')).toBeTruthy();
      expect(screen.getByText('Billing Cycle')).toBeTruthy();
      expect(screen.getByText('Next Renewal Date')).toBeTruthy();
      expect(screen.getByText('Category')).toBeTruthy();
      expect(screen.getByText('Cancellation Link (optional)')).toBeTruthy();
    });

    it('should pre-fill form with service defaults', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const priceInput = container.querySelector('input[type="number"]') as HTMLInputElement;
      expect(priceInput?.value).toBe(testService.defaultPrice.toString());

      const billingCycleSelect = container.querySelector('select') as HTMLSelectElement;
      expect(billingCycleSelect?.value).toBe(testService.defaultCycle);
    });

    it('should show helper text for auto-filled category', () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      expect(screen.getByText('Auto-filled • Edit if incorrect')).toBeTruthy();
    });

    it('should show helper text for optional cancellation URL', () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      expect(screen.getByText('Optional')).toBeTruthy();
    });

    it('should render submit button with correct text', () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      expect(screen.getByText('Add Subscription')).toBeTruthy();
    });

    it('should mark required fields with asterisk', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const asterisks = container.querySelectorAll('.text-destructive');
      expect(asterisks.length).toBeGreaterThan(0);
    });
  });

  describe('Service Header Interactions', () => {
    it('should call onBack when change button is clicked', () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      const changeButton = screen.getByText('Change');
      fireEvent.click(changeButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('should display service color indicator', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const colorIndicator = container.querySelector('span[aria-hidden="true"]');
      expect(colorIndicator).toBeTruthy();
    });
  });

  describe('Form Validation', () => {
    it('should show error when price is 0', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const priceInput = container.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(priceInput, { target: { value: '0' } });

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Price must be greater than 0')).toBeTruthy();
      });
    });

    it('should show error when price is negative', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const priceInput = container.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(priceInput, { target: { value: '-10' } });

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Price must be greater than 0')).toBeTruthy();
      });
    });

    it('should show error when required fields are empty', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const priceInput = container.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(priceInput, { target: { value: '' } });

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        const errors = container.querySelectorAll('.text-destructive');
        expect(errors.length).toBeGreaterThan(0);
      });
    });

    it('should clear error when user starts typing', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const priceInput = container.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(priceInput, { target: { value: '0' } });

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Price must be greater than 0')).toBeTruthy();
      });

      // User fixes the error
      fireEvent.change(priceInput, { target: { value: '15.99' } });

      // Error should be cleared
      expect(screen.queryByText('Price must be greater than 0')).toBeFalsy();
    });

    it('should accept valid cancellation URL', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const urlInput = container.querySelector('input[type="url"]') as HTMLInputElement;
      fireEvent.change(urlInput, {
        target: { value: 'https://example.com/cancel' },
      });

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAddSubscription).toHaveBeenCalled();
      });
    });

    it('should allow empty cancellation URL (optional field)', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const urlInput = container.querySelector('input[type="url"]') as HTMLInputElement;
      fireEvent.change(urlInput, { target: { value: '' } });

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAddSubscription).toHaveBeenCalled();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call addSubscription with correct data on valid submit', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAddSubscription).toHaveBeenCalledTimes(1);
        expect(mockAddSubscription).toHaveBeenCalledWith(
          expect.objectContaining({
            serviceName: testService.name,
            price: testService.defaultPrice,
            billingCycle: testService.defaultCycle,
            category: testService.category,
          })
        );
      });
    });

    it('should navigate to burnercard-tutorial on successful submit', async () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(mockPush).toHaveBeenCalledWith('/onboarding/burnercard-tutorial');
        },
        { timeout: 2000 }
      );
    });

    it('should show success toast on submit', async () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        const toast = screen.getByRole('status');
        expect(toast).toBeTruthy();
        expect(
          screen.getByText(
            `${testService.name} added! You'll be reminded before it renews.`
          )
        ).toBeTruthy();
      });
    });

    it('should disable submit button while submitting', async () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      const submitButton = screen.getByText('Add Subscription') as HTMLButtonElement;
      fireEvent.click(submitButton);

      // Button should be disabled immediately
      expect(submitButton.disabled).toBe(true);
    });

    it('should show loading text while submitting', async () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeTruthy();
      });
    });

    it('should not submit if validation fails', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const priceInput = container.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(priceInput, { target: { value: '0' } });

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockAddSubscription).not.toHaveBeenCalled();
        expect(mockPush).not.toHaveBeenCalled();
      });
    });
  });

  describe('Form Field Updates', () => {
    it('should update price when changed', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const priceInput = container.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(priceInput, { target: { value: '20.99' } });

      expect(priceInput.value).toBe('20.99');
    });

    it('should update billing cycle when changed', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const billingCycleSelect = container.querySelector('select') as HTMLSelectElement;
      fireEvent.change(billingCycleSelect, { target: { value: 'annual' } });

      expect(billingCycleSelect.value).toBe('annual');
    });

    it('should update renewal date when changed', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const dateInput = container.querySelector('input[type="date"]') as HTMLInputElement;
      fireEvent.change(dateInput, { target: { value: '2025-12-31' } });

      expect(dateInput.value).toBe('2025-12-31');
    });

    it('should update category when changed', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const categorySelects = container.querySelectorAll('select');
      const categorySelect = categorySelects[1] as HTMLSelectElement; // Second select is category

      fireEvent.change(categorySelect, { target: { value: 'music' } });

      expect(categorySelect.value).toBe('music');
    });

    it('should update cancellation URL when changed', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const urlInput = container.querySelector('input[type="url"]') as HTMLInputElement;
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } });

      expect(urlInput.value).toBe('https://example.com');
    });
  });

  describe('Edge Cases', () => {
    it('should handle service without cancellation URL', () => {
      const serviceWithoutUrl = { ...testService, cancellationUrl: undefined };
      render(<SubscriptionForm service={serviceWithoutUrl} onBack={mockOnBack} />);

      const { container } = render(
        <SubscriptionForm service={serviceWithoutUrl} onBack={mockOnBack} />
      );
      const urlInput = container.querySelector('input[type="url"]') as HTMLInputElement;

      expect(urlInput.value).toBe('');
    });

    it('should handle rapid form submissions', async () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      const submitButton = screen.getByText('Add Subscription');

      // Try to submit multiple times rapidly
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      // Should only submit once due to isSubmitting state
      await waitFor(() => {
        expect(mockAddSubscription).toHaveBeenCalledTimes(1);
      });
    });

    it('should format category labels correctly', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      // Category with underscore should be formatted with spaces and capitalized
      const categorySelects = container.querySelectorAll('select');
      const categorySelect = categorySelects[1] as HTMLSelectElement;

      const options = Array.from(categorySelect.options);
      const cloudStorageOption = options.find((opt) => opt.value === 'cloud_storage');

      expect(cloudStorageOption?.textContent).toBe('Cloud Storage');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-invalid on fields with errors', async () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const priceInput = container.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(priceInput, { target: { value: '0' } });

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(priceInput.getAttribute('aria-invalid')).toBe('true');
      });
    });

    it('should have proper label associations', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const labels = container.querySelectorAll('label');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should have proper button types', () => {
      const { container } = render(
        <SubscriptionForm service={testService} onBack={mockOnBack} />
      );

      const submitButton = screen.getByText('Add Subscription');
      expect(submitButton.getAttribute('type')).toBe('submit');

      const changeButton = screen.getByText('Change');
      expect(changeButton.getAttribute('type')).toBe('button');
    });

    it('should have aria-live region for toast', async () => {
      render(<SubscriptionForm service={testService} onBack={mockOnBack} />);

      const submitButton = screen.getByText('Add Subscription');
      fireEvent.click(submitButton);

      await waitFor(() => {
        const toast = screen.getByRole('status');
        expect(toast.getAttribute('aria-live')).toBe('polite');
      });
    });
  });
});
