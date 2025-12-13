import { cva } from 'class-variance-authority';

export const klardCardVariants = cva(
  'flex flex-col rounded-xl bg-card text-card-foreground transition-all',
  {
    variants: {
      variant: {
        default: 'border border-slate-200 dark:border-slate-800',
        elevated: 'shadow-md border-0',
        ghost: 'border-0 bg-transparent',
        interactive:
          'border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-md cursor-pointer',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);
