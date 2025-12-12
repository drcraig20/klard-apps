import { cva, type VariantProps } from 'class-variance-authority';

export const subscriptionCardVariants = cva(
  'flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors',
  {
    variants: {
      variant: {
        default: '',
        compact: 'p-3',
        detailed: 'p-5',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-accent/50 hover:border-primary/30',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
);

export type SubscriptionCardVariants = VariantProps<typeof subscriptionCardVariants>;
