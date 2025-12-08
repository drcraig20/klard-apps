import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { LoginSchema, MagicLinkSchema, type LoginInput } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';

type FormState = 'idle' | 'submitting' | 'magicLinkSent' | 'error';

interface UseLoginFormResult {
  // Form state
  formState: FormState;
  errorMessage: string | null;
  magicLinkEmail: string | null;
  isSubmitting: boolean;

  // Form control
  control: ReturnType<typeof useForm<LoginInput>>['control'];
  errors: ReturnType<typeof useForm<LoginInput>>['formState']['errors'];

  // Handlers
  handlePasswordLogin: () => void;
  handleMagicLink: () => void;
  handleSocialError: (error: string) => void;
  resetToIdle: () => void;
  clearError: () => void;
}

export function useLoginForm(): UseLoginFormResult {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [magicLinkEmail, setMagicLinkEmail] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = useCallback(async (data: LoginInput) => {
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

      router.replace('/(tabs)/dashboard');
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }, [router]);

  const handleMagicLink = useCallback(async () => {
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

      const callbackURL = Linking.createURL('(tabs)/dashboard');

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
  }, [getValues]);

  const handleSocialError = useCallback((error: string) => {
    setErrorMessage(error);
    setFormState('error');
  }, []);

  const resetToIdle = useCallback(() => {
    setFormState('idle');
    setMagicLinkEmail(null);
    setErrorMessage(null);
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    formState,
    errorMessage,
    magicLinkEmail,
    isSubmitting: formState === 'submitting',
    control,
    errors,
    handlePasswordLogin: handleSubmit(onSubmit),
    handleMagicLink,
    handleSocialError,
    resetToIdle,
    clearError,
  };
}
