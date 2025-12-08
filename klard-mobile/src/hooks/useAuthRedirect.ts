import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSession } from '@/lib/auth-client';

interface UseAuthRedirectOptions {
  /** If true, redirects unauthenticated users to login */
  requireAuth?: boolean;
  /** Route to redirect authenticated users (when requireAuth is false) */
  authenticatedRoute?: string;
  /** Route to redirect unauthenticated users (when requireAuth is true) */
  unauthenticatedRoute?: string;
}

interface UseAuthRedirectResult {
  session: ReturnType<typeof useSession>['data'];
  isPending: boolean;
  isAuthenticated: boolean;
}

export function useAuthRedirect(options: UseAuthRedirectOptions = {}): UseAuthRedirectResult {
  const {
    requireAuth = true,
    authenticatedRoute = '/(tabs)/dashboard',
    unauthenticatedRoute = '/(auth)/login',
  } = options;

  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    const isAuthenticated = !!session;

    if (!isAuthenticated) {
      // Unauthenticated users always go to login
      router.replace(unauthenticatedRoute);
    } else if (!requireAuth) {
      // Authenticated user on guest-only page (like index) → redirect to dashboard
      router.replace(authenticatedRoute);
    }
    // Authenticated user on protected page (requireAuth: true) → stay on page
  }, [session, isPending, requireAuth, authenticatedRoute, unauthenticatedRoute, router]);

  return {
    session,
    isPending,
    isAuthenticated: !!session,
  };
}
