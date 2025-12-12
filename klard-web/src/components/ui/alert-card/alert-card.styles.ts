import { cva } from 'class-variance-authority';

export const alertCardVariants = cva(
  'flex gap-3 rounded-xl border bg-card p-4 transition-all duration-200',
  {
    variants: {
      tone: {
        info: 'border-blue-200 bg-blue-50/50 dark:border-blue-900/40 dark:bg-blue-950/20',
        warning:
          'border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20',
        error: 'border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20',
      },
      size: {
        md: 'p-4',
        sm: 'p-3 gap-2',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-md hover:border-primary/30',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'info',
      size: 'md',
      interactive: false,
    },
  }
);
