import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const klardCardVariants = cva(
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

export type KlardCardVariant = 'default' | 'elevated' | 'ghost' | 'interactive';
export type KlardCardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface KlardCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof klardCardVariants> {
  onPress?: () => void;
  disabled?: boolean;
}

function KlardCard({
  className,
  variant,
  padding,
  onPress,
  disabled = false,
  children,
  ...props
}: KlardCardProps) {
  const cardClassName = cn(
    klardCardVariants({ variant, padding }),
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (onPress) {
    return (
      <button
        data-slot="klard-card"
        className={cardClassName}
        onClick={onPress}
        disabled={disabled}
        type="button"
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      data-slot="klard-card"
      className={cardClassName}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}

export { KlardCard, klardCardVariants };