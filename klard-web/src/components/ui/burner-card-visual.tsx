import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export type CardStatus = 'active' | 'locked' | 'expired' | 'used' | 'awaiting' | 'burned';
export type CardType = 'single-use' | 'recurring';
export type CardSize = 'sm' | 'md' | 'lg';

export interface BurnerCardData {
  nickname: string;
  type: CardType;
  status: CardStatus;
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  spentAmount: number;
  spendLimit: number;
}

export interface BurnerCardVisualProps {
  card: BurnerCardData;
  size?: CardSize;
  className?: string;
  onActivate?: () => void;
  children?: React.ReactNode;
}

/**
 * CVA variants for BurnerCardVisual status styling
 *
 * SOLID: SRP - Card renders visual only, status styling via variants
 * SOLID: OCP - New states via variant config without modifying component logic
 */
const cardVariants = cva(
  'relative flex flex-col justify-between rounded-2xl p-5 bg-gradient-to-br transition-all',
  {
    variants: {
      status: {
        active: 'from-teal-700 to-teal-800 shadow-[var(--rec-glow-primary)]',
        locked: 'from-amber-600 to-amber-700 shadow-[var(--rec-glow-warning)]',
        expired: 'from-slate-500 to-slate-600',
        used: 'from-slate-600 to-slate-700',
        awaiting: 'bg-muted border-2 border-dashed border-muted-foreground/50 from-transparent to-transparent',
        burned: 'from-red-500 to-red-600 shadow-[var(--rec-glow-error)] opacity-60',
      },
      size: {
        sm: 'w-64 h-40',
        md: 'w-80 h-48',
        lg: 'w-96 h-56',
      },
    },
    defaultVariants: {
      status: 'active',
      size: 'md',
    },
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function calculateProgressPercentage(spent: number, limit: number): number {
  if (limit <= 0) return 0;
  return Math.min((spent / limit) * 100, 100);
}

function BurnerCardVisual({
  card,
  size = 'md',
  className,
  onActivate,
  children,
}: Readonly<BurnerCardVisualProps>) {
  const {
    nickname,
    type,
    status,
    lastFour,
    expiryMonth,
    expiryYear,
    spentAmount,
    spendLimit,
  } = card;

  const progressPercentage = calculateProgressPercentage(spentAmount, spendLimit);
  const isAwaiting = status === 'awaiting';

  // Dynamic text colors based on status
  const textPrimaryClass = isAwaiting ? 'text-foreground' : 'text-white';
  const textSecondaryClass = isAwaiting ? 'text-muted-foreground' : 'text-white/80';
  const textTertiaryClass = isAwaiting ? 'text-muted-foreground/70' : 'text-white/70';
  const badgeBgClass = isAwaiting ? 'bg-muted-foreground/20' : 'bg-white/20';
  const progressTrackClass = isAwaiting ? 'bg-muted-foreground/30' : 'bg-white/30';
  const progressFillClass = isAwaiting ? 'bg-muted-foreground/60' : 'bg-white/90';

  const accessibilityLabel = `${nickname} card ending in ${lastFour}, ${status}, spent ${formatCurrency(spentAmount)} of ${formatCurrency(spendLimit)}`;

  return (
    <article
      data-slot="burner-card-visual"
      role="article"
      aria-label={accessibilityLabel}
      className={cn(
        cardVariants({ status, size }),
        className
      )}
    >
      {/* Header: Brand + Type Badge */}
      <div className="flex items-center justify-between">
        <span className={cn('text-xl font-bold tracking-wide', textPrimaryClass)}>Klard</span>
        <span className={cn('rounded px-2 py-1 text-[10px] font-semibold uppercase', badgeBgClass, textPrimaryClass)}>
          {type}
        </span>
      </div>

      {/* Card Number */}
      <p className={cn('text-center text-lg font-medium tracking-[3px]', textPrimaryClass)}>
        •••• •••• •••• {lastFour}
      </p>

      {/* Awaiting Activation Label */}
      {isAwaiting && (
        <div className="text-center">
          <span className="text-sm font-medium text-muted-foreground">
            Awaiting Activation
          </span>
        </div>
      )}

      {/* KYC CTA Button for awaiting state */}
      {isAwaiting && onActivate && (
        <button
          type="button"
          onClick={onActivate}
          className="mx-auto mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Activate Now
        </button>
      )}

      {/* Footer: Card Info + Spending */}
      <div>
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <p className={cn('text-sm font-semibold', textPrimaryClass)}>{nickname}</p>
            <p className={cn('text-xs', textSecondaryClass)}>
              {expiryMonth}/{expiryYear}
            </p>
          </div>
          <div className="text-right">
            <p className={cn('text-[10px] uppercase', textTertiaryClass)}>Spent</p>
            <p className={cn('text-xs font-semibold', textPrimaryClass)}>
              {formatCurrency(spentAmount)} / {formatCurrency(spendLimit)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div
            data-slot="spending-progress-track"
            className={cn('h-1 w-full overflow-hidden rounded-full', progressTrackClass)}
          >
            <div
              data-slot="spending-progress-fill"
              className={cn('h-full rounded-full transition-all duration-300', progressFillClass)}
              style={{ width: `${progressPercentage.toFixed(2)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Support for compound pattern children */}
      {children}
    </article>
  );
}

/**
 * Compound component sub-components for flexible composition
 */
interface CompoundNumberProps {
  value: string;
  className?: string;
}

function CardNumber({ value, className }: CompoundNumberProps) {
  return (
    <p className={cn('text-center text-lg font-medium tracking-[3px]', className)}>
      {value}
    </p>
  );
}

interface CompoundExpiryProps {
  value: string;
  className?: string;
}

function CardExpiry({ value, className }: CompoundExpiryProps) {
  return (
    <span className={cn('text-xs', className)}>
      {value}
    </span>
  );
}

interface CompoundCVCProps {
  value: string;
  className?: string;
}

function CardCVC({ value, className }: CompoundCVCProps) {
  return (
    <span className={cn('text-xs font-mono', className)}>
      {value}
    </span>
  );
}

interface CompoundLabelProps {
  children: React.ReactNode;
  className?: string;
}

function CardLabel({ children, className }: CompoundLabelProps) {
  return (
    <div className={cn('text-center', className)}>
      <span className="text-sm font-medium text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

interface CompoundCTAProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

function CardCTA({ onClick, children, className }: CompoundCTAProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'mx-auto mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors',
        className
      )}
    >
      {children}
    </button>
  );
}

// Attach sub-components to main component for compound pattern
BurnerCardVisual.Number = CardNumber;
BurnerCardVisual.Expiry = CardExpiry;
BurnerCardVisual.CVC = CardCVC;
BurnerCardVisual.Label = CardLabel;
BurnerCardVisual.CTA = CardCTA;

export { BurnerCardVisual, cardVariants };
