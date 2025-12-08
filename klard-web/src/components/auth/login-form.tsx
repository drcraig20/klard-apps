'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle, X, CheckCircle } from 'lucide-react';
import { LoginSchema, MagicLinkSchema } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
import { InputField } from '@/components/ui/input-field';
import { SocialButtons } from './social-buttons';
import { KlardLogo } from '@/components/ui/klard-icon';
import Link from 'next/link';
import { z } from 'zod';

type FormState = 'idle' | 'submitting' | 'magicLinkSent' | 'error';
type LoginFormValues = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [magicLinkEmail, setMagicLinkEmail] = useState<string | null>(null);

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

  async function onSubmit(data: LoginFormValues) {
    try {
      setFormState('submitting');
      setErrorMessage(null);

      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Invalid email or password');
      }

      // TODO: Check if user needs onboarding once custom user model is implemented
      // For now, always redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }

  async function handleMagicLink() {
    const email = getValues('email');
    const validation = MagicLinkSchema.safeParse({ email });

    if (!validation.success) {
      setErrorMessage('Please enter a valid email to receive a magic link');
      setFormState('error');
      return;
    }

    try {
      setFormState('submitting');
      setErrorMessage(null);

      // Construct full URL for magic link callback (auth server redirects here after verification)
      const callbackURL = `${window.location.origin}/dashboard`;

      const result = await signIn.magicLink({
        email: validation.data.email,
        callbackURL,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to send magic link');
      }

      setMagicLinkEmail(validation.data.email);
      setFormState('magicLinkSent');
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send magic link'
      );
    }
  }

  function dismissError() {
    setErrorMessage(null);
    setFormState('idle');
  }

  function handleSocialError(error: string) {
    setErrorMessage(error);
    setFormState('error');
  }

  const isSubmitting = formState === 'submitting';

  if (formState === 'magicLinkSent') {
    return (
      <div className="w-full max-w-md mx-auto p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-success)]/10 flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-[var(--accent-success)]" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            Check your email
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            We sent a login link to <strong>{magicLinkEmail}</strong>
          </p>
          <button
            onClick={() => setFormState('idle')}
            className="text-[var(--primary)] font-medium hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Logo */}
      <div className="flex justify-center mb-8 md:hidden">
        <KlardLogo />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-semibold text-[var(--foreground)] mb-2">
          Welcome back
        </h1>
        <p className="text-[var(--text-secondary)]">
          Sign in to your account
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div
          className="mb-6 p-4 rounded-[var(--radius-default)] bg-[var(--error-background)] border border-[var(--error-border)] flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-[var(--error-foreground)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--error-foreground)] flex-1">
            {errorMessage}
          </p>
          <button
            onClick={dismissError}
            className="text-[var(--error-foreground)] hover:opacity-70"
            aria-label="Dismiss error"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={20} />}
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
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
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)]"
              disabled={isSubmitting}
              {...register('rememberMe')}
            />
            <span className="text-sm text-[var(--text-secondary)]">
              Remember me
            </span>
          </label>

          <button
            type="button"
            onClick={handleMagicLink}
            disabled={isSubmitting}
            className="text-sm font-medium text-[var(--primary)] hover:underline disabled:opacity-50"
          >
            Sign in with email link
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full h-12 rounded-[var(--radius-default)]
            bg-gradient-to-br from-[var(--primary)] to-[#0A5F5D] dark:from-[var(--primary)] dark:to-[var(--secondary)]
            text-white font-semibold
            shadow-[0_0_20px_rgba(13,124,122,0.3)] dark:shadow-[0_0_24px_rgba(21,181,176,0.35)]
            hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150
            flex items-center justify-center gap-2
          "
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--card)] text-[var(--text-tertiary)]">
            or continue with
          </span>
        </div>
      </div>

      {/* Social buttons */}
      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      {/* Sign up link */}
      <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-medium text-[var(--primary)] hover:underline"
        >
          Sign up
        </Link>
      </p>

      {/* Trust element */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[var(--text-tertiary)]">
        <Lock size={14} />
        <span>Privacy-first. No bank access required.</span>
      </div>
    </div>
  );
}
