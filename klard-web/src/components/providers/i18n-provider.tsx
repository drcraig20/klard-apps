'use client';

import { useSyncExternalStore } from 'react';
import '@/lib/i18n';

// External store to track i18n ready state (client-side only)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function subscribe(_callback: () => void) {
  // No subscription needed, just triggers re-render once
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const isReady = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isReady) return null;

  return <>{children}</>;
}
