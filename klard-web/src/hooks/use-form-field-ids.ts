import { useMemo } from 'react';

interface FormFieldIds {
  inputId: string;
  errorId: string;
  helperId: string;
  describedBy: string | undefined;
}

export function useFormFieldIds(
  id: string | undefined,
  name: string,
  error?: string,
  helperText?: string
): FormFieldIds {
  return useMemo(() => {
    const inputId = id ?? name;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
    ].filter(Boolean).join(' ') || undefined;

    return { inputId, errorId, helperId, describedBy };
  }, [id, name, error, helperText]);
}