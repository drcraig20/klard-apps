'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { en, type PopularService } from '@klard-apps/commons';
import { ServiceGrid } from '@/components/onboarding/service-grid';
import { SubscriptionForm } from '@/components/onboarding/subscription-form';
import { Button } from '@/components/ui/button';

/**
 * Add Subscription Page (Screen 6 of Onboarding)
 *
 * Two-state interface:
 * 1. Selection state: Shows ServiceGrid for selecting a subscription service
 * 2. Form state: Shows SubscriptionForm for entering subscription details
 *
 * Features:
 * - Step indicator showing "Step 1 of 2"
 * - Skip button to bypass adding subscription
 * - ServiceGrid for service selection
 * - SubscriptionForm with Zod validation
 * - Navigation to BurnerCard tutorial on completion
 */
export default function AddSubscriptionPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<PopularService | null>(null);

  function handleSkip() {
    router.push('/onboarding/burnercard-tutorial');
  }

  function handleServiceSelect(service: PopularService) {
    setSelectedService(service);
  }

  function handleBack() {
    setSelectedService(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <Header onSkip={handleSkip} />

        {/* Content - Two States */}
        <div className="mt-12">
          {selectedService ? (
            // Form State
            <SubscriptionForm service={selectedService} onBack={handleBack} />
          ) : (
            // Selection State
            <SelectionState onSelect={handleServiceSelect} onSkip={handleSkip} />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Header Component
 * Shows step indicator and skip button
 */
interface HeaderProps {
  onSkip: () => void;
}

function Header({ onSkip }: HeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <StepIndicator />
      <Button variant="ghost" onClick={onSkip} type="button">
        {en.onboarding.navigation.skip}
      </Button>
    </div>
  );
}

/**
 * Step Indicator Component
 * Shows current step in onboarding flow
 */
function StepIndicator() {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">
        {en.onboarding.addSubscription.stepIndicator}
      </p>
      <div className="flex gap-2">
        <div className="h-1 w-16 rounded-full bg-primary" aria-label="Step 1 - Current" />
        <div className="h-1 w-16 rounded-full bg-muted" aria-label="Step 2 - Upcoming" />
      </div>
    </div>
  );
}

/**
 * Selection State Component
 * Shows headline, ServiceGrid, and skip button
 */
interface SelectionStateProps {
  onSelect: (service: PopularService) => void;
  onSkip: () => void;
}

function SelectionState({ onSelect, onSkip }: SelectionStateProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Headline */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {en.onboarding.addSubscription.headline}
        </h1>
      </div>

      {/* Service Grid */}
      <ServiceGrid onSelect={onSelect} />

      {/* Skip Button */}
      <div className="flex justify-center pt-4">
        <Button variant="ghost" onClick={onSkip} type="button" size="lg">
          {en.onboarding.addSubscription.buttons.skipForNow}
        </Button>
      </div>
    </div>
  );
}
