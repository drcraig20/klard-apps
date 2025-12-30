import { cva } from 'class-variance-authority';

/**
 * Shared form field styles to eliminate DRY violations across form components.
 * Used by: input-field, password-input, select-field, currency-input, search-input
 */

export const inputFieldVariants = cva(
  [
    'w-full h-12 px-4 text-base',
    // Glassmorphic background
    'bg-white/[0.02] dark:bg-white/[0.01]',
    'text-slate-900 dark:text-slate-100',
    'border border-[var(--rec-glass-border-color)] rounded-[var(--rec-radius-sm)]',
    'placeholder:text-slate-400 dark:placeholder:text-slate-500',
    'transition-all duration-150',
    // Focus with glow effect
    'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:shadow-[var(--rec-glow-primary)]',
  ],
  {
    variants: {
      hasError: {
        true: 'border-red-500 focus:ring-red-500/30 focus:border-red-500 focus:shadow-[var(--rec-glow-error)]',
        false: 'hover:border-[var(--rec-color-border-strong)]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800',
        false: '',
      },
      hasLeftIcon: {
        true: 'pl-11',
        false: '',
      },
      hasRightIcon: {
        true: 'pr-11',
        false: '',
      },
    },
    defaultVariants: {
      hasError: false,
      disabled: false,
      hasLeftIcon: false,
      hasRightIcon: false,
    },
  }
);

export const labelStyles = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2';

export const errorStyles = 'mt-2 text-sm text-red-500';

export const helperTextStyles = 'mt-2 text-sm text-slate-500 dark:text-slate-400';

export const iconButtonStyles = [
  'absolute right-3 top-1/2 -translate-y-1/2',
  'text-slate-400 hover:text-slate-600',
  'dark:text-slate-500 dark:hover:text-slate-300',
  'transition-colors p-1 rounded',
  'focus:outline-none focus:ring-2 focus:ring-primary/30',
].join(' ');

export const leftIconStyles = [
  'absolute left-3 top-1/2 -translate-y-1/2',
  'text-slate-400 dark:text-slate-500',
  'pointer-events-none',
].join(' ');

export const inputContainerStyles = 'relative';

export type InputFieldVariantProps = {
  hasError?: boolean;
  disabled?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
};
