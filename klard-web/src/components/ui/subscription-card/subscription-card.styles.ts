import { cva, type VariantProps } from 'class-variance-authority';

/**
 * SubscriptionCard Variants
 *
 * Glassmorphism-enabled card with support for protected state glow effects.
 *
 * SOLID Compliance:
 * - SRP: Only handles card variant styling
 * - OCP: Extend via new variants without modifying existing
 * - DIP: Uses design token CSS variables
 */
export const subscriptionCardVariants = cva(
  [
    // Base layout
    'flex items-center gap-4 rounded-xl p-4 transition-all duration-200',
    // Glassmorphism effect
    'bg-card/80 backdrop-blur-[12px]',
    'border border-border/50',
    // Shadow
    'shadow-[0_2px_12px_rgb(var(--rec-shadow-color)/0.08)]',
  ],
  {
    variants: {
      variant: {
        default: '',
        compact: 'p-3',
        detailed: 'p-5',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-accent/60 hover:border-primary/30 hover:shadow-[0_4px_20px_rgb(var(--rec-shadow-color)/0.12)]',
        false: '',
      },
      protected: {
        true: [
          'border-success/40',
          'shadow-[0_2px_12px_rgb(var(--rec-shadow-color)/0.08),0_0_16px_rgba(5,150,105,0.2)]',
          'dark:shadow-[0_2px_12px_rgb(var(--rec-shadow-color)/0.08),0_0_16px_rgba(16,185,129,0.25)]',
        ],
        false: '',
      },
    },
    compoundVariants: [
      {
        interactive: true,
        protected: true,
        className: 'hover:shadow-[0_4px_20px_rgb(var(--rec-shadow-color)/0.12),0_0_24px_rgba(5,150,105,0.3)] dark:hover:shadow-[0_4px_20px_rgb(var(--rec-shadow-color)/0.12),0_0_24px_rgba(16,185,129,0.35)]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      interactive: false,
      protected: false,
    },
  }
);

/**
 * Protected badge styling
 */
export const protectedBadgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
    'bg-success/10 text-success border border-success/20',
    'dark:bg-success/15 dark:text-success dark:border-success/25',
  ],
  {
    variants: {
      glow: {
        true: 'shadow-[0_0_8px_rgba(5,150,105,0.3)] dark:shadow-[0_0_8px_rgba(16,185,129,0.3)]',
        false: '',
      },
    },
    defaultVariants: {
      glow: true,
    },
  }
);

export type SubscriptionCardVariants = VariantProps<typeof subscriptionCardVariants>;
export type ProtectedBadgeVariants = VariantProps<typeof protectedBadgeVariants>;
