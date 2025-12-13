import * as React from 'react';
import { cn } from '@/lib/utils';

export type CardStatus = 'active' | 'locked' | 'expired' | 'used';
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
}

const statusGradients: Record<CardStatus, string> = {
  active: 'from-teal-700 to-teal-800',
  locked: 'from-amber-600 to-amber-700',
  expired: 'from-slate-500 to-slate-600',
  used: 'from-slate-600 to-slate-700',
};

const sizeClasses: Record<CardSize, string> = {
  sm: 'w-64 h-40',
  md: 'w-80 h-48',
  lg: 'w-96 h-56',
};

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

  const accessibilityLabel = `${nickname} card ending in ${lastFour}, ${status}, spent ${formatCurrency(spentAmount)} of ${formatCurrency(spendLimit)}`;

  return (
    <article
      data-slot="burner-card-visual"
      role="article"
      aria-label={accessibilityLabel}
      className={cn(
        'relative flex flex-col justify-between rounded-2xl p-5 bg-gradient-to-br',
        statusGradients[status],
        sizeClasses[size],
        className
      )}
    >
      {/* Header: Brand + Type Badge */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-white tracking-wide">Klard</span>
        <span className="rounded bg-white/20 px-2 py-1 text-[10px] font-semibold uppercase text-white">
          {type}
        </span>
      </div>

      {/* Card Number */}
      <p className="text-center text-lg font-medium tracking-[3px] text-white">
        •••• •••• •••• {lastFour}
      </p>

      {/* Footer: Card Info + Spending */}
      <div>
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{nickname}</p>
            <p className="text-xs text-white/80">
              {expiryMonth}/{expiryYear}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase text-white/70">Spent</p>
            <p className="text-xs font-semibold text-white">
              {formatCurrency(spentAmount)} / {formatCurrency(spendLimit)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div
            data-slot="spending-progress-track"
            className="h-1 w-full overflow-hidden rounded-full bg-white/30"
          >
            <div
              data-slot="spending-progress-fill"
              className="h-full rounded-full bg-white/90 transition-all duration-300"
              style={{ width: `${progressPercentage.toFixed(2)}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export { BurnerCardVisual };
