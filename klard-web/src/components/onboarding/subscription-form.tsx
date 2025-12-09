'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import {
  AddSubscriptionSchema,
  en,
  SUBSCRIPTION_CATEGORIES,
  type PopularService,
  type AddSubscription,
  type OnboardingBillingCycle,
  type SubscriptionCategory,
} from '@klard-apps/commons';
import { useSubscriptionStore } from '@/stores/subscription-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SubscriptionFormProps {
  service: PopularService;
  onBack: () => void;
}

/**
 * SubscriptionForm Component
 *
 * Form for adding a new subscription during onboarding.
 * Features:
 * - Pre-filled with service defaults
 * - Zod validation using AddSubscriptionSchema
 * - Success toast on submission
 * - Navigates to BurnerCard tutorial on success
 *
 * Single Responsibility: Handle subscription form state and validation
 */
export function SubscriptionForm({ service, onBack }: SubscriptionFormProps) {
  const router = useRouter();
  const addSubscription = useSubscriptionStore((state) => state.addSubscription);

  const [formData, setFormData] = useState<Partial<AddSubscription>>({
    serviceName: service.name,
    price: service.defaultPrice,
    billingCycle: service.defaultCycle,
    category: service.category,
    cancellationUrl: service.cancellationUrl || '',
    // Default next renewal to 1 month from now for monthly, 1 year for annual
    nextRenewalDate: getDefaultRenewalDate(service.defaultCycle),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleChange(field: keyof AddSubscription, value: string | number) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate with Zod schema
    const result = AddSubscriptionSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Add to store
    addSubscription(result.data);

    // Show success toast
    setShowToast(true);

    // Wait for toast to be visible
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Navigate to BurnerCard tutorial
    router.push('/onboarding/burnercard-tutorial');
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {/* Service Header */}
      <ServiceHeader service={service} onBack={onBack} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Price */}
        <FormField
          label={en.onboarding.addSubscription.labels.price}
          error={errors.price}
          required
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.price || ''}
              onChange={(e) => handleChange('price', parseFloat(e.target.value))}
              className="pl-7"
              aria-invalid={!!errors.price}
              required
            />
          </div>
        </FormField>

        {/* Billing Cycle */}
        <FormField
          label={en.onboarding.addSubscription.labels.billingCycle}
          error={errors.billingCycle}
          required
        >
          <Select
            value={formData.billingCycle || 'monthly'}
            onChange={(value) => handleChange('billingCycle', value)}
            options={[
              { value: 'monthly', label: en.onboarding.addSubscription.billingCycles.monthly },
              { value: 'annual', label: en.onboarding.addSubscription.billingCycles.annual },
            ]}
            aria-invalid={!!errors.billingCycle}
          />
        </FormField>

        {/* Next Renewal Date */}
        <FormField
          label={en.onboarding.addSubscription.labels.renewalDate}
          error={errors.nextRenewalDate}
          required
        >
          <Input
            type="date"
            value={formData.nextRenewalDate ? formData.nextRenewalDate.split('T')[0] : ''}
            onChange={(e) => {
              const dateValue = e.target.value;
              if (dateValue) {
                const isoDate = new Date(dateValue).toISOString();
                handleChange('nextRenewalDate', isoDate);
              }
            }}
            aria-invalid={!!errors.nextRenewalDate}
            required
          />
        </FormField>

        {/* Category */}
        <FormField
          label={en.onboarding.addSubscription.labels.category}
          error={errors.category}
          helperText={en.onboarding.addSubscription.helperText.autoFilled}
          required
        >
          <Select
            value={formData.category || ''}
            onChange={(value) => handleChange('category', value)}
            options={SUBSCRIPTION_CATEGORIES.map((cat) => ({
              value: cat,
              label: formatCategoryLabel(cat),
            }))}
            aria-invalid={!!errors.category}
          />
        </FormField>

        {/* Cancellation URL */}
        <FormField
          label={en.onboarding.addSubscription.labels.cancellationUrl}
          error={errors.cancellationUrl}
          helperText={en.onboarding.addSubscription.helperText.optional}
        >
          <Input
            type="url"
            placeholder="https://..."
            value={formData.cancellationUrl || ''}
            onChange={(e) => handleChange('cancellationUrl', e.target.value)}
            aria-invalid={!!errors.cancellationUrl}
          />
        </FormField>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="klard"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? en.common.loading
            : en.onboarding.addSubscription.buttons.addSubscription}
        </Button>
      </form>

      {/* Success Toast */}
      {showToast && (
        <Toast
          message={en.onboarding.addSubscription.toast.success.replace(
            '{{serviceName}}',
            service.name
          )}
        />
      )}
    </div>
  );
}

/**
 * Service Header Component
 * Shows selected service with change button
 */
interface ServiceHeaderProps {
  service: PopularService;
  onBack: () => void;
}

function ServiceHeader({ service, onBack }: ServiceHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card/60 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span
          className="h-8 w-8 rounded-full shadow-sm"
          style={{ backgroundColor: service.color }}
          aria-hidden="true"
        />
        <div>
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{formatCategoryLabel(service.category)}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onBack} type="button">
        <ChevronLeft className="h-4 w-4" />
        Change
      </Button>
    </div>
  );
}

/**
 * Form Field Component
 * Wraps label, input, and error/helper text
 */
interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, error, helperText, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {!error && helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

/**
 * Select Component
 * Simple styled select element
 */
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  'aria-invalid'?: boolean;
}

function Select({ value, onChange, options, 'aria-invalid': ariaInvalid }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'flex h-9 w-full rounded-[var(--radius-default)] border bg-background px-3 py-2 text-sm',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        ariaInvalid && 'border-destructive'
      )}
      aria-invalid={ariaInvalid}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

/**
 * Toast Component
 * Simple success toast notification
 */
interface ToastProps {
  message: string;
}

function Toast({ message }: ToastProps) {
  return (
    <div
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-in slide-in-from-bottom-2"
      role="status"
      aria-live="polite"
    >
      <div className="rounded-lg border bg-primary px-6 py-3 text-primary-foreground shadow-lg">
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

/**
 * Helper Functions
 */

function getDefaultRenewalDate(cycle: OnboardingBillingCycle): string {
  const date = new Date();
  if (cycle === 'annual') {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }
  return date.toISOString();
}

function formatCategoryLabel(category: SubscriptionCategory): string {
  return category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
