'use client';

import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TermsCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TermsCheckbox = forwardRef<HTMLInputElement, TermsCheckboxProps>(
  function TermsCheckbox({ error, className = '', ...props }, ref) {
    const { t } = useTranslation();

    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className={`
              mt-0.5 w-4 h-4 rounded
              border-[var(--border)] text-[var(--primary)]
              focus:ring-[var(--ring)] focus:ring-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-[var(--accent-error)]' : ''}
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? 'terms-error' : undefined}
            {...props}
          />
          <span className="text-sm text-[var(--muted-foreground)]">
            {t('auth.signup.termsLabel').split('Terms of Service').map((part, i) => (
              i === 0 ? (
                <span key={i}>
                  {part}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[var(--primary)] hover:underline"
                  >
                    {t('auth.signup.termsLink')}
                  </a>
                </span>
              ) : (
                <span key={i}>
                  {part.split('Privacy Policy').map((subPart, j) => (
                    j === 0 ? (
                      <span key={j}>
                        {subPart}
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-[var(--primary)] hover:underline"
                        >
                          {t('auth.signup.privacyLink')}
                        </a>
                      </span>
                    ) : subPart
                  ))}
                </span>
              )
            ))}
          </span>
        </label>
        {error && (
          <p
            id="terms-error"
            className="mt-2 text-sm text-[var(--error-foreground)]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);