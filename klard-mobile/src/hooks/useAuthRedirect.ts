import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSession } from '@/lib/auth-client';
import type { AuthRedirectOptions, AuthRedirectResult } from '@klard-apps/commons';

/**
 * Hook for handling auth-based redirects.
 *
 * SRP: Only handles redirect logic based on auth state
 * OCP: Extensible via options (routes are configurable)
 * DIP: All routes are injectable via options
 * ISP: Returns focused interface with only auth state info
 *
 * @example
 * // Protected page - requires auth
 * useAuthRedirect({ requireAuth: true });
 *
 * @example
 * // Guest-only page (login/signup) - redirects authenticated users away
 * useAuthRedirect({ requireAuth: false });
 *
 * @example
 * // Onboarding page - skip onboarding check to avoid infinite redirect
 * useAuthRedirect({ requireAuth: true, skipOnboardingCheck: true });
 */
export function useAuthRedirect(options: AuthRedirectOptions = {}): AuthRedirectResult {
  const {
    requireAuth = true,
    authenticatedRoute = '/(tabs)/dashboard',
    unauthenticatedRoute = '/(auth)/login',
    onboardingRoute = '/onboarding',
    skipOnboardingCheck = false,
  } = options;

  const router = useRouter();
  const { data: session, isPending } = useSession();

  const isAuthenticated = !!session;
  const hasOnboarded = session?.user?.hasOnboarded ?? false;

  useEffect(() => {
    if (isPending) return;

    if (!isAuthenticated) {
      // Unauthenticated users always go to login
      router.replace(unauthenticatedRoute);
    } else if (!hasOnboarded && !skipOnboardingCheck) {
      // Authenticated but hasn't completed onboarding → redirect to onboarding
      router.replace(onboardingRoute);
    } else if (!requireAuth) {
      // Authenticated + onboarded user on guest-only page → redirect to dashboard
      router.replace(authenticatedRoute);
    }
    // Authenticated + onboarded user on protected page (requireAuth: true) → stay
  }, [
    isPending,
    isAuthenticated,
    hasOnboarded,
    requireAuth,
    skipOnboardingCheck,
    router,
    authenticatedRoute,
    unauthenticatedRoute,
    onboardingRoute,
  ]);

  return {
    isPending,
    isAuthenticated,
    hasOnboarded,
  };
}