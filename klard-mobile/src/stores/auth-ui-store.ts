import { create } from 'zustand';

type FormState = 'idle' | 'submitting' | 'error';

interface AuthUIState {
  formState: FormState;
  errorMessage: string | null;
}

interface AuthUIActions {
  setSubmitting: () => void;
  setError: (message: string) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState: AuthUIState = {
  formState: 'idle',
  errorMessage: null,
};

export const useAuthUIStore = create<AuthUIState & AuthUIActions>((set) => ({
  ...initialState,

  setSubmitting: () =>
    set({
      formState: 'submitting',
      errorMessage: null,
    }),

  setError: (message: string) =>
    set({
      formState: 'error',
      errorMessage: message,
    }),

  clearError: () =>
    set({
      errorMessage: null,
      formState: 'idle',
    }),

  reset: () => set(initialState),
}));