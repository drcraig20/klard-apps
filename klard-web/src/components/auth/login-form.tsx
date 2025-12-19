'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Mail, Lock } from 'lucide-react';
import { LoginSchema } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
import { InputField } from '@/components/ui/input-field';
import { CheckboxField } from '@/components/ui/checkbox-field';
import { SocialButtons } from './social-buttons';
import { KlardLogo } from '@/components/ui/klard-icon';
import { ErrorBanner } from '@/components/ui/error-banner';
import { SubmitButton } from '@/components/ui/submit-button';
import { useAuthUIStore } from '@/stores/auth-ui-store';
import { useShakeAnimation } from '@/hooks/useShakeAnimation';
import { usePasskeyAuth } from '@/hooks/usePasskeyAuth';
import { PasskeyButton } from './passkey-button/PasskeyButton';
import Link from 'next/link';
import { z } from 'zod';

type LoginFormValues = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    formState: uiState,
    errorMessage,
    setSubmitting,
    setError,
    clearError,
    reset,
  } = useAuthUIStore();
  const { className: shakeClassName, shake } = useShakeAnimation();
  const { preloadPasskeys } = usePasskeyAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  // Clear any stale error state from previous screens on mount
  useEffect(() => {
    reset();
  }, [reset]);

  // Preload passkeys with Conditional UI on mount
  useEffect(() => {
    void preloadPasskeys();
  }, [preloadPasskeys]);

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
      shake();
      setError(
        error instanceof Error ? error.message : t('auth.errors.unexpectedError')
      );
    }
  }

  function handleSocialError(error: string) {
    shake();
    setError(error);
  }

  const isSubmitting = uiState === 'submitting';

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
      <form onSubmit={handleSubmit(onSubmit)} className={`space-y-5 ${shakeClassName}`} role="form">
        <InputField
          id="email"
          label={t('auth.login.emailLabel')}
          type="email"
          placeholder={t('auth.login.emailPlaceholder')}
          leftIcon={<Mail size={20} />}
          error={errors.email?.message}
          disabled={isSubmitting}
          autoComplete="webauthn"
          {...register('email')}
        />

        <InputField
          id="password"
          label={t('auth.login.passwordLabel')}
          type="password"
          placeholder={t('auth.login.passwordPlaceholder')}
          leftIcon={<Lock size={20} />}
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register('password')}
        />

        {/* Remember me */}
        <div className="flex items-center">
          <CheckboxField
            checked={rememberMe}
            onChange={(checked) => setValue('rememberMe', checked)}
            label={t('auth.login.rememberMe')}
            disabled={isSubmitting}
          />
        </div>

        {/* Submit button */}
        <SubmitButton isSubmitting={isSubmitting}>
          {t('auth.login.submitButton')}
        </SubmitButton>

        {/* Passkey sign-in button - AUTH-007-03 */}
        <PasskeyButton
          mode="signin"
          onSuccess={() => {
            reset();
            router.push('/dashboard');
          }}
          onError={(error) => {
            shake();
            setError(error);
          }}
          disabled={isSubmitting}
          className="w-full"
        />
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
