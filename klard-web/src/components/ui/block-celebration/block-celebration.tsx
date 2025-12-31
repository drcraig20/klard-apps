'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useRef } from 'react';
import { Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

import { cn, getConfettiColors } from '@/lib/utils';
import {
  blockCelebrationVariants,
  amountVariants,
  merchantVariants,
  shareZoneVariants,
  shareButtonVariants,
} from './block-celebration.styles';

/**
 * BlockCelebration Component
 *
 * Compound component for celebrating blocked charges with confetti effects.
 *
 * SOLID Compliance:
 * - SRP: Root component manages context and confetti; sub-components handle display
 * - OCP: New celebration levels can be added via config without modifying core
 * - LSP: All sub-components follow consistent prop patterns
 * - ISP: Each sub-component has focused, minimal interface
 * - DIP: Depends on confetti abstraction, not direct implementation
 */

// ===== Types =====

type CelebrationLevel = 'first' | 'milestone' | 'streak' | 'subtle';

interface BlockCelebrationContextValue {
  level: CelebrationLevel;
  amount?: number;
  currency?: string;
  merchantName?: string;
}

// ===== Context =====

const BlockCelebrationContext = createContext<BlockCelebrationContextValue | null>(null);

function useBlockCelebrationContext() {
  const context = useContext(BlockCelebrationContext);
  if (!context) {
    throw new Error('BlockCelebration compound components must be used within BlockCelebration');
  }
  return context;
}

// ===== Confetti Configuration =====

interface ConfettiConfig {
  particleCount: number;
  spread: number;
  startVelocity?: number;
  origin?: { x: number; y: number };
}

const confettiConfigs: Record<Exclude<CelebrationLevel, 'subtle'>, ConfettiConfig> = {
  first: {
    particleCount: 150,
    spread: 70,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.6 },
  },
  milestone: {
    particleCount: 80,
    spread: 55,
    startVelocity: 35,
    origin: { x: 0.5, y: 0.6 },
  },
  streak: {
    particleCount: 40,
    spread: 40,
    startVelocity: 25,
    origin: { x: 0.5, y: 0.6 },
  },
};

function triggerConfetti(level: CelebrationLevel): void {
  if (level === 'subtle') return;

  const config = confettiConfigs[level];
  confetti({
    particleCount: config.particleCount,
    spread: config.spread,
    startVelocity: config.startVelocity,
    origin: config.origin,
    colors: getConfettiColors(),
    ticks: 200,
    gravity: 1.2,
    scalar: 1.1,
  });
}

// ===== Root Component =====

interface BlockCelebrationProps {
  level: CelebrationLevel;
  children: React.ReactNode;
  className?: string;
}

function BlockCelebrationRoot({
  level,
  children,
  className,
}: Readonly<BlockCelebrationProps>) {
  const hasTriggeredRef = useRef(false);
  const [contextValue, setContextValue] = React.useState<BlockCelebrationContextValue>({
    level,
  });

  // Trigger confetti on mount (only once)
  useEffect(() => {
    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      triggerConfetti(level);
    }
  }, [level]);

  // Update context when children provide data
  const updateContext = React.useCallback((updates: Partial<BlockCelebrationContextValue>) => {
    setContextValue((prev) => ({ ...prev, ...updates }));
  }, []);

  // Build accessibility announcement
  const announcement = React.useMemo(() => {
    if (!contextValue.amount) return null;
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: contextValue.currency || 'USD',
    }).format(contextValue.amount);
    const merchant = contextValue.merchantName || 'a merchant';
    return `Blocked ${formattedAmount} from ${merchant}`;
  }, [contextValue.amount, contextValue.currency, contextValue.merchantName]);

  return (
    <BlockCelebrationContext.Provider value={{ ...contextValue, level }}>
      <div
        data-slot="block-celebration"
        className={cn(blockCelebrationVariants({ level }), className)}
      >
        {/* Screen reader announcement */}
        {announcement && (
          <div role="status" className="sr-only" aria-live="polite">
            {announcement}
          </div>
        )}
        {/* Render children with update capability */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ _updateContext?: typeof updateContext }>, {
              _updateContext: updateContext,
            });
          }
          return child;
        })}
      </div>
    </BlockCelebrationContext.Provider>
  );
}

// ===== Amount Sub-component =====

interface AmountProps {
  value: number;
  currency?: string;
  _updateContext?: (updates: Partial<BlockCelebrationContextValue>) => void;
}

function Amount({ value, currency = 'USD', _updateContext }: Readonly<AmountProps>) {
  // Register amount with context
  useEffect(() => {
    _updateContext?.({ amount: value, currency });
  }, [value, currency, _updateContext]);

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);

  return (
    <span
      data-slot="block-celebration-amount"
      className={cn(amountVariants({ size: 'default' }))}
    >
      {formattedAmount}
    </span>
  );
}

// ===== Merchant Sub-component =====

interface MerchantProps {
  name: string;
  anonymize?: boolean;
  _updateContext?: (updates: Partial<BlockCelebrationContextValue>) => void;
}

function Merchant({ name, anonymize = false, _updateContext }: Readonly<MerchantProps>) {
  const displayName = anonymize ? '[Hidden]' : name;

  // Register merchant with context
  useEffect(() => {
    _updateContext?.({ merchantName: displayName });
  }, [displayName, _updateContext]);

  return (
    <span
      data-slot="block-celebration-merchant"
      className={cn(merchantVariants({ anonymized: anonymize }))}
    >
      {displayName}
    </span>
  );
}

// ===== ShareZone Sub-component =====

interface ShareZoneProps {
  children?: React.ReactNode;
  className?: string;
}

function ShareZone({ children, className }: Readonly<ShareZoneProps>) {
  return (
    <div
      data-slot="block-celebration-share-zone"
      className={cn(shareZoneVariants(), className)}
    >
      {children}
    </div>
  );
}

// ===== ShareButton Sub-component =====

interface ShareButtonProps {
  onShare: () => void;
  label?: string;
  className?: string;
}

function ShareButton({
  onShare,
  label = 'Share',
  className,
}: Readonly<ShareButtonProps>) {
  return (
    <button
      type="button"
      data-slot="block-celebration-share-button"
      className={cn(shareButtonVariants(), className)}
      onClick={onShare}
      aria-label={`Share blocked charge celebration`}
    >
      <Share2 className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

// ===== Compound Export =====

export const BlockCelebration = Object.assign(BlockCelebrationRoot, {
  Amount,
  Merchant,
  ShareZone,
  ShareButton,
});

export type {
  BlockCelebrationProps,
  AmountProps,
  MerchantProps,
  ShareZoneProps,
  ShareButtonProps,
  CelebrationLevel,
};