'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

interface UseAuthRedirectOptions {
  authenticatedRedirect?: string;
  unauthenticatedRedirect?: string;
  requireAuth?: boolean;
}

export function useAuthRedirect(options: UseAuthRedirectOptions = {}) {
  const {
    authenticatedRedirect = '/dashboard',
    unauthenticatedRedirect = '/login',
    requireAuth = false,
  } = options;

  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (requireAuth && !session) {
      router.replace(unauthenticatedRedirect);
    } else if (!requireAuth && session) {
      router.replace(authenticatedRedirect);
    } else if (!requireAuth && !session) {
      router.replace(unauthenticatedRedirect);
    }
  }, [session, isPending, router, authenticatedRedirect, unauthenticatedRedirect, requireAuth]);

  return { session, isPending, isAuthenticated: !!session };
}
