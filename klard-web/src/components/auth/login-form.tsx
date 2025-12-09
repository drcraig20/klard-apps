'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Mail, Lock } from 'lucide-react';
import { LoginSchema, MagicLinkSchema } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
import { InputField } from '@/components/ui/input-field';
import { SocialButtons } from './social-buttons';
import { MagicLinkSuccess } from './magic-link-success';
import { KlardLogo } from '@/components/ui/klard-icon';
import { ErrorBanner } from '@/components/ui/error-banner';
import { SubmitButton } from '@/components/ui/submit-button';
import { useAuthUIStore } from '@/stores/auth-ui-store';
import Link from 'next/link';
import { z } from 'zod';

type LoginFormValues = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    formState: uiState,
    errorMessage,
    magicLinkEmail,
    setSubmitting,
    setMagicLinkSent,
    setError,
    clearError,
    reset,
  } = useAuthUIStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Clear any stale error state from previous screens on mount
  useEffect(() => {
    reset();
  }, [reset]);

  async function onSubmit(data: LoginFormValues) {
    try {
      setSubmitting();

      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || t('auth.errors.invalidCredentials'));
      }

      reset();
      router.push('/dashboard');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('auth.errors.unexpectedError')
      );
    }
  }

  async function handleMagicLink() {
    const email = getValues('email');
    const validation = MagicLinkSchema.safeParse({ email });

    if (!validation.success) {
      setError(t('auth.errors.invalidEmailForMagicLink'));
      return;
    }

    try {
      setSubmitting();

      const callbackURL = `${window.location.origin}/dashboard`;

      const result = await signIn.magicLink({
        email: validation.data.email,
        callbackURL,
      });

      if (result.error) {
        throw new Error(result.error.message || t('auth.errors.magicLinkFailed'));
      }

      setMagicLinkSent(validation.data.email);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('auth.errors.magicLinkFailed')
      );
    }
  }

  function handleSocialError(error: string) {
    setError(error);
  }

  const isSubmitting = uiState === 'submitting';

  if (uiState === 'magicLinkSent' && magicLinkEmail) {
    return <MagicLinkSuccess email={magicLinkEmail} onBack={reset} />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Logo */}
      <div className="flex justify-center mb-8 md:hidden">
        <KlardLogo />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-semibold text-foreground mb-2">
          {t('auth.login.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('auth.login.subtitle')}
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <ErrorBanner message={errorMessage} onDismiss={clearError} />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          id="email"
          label={t('auth.login.emailLabel')}
          type="email"
          placeholder={t('auth.login.emailPlaceholder')}
          icon={<Mail size={20} />}
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />

        <InputField
          id="password"
          label={t('auth.login.passwordLabel')}
          type="password"
          placeholder={t('auth.login.passwordPlaceholder')}
          icon={<Lock size={20} />}
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register('password')}
        />

        {/* Remember me & Magic link */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border text-primary focus:ring-ring"
              disabled={isSubmitting}
              {...register('rememberMe')}
            />
            <span className="text-sm text-muted-foreground">
              {t('auth.login.rememberMe')}
            </span>
          </label>

          <button
            type="button"
            onClick={handleMagicLink}
            disabled={isSubmitting}
            className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
          >
            {t('auth.login.magicLinkButton')}
          </button>
        </div>

        {/* Submit button */}
        <SubmitButton isSubmitting={isSubmitting} loadingText={t('auth.login.submitting')}>
          {t('auth.login.submitButton')}
        </SubmitButton>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            {t('auth.login.orContinueWith')}
          </span>
        </div>
      </div>

      {/* Social buttons */}
      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      {/* Sign up link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t('auth.login.noAccount')}{' '}
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
        >
          {t('auth.login.signUp')}
        </Link>
      </p>

      {/* Trust element */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock size={14} />
        <span>{t('auth.login.trustElement')}</span>
      </div>
    </div>
  );
}
