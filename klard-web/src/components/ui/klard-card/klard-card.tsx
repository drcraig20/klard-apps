import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { klardCardVariants } from './klard-card.styles';

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
}: Readonly<KlardCardProps>) {
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

export { KlardCard };
