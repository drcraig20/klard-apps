import { cva } from 'class-variance-authority';

/**
 * KlardCard Variants with Glassmorphism
 *
 * SOLID Compliance:
 * - SRP: Only card styling variants
 * - OCP: Add new variants without modifying existing
 */
export const klardCardVariants = cva(
  // Base styles: glassmorphic background with blur
  'flex flex-col rounded-xl bg-card/80 text-card-foreground transition-all duration-200 backdrop-blur-[var(--rec-glass-blur)] border border-[var(--rec-glass-border-color)]',
  {
    variants: {
      variant: {
        default: 'shadow-[var(--rec-shadow-card-sm)]',
        elevated: 'shadow-[var(--rec-shadow-card-md)] border-0',
        ghost: 'border-0 bg-transparent backdrop-blur-none',
        glass:
          'bg-[var(--rec-color-surface)] shadow-[var(--rec-shadow-card-md)]',
        interactive:
          'shadow-[var(--rec-shadow-card-sm)] hover:border-primary hover:shadow-[var(--rec-glow-primary)] cursor-pointer',
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
