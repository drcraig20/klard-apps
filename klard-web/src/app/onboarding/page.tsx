'use client';

import { useOnboarding } from '@/hooks/use-onboarding';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { WelcomeCarousel } from '@/components/onboarding/welcome-carousel';

export default function OnboardingPage() {
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
    <WelcomeCarousel
      onComplete={completeOnboarding}
      onSkip={skipOnboarding}
      isUpdating={isUpdating}
    />
  );
}