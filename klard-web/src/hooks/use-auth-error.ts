'use client';

import { useState, useCallback } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface UseAuthErrorReturn {
  formState: FormState;
  errorMessage: string | null;
  setSubmitting: () => void;
  setSuccess: () => void;
  setError: (message: string) => void;
  clearError: () => void;
  handleError: (error: unknown, fallbackMessage: string) => void;
}

export function useAuthError(): UseAuthErrorReturn {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setSubmitting = useCallback(() => {
    setFormState('submitting');
    setErrorMessage(null);
  }, []);

  const setSuccess = useCallback(() => {
    setFormState('success');
  }, []);

  const setError = useCallback((message: string) => {
    setFormState('error');
    setErrorMessage(message);
  }, []);

  const clearError = useCallback(() => {
    setFormState('idle');
    setErrorMessage(null);
  }, []);

  const handleError = useCallback((error: unknown, fallbackMessage: string) => {
    setFormState('error');
    setErrorMessage(
      error instanceof Error ? error.message : fallbackMessage
    );
  }, []);

  return {
    formState,
    errorMessage,
    setSubmitting,
    setSuccess,
    setError,
    clearError,
    handleError,
  };
}
