# Web SoC & DRY Refactoring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor all 14 web components with SoC violations by extracting CVA variants to `.styles.ts` files and constants to `.constants.ts` files. Also fix 6 DRY violations with shared utilities.

**Architecture:** Extract inline CVA definitions and config objects to separate files within component folders. Create shared hooks and components for repeated patterns.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, class-variance-authority (CVA)

---

## Reference Pattern

For web components, the SoC pattern is:

```
component-name/
├── component-name.tsx        # Logic + JSX only (imports from styles/constants)
├── component-name.styles.ts  # CVA variants exported
├── component-name.constants.ts # Config objects (optional, if component has them)
└── index.ts                  # Re-exports component + types + variants
```

---

## Phase 1: DRY Infrastructure (Shared Utilities)

### Task 1.1: Create useFormFieldIds Hook

**Files:**
- Create: `klard-web/src/hooks/use-form-field-ids.ts`

**Step 1: Create the hook file**

```typescript
import { useMemo } from 'react';

interface FormFieldIds {
  inputId: string;
  errorId: string;
  helperId: string;
  describedBy: string | undefined;
}

export function useFormFieldIds(
  id: string | undefined,
  name: string,
  error?: string,
  helperText?: string
): FormFieldIds {
  return useMemo(() => {
    const inputId = id ?? name;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
    ].filter(Boolean).join(' ') || undefined;

    return { inputId, errorId, helperId, describedBy };
  }, [id, name, error, helperText]);
}
```

**Step 2: Export from hooks index**

In `klard-web/src/hooks/index.ts`, add:
```typescript
export { useFormFieldIds } from './use-form-field-ids';
```

**Step 3: Verify TypeScript**

Run: `pnpm --filter klard-web exec tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add klard-web/src/hooks/
git commit -m "feat(web): add useFormFieldIds hook for DRY form field accessibility"
```

---

### Task 1.2: Create FormLabel Component

**Files:**
- Create: `klard-web/src/components/ui/form-label.tsx`

**Step 1: Create the component**

```typescript
import { cn } from '@/lib/utils';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export function FormLabel({ required, children, className, ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}
```

**Step 2: Export from UI index**

In `klard-web/src/components/ui/index.ts`, add:
```typescript
export { FormLabel, type FormLabelProps } from './form-label';
```

**Step 3: Verify TypeScript**

Run: `pnpm --filter klard-web exec tsc --noEmit`

**Step 4: Commit**

```bash
git add klard-web/src/components/ui/form-label.tsx klard-web/src/components/ui/index.ts
git commit -m "feat(web): add FormLabel component for DRY label rendering"
```

---

## Phase 2: High Priority SoC Refactoring (3 components with config objects)

### Task 2.1: Refactor alert-card.tsx

**Files:**
- Create: `klard-web/src/components/ui/alert-card/alert-card.styles.ts`
- Create: `klard-web/src/components/ui/alert-card/alert-card.constants.ts`
- Create: `klard-web/src/components/ui/alert-card/alert-card.tsx`
- Create: `klard-web/src/components/ui/alert-card/index.ts`
- Delete: `klard-web/src/components/ui/alert-card.tsx`

**Step 1: Create folder**

```bash
mkdir -p klard-web/src/components/ui/alert-card
```

**Step 2: Create constants file**

Create `alert-card.constants.ts`:
```typescript
import { Bell, RefreshCw, Ban, AlertCircle, DollarSign, Info } from 'lucide-react';

export const alertTypeConfig = {
  renewal: {
    icon: RefreshCw,
    tone: 'info' as const,
  },
  payment_failed: {
    icon: AlertCircle,
    tone: 'error' as const,
  },
  service_blocked: {
    icon: Ban,
    tone: 'error' as const,
  },
  new_charge: {
    icon: DollarSign,
    tone: 'warning' as const,
  },
  card_expiring: {
    icon: AlertCircle,
    tone: 'warning' as const,
  },
  system: {
    icon: Info,
    tone: 'info' as const,
  },
} as const;

export type AlertType = keyof typeof alertTypeConfig;
```

**Step 3: Create styles file**

Create `alert-card.styles.ts`:
```typescript
import { cva } from 'class-variance-authority';

export const alertCardVariants = cva(
  'flex gap-3 rounded-xl border bg-card p-4 transition-all duration-200',
  {
    variants: {
      tone: {
        info: 'border-blue-200 bg-blue-50/50 dark:border-blue-900/40 dark:bg-blue-950/20',
        warning: 'border-amber-200 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20',
        error: 'border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20',
      },
      size: {
        md: 'p-4',
        sm: 'p-3 gap-2',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-md hover:border-primary/30',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'info',
      size: 'md',
      interactive: false,
    },
  }
);

export const iconContainerVariants = cva(
  'flex-shrink-0 rounded-full p-2',
  {
    variants: {
      tone: {
        info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
        warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
        error: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
      },
    },
    defaultVariants: {
      tone: 'info',
    },
  }
);
```

**Step 4: Create component file**

Read the original `alert-card.tsx` and move component logic to `alert-card/alert-card.tsx`, importing from:
- `./alert-card.styles` for CVA variants
- `./alert-card.constants` for alertTypeConfig

**Step 5: Create index.ts**

```typescript
export { AlertCard, type AlertCardProps, type Alert } from './alert-card';
export { alertTypeConfig, type AlertType } from './alert-card.constants';
export { alertCardVariants, iconContainerVariants } from './alert-card.styles';
```

**Step 6: Delete original and update parent index**

```bash
rm klard-web/src/components/ui/alert-card.tsx
```

**Step 7: Run tests**

```bash
pnpm --filter klard-web test --run
```

**Step 8: Commit**

```bash
git add klard-web/src/components/ui/alert-card/
git commit -m "refactor(web): extract AlertCard to folder structure with SoC"
```

---

### Task 2.2: Refactor subscription-card.tsx

**Files:**
- Create: `klard-web/src/components/ui/subscription-card/subscription-card.styles.ts`
- Create: `klard-web/src/components/ui/subscription-card/subscription-card.constants.ts`
- Create: `klard-web/src/components/ui/subscription-card/subscription-card.tsx`
- Create: `klard-web/src/components/ui/subscription-card/index.ts`
- Delete: `klard-web/src/components/ui/subscription-card.tsx`

**Step 1: Create folder**

```bash
mkdir -p klard-web/src/components/ui/subscription-card
```

**Step 2: Read original to extract constants**

Read `subscription-card.tsx` to identify:
- `statusConfig` object
- `billingCycleLabels` object
- Any CVA variants

**Step 3: Create constants file with extracted config objects**

**Step 4: Create styles file with CVA variants**

**Step 5: Create component file importing from styles/constants**

**Step 6: Create index.ts with re-exports**

**Step 7: Delete original, run tests, commit**

```bash
git commit -m "refactor(web): extract SubscriptionCard to folder structure with SoC"
```

---

### Task 2.3: Refactor stat-card.tsx

**Files:**
- Create: `klard-web/src/components/ui/stat-card/stat-card.styles.ts`
- Create: `klard-web/src/components/ui/stat-card/stat-card.constants.ts`
- Create: `klard-web/src/components/ui/stat-card/stat-card.tsx`
- Create: `klard-web/src/components/ui/stat-card/index.ts`
- Delete: `klard-web/src/components/ui/stat-card.tsx`

**Step 1: Create folder**

```bash
mkdir -p klard-web/src/components/ui/stat-card
```

**Step 2: Create constants file**

```typescript
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const trendConfig = {
  up: {
    icon: TrendingUp,
    className: 'text-green-600 dark:text-green-400',
  },
  down: {
    icon: TrendingDown,
    className: 'text-red-600 dark:text-red-400',
  },
  neutral: {
    icon: Minus,
    className: 'text-slate-500 dark:text-slate-400',
  },
} as const;

export type TrendDirection = keyof typeof trendConfig;
```

**Step 3: Create styles file**

```typescript
import { cva } from 'class-variance-authority';

export const statCardVariants = cva(
  'bg-card text-card-foreground flex items-center justify-between gap-4 rounded-xl border shadow-sm transition-all',
  {
    variants: {
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4 text-base',
        lg: 'p-5 text-lg',
      },
      muted: {
        true: 'opacity-75 border-muted',
        false: '',
      },
      clickable: {
        true: 'cursor-pointer hover:border-teal-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      muted: false,
      clickable: false,
    },
  }
);
```

**Step 4-6: Create component, index, delete original**

**Step 7: Commit**

```bash
git commit -m "refactor(web): extract StatCard to folder structure with SoC"
```

---

## Phase 3: Medium Priority SoC Refactoring (CVA-only components)

### Task 3.1: Refactor button.tsx

**Files:**
- Create: `klard-web/src/components/ui/button/button.styles.ts`
- Create: `klard-web/src/components/ui/button/button.tsx`
- Create: `klard-web/src/components/ui/button/index.ts`
- Delete: `klard-web/src/components/ui/button.tsx`

Extract `buttonVariants` to `button.styles.ts`.

**Commit:** `refactor(web): extract Button to folder structure with SoC`

---

### Task 3.2: Refactor badge.tsx

**Files:**
- Create: `klard-web/src/components/ui/badge/badge.styles.ts`
- Create: `klard-web/src/components/ui/badge/badge.tsx`
- Create: `klard-web/src/components/ui/badge/index.ts`
- Delete: `klard-web/src/components/ui/badge.tsx`

Extract `badgeVariants` to `badge.styles.ts`.

**Commit:** `refactor(web): extract Badge to folder structure with SoC`

---

### Task 3.3: Refactor tabs.tsx

**Files:**
- Create: `klard-web/src/components/ui/tabs/tabs.styles.ts`
- Create: `klard-web/src/components/ui/tabs/tabs.tsx`
- Create: `klard-web/src/components/ui/tabs/index.ts`
- Delete: `klard-web/src/components/ui/tabs.tsx`

Extract `tabsListVariants` and `tabsTriggerVariants` to `tabs.styles.ts`.

**Commit:** `refactor(web): extract Tabs to folder structure with SoC`

---

### Task 3.4: Refactor price-display.tsx

**Files:**
- Create: `klard-web/src/components/ui/price-display/price-display.styles.ts`
- Create: `klard-web/src/components/ui/price-display/price-display.constants.ts`
- Create: `klard-web/src/components/ui/price-display/price-display.tsx`
- Create: `klard-web/src/components/ui/price-display/index.ts`
- Delete: `klard-web/src/components/ui/price-display.tsx`

Extract `priceDisplayVariants` and `cycleLabels`.

**Commit:** `refactor(web): extract PriceDisplay to folder structure with SoC`

---

### Task 3.5: Refactor empty-state.tsx

**Files:**
- Create: `klard-web/src/components/ui/empty-state/empty-state.styles.ts`
- Create: `klard-web/src/components/ui/empty-state/empty-state.tsx`
- Create: `klard-web/src/components/ui/empty-state/index.ts`
- Delete: `klard-web/src/components/ui/empty-state.tsx`

**Commit:** `refactor(web): extract EmptyState to folder structure with SoC`

---

### Task 3.6: Refactor segmented-control.tsx

**Files:**
- Create: `klard-web/src/components/ui/segmented-control/segmented-control.styles.ts`
- Create: `klard-web/src/components/ui/segmented-control/segmented-control.tsx`
- Create: `klard-web/src/components/ui/segmented-control/index.ts`
- Delete: `klard-web/src/components/ui/segmented-control.tsx`

**Commit:** `refactor(web): extract SegmentedControl to folder structure with SoC`

---

### Task 3.7: Refactor switch.tsx

**Files:**
- Create: `klard-web/src/components/ui/switch/switch.styles.ts`
- Create: `klard-web/src/components/ui/switch/switch.tsx`
- Create: `klard-web/src/components/ui/switch/index.ts`
- Delete: `klard-web/src/components/ui/switch.tsx`

Extract `switchVariants` and `thumbVariants`.

**Commit:** `refactor(web): extract Switch to folder structure with SoC`

---

## Phase 4: Lower Priority SoC Refactoring (Smaller components)

### Task 4.1: Refactor alert-banner.tsx

**Files:**
- Create: `klard-web/src/components/ui/alert-banner/alert-banner.styles.ts`
- Create: `klard-web/src/components/ui/alert-banner/alert-banner.constants.ts`
- Create: `klard-web/src/components/ui/alert-banner/alert-banner.tsx`
- Create: `klard-web/src/components/ui/alert-banner/index.ts`
- Delete: `klard-web/src/components/ui/alert-banner.tsx`

Extract `alertBannerVariants` and `icons` config.

**Commit:** `refactor(web): extract AlertBanner to folder structure with SoC`

---

### Task 4.2: Refactor klard-card.tsx

**Files:**
- Create: `klard-web/src/components/ui/klard-card/klard-card.styles.ts`
- Create: `klard-web/src/components/ui/klard-card/klard-card.tsx`
- Create: `klard-web/src/components/ui/klard-card/index.ts`
- Delete: `klard-web/src/components/ui/klard-card.tsx`

**Commit:** `refactor(web): extract KlardCard to folder structure with SoC`

---

### Task 4.3: Refactor alert.tsx

**Files:**
- Create: `klard-web/src/components/ui/alert/alert.styles.ts`
- Create: `klard-web/src/components/ui/alert/alert.tsx`
- Create: `klard-web/src/components/ui/alert/index.ts`
- Delete: `klard-web/src/components/ui/alert.tsx`

**Commit:** `refactor(web): extract Alert to folder structure with SoC`

---

### Task 4.4: Refactor sidebar-menu.tsx (already in folder)

**Files:**
- Create: `klard-web/src/components/ui/sidebar/sidebar-menu.styles.ts`
- Modify: `klard-web/src/components/ui/sidebar/sidebar-menu.tsx`

Extract `sidebarMenuButtonVariants` to styles file.

**Commit:** `refactor(web): extract sidebar-menu CVA to styles file`

---

## Phase 5: DRY Pattern Application

### Task 5.1: Update form components to use useFormFieldIds hook

**Files to modify:**
- `klard-web/src/components/ui/input-field.tsx`
- `klard-web/src/components/ui/password-input.tsx`
- `klard-web/src/components/ui/currency-input.tsx`
- `klard-web/src/components/ui/date-picker.tsx`

Replace inline `describedBy` logic with `useFormFieldIds` hook.

**Commit:** `refactor(web): use useFormFieldIds hook in form components`

---

### Task 5.2: Update form components to use FormLabel component

**Files to modify:**
- `klard-web/src/components/ui/input-field.tsx`
- `klard-web/src/components/ui/password-input.tsx`
- `klard-web/src/components/ui/date-picker.tsx`

Replace inline label rendering with `<FormLabel>` component.

**Commit:** `refactor(web): use FormLabel component in form fields`

---

## Phase 6: Final Verification

### Task 6.0: SoC/DRY Compliance Verification (CRITICAL)

**Step 1: Verify no inline CVA in component files**

```bash
# Search for cva( in .tsx files (should only be in .styles.ts)
grep -r "cva(" klard-web/src/components/ui/*.tsx 2>/dev/null | grep -v ".styles.ts" | wc -l
```

Expected: 0

**Step 2: Verify folder structure**

```bash
# All 14 components should be folders now (except legacy shadcn)
ls -d klard-web/src/components/ui/*/
```

**Step 3: Verify all tests pass**

```bash
pnpm --filter klard-web test --run
pnpm --filter klard-web exec tsc --noEmit
pnpm --filter klard-web build
```

---

### Task 6.1: Update UI index exports

Ensure `klard-web/src/components/ui/index.ts` re-exports all new folder structures.

---

### Task 6.2: Final commit

```bash
git add .
git commit -m "chore: complete web SoC/DRY refactoring for all UI components"
```

---

## Summary

| Phase | Tasks | Components |
|-------|-------|------------|
| Phase 1 | 2 | DRY infrastructure (hook + FormLabel) |
| Phase 2 | 3 | High priority (alert-card, subscription-card, stat-card) |
| Phase 3 | 7 | Medium priority (button, badge, tabs, etc.) |
| Phase 4 | 4 | Lower priority (alert-banner, klard-card, alert, sidebar-menu) |
| Phase 5 | 2 | DRY pattern application |
| Phase 6 | 3 | Verification |

**Total Tasks:** 21
**Components Refactored:** 14

---

## Execution Strategy

### Parallel Sub-Agent Deployment

**Phase 2 (PARALLEL - 3 agents):**
- Agent 1: alert-card
- Agent 2: subscription-card
- Agent 3: stat-card

**Phase 3 (PARALLEL - 4 agents):**
- Agent 1: button, badge
- Agent 2: tabs, switch
- Agent 3: price-display, empty-state
- Agent 4: segmented-control

**Phase 4 (PARALLEL - 2 agents):**
- Agent 1: alert-banner, klard-card
- Agent 2: alert, sidebar-menu

**Phase 5-6:** Sequential (dependencies)