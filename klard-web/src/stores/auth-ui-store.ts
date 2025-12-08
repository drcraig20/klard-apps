import { create } from 'zustand';

type FormState = 'idle' | 'submitting' | 'magicLinkSent' | 'error';

interface AuthUIState {
  formState: FormState;
  errorMessage: string | null;
  magicLinkEmail: string | null;
}

interface AuthUIActions {
  setSubmitting: () => void;
  setMagicLinkSent: (email: string) => void;
  setError: (message: string) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState: AuthUIState = {
  formState: 'idle',
  errorMessage: null,
  magicLinkEmail: null,
};

export const useAuthUIStore = create<AuthUIState & AuthUIActions>((set) => ({
  ...initialState,

  setSubmitting: () => set({
    formState: 'submitting',
    errorMessage: null
  }),

  setMagicLinkSent: (email) => set({
    formState: 'magicLinkSent',
    magicLinkEmail: email
  }),

  setError: (message) => set({
    formState: 'error',
    errorMessage: message
  }),

  clearError: () => set({
    formState: 'idle',
    errorMessage: null
  }),

  reset: () => set(initialState),
}));
