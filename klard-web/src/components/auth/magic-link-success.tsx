'use client';

import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

interface MagicLinkSuccessProps {
  email: string;
  onBack: () => void;
}

export function MagicLinkSuccess({ email, onBack }: MagicLinkSuccessProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {t('auth.magicLink.title')}
        </h2>
        <p className="text-muted-foreground mb-6">
          {t('auth.magicLink.description')} <strong>{email}</strong>
        </p>
        <button
          onClick={onBack}
          className="text-primary font-medium hover:underline"
        >
          {t('auth.magicLink.backToLogin')}
        </button>
      </div>
    </div>
  );
}
