'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { signOut, useSession } from '@/lib/auth-client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Avatar } from '@/components/ui/avatar';

export default function DashboardPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isPending, isAuthenticated } = useAuthRedirect({ requireAuth: true });
  const { data: session } = useSession();

  async function handleSignOut() {
    await signOut();
    router.replace('/login');
  }

  if (isPending || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const userName = session?.user?.name ?? session?.user?.email ?? '';
  const userImage = session?.user?.image ?? '';
  const fallbackInitials = React.useMemo(() => {
    if (!userName) return 'NA';
    const parts = userName.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return userName.slice(0, 2).toUpperCase();
  }, [userName]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar
              src={userImage || undefined}
              alt={userName || t('dashboard.title')}
              fallback={fallbackInitials}
              size="md"
            />
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                {t('dashboard.title')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('dashboard.welcome', { name: userName })}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('dashboard.signOut')}
          </button>
        </div>
      </div>
    </div>
  );
}
