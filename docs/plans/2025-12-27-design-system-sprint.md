# Design System Sprint - Implementation Plan

**Date:** 2025-12-27
**Duration:** 4 Weeks (Parallel Tracks)
**Methodology:** TDD with Parallel Sub-Agents

---

## Executive Summary

This sprint transforms the existing Klard component libraries to align with the **Hybrid Glassmorphic + Bold Navigation** design direction. The work is organized into 4 parallel tracks executed via sub-agents, with TDD ensuring quality at every step.

### Goals

1. **Centralize design tokens** in `commons/src/design-tokens/`
2. **Update 24 existing components** (12 web + 12 mobile) with glassmorphism and glow effects
3. **Create 15 new custom components** for MVP user journeys
4. **Achieve 85%+ test coverage** across all component work

### Success Metrics

| Metric | Target |
|--------|--------|
| Component compliance with UX spec | 95%+ |
| Test coverage (new/updated components) | 85%+ |
| Visual regression tests passing | 100% |
| Accessibility (jest-axe) | 0 violations |
| Performance budget (celebration components) | ≤50KB lazy-loaded |

---

## Parallel Track Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Week 1: Foundation                                │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│   Track 1       │   Track 2       │   Track 3       │   Track 4         │
│   Tokens        │   Core Web      │   Core Mobile   │   Shared Logic    │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┤
│ design-tokens/  │ Button          │ Button          │ useCelebration    │
│ colors.ts       │ KlardCard       │ Card            │ useHealthStatus   │
│ effects.ts      │ Input/InputField│ InputField      │ useProtectionStatus│
│ spacing.ts      │                 │                 │                   │
│ radius.ts       │                 │                 │                   │
│ animation.ts    │                 │                 │                   │
└─────────────────┴─────────────────┴─────────────────┴───────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        Week 2: Cards & Status                            │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│   Track 1       │   Track 2       │   Track 3       │   Track 4         │
│   Web Cards     │   Mobile Cards  │   Custom New    │   Navigation      │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┤
│ StatCard        │ SubscriptionCard│ HealthIndicator │ AppSidebar (web)  │
│ SubscriptionCard│ AlertCard       │ ProtectionStatus│ TabBar (mobile)   │
│ AlertCard       │ BurnerCardVisual│ SavingsCounter  │                   │
└─────────────────┴─────────────────┴─────────────────┴───────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        Week 3: Celebration & Forms                       │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│   Track 1       │   Track 2       │   Track 3       │   Track 4         │
│   Celebration   │   Empty/Toast   │   Card Actions  │   Onboarding      │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┤
│ BlockCelebration│ EmptyState (3-tier)│ CardLockToggle│ CardTypeSelector  │
│ (web)           │ Toast celebration │ BurnCardButton │ SubscriptionGrid  │
│ BlockCelebration│ CelebrationToast │ CopyToClipboard│                   │
│ (mobile)        │ UndoWindow      │                 │                   │
└─────────────────┴─────────────────┴─────────────────┴───────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                        Week 4: Polish & Integration                      │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│   Track 1       │   Track 2       │   Track 3       │   Track 4         │
│   Remaining     │   Visual QA     │   A11y Audit    │   Documentation   │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┤
│ Badge           │ Chromatic setup │ jest-axe all    │ Storybook stories │
│ Tabs            │ Visual regression│ Screen reader  │ Component docs    │
│ AmountSelector  │ Cross-browser   │ Keyboard nav    │ Migration guide   │
│ FundingConfirm  │                 │                 │                   │
└─────────────────┴─────────────────┴─────────────────┴───────────────────┘
```

---

## Track 1: Token Foundation

### Goal
Centralize all design tokens in `commons/` as the single source of truth.

### Tasks

#### T1.1: Create Token Structure
```
commons/src/design-tokens/
├── colors.ts       # All color tokens (light + dark)
├── effects.ts      # Glows, shadows, glassmorphism values
├── spacing.ts      # 4/8 grid (4, 8, 12, 16, 24, 32, 40, 48)
├── radius.ts       # radius-sm (8px), md (12px), lg (16px), xl (24px)
├── animation.ts    # Durations, easings
├── typography.ts   # Font scales, weights (reference existing)
└── index.ts        # Re-exports all
```

#### T1.2: colors.ts Implementation

**TDD: Write tests first**
```typescript
// commons/src/design-tokens/__tests__/colors.test.ts
describe('Color Tokens', () => {
  it('exports light theme colors', () => {
    expect(lightColors.primary).toBe('#0D7C7A');
    expect(lightColors.primaryForeground).toBe('#FFFFFF');
  });

  it('exports dark theme colors', () => {
    expect(darkColors.primary).toBe('#15B5B0');
  });

  it('exports semantic colors', () => {
    expect(lightColors.success).toBe('#059669');
    expect(lightColors.warning).toBe('#D97706');
    expect(lightColors.error).toBe('#DC2626');
  });
});
```

**Token values (from UX spec):**
| Token | Light | Dark |
|-------|-------|------|
| primary | #0D7C7A | #15B5B0 |
| secondary | #15B5B0 | #0D7C7A |
| background | #FFFFFF | #0F172A |
| foreground | #0F172A | #F8FAFC |
| success | #059669 | #10B981 |
| warning | #D97706 | #F59E0B |
| error | #DC2626 | #EF4444 |

#### T1.3: effects.ts Implementation

**TDD: Write tests first**
```typescript
describe('Effect Tokens', () => {
  it('exports glassmorphism values', () => {
    expect(effects.glassBlur).toBe('24px');
    expect(effects.glassBorderColor).toBe('rgba(255, 255, 255, 0.08)');
  });

  it('exports glow values', () => {
    expect(effects.glowPrimary).toBe('0 0 24px rgba(21, 181, 176, 0.25)');
    expect(effects.glowSuccess).toBe('0 0 24px rgba(16, 185, 129, 0.3)');
  });
});
```

**Effect values (from UX spec):**
| Effect | Value |
|--------|-------|
| glassBlur | 24px (cards), 12px (nav) |
| glassBorderColor | rgba(255, 255, 255, 0.08) |
| glowPrimary | 0 0 24px rgba(21, 181, 176, 0.25) |
| glowSuccess | 0 0 24px rgba(16, 185, 129, 0.3) |
| glowWarning | 0 0 24px rgba(245, 158, 11, 0.3) |
| glowError | 0 0 24px rgba(239, 68, 68, 0.3) |

#### T1.4: Update Web CSS Variables

Update `klard-web/src/app/globals.css`:
```css
:root {
  /* Glassmorphism */
  --klard-glass-blur: 24px;
  --klard-glass-blur-nav: 12px;
  --klard-glass-border: rgba(255, 255, 255, 0.08);

  /* Glows */
  --klard-glow-primary: 0 0 24px rgba(13, 124, 122, 0.25);
  --klard-glow-success: 0 0 24px rgba(5, 150, 105, 0.3);
  --klard-glow-warning: 0 0 24px rgba(217, 119, 6, 0.3);
  --klard-glow-error: 0 0 24px rgba(220, 38, 38, 0.3);

  /* Radius */
  --klard-radius-sm: 8px;
  --klard-radius-md: 12px;
  --klard-radius-lg: 16px;
  --klard-radius-xl: 24px;
}

[data-theme="dark"] {
  --klard-glow-primary: 0 0 24px rgba(21, 181, 176, 0.35);
  --klard-glow-success: 0 0 24px rgba(16, 185, 129, 0.35);
}
```

#### T1.5: Update Mobile colors.ts

Update `klard-mobile/src/styles/colors.ts` to import from commons:
```typescript
import { lightColors, darkColors } from '@klard-apps/commons/design-tokens';

export const Colors = {
  light: {
    ...lightColors,
    // Mobile-specific overrides if any
  },
  dark: {
    ...darkColors,
    // Mobile-specific overrides if any
  },
};
```

### Deliverables
- [ ] `commons/src/design-tokens/colors.ts` with tests
- [ ] `commons/src/design-tokens/effects.ts` with tests
- [ ] `commons/src/design-tokens/spacing.ts` with tests
- [ ] `commons/src/design-tokens/radius.ts` with tests
- [ ] `commons/src/design-tokens/animation.ts` with tests
- [ ] Updated `klard-web/src/app/globals.css`
- [ ] Updated `klard-mobile/src/styles/colors.ts`
- [ ] Build step for web CSS variable generation

---

## Track 2: Core Component Updates (Web)

### Goal
Update foundational web components with glassmorphism and glow effects.

### T2.1: Button Component

**File:** `klard-web/src/components/ui/button/button.tsx`

**TDD Tests:**
```typescript
describe('Button', () => {
  it('renders klard variant with glow', () => {
    render(<Button variant="klard">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('shadow-[var(--klard-glow-primary)]');
  });

  it('renders burn variant with success glow', () => {
    render(<Button variant="burn">Burn It</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-success');
  });

  it('scales on hover', () => {
    render(<Button variant="klard">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:scale-[1.02]');
  });

  it('scales down on active', () => {
    render(<Button variant="klard">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('active:scale-[0.98]');
  });
});
```

**Changes:**
1. Add `burn` variant (Success Green + green glow)
2. Update `klard` variant:
   - Glow: `shadow-[var(--klard-glow-primary)]`
   - Hover: `hover:scale-[1.02]` + enhanced glow
   - Active: `active:scale-[0.98]`
3. Update radius to use `--klard-radius-lg`

### T2.2: KlardCard Component

**File:** `klard-web/src/components/ui/klard-card/klard-card.tsx`

**TDD Tests:**
```typescript
describe('KlardCard', () => {
  it('applies glassmorphism effect', () => {
    render(<KlardCard>Content</KlardCard>);
    expect(screen.getByTestId('klard-card')).toHaveClass('backdrop-blur-[var(--klard-glass-blur)]');
  });

  it('applies glass border', () => {
    render(<KlardCard>Content</KlardCard>);
    expect(screen.getByTestId('klard-card')).toHaveClass('border-[var(--klard-glass-border)]');
  });

  it('shows glow on interactive hover', () => {
    render(<KlardCard variant="interactive" onPress={() => {}}>Content</KlardCard>);
    expect(screen.getByRole('button')).toHaveClass('hover:shadow-[var(--klard-glow-primary)]');
  });
});
```

**Changes:**
1. Add `backdrop-filter: blur(24px)` to all variants
2. Update border to `rgba(255, 255, 255, 0.08)`
3. Add teal glow on interactive hover
4. Add transition for smooth effects

### T2.3: Input/InputField Components

**Files:**
- `klard-web/src/components/ui/input.tsx`
- `klard-web/src/components/ui/input-field.tsx`

**TDD Tests:**
```typescript
describe('Input', () => {
  it('has glassmorphic background', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-white/[0.02]');
  });

  it('has theme-aware focus ring', () => {
    render(<Input />);
    // Light: teal, Dark: white
    expect(screen.getByRole('textbox')).toHaveClass('focus-visible:ring-primary');
  });

  it('has glow on focus', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveClass('focus-visible:shadow-[var(--klard-glow-primary)]');
  });
});
```

**Changes:**
1. Add glassmorphic background: `bg-white/[0.02] dark:bg-white/[0.01]`
2. Update border to glass style
3. Add focus glow effect
4. Update focus ring to 2px (from 3px)
5. Make focus ring theme-aware (teal light, white dark)

### Deliverables
- [ ] Button component updated with tests
- [ ] KlardCard component updated with tests
- [ ] Input component updated with tests
- [ ] InputField component updated with tests

---

## Track 3: Core Component Updates (Mobile)

### Goal
Update foundational mobile components with glassmorphism and glow effects.

### T3.1: Button Component

**File:** `klard-mobile/src/components/ui/Button/Button.tsx`

**TDD Tests:**
```typescript
describe('Button', () => {
  it('renders klard variant', () => {
    const { getByTestId } = render(<Button variant="klard">Test</Button>);
    expect(getByTestId('button')).toBeTruthy();
  });

  it('renders burn variant with success color', () => {
    const { getByTestId } = render(<Button variant="burn">Burn</Button>);
    // Verify success green background
  });

  it('triggers success haptic on burn action', () => {
    // Mock expo-haptics
  });
});
```

**Changes:**
1. Add `klard` variant with primary glow shadow
2. Add `burn` variant with Success Green + success glow
3. Add haptic feedback variants:
   - Default: `Haptics.ImpactFeedbackStyle.Light`
   - Success: `Haptics.NotificationFeedbackType.Success`

### T3.2: Card Component

**File:** `klard-mobile/src/components/ui/Card/Card.tsx`

**TDD Tests:**
```typescript
describe('Card', () => {
  it('renders with glassmorphic effect when glass variant', () => {
    const { getByTestId } = render(<Card variant="glass">Content</Card>);
    // Verify BlurView is rendered
  });

  it('shows glow shadow on interactive', () => {
    const { getByTestId } = render(<Card variant="interactive" onPress={() => {}}>Content</Card>);
    // Verify shadow style includes glow
  });
});
```

**Changes:**
1. Add `glass` variant using `expo-blur` BlurView
2. Add glow shadow styles from `colors.ts`
3. Fallback for low-end Android (skip blur, use semi-transparent bg)

### T3.3: InputField Component

**File:** `klard-mobile/src/components/ui/InputField/InputField.tsx`

**Changes:**
1. Add subtle glassmorphic background
2. Update focus border color to theme-aware
3. Add focus glow effect via shadow

### Deliverables
- [ ] Button component updated with tests
- [ ] Card component updated with tests
- [ ] InputField component updated with tests
- [ ] GlassCard wrapper component created (shared)

---

## Track 4: Shared Logic Hooks

### Goal
Create shared hooks in `commons/` for celebration, health status, and protection logic.

### T4.1: useCelebration Hook

**File:** `commons/src/hooks/useCelebration.ts`

**TDD Tests:**
```typescript
describe('useCelebration', () => {
  it('returns full intensity for first block', () => {
    const { result } = renderHook(() => useCelebration({ blockCount: 0 }));
    expect(result.current.intensity).toBe('full');
  });

  it('returns subtle intensity for routine blocks', () => {
    const { result } = renderHook(() => useCelebration({ blockCount: 5 }));
    expect(result.current.intensity).toBe('subtle');
  });

  it('returns full intensity for milestones', () => {
    const { result } = renderHook(() => useCelebration({ totalSaved: 100 }));
    expect(result.current.intensity).toBe('full');
  });
});
```

**Implementation:**
```typescript
type CelebrationIntensity = 'full' | 'subtle' | 'off';

interface CelebrationConfig {
  blockCount: number;
  totalSaved: number;
  userPreference?: CelebrationIntensity;
}

export function useCelebration(config: CelebrationConfig) {
  const intensity = useMemo(() => {
    if (config.userPreference === 'off') return 'off';
    if (config.blockCount === 0) return 'full'; // First block
    if (config.totalSaved >= 100 && config.totalSaved % 100 === 0) return 'full'; // Milestone
    if (config.blockCount >= 10 && config.blockCount % 10 === 0) return 'full'; // 10 blocks milestone
    return config.userPreference || 'subtle';
  }, [config]);

  return { intensity };
}
```

### T4.2: useHealthStatus Hook

**File:** `commons/src/hooks/useHealthStatus.ts`

**TDD Tests:**
```typescript
describe('useHealthStatus', () => {
  it('returns forgotten for 90+ days unused', () => {
    const { result } = renderHook(() => useHealthStatus({
      lastLogin: subDays(new Date(), 95),
      priceHistory: []
    }));
    expect(result.current.status).toBe('forgotten');
    expect(result.current.label).toBe('Forgotten?');
  });

  it('returns price-increased when price went up', () => {
    const { result } = renderHook(() => useHealthStatus({
      lastLogin: new Date(),
      priceHistory: [{ price: 10, date: '2024-01' }, { price: 15, date: '2024-06' }]
    }));
    expect(result.current.status).toBe('price-increased');
    expect(result.current.label).toBe('Price went up');
  });

  it('returns healthy by default', () => {
    const { result } = renderHook(() => useHealthStatus({
      lastLogin: new Date(),
      priceHistory: [{ price: 10, date: '2024-01' }]
    }));
    expect(result.current.status).toBe('healthy');
    expect(result.current.label).toBe('All good');
  });
});
```

### T4.3: useProtectionStatus Hook

**File:** `commons/src/hooks/useProtectionStatus.ts`

**TDD Tests:**
```typescript
describe('useProtectionStatus', () => {
  it('returns active card count', () => {
    const { result } = renderHook(() => useProtectionStatus({
      cards: [{ status: 'active' }, { status: 'locked' }, { status: 'active' }]
    }));
    expect(result.current.activeCount).toBe(2);
    expect(result.current.message).toBe('2 cards watching');
  });

  it('returns singular message for 1 card', () => {
    const { result } = renderHook(() => useProtectionStatus({
      cards: [{ status: 'active' }]
    }));
    expect(result.current.message).toBe('1 card watching');
  });
});
```

### T4.4: Commons Types (Required for Hooks)

The shared hooks require type definitions to operate on. Add to `commons/src/types/`:

**File:** `commons/src/types/burner-card.ts`
```typescript
export type BurnerCardStatus = 'active' | 'locked' | 'awaiting' | 'expired' | 'burned';
export type BurnerCardType = 'one-time' | 'recurring' | 'category-locked' | 'merchant-locked';

export interface BurnerCard {
  id: string;
  name: string;
  type: BurnerCardType;
  status: BurnerCardStatus;
  maskedPan: string;
  spendingLimit?: number;
  linkedSubscriptionId?: string;
  totalSpent: number;
  blockCount: number;
  createdAt: Date;
  activatedAt?: Date;
}
```

**File:** `commons/src/types/block-event.ts`
```typescript
export type BlockReason = 'limit-exceeded' | 'card-locked' | 'one-time-used' | 'merchant-mismatch' | 'expired';

export interface BlockEvent {
  id: string;
  cardId: string;
  merchantName: string;
  amount: number;
  currency: string;
  reason: BlockReason;
  blockedAt: Date;
  isFirstBlock: boolean;
  isMilestone: boolean;
}

export interface CelebrationEvent {
  type: 'first-block' | 'routine-block' | 'milestone';
  blockEvent: BlockEvent;
  totalSaved: number;
  blockCount: number;
}
```

**File:** `commons/src/types/price-change.ts`
```typescript
export interface PriceHistory {
  price: number;
  date: string;
  currency: string;
}

export interface PriceChangeEvent {
  subscriptionId: string;
  previousPrice: number;
  newPrice: number;
  changePercent: number;
  detectedAt: Date;
}
```

### Deliverables
- [ ] `commons/src/hooks/useCelebration.ts` with tests
- [ ] `commons/src/hooks/useHealthStatus.ts` with tests
- [ ] `commons/src/hooks/useProtectionStatus.ts` with tests
- [ ] `commons/src/types/burner-card.ts` with tests
- [ ] `commons/src/types/block-event.ts` with tests
- [ ] `commons/src/types/price-change.ts` with tests
- [ ] Hook and type exports in `commons/src/index.ts`

---

## Week 2: Cards & Status Components

### T2.4: SubscriptionCard Updates (Both Platforms)

**Changes:**
1. Add `healthStatus` prop accepting `'forgotten' | 'price-increased' | 'healthy'`
2. Add `isProtected` prop for protected badge
3. Integrate HealthIndicator component
4. Add glassmorphic styling

**TDD Tests:**
```typescript
describe('SubscriptionCard', () => {
  it('shows health indicator when status provided', () => {
    render(<SubscriptionCard healthStatus="forgotten" {...mockProps} />);
    expect(screen.getByText('Forgotten?')).toBeInTheDocument();
  });

  it('shows protected badge when isProtected', () => {
    render(<SubscriptionCard isProtected {...mockProps} />);
    expect(screen.getByText('Protected')).toBeInTheDocument();
  });
});
```

### T2.5: HealthIndicator Component (New)

**Files:**
- `klard-web/src/components/ui/health-indicator/health-indicator.tsx`
- `klard-mobile/src/components/ui/HealthIndicator/HealthIndicator.tsx`

**Props:**
```typescript
interface HealthIndicatorProps {
  status: 'forgotten' | 'price-increased' | 'healthy';
  showLabel?: boolean;
  size?: 'sm' | 'md';
}
```

**TDD Tests:**
```typescript
describe('HealthIndicator', () => {
  it('renders forgotten status with red color', () => {
    render(<HealthIndicator status="forgotten" />);
    expect(screen.getByText('Forgotten?')).toHaveClass('text-error');
  });

  it('renders price-increased with amber color', () => {
    render(<HealthIndicator status="price-increased" />);
    expect(screen.getByText('Price went up')).toHaveClass('text-warning');
  });

  it('renders healthy with green color', () => {
    render(<HealthIndicator status="healthy" />);
    expect(screen.getByText('All good')).toHaveClass('text-success');
  });

  it('shows glow effect', () => {
    render(<HealthIndicator status="healthy" />);
    expect(screen.getByTestId('health-indicator')).toHaveStyle({ boxShadow: expect.stringContaining('glow') });
  });
});
```

### T2.6: ProtectionStatus Component (New)

**Files:**
- `klard-web/src/components/ui/protection-status/protection-status.tsx`
- `klard-mobile/src/components/ui/ProtectionStatus/ProtectionStatus.tsx`

**Props:**
```typescript
interface ProtectionStatusProps {
  activeCards: number;
  showPulse?: boolean;
}
```

**TDD Tests:**
```typescript
describe('ProtectionStatus', () => {
  it('displays card count with watching message', () => {
    render(<ProtectionStatus activeCards={3} />);
    expect(screen.getByText('3 cards watching')).toBeInTheDocument();
  });

  it('uses singular for 1 card', () => {
    render(<ProtectionStatus activeCards={1} />);
    expect(screen.getByText('1 card watching')).toBeInTheDocument();
  });

  it('shows pulse animation when enabled', () => {
    render(<ProtectionStatus activeCards={3} showPulse />);
    expect(screen.getByTestId('protection-status')).toHaveClass('animate-pulse');
  });

  it('has teal glow', () => {
    render(<ProtectionStatus activeCards={3} />);
    expect(screen.getByTestId('protection-status')).toHaveStyle({ boxShadow: expect.stringContaining('teal') });
  });
});
```

### T2.7: Dialog/Modal Backdrop Blur

**Files:**
- `klard-web/src/components/ui/dialog.tsx`
- `klard-mobile/src/components/ui/Modal/Modal.tsx`

**Changes:**
1. Add `backdrop-blur-[24px]` to overlay (web)
2. Add BlurView to overlay (mobile via expo-blur)
3. Ensure glassmorphism effect matches design system (24px blur)

**TDD Tests:**
```typescript
describe('Dialog', () => {
  it('applies backdrop blur to overlay', () => {
    render(<Dialog open><DialogContent>Test</DialogContent></Dialog>);
    expect(screen.getByRole('dialog').parentElement).toHaveClass('backdrop-blur-[24px]');
  });
});
```

### T2.8: Two-Step Destructive Pattern

**File:** `klard-web/src/components/ui/button/confirm-button.tsx` (new compound variant)

**Purpose:** Inline confirmation that transforms on first click, auto-resets after 5 seconds.

**Pattern:** `[Delete] → click → [Are you sure? Yes / No] → 5s auto-reset OR confirm → action`

**Props:**
```typescript
interface ConfirmButtonProps {
  children: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  resetTimeout?: number; // default 5000ms
  variant?: 'destructive' | 'warning';
}
```

**TDD Tests:**
```typescript
describe('ConfirmButton', () => {
  it('shows confirmation on first click', () => {
    render(<ConfirmButton onConfirm={jest.fn()}>Delete</ConfirmButton>);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('auto-resets after 5 seconds', async () => {
    jest.useFakeTimers();
    render(<ConfirmButton onConfirm={jest.fn()}>Delete</ConfirmButton>);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    jest.advanceTimersByTime(5000);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('executes onConfirm when confirmed', () => {
    const onConfirm = jest.fn();
    render(<ConfirmButton onConfirm={onConfirm}>Delete</ConfirmButton>);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Yes'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('resets on Escape key', () => {
    render(<ConfirmButton onConfirm={jest.fn()}>Delete</ConfirmButton>);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
```

### T2.9: SavingsCounter Component (New)

**Files:**
- `klard-web/src/components/ui/savings-counter/savings-counter.tsx`
- `klard-mobile/src/components/ui/SavingsCounter/SavingsCounter.tsx`

**Props:**
```typescript
interface SavingsCounterProps {
  amount: number;
  currency?: string;
  animate?: boolean;
  label?: string;
}
```

**TDD Tests:**
```typescript
describe('SavingsCounter', () => {
  it('formats currency correctly', () => {
    render(<SavingsCounter amount={1234.56} />);
    expect(screen.getByText('$1,234.56')).toBeInTheDocument();
  });

  it('shows label', () => {
    render(<SavingsCounter amount={100} label="Total Blocked" />);
    expect(screen.getByText('Total Blocked')).toBeInTheDocument();
  });

  it('animates value change', async () => {
    const { rerender } = render(<SavingsCounter amount={100} animate />);
    rerender(<SavingsCounter amount={150} animate />);
    // Verify animation occurred
  });
});
```

---

## Week 3: Celebration & Custom Components

### T3.4: BlockCelebration Component (New)

**Files:**
- `klard-web/src/components/ui/block-celebration/block-celebration.tsx`
- `klard-mobile/src/components/ui/BlockCelebration/BlockCelebration.tsx`

**Compound Structure (Web):**
```tsx
<BlockCelebration level="first">
  <BlockCelebration.Amount value={47.98} />
  <BlockCelebration.Merchant name="TrialService" anonymize={false} />
  <BlockCelebration.ShareZone />
  <BlockCelebration.ShareButton onShare={handleShare} />
</BlockCelebration>
```

**TDD Tests:**
```typescript
describe('BlockCelebration', () => {
  it('renders amount prominently', () => {
    render(
      <BlockCelebration level="first">
        <BlockCelebration.Amount value={47.98} />
      </BlockCelebration>
    );
    expect(screen.getByText('$47.98')).toHaveClass('text-5xl');
  });

  it('triggers confetti on first level', () => {
    const confettiSpy = jest.spyOn(confetti, 'default');
    render(<BlockCelebration level="first">...</BlockCelebration>);
    expect(confettiSpy).toHaveBeenCalled();
  });

  it('skips confetti on subtle level', () => {
    const confettiSpy = jest.spyOn(confetti, 'default');
    render(<BlockCelebration level="subtle">...</BlockCelebration>);
    expect(confettiSpy).not.toHaveBeenCalled();
  });

  it('anonymizes merchant when requested', () => {
    render(
      <BlockCelebration level="first">
        <BlockCelebration.Merchant name="TrialService" anonymize />
      </BlockCelebration>
    );
    expect(screen.getByText('[Hidden]')).toBeInTheDocument();
  });

  it('announces to screen reader', () => {
    render(
      <BlockCelebration level="first">
        <BlockCelebration.Amount value={47.98} />
        <BlockCelebration.Merchant name="TrialService" />
      </BlockCelebration>
    );
    expect(screen.getByRole('status')).toHaveTextContent('Blocked $47.98 from TrialService');
  });
});
```

### T3.5: EmptyState 3-Tier Update

**Files:**
- `klard-web/src/components/ui/empty-state/empty-state.tsx`
- `klard-mobile/src/components/ui/EmptyState/EmptyState.tsx`

**Changes:**
1. Add `variant` prop: `'first-time' | 'cleared' | 'error'`
2. Add variant-specific styling and copy
3. Add test IDs per variant

**TDD Tests:**
```typescript
describe('EmptyState', () => {
  it('renders first-time variant with educational tone', () => {
    render(<EmptyState variant="first-time" title="Create your first card" />);
    expect(screen.getByTestId('empty-state-first-time')).toBeInTheDocument();
  });

  it('renders cleared variant with celebratory tone', () => {
    render(<EmptyState variant="cleared" title="All clear!" />);
    expect(screen.getByTestId('empty-state-cleared')).toBeInTheDocument();
  });

  it('renders error variant with recovery focus', () => {
    render(<EmptyState variant="error" title="Something went wrong" />);
    expect(screen.getByTestId('empty-state-error')).toBeInTheDocument();
  });
});
```

### T3.6: Toast Celebration Variant

**Files:**
- `klard-web/src/components/ui/sonner.tsx`
- `klard-mobile/src/components/ui/Toast/Toast.tsx`

**Changes:**
1. Add `position` prop: `'top-center' | 'center-screen' | 'bottom'`
2. Add `celebrationLevel` prop for tiered intensity
3. Create `showCelebrationToast()` helper

**TDD Tests:**
```typescript
describe('Toast', () => {
  it('positions celebration toast in center', () => {
    showCelebrationToast({ amount: 47.98, merchant: 'Test' });
    expect(screen.getByRole('alert')).toHaveClass('fixed-center');
  });

  it('triggers confetti on full celebration', () => {
    showCelebrationToast({ amount: 47.98, celebrationLevel: 'full' });
    // Verify confetti triggered
  });
});
```

### T3.7: CardTypeSelector Component (New)

**Files:**
- `klard-web/src/components/ui/card-type-selector/card-type-selector.tsx`
- `klard-mobile/src/components/ui/CardTypeSelector/CardTypeSelector.tsx`

**Props:**
```typescript
interface CardTypeSelectorProps {
  context?: 'trial' | 'subscription' | 'general';
  onSelect: (type: CardType) => void;
  showAdvanced?: boolean;
}
```

**TDD Tests:**
```typescript
describe('CardTypeSelector', () => {
  it('suggests One-Time for trial context', () => {
    render(<CardTypeSelector context="trial" onSelect={jest.fn()} />);
    expect(screen.getByText('One-Time')).toHaveAttribute('data-recommended', 'true');
  });

  it('shows only 2 options by default', () => {
    render(<CardTypeSelector onSelect={jest.fn()} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('reveals advanced options when expanded', () => {
    render(<CardTypeSelector onSelect={jest.fn()} showAdvanced />);
    expect(screen.getByText('Category-Locked')).toBeInTheDocument();
  });
});
```

### T3.8: KYCActivationPrompt Component (New)

**Files:**
- `klard-web/src/components/ui/kyc-activation-prompt/kyc-activation-prompt.tsx`
- `klard-mobile/src/components/ui/KYCActivationPrompt/KYCActivationPrompt.tsx`

**Purpose:** Pre-KYC trigger with "Activate your protection" framing (NOT "Verify your identity")

**Props:**
```typescript
interface KYCActivationPromptProps {
  cardName: string;
  onActivate: () => void;
  variant?: 'inline' | 'modal' | 'card-overlay';
}
```

**TDD Tests:**
```typescript
describe('KYCActivationPrompt', () => {
  it('uses activation framing not verification', () => {
    render(<KYCActivationPrompt cardName="Test Card" onActivate={jest.fn()} />);
    expect(screen.getByText(/activate/i)).toBeInTheDocument();
    expect(screen.queryByText(/verify/i)).not.toBeInTheDocument();
  });

  it('shows card name', () => {
    render(<KYCActivationPrompt cardName="Netflix Blocker" onActivate={jest.fn()} />);
    expect(screen.getByText('Netflix Blocker')).toBeInTheDocument();
  });

  it('renders inline variant by default', () => {
    render(<KYCActivationPrompt cardName="Test" onActivate={jest.fn()} />);
    expect(screen.getByTestId('kyc-prompt-inline')).toBeInTheDocument();
  });
});
```

### T3.9: Mobile FAB (Floating Action Button)

**File:** `klard-mobile/src/components/ui/FAB/FAB.tsx`

**Purpose:** Floating Action Button for "Create Card" primary action on mobile dashboard.

**Props:**
```typescript
interface FABProps {
  icon: React.ReactNode;
  onPress: () => void;
  label?: string;
  position?: 'bottom-right' | 'bottom-center';
  hapticFeedback?: boolean;
}
```

**TDD Tests:**
```typescript
describe('FAB', () => {
  it('renders in bottom-right by default', () => {
    const { getByTestId } = render(<FAB icon={<PlusIcon />} onPress={jest.fn()} />);
    expect(getByTestId('fab')).toHaveStyle({ position: 'absolute', bottom: 24, right: 24 });
  });

  it('triggers haptic feedback on press', () => {
    const mockHaptic = jest.fn();
    // Mock expo-haptics
    render(<FAB icon={<PlusIcon />} onPress={jest.fn()} hapticFeedback />);
    fireEvent.press(screen.getByTestId('fab'));
    expect(mockHaptic).toHaveBeenCalledWith('light');
  });

  it('shows label when provided', () => {
    render(<FAB icon={<PlusIcon />} onPress={jest.fn()} label="Create Card" />);
    expect(screen.getByText('Create Card')).toBeInTheDocument();
  });
});
```

---

## Week 4: Polish & Integration

### T4.4: Navigation Updates

**AppSidebar (Web):**
- Apply bold gradient: `linear-gradient(135deg, #15B5B0, #34D399)`
- Add glow on active state
- Update icon styling (Lucide, 20-24px)

**TabBar (Mobile):**
- Add glassmorphic background
- Add glow on active tab
- Enforce 5 tabs max warning

### T4.5: Badge Glow Updates

Add glow effects to colored variants:
- Success: `shadow-[0_0_8px_rgba(16,185,129,0.3)]`
- Warning: `shadow-[0_0_8px_rgba(245,158,11,0.3)]`
- Error: `shadow-[0_0_8px_rgba(239,68,68,0.3)]`

### T4.6: BurnerCardVisual Updates

1. Add "awaiting" state with:
   - Dashed border
   - "Awaiting Activation" label
   - KYC CTA button
2. Add state-specific glows
3. Refactor to compound pattern (web)

### T4.7: Visual Regression Setup

1. Configure Chromatic/Percy for glassmorphism effects
2. Create baseline screenshots
3. Add to CI pipeline

### T4.8: Accessibility Audit

1. Run `jest-axe` on all components
2. Test keyboard navigation
3. Test screen reader announcements
4. Verify focus management

---

## Dependencies & Blockers

### Critical Path
```
Token Foundation (Track 1)
    ↓
Core Components (Track 2 & 3) [parallel]
    ↓
Custom Components (Week 2-3) [depends on core]
    ↓
Polish & Integration (Week 4)
```

### Required Dependencies (Install in Week 1)

**Web:**
```bash
pnpm --filter klard-web add canvas-confetti
pnpm --filter klard-web add -D @types/canvas-confetti
```

**Mobile:**
```bash
pnpm --filter klard-mobile add expo-blur
```

### Build Dependencies
- commons build must complete before platform consumption

---

## Sub-Agent Execution Commands

### Week 1 Kickoff
```
Track 1: "Create design token system in commons/src/design-tokens/ with TDD. Start with colors.ts and effects.ts."

Track 2: "Update klard-web Button component with klard and burn variants, glow effects, and scale animations. TDD approach."

Track 3: "Update klard-mobile Button component with klard and burn variants, glow shadow, and haptic feedback variants. TDD approach."

Track 4: "Create useCelebration, useHealthStatus, and useProtectionStatus hooks in commons/src/hooks/ with TDD."
```

### Week 2 Kickoff
```
Track 1: "Update klard-web StatCard, SubscriptionCard, AlertCard with glassmorphism and health indicators. TDD."

Track 2: "Update klard-mobile SubscriptionCard, AlertCard, BurnerCardVisual with glassmorphism and health indicators. TDD."

Track 3: "Create HealthIndicator, ProtectionStatus, SavingsCounter components for both platforms. TDD."

Track 4: "Update AppSidebar (web) with bold gradient. Update TabBar (mobile) with glassmorphism. TDD."
```

---

## Quality Gates

Before merging any component:

- [ ] All TDD tests pass
- [ ] `jest-axe` accessibility tests pass
- [ ] Visual regression approved (if applicable)
- [ ] Performance budget met
- [ ] Code review approved
- [ ] Storybook story created (web)

---

## Rollback Plan

If issues discovered post-merge:
1. Feature flag: `useNewDesign` can toggle old vs new styles
2. Git revert to pre-sprint state available
3. Token values can be reverted in commons without component changes

---

## Success Criteria

Sprint is complete when:

- [ ] All 26 existing components updated (original 24 + Dialog + BottomSheet)
- [ ] All 18 new components created (original 15 + KYCActivationPrompt + FAB + ConfirmButton)
- [ ] All 3 commons type files created (burner-card.ts, block-event.ts, price-change.ts)
- [ ] 85%+ test coverage achieved
- [ ] Zero accessibility violations
- [ ] Visual regression baseline established
- [ ] Documentation updated
- [ ] Migration guide created
- [ ] SOLID compliance verified (see checklist below)
- [ ] DRY compliance verified (see checklist below)

---

## SOLID & DRY Compliance

### SOLID Compliance Matrix

| Component | SRP | OCP | LSP | ISP | DIP | Notes |
|-----------|-----|-----|-----|-----|-----|-------|
| **Token Files** |
| colors.ts | ✅ | ✅ | N/A | ✅ | ✅ | Colors only; themes via export; separate light/dark |
| effects.ts | ✅ | ✅ | N/A | ✅ | ✅ | Effects only; extend by adding new effects |
| spacing.ts | ✅ | ✅ | N/A | ✅ | ✅ | Spacing only; 4/8 grid values |
| **Shared Hooks** |
| useCelebration | ✅ | ✅ | N/A | ✅ | ✅ | Configurable thresholds via options param |
| useHealthStatus | ✅ | ✅ | N/A | ✅ | ✅ | Single health calculation responsibility |
| useProtectionStatus | ✅ | ✅ | N/A | ✅ | ✅ | Single card counting responsibility |
| **Shared Types** |
| ICard (interface) | ✅ | ✅ | ✅ | ✅ | ✅ | Abstract base for all card types |
| BurnerCard | ✅ | ✅ | ✅ | ✅ | ✅ | Extends ICard, single card concern |
| BlockEvent | ✅ | ✅ | N/A | ✅ | ✅ | Single event concern |
| **Web Components** |
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | Variants via CVA; depends on tokens |
| KlardCard | ✅ | ✅ | ✅ | ✅ | ✅ | Rendering only; variants via config |
| BlockCelebration | ✅ | ✅ | ✅ | ✅ | ✅ | Compound pattern segregates concerns |
| ConfirmButton | ✅ | ✅ | ✅ | ✅ | ✅ | Single confirmation concern |
| **Mobile Components** |
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | Variants via SVA; depends on tokens |
| Card | ✅ | ✅ | ✅ | ✅ | ✅ | Rendering only; glass variant via expo-blur |
| FAB | ✅ | ✅ | ✅ | ✅ | ✅ | Single floating action concern |

### SOLID Principle Applications

**SRP (Single Responsibility):**
- Token files: ONE concern each (colors, effects, spacing, radius, animation)
- Hooks: ONE calculation each (celebration intensity, health status, protection count)
- Components: ONE rendering concern (no data fetching, no business logic)

**OCP (Open/Closed):**
- Variants defined via CVA/SVA config (extend by adding to config, not editing component)
- Token values extend by adding new exports (no modification to existing)
- Hook thresholds configurable via options (see updated implementation below)

**LSP (Liskov Substitution):**
- All card types extend `ICard` interface
- Variants work identically across all prop combinations
- Compound components substitute without breaking parent

**ISP (Interface Segregation):**
- Small, focused prop interfaces (≤10 props per component)
- Compound pattern splits concerns (Amount, Merchant, ShareZone)
- Separate light/dark theme exports

**DIP (Dependency Inversion):**
- Components depend on design token abstractions, not hardcoded values
- Hooks depend on `ICard` interface, not concrete `BurnerCard`
- Platform packages import from commons abstraction

### DRY Compliance Checklist

**Token Values (Single Source of Truth):**
- [ ] All color values defined ONLY in `commons/src/design-tokens/colors.ts`
- [ ] All effect values defined ONLY in `commons/src/design-tokens/effects.ts`
- [ ] Web CSS variables GENERATED from commons (not duplicated)
- [ ] Mobile colors.ts IMPORTS from commons (not duplicated)
- [ ] Tests verify exports exist, don't hardcode values

**Shared Test Utilities:**
- [ ] Create `commons/src/test-utils/index.ts`
- [ ] Extract `expectVariant()` helper for variant assertions
- [ ] Extract `expectGlow()` helper for glow effect assertions
- [ ] Extract `expectGlassmorphism()` helper for blur assertions
- [ ] Web and mobile tests import from commons test-utils

**Component Patterns:**
- [ ] Variant definitions use CVA (web) / SVA (mobile) - no inline conditionals
- [ ] Compound components use shared context pattern
- [ ] Props interfaces extend common base types where applicable

---

## Updated Implementations (SOLID Fixes)

### Fix 1: useCelebration - Configurable Thresholds (OCP)

**File:** `commons/src/hooks/useCelebration.ts`

```typescript
type CelebrationIntensity = 'full' | 'subtle' | 'off';

interface CelebrationThresholds {
  savingsMilestone: number;  // Amount saved to trigger full celebration
  blockMilestone: number;    // Block count to trigger full celebration
}

const DEFAULT_THRESHOLDS: CelebrationThresholds = {
  savingsMilestone: 100,
  blockMilestone: 10,
};

interface CelebrationConfig {
  blockCount: number;
  totalSaved: number;
  userPreference?: CelebrationIntensity;
  thresholds?: Partial<CelebrationThresholds>;  // OCP: Extend via config
}

export function useCelebration(config: CelebrationConfig) {
  const thresholds = { ...DEFAULT_THRESHOLDS, ...config.thresholds };

  const intensity = useMemo(() => {
    if (config.userPreference === 'off') return 'off';
    if (config.blockCount === 0) return 'full'; // First block

    // Configurable milestone checks (OCP compliant)
    const isSavingsMilestone = config.totalSaved >= thresholds.savingsMilestone
      && config.totalSaved % thresholds.savingsMilestone === 0;
    const isBlockMilestone = config.blockCount >= thresholds.blockMilestone
      && config.blockCount % thresholds.blockMilestone === 0;

    if (isSavingsMilestone || isBlockMilestone) return 'full';
    return config.userPreference || 'subtle';
  }, [config, thresholds]);

  return { intensity };
}
```

### Fix 2: Interface Layer for Types (DIP)

**File:** `commons/src/types/card.ts` (new base interface)

```typescript
// Abstract interface - components depend on this
export interface ICard {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly createdAt: Date;
}

// Concrete types extend the interface
export interface BurnerCard extends ICard {
  type: BurnerCardType;
  status: BurnerCardStatus;  // Narrows string to specific union
  maskedPan: string;
  spendingLimit?: number;
  linkedSubscriptionId?: string;
  totalSpent: number;
  blockCount: number;
  activatedAt?: Date;
}
```

**File:** `commons/src/hooks/useProtectionStatus.ts` (DIP compliant)

```typescript
import type { ICard } from '../types/card';

interface ProtectionConfig {
  cards: readonly ICard[];  // Depends on abstraction, not BurnerCard
}

export function useProtectionStatus(config: ProtectionConfig) {
  const activeCount = config.cards.filter(c => c.status === 'active').length;
  const message = activeCount === 1 ? '1 card watching' : `${activeCount} cards watching`;
  return { activeCount, message };
}
```

### Fix 3: Shared Test Utilities (DRY)

**File:** `commons/src/test-utils/index.ts` (new)

```typescript
// Variant assertions - shared across web and mobile tests
export const expectVariant = (element: HTMLElement | Element, variant: string) => {
  expect(element).toHaveAttribute('data-variant', variant);
};

// Glow effect assertions
export const expectGlowEffect = (element: HTMLElement | Element, type: 'primary' | 'success' | 'warning' | 'error') => {
  const glowPatterns = {
    primary: /rgba\(21,\s*181,\s*176/,
    success: /rgba\(16,\s*185,\s*129/,
    warning: /rgba\(245,\s*158,\s*11/,
    error: /rgba\(239,\s*68,\s*68/,
  };
  const styles = window.getComputedStyle(element);
  expect(styles.boxShadow).toMatch(glowPatterns[type]);
};

// Glassmorphism assertions
export const expectGlassmorphism = (element: HTMLElement | Element) => {
  const styles = window.getComputedStyle(element);
  expect(styles.backdropFilter).toContain('blur');
};

// Token value existence assertions (don't hardcode values)
export const expectTokenDefined = <T>(token: T, name: string) => {
  expect(token).toBeDefined();
  expect(token).not.toBeNull();
};
```

### Fix 4: Test Pattern Updates (DRY)

**Before (BAD - hardcoded values):**
```typescript
it('exports light theme colors', () => {
  expect(lightColors.primary).toBe('#0D7C7A');  // Hardcoded!
});
```

**After (GOOD - verify structure, not values):**
```typescript
import { expectTokenDefined } from '@klard-apps/commons/test-utils';

it('exports light theme colors', () => {
  expectTokenDefined(lightColors.primary, 'primary');
  expect(lightColors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);  // Valid hex
});

it('exports all required color tokens', () => {
  const requiredTokens = ['primary', 'secondary', 'success', 'warning', 'error'];
  requiredTokens.forEach(token => {
    expectTokenDefined(lightColors[token], token);
  });
});
```

---

## Gap Analysis Summary (2025-12-29)

Items added after UX spec gap analysis:

| Item | Type | Week | Track |
|------|------|------|-------|
| Commons Types (burner-card, block-event, price-change) | Types | 1 | 4 |
| Dialog/Modal Backdrop Blur | Update | 2 | - |
| Two-Step Destructive Pattern (ConfirmButton) | New | 2 | - |
| KYCActivationPrompt | New | 3 | 4 |
| Mobile FAB | New | 3 | 3 |
| expo-blur installation | Dependency | 1 | - |
| canvas-confetti installation | Dependency | 1 | - |

**Lower Priority (Phase 2):**
- Search debounce/recent searches
- Filter chips
- INP metric tracking
- Celebration preload optimization
