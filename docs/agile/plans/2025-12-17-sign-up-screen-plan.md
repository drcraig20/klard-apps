# Sign Up Screen - Gap Remediation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring Sign Up screen implementations (web + mobile) into full compliance with `docs/screens/individual/screen-02-sign-up.md` spec.

**Architecture:** Fix 29 identified gaps across both platforms. Web uses Next.js 16 + shadcn/ui + Tailwind. Mobile uses Expo 54 + React Native. Shared validation in commons package. TDD approach for all changes.

**Tech Stack:** TypeScript, React 19 (web), React Native 0.81 (mobile), Zod 4, react-hook-form, better-auth, expo-web-browser, expo-haptics

---

## Gap Summary

| Severity | Web | Mobile | Total |
|----------|-----|--------|-------|
| CRITICAL | 3 | 3 | 6 |
| MAJOR | 4 | 6 | 10 |
| MINOR | 2 | 3 | 5 |
| ACCESSIBILITY | 4 | 4 | 8 |
| **TOTAL** | **13** | **16** | **29** |

---

## Epic 1: Password Requirements Checklist (CRITICAL - Both Platforms)

### Task 1.1: Web - Add Password Requirements Checklist Component

**Files:**
- Create: `klard-web/src/components/ui/password-requirements-checklist.tsx`
- Create: `klard-web/src/__tests__/components/ui/password-requirements-checklist.test.tsx`

**Step 1: Write the failing test**

```typescript
// klard-web/src/__tests__/components/ui/password-requirements-checklist.test.tsx
import { render, screen } from '@testing-library/react'
import { PasswordRequirementsChecklist } from '@/components/ui/password-requirements-checklist'

describe('PasswordRequirementsChecklist', () => {
  it('renders all 5 requirements', () => {
    render(<PasswordRequirementsChecklist password="" />)

    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/one uppercase letter/i)).toBeInTheDocument()
    expect(screen.getByText(/one lowercase letter/i)).toBeInTheDocument()
    expect(screen.getByText(/one number/i)).toBeInTheDocument()
    expect(screen.getByText(/one special character/i)).toBeInTheDocument()
  })

  it('shows checkmark for met requirements', () => {
    render(<PasswordRequirementsChecklist password="Test123!" />)

    // All requirements met
    const checkmarks = screen.getAllByText('✓')
    expect(checkmarks).toHaveLength(5)
  })

  it('shows X for unmet requirements', () => {
    render(<PasswordRequirementsChecklist password="test" />)

    // Only lowercase met
    expect(screen.getAllByText('✓')).toHaveLength(1)
    expect(screen.getAllByText('✗')).toHaveLength(4)
  })

  it('has aria-live for accessibility', () => {
    render(<PasswordRequirementsChecklist password="" />)

    const container = screen.getByRole('list')
    expect(container).toHaveAttribute('aria-live', 'polite')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter klard-web test src/__tests__/components/ui/password-requirements-checklist.test.tsx --run`
Expected: FAIL - module not found

**Step 3: Write minimal implementation**

```typescript
// klard-web/src/components/ui/password-requirements-checklist.tsx
'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface PasswordRequirementsChecklistProps {
  password: string
  className?: string
}

const REQUIREMENTS = [
  { id: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (!@#$%^&*)', test: (p: string) => /[!@#$%^&*]/.test(p) },
]

export function PasswordRequirementsChecklist({ password, className }: PasswordRequirementsChecklistProps) {
  const results = useMemo(() =>
    REQUIREMENTS.map(req => ({
      ...req,
      met: req.test(password)
    })), [password])

  return (
    <ul
      role="list"
      aria-live="polite"
      aria-label="Password requirements"
      className={cn('space-y-1 text-sm', className)}
    >
      {results.map(({ id, label, met }) => (
        <li key={id} className="flex items-center gap-2">
          <span className={cn(
            'font-mono',
            met ? 'text-[#059669]' : 'text-[#DC2626]'
          )}>
            {met ? '✓' : '✗'}
          </span>
          <span className={cn(
            met ? 'text-muted-foreground' : 'text-foreground'
          )}>
            {label}
          </span>
        </li>
      ))}
    </ul>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter klard-web test src/__tests__/components/ui/password-requirements-checklist.test.tsx --run`
Expected: PASS

**Step 5: Commit**

```bash
git add klard-web/src/components/ui/password-requirements-checklist.tsx klard-web/src/__tests__/components/ui/password-requirements-checklist.test.tsx
git commit -m "feat(web): add PasswordRequirementsChecklist component with TDD"
```

---

### Task 1.2: Web - Integrate Checklist into Signup Form

**Files:**
- Modify: `klard-web/src/components/auth/signup-form.tsx`
- Modify: `klard-web/src/__tests__/components/auth/signup-form.test.tsx` (if exists)

**Step 1: Write the failing test**

```typescript
// Add to signup form tests
it('displays password requirements checklist below password field', () => {
  render(<SignupForm />)

  const passwordField = screen.getByLabelText(/password/i)
  const checklist = screen.getByRole('list', { name: /password requirements/i })

  expect(checklist).toBeInTheDocument()
  // Verify it's after the password field in DOM
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter klard-web test src/__tests__/components/auth/signup-form.test.tsx --run`
Expected: FAIL - checklist not found

**Step 3: Modify implementation**

In `klard-web/src/components/auth/signup-form.tsx`, after line 149 (PasswordStrengthIndicator), add:

```typescript
import { PasswordRequirementsChecklist } from '@/components/ui/password-requirements-checklist'

// After PasswordStrengthIndicator (around line 149):
<PasswordRequirementsChecklist password={passwordValue} className="mt-2" />
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter klard-web test src/__tests__/components/auth/signup-form.test.tsx --run`
Expected: PASS

**Step 5: Commit**

```bash
git add klard-web/src/components/auth/signup-form.tsx
git commit -m "feat(web): integrate password requirements checklist in signup form"
```

---

### Task 1.3: Mobile - Add Password Requirements Checklist Component

**Files:**
- Create: `klard-mobile/src/components/auth/password-requirements-checklist/PasswordRequirementsChecklist.tsx`
- Create: `klard-mobile/src/components/auth/password-requirements-checklist/password-requirements-checklist.styles.ts`
- Create: `klard-mobile/src/components/auth/password-requirements-checklist/index.ts`
- Create: `klard-mobile/src/__tests__/components/auth/PasswordRequirementsChecklist.test.tsx`

**Step 1: Write the failing test**

```typescript
// klard-mobile/src/__tests__/components/auth/PasswordRequirementsChecklist.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react-native'
import { PasswordRequirementsChecklist } from '@/components/auth/password-requirements-checklist'

describe('PasswordRequirementsChecklist', () => {
  it('renders collapsed state when not focused and empty', () => {
    render(<PasswordRequirementsChecklist password="" isFocused={false} />)

    expect(screen.getByText(/8\+ chars, number, special/i)).toBeInTheDocument()
  })

  it('renders expanded checklist when focused', () => {
    render(<PasswordRequirementsChecklist password="" isFocused={true} />)

    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/one uppercase letter/i)).toBeInTheDocument()
    expect(screen.getByText(/one lowercase letter/i)).toBeInTheDocument()
    expect(screen.getByText(/one number/i)).toBeInTheDocument()
    expect(screen.getByText(/one special character/i)).toBeInTheDocument()
  })

  it('shows checkmarks for met requirements', () => {
    render(<PasswordRequirementsChecklist password="Test123!" isFocused={true} />)

    const checkmarks = screen.getAllByText('✓')
    expect(checkmarks).toHaveLength(5)
  })

  it('has accessibility live region', () => {
    render(<PasswordRequirementsChecklist password="" isFocused={true} />)

    const container = screen.getByAccessibilityLiveRegion('polite')
    expect(container).toBeTruthy()
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter klard-mobile test src/__tests__/components/auth/PasswordRequirementsChecklist.test.tsx`
Expected: FAIL - module not found

**Step 3: Write minimal implementation**

```typescript
// klard-mobile/src/components/auth/password-requirements-checklist/PasswordRequirementsChecklist.tsx
import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import { useThemeColors } from '@/hooks/useThemeColors'
import { styles } from './password-requirements-checklist.styles'

interface PasswordRequirementsChecklistProps {
  password: string
  isFocused: boolean
}

const REQUIREMENTS = [
  { id: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { id: 'uppercase', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { id: 'special', label: 'One special character (!@#$%^&*)', test: (p: string) => /[!@#$%^&*]/.test(p) },
]

export function PasswordRequirementsChecklist({ password, isFocused }: PasswordRequirementsChecklistProps) {
  const colors = useThemeColors()

  const results = useMemo(() =>
    REQUIREMENTS.map(req => ({
      ...req,
      met: req.test(password)
    })), [password])

  const showExpanded = isFocused || password.length > 0

  if (!showExpanded) {
    return (
      <View style={styles.collapsedContainer}>
        <Text style={[styles.collapsedText, { color: colors.textSecondary }]}>
          8+ chars, number, special
        </Text>
      </View>
    )
  }

  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityRole="list"
      style={styles.expandedContainer}
    >
      {results.map(({ id, label, met }) => (
        <View key={id} style={styles.requirementRow}>
          <Text style={[
            styles.indicator,
            { color: met ? '#059669' : '#DC2626' }
          ]}>
            {met ? '✓' : '✗'}
          </Text>
          <Text style={[
            styles.label,
            { color: met ? colors.textSecondary : colors.textPrimary }
          ]}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  )
}
```

```typescript
// klard-mobile/src/components/auth/password-requirements-checklist/password-requirements-checklist.styles.ts
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  collapsedContainer: {
    marginTop: 4,
  },
  collapsedText: {
    fontSize: 12,
  },
  expandedContainer: {
    marginTop: 8,
    gap: 4,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  indicator: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  label: {
    fontSize: 12,
  },
})
```

```typescript
// klard-mobile/src/components/auth/password-requirements-checklist/index.ts
export { PasswordRequirementsChecklist } from './PasswordRequirementsChecklist'
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter klard-mobile test src/__tests__/components/auth/PasswordRequirementsChecklist.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add klard-mobile/src/components/auth/password-requirements-checklist/
git add klard-mobile/src/__tests__/components/auth/PasswordRequirementsChecklist.test.tsx
git commit -m "feat(mobile): add PasswordRequirementsChecklist with collapsed/expanded states"
```

---

### Task 1.4: Mobile - Integrate Checklist with Focus Tracking

**Files:**
- Modify: `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`

**Step 1: Write the failing test**

```typescript
// Add to SignupForm tests
it('expands password requirements when password field is focused', async () => {
  render(<SignupForm />)

  const passwordField = screen.getByLabelText(/^password$/i)

  // Initially collapsed
  expect(screen.getByText(/8\+ chars, number, special/i)).toBeInTheDocument()

  // Focus field
  fireEvent(passwordField, 'focus')

  // Now expanded
  expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument()
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter klard-mobile test src/__tests__/components/auth/SignupForm.test.tsx`
Expected: FAIL

**Step 3: Modify implementation**

In `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`:

```typescript
// Add state
const [passwordFocused, setPasswordFocused] = useState(false)

// Modify password Controller to track focus
<Controller
  control={control}
  name="password"
  render={({ field: { onChange, onBlur, value } }) => (
    <InputField
      // ... existing props
      onFocus={() => setPasswordFocused(true)}
      onBlur={(e) => {
        setPasswordFocused(false)
        onBlur()
      }}
      // ...
    />
  )}
/>

// Replace PasswordStrengthIndicator section with:
<PasswordStrengthIndicator password={passwordValue} />
<PasswordRequirementsChecklist
  password={passwordValue}
  isFocused={passwordFocused}
/>
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter klard-mobile test src/__tests__/components/auth/SignupForm.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add klard-mobile/src/components/auth/signup-form/SignupForm.tsx
git commit -m "feat(mobile): integrate password requirements with focus tracking"
```

---

## Epic 2: Password Strength Indicator - 3-Segment Design (CRITICAL)

### Task 2.1: Web - Redesign to 3 Discrete Segments

**Files:**
- Modify: `klard-web/src/components/ui/password-strength-indicator.tsx`
- Create: `klard-web/src/__tests__/components/ui/password-strength-indicator.test.tsx`

**Step 1: Write the failing test**

```typescript
// klard-web/src/__tests__/components/ui/password-strength-indicator.test.tsx
import { render, screen } from '@testing-library/react'
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator'

describe('PasswordStrengthIndicator', () => {
  it('shows 1 red segment when <3 requirements met', () => {
    render(<PasswordStrengthIndicator password="ab" />) // only lowercase

    const segments = screen.getAllByTestId('strength-segment')
    expect(segments[0]).toHaveClass('bg-[#DC2626]')
    expect(segments[1]).toHaveClass('bg-muted')
    expect(segments[2]).toHaveClass('bg-muted')
  })

  it('shows 2 amber segments when 3-4 requirements met', () => {
    render(<PasswordStrengthIndicator password="Test123" />) // length, upper, lower, number

    const segments = screen.getAllByTestId('strength-segment')
    expect(segments[0]).toHaveClass('bg-[#D97706]')
    expect(segments[1]).toHaveClass('bg-[#D97706]')
    expect(segments[2]).toHaveClass('bg-muted')
  })

  it('shows 3 green segments when all 5 requirements met', () => {
    render(<PasswordStrengthIndicator password="Test123!" />)

    const segments = screen.getAllByTestId('strength-segment')
    expect(segments[0]).toHaveClass('bg-[#059669]')
    expect(segments[1]).toHaveClass('bg-[#059669]')
    expect(segments[2]).toHaveClass('bg-[#059669]')
  })

  it('has aria-live for accessibility', () => {
    render(<PasswordStrengthIndicator password="" />)

    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter klard-web test src/__tests__/components/ui/password-strength-indicator.test.tsx --run`
Expected: FAIL - current implementation uses continuous bar

**Step 3: Write implementation**

```typescript
// klard-web/src/components/ui/password-strength-indicator.tsx
'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface PasswordStrengthIndicatorProps {
  password: string
  className?: string
}

function countRequirementsMet(password: string): number {
  let count = 0
  if (password.length >= 8) count++
  if (/[A-Z]/.test(password)) count++
  if (/[a-z]/.test(password)) count++
  if (/[0-9]/.test(password)) count++
  if (/[!@#$%^&*]/.test(password)) count++
  return count
}

function getStrengthLevel(requirementsMet: number): 'weak' | 'medium' | 'strong' {
  if (requirementsMet < 3) return 'weak'
  if (requirementsMet < 5) return 'medium'
  return 'strong'
}

const LEVEL_CONFIG = {
  weak: { segments: 1, color: 'bg-[#DC2626]', label: 'Weak' },
  medium: { segments: 2, color: 'bg-[#D97706]', label: 'Medium' },
  strong: { segments: 3, color: 'bg-[#059669]', label: 'Strong' },
}

export function PasswordStrengthIndicator({ password, className }: PasswordStrengthIndicatorProps) {
  const { level, config } = useMemo(() => {
    const requirementsMet = countRequirementsMet(password)
    const level = getStrengthLevel(requirementsMet)
    return { level, config: LEVEL_CONFIG[level] }
  }, [password])

  if (!password) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Password strength: ${config.label}`}
      className={cn('space-y-1', className)}
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            data-testid="strength-segment"
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              index < config.segments ? config.color : 'bg-muted'
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{config.label}</p>
    </div>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `pnpm --filter klard-web test src/__tests__/components/ui/password-strength-indicator.test.tsx --run`
Expected: PASS

**Step 5: Commit**

```bash
git add klard-web/src/components/ui/password-strength-indicator.tsx
git add klard-web/src/__tests__/components/ui/password-strength-indicator.test.tsx
git commit -m "feat(web): redesign password strength to 3-segment display per spec"
```

---

### Task 2.2: Mobile - Redesign to 3 Discrete Segments

**Files:**
- Modify: `klard-mobile/src/components/auth/password-strength-indicator/PasswordStrengthIndicator.tsx`
- Modify: `klard-mobile/src/__tests__/components/auth/PasswordStrengthIndicator.test.tsx`

**Step 1: Write the failing test**

```typescript
// Similar structure to web test, adapted for React Native
describe('PasswordStrengthIndicator', () => {
  it('shows 1 red segment when <3 requirements met', () => {
    render(<PasswordStrengthIndicator password="ab" />)

    const segments = screen.getAllByTestId('strength-segment')
    // First segment filled, others empty
    expect(segments[0].props.style).toContainEqual({ backgroundColor: '#DC2626' })
  })
  // ... similar tests for medium and strong
})
```

**Step 2-5:** Similar process to web implementation, adapted for React Native styling.

---

## Epic 3: Email Availability Check (CRITICAL)

### Task 3.1: Web - Add Async Email Check on Blur

**Files:**
- Create: `klard-web/src/hooks/useEmailAvailability.ts`
- Create: `klard-web/src/__tests__/hooks/useEmailAvailability.test.ts`
- Modify: `klard-web/src/components/auth/signup-form.tsx`

[Detailed TDD steps follow same pattern...]

### Task 3.2: Mobile - Add Debounced Email Check

**Files:**
- Create: `klard-mobile/src/hooks/useEmailAvailability.ts`
- Create: `klard-mobile/src/hooks/useDebounce.ts`
- Modify: `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`

[Detailed TDD steps follow same pattern...]

---

## Epic 4: Terms & Privacy (MAJOR)

### Task 4.1: Web - Add Modal Overlays for Terms/Privacy

**Files:**
- Create: `klard-web/src/components/ui/terms-modal.tsx`
- Create: `klard-web/src/components/ui/privacy-modal.tsx`
- Modify: `klard-web/src/components/ui/terms-checkbox.tsx`

[Detailed TDD steps...]

### Task 4.2: Mobile - Integrate expo-web-browser for Terms Links

**Files:**
- Modify: `klard-mobile/src/components/auth/terms-checkbox/TermsCheckbox.tsx`

[Detailed TDD steps...]

---

## Epic 5: Mobile-Specific Features (MAJOR)

### Task 5.1: Add Back Button to Signup Screen

**Files:**
- Modify: `klard-mobile/src/app/(auth)/signup.tsx`

### Task 5.2: Add Keyboard Navigation (Next/Done)

**Files:**
- Modify: `klard-mobile/src/components/ui/InputField/InputField.tsx`
- Modify: `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`

### Task 5.3: Add Success Animation Sequence

**Files:**
- Create: `klard-mobile/src/components/auth/success-animation/SuccessAnimation.tsx`
- Modify: `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`

### Task 5.4: iOS - Add Password AutoFill Support

**Files:**
- Modify: `klard-mobile/src/components/ui/InputField/InputField.tsx`
- Modify: `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`

### Task 5.5: iOS - Add Haptic on Requirements Met

**Files:**
- Modify: `klard-mobile/src/components/auth/password-requirements-checklist/PasswordRequirementsChecklist.tsx`

### Task 5.6: Android - Add Credential Manager Integration

**Files:**
- Create: `klard-mobile/src/lib/credential-manager.ts`
- Modify: `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`

### Task 5.7: Android - Add Biometric Prompt After Registration

**Files:**
- Create: `klard-mobile/src/components/auth/biometric-enrollment-modal/BiometricEnrollmentModal.tsx`
- Modify: `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`

---

## Epic 6: Web-Specific Features (MAJOR)

### Task 6.1: Add Email Exists Error with Sign-In Link

**Files:**
- Modify: `klard-web/src/components/auth/signup-form.tsx`

### Task 6.2: Add Terms Checkbox Error Ring

**Files:**
- Modify: `klard-web/src/components/ui/checkbox-field.tsx`

### Task 6.3: Add Privacy Messaging to Left Panel

**Files:**
- Modify: `klard-web/src/components/auth/auth-illustration.tsx`

### Task 6.4: Fix Button Disabled Logic

**Files:**
- Modify: `klard-web/src/components/auth/signup-form.tsx`

---

## Epic 7: Accessibility (Both Platforms)

### Task 7.1: Web - Add aria-live to Strength Indicator

Already completed in Task 2.1

### Task 7.2: Web - Add aria-pressed to Password Toggle

**Files:**
- Modify: `klard-web/src/components/ui/input-field.tsx`

### Task 7.3: Web - Add aria-label to Terms Checkbox

**Files:**
- Modify: `klard-web/src/components/ui/terms-checkbox.tsx`

### Task 7.4: Mobile - Add accessibilityLiveRegion to Strength

Already completed in Task 2.2

### Task 7.5: Mobile - Add Accessibility to Requirements List

Already completed in Task 1.3

---

## Implementation Order

1. **Epic 1: Password Requirements Checklist** - Foundation for both platforms
2. **Epic 2: Password Strength 3-Segment** - Visual compliance
3. **Epic 3: Email Availability** - Critical UX feature
4. **Epic 4: Terms & Privacy** - Legal compliance
5. **Epic 5: Mobile-Specific** - Platform features
6. **Epic 6: Web-Specific** - Platform features
7. **Epic 7: Accessibility** - A11y compliance

---

## Verification Checklist

After implementation, verify each spec requirement:

- [ ] Web: Split-screen layout with branding/form
- [ ] Web: Password requirements checklist with real-time updates
- [ ] Web: 3-segment strength indicator with correct colors
- [ ] Web: Email async check with "Sign in instead?" link
- [ ] Web: Terms/Privacy modal overlays
- [ ] Web: All accessibility attributes
- [ ] Mobile: Back button in top-left
- [ ] Mobile: Collapsible password requirements
- [ ] Mobile: 3-segment strength indicator
- [ ] Mobile: Keyboard Next/Done navigation
- [ ] Mobile: Success animation (300ms checkmark + haptic)
- [ ] Mobile: In-app browser for terms
- [ ] Mobile: iOS AutoFill support
- [ ] Mobile: iOS haptic on requirements met
- [ ] Mobile: Android Credential Manager
- [ ] Mobile: Android biometric prompt
