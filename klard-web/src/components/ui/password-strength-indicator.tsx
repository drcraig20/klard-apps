'use client';

import { useTranslation } from 'react-i18next';
import { calculatePasswordStrength, type PasswordStrength } from '@klard-apps/commons';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const LEVEL_COLORS: Record<PasswordStrength['level'], string> = {
  weak: 'bg-[var(--accent-error)]',
  fair: 'bg-[var(--accent-warning)]',
  good: 'bg-[var(--accent-success)]',
  strong: 'bg-[var(--primary)]',
};

const LEVEL_WIDTHS: Record<PasswordStrength['level'], string> = {
  weak: 'w-1/4',
  fair: 'w-1/2',
  good: 'w-3/4',
  strong: 'w-full',
};

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { t } = useTranslation();
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="h-1.5 w-full bg-[var(--muted)] rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${LEVEL_COLORS[strength.level]} ${LEVEL_WIDTHS[strength.level]}`}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-[var(--muted-foreground)]">
          {t(`auth.signup.passwordStrength.${strength.level}`)}
        </span>
        {strength.feedback.length > 0 && (
          <span className="text-xs text-[var(--muted-foreground)]">
            {strength.feedback[0]}
          </span>
        )}
      </div>
    </div>
  );
}