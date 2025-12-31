import { cva } from 'class-variance-authority';

export const alertCardVariants = cva(
  'flex gap-3 rounded-xl border bg-card p-4 transition-all duration-200',
  {
    variants: {
      tone: {
        info: 'border-info/20 bg-info/5 dark:border-info/30 dark:bg-info/10',
        warning:
          'border-warning/20 bg-warning/5 dark:border-warning/30 dark:bg-warning/10',
        error: 'border-error/20 bg-error/5 dark:border-error/30 dark:bg-error/10',
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
