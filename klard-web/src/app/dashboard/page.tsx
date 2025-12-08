'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/login');
    }
  }, [session, isPending, router]);

  async function handleSignOut() {
    await signOut();
    router.replace('/login');
  }

  // Show loading while checking session
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-[var(--foreground)]">
            Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
          >
            Sign out
          </button>
        </div>
        <p className="text-[var(--text-secondary)]">
          Welcome back, {session.user?.name ?? session.user?.email}! Your subscription management dashboard is coming soon.
        </p>
      </div>
    </div>
  );
}
