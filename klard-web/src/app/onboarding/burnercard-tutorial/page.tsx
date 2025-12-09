'use client';

import { useOnboarding } from '@/hooks/use-onboarding';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BurnerCardTutorial } from '@/components/onboarding/burnercard-tutorial';

/**
 * BurnerCard Tutorial Page
 *
 * Step 2 of 2 in the onboarding flow.
 * Introduces users to BurnerCard features and allows them to complete onboarding.
 *
 * SRP: Handles route-level logic only (auth, loading states, onboarding hooks)
 * DIP: Delegates tutorial display to BurnerCardTutorial component
 */
export default function BurnerCardTutorialPage() {
  const { isPending: authPending } = useAuthRedirect({
    requireAuth: true,
    skipOnboardingCheck: true,
  });
  const { isPending, isUpdating, completeOnboarding, skipOnboarding } = useOnboarding();

  if (authPending || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <BurnerCardTutorial
      onComplete={completeOnboarding}
      onSkip={skipOnboarding}
      isUpdating={isUpdating}
    />
  );
}
