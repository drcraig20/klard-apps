'use client';

import { useTranslation } from 'react-i18next';
import { CheckboxField } from '@/components/ui/checkbox-field';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export function TermsCheckbox({
  checked,
  onChange,
  error,
  disabled,
}: TermsCheckboxProps) {
  const { t } = useTranslation();

  const termsLabel = (
    <span className="text-sm text-muted-foreground">
      {t('auth.signup.termsLabel').split('Terms of Service').map((part, i) =>
        i === 0 ? (
          <span key={i}>
            {part}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-primary hover:underline"
            >
              {t('auth.signup.termsLink')}
            </a>
          </span>
        ) : (
          <span key={i}>
            {part.split('Privacy Policy').map((subPart, j) =>
              j === 0 ? (
                <span key={j}>
                  {subPart}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-primary hover:underline"
                  >
                    {t('auth.signup.privacyLink')}
                  </a>
                </span>
              ) : (
                subPart
              )
            )}
          </span>
        )
      )}
    </span>
  );

  return (
    <div className="w-full">
      <CheckboxField
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label
        className="flex items-start gap-3 cursor-pointer -mt-6 ml-7"
        onClick={() => !disabled && onChange(!checked)}
      >
        {termsLabel}
      </label>
      {error && (
        <p
          className="mt-2 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}