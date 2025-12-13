import { cva } from 'class-variance-authority';

export const alertBannerVariants = cva(
  'alert-base grid grid-cols-[auto_1fr_auto] gap-2 rounded-[var(--radius-default)] border px-4 py-3 data-[slot=alert-banner]',
  {
    variants: {
      type: {
        success: 'alert-success border-[color:var(--rec-color-success)]/35 bg-[color:var(--rec-color-success)]/10 text-[color:var(--rec-color-success)]',
        error: 'alert-error border-[color:var(--rec-color-error)]/35 bg-[color:var(--rec-color-error)]/10 text-[color:var(--rec-color-error)]',
        warning: 'alert-warning border-[color:var(--rec-color-warning)]/35 bg-[color:var(--rec-color-warning)]/10 text-[color:var(--rec-color-warning)]',
        info: 'alert-info border-[color:var(--rec-color-secondary)]/35 bg-[color:var(--rec-color-secondary)]/10 text-[color:var(--rec-color-secondary)]',
      },
      size: {
        default: 'alert-default',
        compact: 'alert-compact px-3 py-2 text-sm',
      },
    },
    defaultVariants: {
      type: 'info',
      size: 'default',
    },
  }
);
