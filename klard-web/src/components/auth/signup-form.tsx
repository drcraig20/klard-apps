'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User } from 'lucide-react';
import { SignupSchema, type SignupInput } from '@klard-apps/commons';
import { signUp } from '@/lib/auth-client';
import { InputField } from '@/components/ui/input-field';
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator';
import { TermsCheckbox } from '@/components/ui/terms-checkbox';
import { SocialButtons } from './social-buttons';
import { KlardLogo } from '@/components/ui/klard-icon';
import { ErrorBanner } from '@/components/ui/error-banner';
import { SubmitButton } from '@/components/ui/submit-button';
import { useAuthUIStore } from '@/stores/auth-ui-store';
import Link from 'next/link';

export function SignupForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [passwordValue, setPasswordValue] = useState('');
  const {
    formState: uiState,
    errorMessage,
    setSubmitting,
    setError,
    clearError,
    reset,
  } = useAuthUIStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  // Clear any stale error state from previous screens on mount
  useEffect(() => {
    reset();
  }, [reset]);

  async function onSubmit(data: SignupInput) {
    try {
      setSubmitting();

      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || t('auth.errors.signupFailed'));
      }

      reset();
      router.push('/onboarding');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('auth.errors.unexpectedError')
      );
    }
  }

  function handleSocialError(error: string) {
    setError(error);
  }

  const isSubmitting = uiState === 'submitting';

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Logo (mobile only) */}
      <div className="flex justify-center mb-8 md:hidden">
        <KlardLogo />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-semibold text-foreground mb-2">
          {t('auth.signup.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('auth.signup.subtitle')}
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <ErrorBanner message={errorMessage} onDismiss={clearError} />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          id="name"
          label={t('auth.signup.nameLabel')}
          type="text"
          placeholder={t('auth.signup.namePlaceholder')}
          icon={<User size={20} />}
          error={errors.name?.message}
          disabled={isSubmitting}
          autoComplete="name"
          {...register('name')}
        />

        <InputField
          id="email"
          label={t('auth.signup.emailLabel')}
          type="email"
          placeholder={t('auth.signup.emailPlaceholder')}
          icon={<Mail size={20} />}
          error={errors.email?.message}
          disabled={isSubmitting}
          autoComplete="email"
          {...register('email')}
        />

        <div>
          <InputField
            id="password"
            label={t('auth.signup.passwordLabel')}
            type="password"
            placeholder={t('auth.signup.passwordPlaceholder')}
            icon={<Lock size={20} />}
            error={errors.password?.message}
            disabled={isSubmitting}
            autoComplete="new-password"
            {...register('password', {
              onChange: (e) => setPasswordValue(e.target.value),
            })}
          />
          <PasswordStrengthIndicator password={passwordValue} />
        </div>

        <InputField
          id="confirmPassword"
          label={t('auth.signup.confirmPasswordLabel')}
          type="password"
          placeholder={t('auth.signup.confirmPasswordPlaceholder')}
          icon={<Lock size={20} />}
          error={errors.confirmPassword?.message}
          disabled={isSubmitting}
          autoComplete="new-password"
          {...register('confirmPassword')}
        />

        <TermsCheckbox
          error={errors.agreeToTerms?.message}
          disabled={isSubmitting}
          {...register('agreeToTerms')}
        />

        {/* Submit button */}
        <SubmitButton isSubmitting={isSubmitting}>
          {t('auth.signup.submitButton')}
        </SubmitButton>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            {t('auth.signup.orContinueWith')}
          </span>
        </div>
      </div>

      {/* Social buttons */}
      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      {/* Login link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t('auth.signup.haveAccount')}{' '}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          {t('auth.signup.signIn')}
        </Link>
      </p>

      {/* Trust element */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock size={14} />
        <span>{t('auth.signup.trustElement')}</span>
      </div>
    </div>
  );
}