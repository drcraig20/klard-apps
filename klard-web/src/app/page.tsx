'use client';

import { useTranslation } from 'react-i18next';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Home() {
  const { t } = useTranslation();
  const { isPending } = useAuthRedirect();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground text-sm">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return null;
}
