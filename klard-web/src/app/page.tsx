'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [session, isPending, router]);

  // Show loading state while checking session
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--text-secondary)] text-sm">Loading...</p>
      </div>
    </div>
  );
}
