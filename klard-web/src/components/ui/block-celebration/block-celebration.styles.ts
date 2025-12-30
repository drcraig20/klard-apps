import { cva, type VariantProps } from 'class-variance-authority';

/**
 * BlockCelebration Variants
 *
 * Celebration card for blocked charges with level-based glow effects.
 *
 * SOLID Compliance:
 * - SRP: Only handles celebration card variant styling
 * - OCP: Extend via new levels without modifying existing
 * - DIP: Uses design token CSS variables
 */
export const blockCelebrationVariants = cva(
  [
    // Base layout
    'flex flex-col items-center gap-4 rounded-2xl p-6 transition-all duration-300',
    // Glassmorphism effect
    'bg-card/80 backdrop-blur-[12px]',
    'border border-border/50',
    // Base shadow
    'shadow-[0_2px_12px_rgba(15,23,42,0.08)]',
  ],
  {
    variants: {
      level: {
        first: [
          'border-success/50',
          'shadow-[0_4px_24px_rgba(5,150,105,0.25)]',
          'dark:shadow-[0_4px_24px_rgba(16,185,129,0.3)]',
          'animate-pulse-glow',
        ],
        milestone: [
          'border-success/40',
          'shadow-[0_3px_18px_rgba(5,150,105,0.2)]',
          'dark:shadow-[0_3px_18px_rgba(16,185,129,0.25)]',
        ],
        streak: [
          'border-primary/40',
          'shadow-[0_2px_14px_rgba(13,124,122,0.15)]',
          'dark:shadow-[0_2px_14px_rgba(21,181,176,0.2)]',
        ],
        subtle: [
          'border-border/50',
          'shadow-[0_2px_12px_rgba(15,23,42,0.08)]',
        ],
      },
    },
    defaultVariants: {
      level: 'first',
    },
  }
);

/**
 * Amount display styling
 */
export const amountVariants = cva(
  [
    'font-bold tracking-tight',
    'text-success',
    'dark:text-success',
  ],
  {
    variants: {
      size: {
        default: 'text-5xl',
        compact: 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Merchant display styling
 */
export const merchantVariants = cva(
  [
    'text-lg font-medium text-foreground',
  ],
  {
    variants: {
      anonymized: {
        true: 'text-muted-foreground italic',
        false: '',
      },
    },
    defaultVariants: {
      anonymized: false,
    },
  }
);

/**
 * ShareZone styling - area for screenshot capture
 */
export const shareZoneVariants = cva(
  [
    'flex flex-col items-center gap-3 p-4 rounded-xl',
    'bg-success/5 border border-success/20',
    'dark:bg-success/10 dark:border-success/25',
  ]
);

/**
 * ShareButton styling
 */
export const shareButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'px-4 py-2 rounded-lg',
    'bg-success text-success-foreground',
    'hover:bg-success/90',
    'transition-colors duration-200',
    'font-medium text-sm',
  ]
);

export type BlockCelebrationVariants = VariantProps<typeof blockCelebrationVariants>;
export type AmountVariants = VariantProps<typeof amountVariants>;
export type MerchantVariants = VariantProps<typeof merchantVariants>;