import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { useSession, updateUser } from '@/lib/auth-client';
import type { OnboardingOptions, OnboardingResult } from '@klard-apps/commons';

/**
 * Hook for managing onboarding state and completion.
 *
 * SRP: Manages onboarding state only (reading hasOnboarded, updating it)
 * DIP: Dashboard route is injectable via options
 * ISP: Returns focused interface with only needed methods
 */
export function useOnboarding(options: OnboardingOptions = {}): OnboardingResult {
  const { dashboardRoute = '/(tabs)/dashboard' } = options;

  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);

  const hasOnboarded = session?.user?.hasOnboarded ?? false;

  const markOnboardingComplete = useCallback(async () => {
    setIsUpdating(true);
    try {
      await updateUser({ hasOnboarded: true });
      await refetch();
      router.replace(dashboardRoute);
    } finally {
      setIsUpdating(false);
    }
  }, [refetch, router, dashboardRoute]);

  const completeOnboarding = useCallback(async () => {
    await markOnboardingComplete();
  }, [markOnboardingComplete]);

  const skipOnboarding = useCallback(async () => {
    await markOnboardingComplete();
  }, [markOnboardingComplete]);

  return {
    hasOnboarded,
    isPending,
    isUpdating,
    completeOnboarding,
    skipOnboarding,
  };
}