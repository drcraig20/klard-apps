# Signup Screen Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement signup screens for web (Next.js) and mobile (Expo) with password strength indicator, terms checkbox, and social signup.

**Architecture:** Mirror existing login implementation. Shared validation and password strength logic in commons. Zustand for state management on both platforms. TDD approach with failing tests first.

**Tech Stack:** Next.js 16, Expo 54, React Hook Form, Zod, Zustand, better-auth, Tailwind CSS (web), React Native (mobile)

---

## Prerequisites

- [ ] Read existing login implementation files before starting
- [ ] Ensure `pnpm install` has been run in all packages
- [ ] Verify better-auth backend is accessible

## Decisions Made

| Decision | Choice |
|----------|--------|
| Password strength | Weighted scoring (length, number, special, uppercase, lowercase) |
| Terms/Privacy links | Placeholder `#` links |
| Email exists error | Simple error message |
| Post-signup redirect | `/onboarding` |
| Social signup redirect | Conditional on `hasOnboarded` flag |
| Full name | Single field |
| Password checklist | Progressive (show after typing) |
| Mobile state management | Zustand (migrate from hooks) |

---

## Task 1: Password Strength Utility (Commons)

**Files:**
- Create: `commons/src/utils/password-strength.ts`
- Create: `commons/src/utils/index.ts`
- Modify: `commons/src/index.ts`

### Step 1.1: Write the failing test

Create `commons/src/utils/__tests__/password-strength.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { calculatePasswordStrength } from '../password-strength';

describe('calculatePasswordStrength', () => {
  it('returns weak for empty password', () => {
    const result = calculatePasswordStrength('');
    expect(result.level).toBe('weak');
    expect(result.score).toBe(0);
  });

  it('returns weak for short password', () => {
    const result = calculatePasswordStrength('abc');
    expect(result.level).toBe('weak');
    expect(result.score).toBeLessThan(30);
  });

  it('returns fair for password with length only', () => {
    const result = calculatePasswordStrength('abcdefghij');
    expect(result.level).toBe('fair');
    expect(result.score).toBeGreaterThanOrEqual(30);
    expect(result.score).toBeLessThan(60);
  });

  it('returns good for password with length + number + uppercase', () => {
    const result = calculatePasswordStrength('Abcdefgh1');
    expect(result.level).toBe('good');
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.score).toBeLessThan(80);
  });

  it('returns strong for password meeting all criteria', () => {
    const result = calculatePasswordStrength('Abcdefgh1!');
    expect(result.level).toBe('strong');
    expect(result.score).toBeGreaterThanOrEqual(80);
  });

  it('provides feedback for missing criteria', () => {
    const result = calculatePasswordStrength('abcdefgh');
    expect(result.feedback).toContain('Add a number');
    expect(result.feedback).toContain('Add an uppercase letter');
    expect(result.feedback).toContain('Add a special character');
  });
});
```

### Step 1.2: Run test to verify it fails

```bash
cd commons && pnpm test src/utils/__tests__/password-strength.test.ts
```

Expected: FAIL - module not found

### Step 1.3: Write minimal implementation

Create `commons/src/utils/password-strength.ts`:

```typescript
export interface PasswordStrength {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong';
  feedback: string[];
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const feedback: string[] = [];

  if (!password) {
    return { score: 0, level: 'weak', feedback: ['Enter a password'] };
  }

  // Length: max 25 points
  if (password.length >= 8) {
    score += 15;
    if (password.length >= 12) {
      score += 10;
    }
  } else {
    feedback.push('Use at least 8 characters');
  }

  // Lowercase: 15 points
  if (/[a-z]/.test(password)) {
    score += 15;
  } else {
    feedback.push('Add a lowercase letter');
  }

  // Uppercase: 20 points
  if (/[A-Z]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Add an uppercase letter');
  }

  // Numbers: 20 points
  if (/[0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Add a number');
  }

  // Special characters: 20 points
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Add a special character');
  }

  // Determine level
  let level: PasswordStrength['level'];
  if (score < 30) {
    level = 'weak';
  } else if (score < 60) {
    level = 'fair';
  } else if (score < 80) {
    level = 'good';
  } else {
    level = 'strong';
  }

  return { score, level, feedback };
}
```

### Step 1.4: Create barrel export

Create `commons/src/utils/index.ts`:

```typescript
export { calculatePasswordStrength, type PasswordStrength } from './password-strength';
```

### Step 1.5: Export from main index

Modify `commons/src/index.ts` - add after existing exports:

```typescript
export * from './utils';
```

### Step 1.6: Run test to verify it passes

```bash
cd commons && pnpm test src/utils/__tests__/password-strength.test.ts
```

Expected: PASS

### Step 1.7: Build commons

```bash
cd commons && pnpm build
```

### Step 1.8: Commit

```bash
git add commons/src/utils
git commit -m "feat(commons): add password strength calculator"
```

---

## Task 2: Signup Validation Schema (Commons)

**Files:**
- Modify: `commons/src/validation/auth.ts`

### Step 2.1: Write the failing test

Add to `commons/src/validation/__tests__/auth.test.ts` (create if needed):

```typescript
import { describe, it, expect } from 'vitest';
import { SignupSchema } from '../auth';

describe('SignupSchema', () => {
  it('validates correct signup data', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = SignupSchema.safeParse({
      name: '',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'invalid-email',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects short password', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'short',
      confirmPassword: 'short',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
  });

  it('rejects mismatched passwords', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Different123!',
      agreeToTerms: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('confirmPassword');
    }
  });

  it('rejects when terms not agreed', () => {
    const result = SignupSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      agreeToTerms: false,
    });
    expect(result.success).toBe(false);
  });
});
```

### Step 2.2: Run test to verify it fails

```bash
cd commons && pnpm test src/validation/__tests__/auth.test.ts
```

Expected: FAIL - SignupSchema not exported

### Step 2.3: Write minimal implementation

Add to `commons/src/validation/auth.ts` after existing schemas:

```typescript
export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type SignupInput = z.infer<typeof SignupSchema>;

export function validateSignup(data: unknown) {
  return SignupSchema.safeParse(data);
}
```

### Step 2.4: Run test to verify it passes

```bash
cd commons && pnpm test src/validation/__tests__/auth.test.ts
```

Expected: PASS

### Step 2.5: Build commons

```bash
cd commons && pnpm build
```

### Step 2.6: Commit

```bash
git add commons/src/validation/auth.ts commons/src/validation/__tests__
git commit -m "feat(commons): add signup validation schema"
```

---

## Task 3: Signup Translations (Commons)

**Files:**
- Modify: `commons/src/locales/en.ts`

### Step 3.1: Add signup translations

Add to `commons/src/locales/en.ts` inside the `auth` object after `errors`:

```typescript
signup: {
  title: "Create account",
  subtitle: "Start tracking your subscriptions",
  nameLabel: "Full name",
  namePlaceholder: "John Doe",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  passwordLabel: "Password",
  passwordPlaceholder: "Create a password",
  confirmPasswordLabel: "Confirm password",
  confirmPasswordPlaceholder: "Re-enter your password",
  termsLabel: "I agree to the Terms of Service and Privacy Policy",
  termsLink: "Terms of Service",
  privacyLink: "Privacy Policy",
  submitButton: "Create Account",
  submitting: "Creating account...",
  orContinueWith: "or continue with",
  haveAccount: "Already have an account?",
  signIn: "Sign in",
  trustElement: "Privacy-first. No bank access required.",
  passwordStrength: {
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
  },
},
```

Also add to `errors` object:

```typescript
signupFailed: "Failed to create account",
accountExists: "An account with this email already exists",
```

### Step 3.2: Build commons

```bash
cd commons && pnpm build
```

### Step 3.3: Commit

```bash
git add commons/src/locales/en.ts
git commit -m "feat(commons): add signup translations"
```

---

## Task 4: Mobile Zustand Store

**Files:**
- Create: `klard-mobile/src/stores/auth-ui-store.ts`
- Create: `klard-mobile/src/stores/index.ts`

### Step 4.1: Create mobile auth store (copy from web)

Create `klard-mobile/src/stores/auth-ui-store.ts`:

```typescript
import { create } from 'zustand';

type FormState = 'idle' | 'submitting' | 'magicLinkSent' | 'error';

interface AuthUIState {
  formState: FormState;
  errorMessage: string | null;
  magicLinkEmail: string | null;
}

interface AuthUIActions {
  setSubmitting: () => void;
  setMagicLinkSent: (email: string) => void;
  setError: (message: string) => void;
  clearError: () => void;
  reset: () => void;
}

export const useAuthUIStore = create<AuthUIState & AuthUIActions>((set) => ({
  formState: 'idle',
  errorMessage: null,
  magicLinkEmail: null,

  setSubmitting: () =>
    set({
      formState: 'submitting',
      errorMessage: null,
    }),

  setMagicLinkSent: (email: string) =>
    set({
      formState: 'magicLinkSent',
      magicLinkEmail: email,
      errorMessage: null,
    }),

  setError: (message: string) =>
    set({
      formState: 'error',
      errorMessage: message,
    }),

  clearError: () =>
    set({
      errorMessage: null,
      formState: 'idle',
    }),

  reset: () =>
    set({
      formState: 'idle',
      errorMessage: null,
      magicLinkEmail: null,
    }),
}));
```

### Step 4.2: Create barrel export

Create `klard-mobile/src/stores/index.ts`:

```typescript
export { useAuthUIStore } from './auth-ui-store';
```

### Step 4.3: Commit

```bash
git add klard-mobile/src/stores
git commit -m "feat(mobile): add Zustand auth UI store"
```

---

## Task 5: Refactor Mobile Login to Use Zustand

**Files:**
- Modify: `klard-mobile/src/components/auth/login-form/LoginForm.tsx`
- Delete: `klard-mobile/src/hooks/useLoginForm.ts`
- Modify: `klard-mobile/src/hooks/index.ts`

### Step 5.1: Update LoginForm imports

In `klard-mobile/src/components/auth/login-form/LoginForm.tsx`, replace:

```typescript
// Before
import { useThemeColors, useLoginForm } from '@/hooks';

// After
import { useThemeColors } from '@/hooks';
import { useAuthUIStore } from '@/stores';
```

### Step 5.2: Replace hook usage with store

Replace the hook destructuring:

```typescript
// Before
const {
  formState,
  errorMessage,
  magicLinkEmail,
  isSubmitting,
  control,
  errors,
  handlePasswordLogin,
  handleMagicLink,
  handleSocialError,
  resetToIdle,
  clearError,
} = useLoginForm();

// After
const {
  formState,
  errorMessage,
  magicLinkEmail,
  setSubmitting,
  setMagicLinkSent,
  setError,
  clearError,
  reset,
} = useAuthUIStore();

const {
  control,
  handleSubmit,
  formState: { errors },
  getValues,
} = useForm<LoginInput>({
  resolver: zodResolver(LoginSchema),
  defaultValues: {
    email: '',
    password: '',
    rememberMe: false,
  },
});

const isSubmitting = formState === 'submitting';
```

### Step 5.3: Add form handlers

Add these handlers inside the component:

```typescript
const router = useRouter();

async function onSubmit(data: LoginInput) {
  try {
    setSubmitting();

    const result = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      throw new Error(result.error.message || 'Invalid email or password');
    }

    router.replace('/(tabs)/dashboard');
  } catch (error) {
    setError(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}

async function handleMagicLink() {
  const email = getValues('email');
  const validation = MagicLinkSchema.safeParse({ email });

  if (!validation.success) {
    setError('Please enter a valid email to receive a magic link');
    return;
  }

  try {
    setSubmitting();

    const callbackURL = Linking.createURL('(tabs)/dashboard');

    const result = await signIn.magicLink({
      email: validation.data.email,
      callbackURL,
    });

    if (result.error) {
      throw new Error(result.error.message || 'Failed to send magic link');
    }

    setMagicLinkSent(validation.data.email);
  } catch (error) {
    setError(
      error instanceof Error ? error.message : 'Failed to send magic link'
    );
  }
}

function handleSocialError(error: string) {
  setError(error);
}
```

### Step 5.4: Update handlers in JSX

```typescript
// Replace handlePasswordLogin with handleSubmit(onSubmit)
onPress={handleSubmit(onSubmit)}

// Replace resetToIdle with reset
onBack={reset}
```

### Step 5.5: Add missing imports

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { LoginSchema, MagicLinkSchema, type LoginInput } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
```

### Step 5.6: Delete old hook

```bash
rm klard-mobile/src/hooks/useLoginForm.ts
```

### Step 5.7: Update hooks index

In `klard-mobile/src/hooks/index.ts`, remove:

```typescript
// Remove this line
export { useLoginForm } from './useLoginForm';
```

### Step 5.8: Test login still works

```bash
cd klard-mobile && pnpm start
```

Manually test login flow works.

### Step 5.9: Commit

```bash
git add klard-mobile/src/components/auth/login-form klard-mobile/src/hooks
git commit -m "refactor(mobile): migrate login to Zustand store"
```

---

## Task 6: Web Password Strength Indicator

**Files:**
- Create: `klard-web/src/components/ui/password-strength-indicator.tsx`

### Step 6.1: Create component

Create `klard-web/src/components/ui/password-strength-indicator.tsx`:

```typescript
'use client';

import { useTranslation } from 'react-i18next';
import { calculatePasswordStrength, type PasswordStrength } from '@klard-apps/commons';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const LEVEL_COLORS: Record<PasswordStrength['level'], string> = {
  weak: 'bg-[var(--accent-error)]',
  fair: 'bg-[var(--accent-warning)]',
  good: 'bg-[var(--accent-success)]',
  strong: 'bg-[var(--primary)]',
};

const LEVEL_WIDTHS: Record<PasswordStrength['level'], string> = {
  weak: 'w-1/4',
  fair: 'w-1/2',
  good: 'w-3/4',
  strong: 'w-full',
};

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { t } = useTranslation();
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="h-1.5 w-full bg-[var(--muted)] rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${LEVEL_COLORS[strength.level]} ${LEVEL_WIDTHS[strength.level]}`}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-[var(--muted-foreground)]">
          {t(`auth.signup.passwordStrength.${strength.level}`)}
        </span>
        {strength.feedback.length > 0 && (
          <span className="text-xs text-[var(--muted-foreground)]">
            {strength.feedback[0]}
          </span>
        )}
      </div>
    </div>
  );
}
```

### Step 6.2: Commit

```bash
git add klard-web/src/components/ui/password-strength-indicator.tsx
git commit -m "feat(web): add password strength indicator component"
```

---

## Task 7: Web Terms Checkbox

**Files:**
- Create: `klard-web/src/components/ui/terms-checkbox.tsx`

### Step 7.1: Create component

Create `klard-web/src/components/ui/terms-checkbox.tsx`:

```typescript
'use client';

import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TermsCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TermsCheckbox = forwardRef<HTMLInputElement, TermsCheckboxProps>(
  function TermsCheckbox({ error, className = '', ...props }, ref) {
    const { t } = useTranslation();

    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className={`
              mt-0.5 w-4 h-4 rounded
              border-[var(--border)] text-[var(--primary)]
              focus:ring-[var(--ring)] focus:ring-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-[var(--accent-error)]' : ''}
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? 'terms-error' : undefined}
            {...props}
          />
          <span className="text-sm text-[var(--muted-foreground)]">
            {t('auth.signup.termsLabel').split('Terms of Service').map((part, i) => (
              i === 0 ? (
                <span key={i}>
                  {part}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[var(--primary)] hover:underline"
                  >
                    {t('auth.signup.termsLink')}
                  </a>
                </span>
              ) : (
                <span key={i}>
                  {part.split('Privacy Policy').map((subPart, j) => (
                    j === 0 ? (
                      <span key={j}>
                        {subPart}
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="text-[var(--primary)] hover:underline"
                        >
                          {t('auth.signup.privacyLink')}
                        </a>
                      </span>
                    ) : subPart
                  ))}
                </span>
              )
            ))}
          </span>
        </label>
        {error && (
          <p
            id="terms-error"
            className="mt-2 text-sm text-[var(--error-foreground)]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
```

### Step 7.2: Commit

```bash
git add klard-web/src/components/ui/terms-checkbox.tsx
git commit -m "feat(web): add terms checkbox component"
```

---

## Task 8: Web Signup Form

**Files:**
- Create: `klard-web/src/components/auth/signup-form.tsx`

### Step 8.1: Create SignupForm component

Create `klard-web/src/components/auth/signup-form.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User } from 'lucide-react';
import { SignupSchema, type SignupInput } from '@klard-apps/commons';
import { signUp } from '@/lib/auth-client';
import { InputField } from '@/components/ui/input-field';
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator';
import { TermsCheckbox } from '@/components/ui/terms-checkbox';
import { SocialButtons } from './social-buttons';
import { KlardLogo } from '@/components/ui/klard-icon';
import { ErrorBanner } from '@/components/ui/error-banner';
import { SubmitButton } from '@/components/ui/submit-button';
import { useAuthUIStore } from '@/stores/auth-ui-store';
import Link from 'next/link';

export function SignupForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [passwordValue, setPasswordValue] = useState('');
  const {
    formState: uiState,
    errorMessage,
    setSubmitting,
    setError,
    clearError,
    reset,
  } = useAuthUIStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  async function onSubmit(data: SignupInput) {
    try {
      setSubmitting();

      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || t('auth.errors.signupFailed'));
      }

      router.push('/onboarding');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('auth.errors.unexpectedError')
      );
    }
  }

  function handleSocialError(error: string) {
    setError(error);
  }

  const isSubmitting = uiState === 'submitting';

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Logo (mobile only) */}
      <div className="flex justify-center mb-8 md:hidden">
        <KlardLogo />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-semibold text-foreground mb-2">
          {t('auth.signup.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('auth.signup.subtitle')}
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <ErrorBanner message={errorMessage} onDismiss={clearError} />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          id="name"
          label={t('auth.signup.nameLabel')}
          type="text"
          placeholder={t('auth.signup.namePlaceholder')}
          icon={<User size={20} />}
          error={errors.name?.message}
          disabled={isSubmitting}
          autoComplete="name"
          {...register('name')}
        />

        <InputField
          id="email"
          label={t('auth.signup.emailLabel')}
          type="email"
          placeholder={t('auth.signup.emailPlaceholder')}
          icon={<Mail size={20} />}
          error={errors.email?.message}
          disabled={isSubmitting}
          autoComplete="email"
          {...register('email')}
        />

        <div>
          <InputField
            id="password"
            label={t('auth.signup.passwordLabel')}
            type="password"
            placeholder={t('auth.signup.passwordPlaceholder')}
            icon={<Lock size={20} />}
            error={errors.password?.message}
            disabled={isSubmitting}
            autoComplete="new-password"
            {...register('password', {
              onChange: (e) => setPasswordValue(e.target.value),
            })}
          />
          <PasswordStrengthIndicator password={passwordValue} />
        </div>

        <InputField
          id="confirmPassword"
          label={t('auth.signup.confirmPasswordLabel')}
          type="password"
          placeholder={t('auth.signup.confirmPasswordPlaceholder')}
          icon={<Lock size={20} />}
          error={errors.confirmPassword?.message}
          disabled={isSubmitting}
          autoComplete="new-password"
          {...register('confirmPassword')}
        />

        <TermsCheckbox
          error={errors.agreeToTerms?.message}
          disabled={isSubmitting}
          {...register('agreeToTerms')}
        />

        {/* Submit button */}
        <SubmitButton isSubmitting={isSubmitting} loadingText={t('auth.signup.submitting')}>
          {t('auth.signup.submitButton')}
        </SubmitButton>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">
            {t('auth.signup.orContinueWith')}
          </span>
        </div>
      </div>

      {/* Social buttons */}
      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      {/* Login link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t('auth.signup.haveAccount')}{' '}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          {t('auth.signup.signIn')}
        </Link>
      </p>

      {/* Trust element */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock size={14} />
        <span>{t('auth.signup.trustElement')}</span>
      </div>
    </div>
  );
}
```

### Step 8.2: Commit

```bash
git add klard-web/src/components/auth/signup-form.tsx
git commit -m "feat(web): add signup form component"
```

---

## Task 9: Web Signup Page Route

**Files:**
- Create: `klard-web/src/app/(auth)/signup/page.tsx`

### Step 9.1: Create page

Create `klard-web/src/app/(auth)/signup/page.tsx`:

```typescript
import { Metadata } from 'next';
import { SignupForm } from '@/components/auth/signup-form';

export const metadata: Metadata = {
  title: 'Sign Up | Klard',
  description: 'Create your Klard account to start tracking subscriptions',
};

export default function SignupPage() {
  return <SignupForm />;
}
```

### Step 9.2: Test web signup

```bash
cd klard-web && pnpm dev
```

Navigate to `http://localhost:3000/signup` and verify:
- Form renders correctly
- Password strength indicator works
- Validation shows errors
- Social buttons appear

### Step 9.3: Commit

```bash
git add klard-web/src/app/\(auth\)/signup
git commit -m "feat(web): add signup page route"
```

---

## Task 10: Mobile Password Strength Indicator

**Files:**
- Create: `klard-mobile/src/components/auth/password-strength-indicator/PasswordStrengthIndicator.tsx`
- Create: `klard-mobile/src/components/auth/password-strength-indicator/password-strength-indicator.styles.ts`
- Create: `klard-mobile/src/components/auth/password-strength-indicator/index.ts`

### Step 10.1: Create styles

Create `klard-mobile/src/components/auth/password-strength-indicator/password-strength-indicator.styles.ts`:

```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 4,
  },
  progressBarContainer: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
  feedback: {
    fontSize: 12,
  },
});
```

### Step 10.2: Create component

Create `klard-mobile/src/components/auth/password-strength-indicator/PasswordStrengthIndicator.tsx`:

```typescript
import { View, Text } from 'react-native';
import { calculatePasswordStrength, type PasswordStrength } from '@klard-apps/commons';
import { useThemeColors } from '@/hooks';
import { t } from '@/lib/i18n';
import { styles } from './password-strength-indicator.styles';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const LEVEL_WIDTHS: Record<PasswordStrength['level'], string> = {
  weak: '25%',
  fair: '50%',
  good: '75%',
  strong: '100%',
};

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const colors = useThemeColors();
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  const levelColors: Record<PasswordStrength['level'], string> = {
    weak: colors.accentError,
    fair: colors.accentWarning,
    good: colors.accentSuccess,
    strong: colors.primary,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.progressBarContainer, { backgroundColor: colors.muted }]}>
        <View
          style={[
            styles.progressBar,
            {
              width: LEVEL_WIDTHS[strength.level],
              backgroundColor: levelColors[strength.level],
            },
          ]}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {t(`auth.signup.passwordStrength.${strength.level}`)}
        </Text>
        {strength.feedback.length > 0 && (
          <Text style={[styles.feedback, { color: colors.textTertiary }]}>
            {strength.feedback[0]}
          </Text>
        )}
      </View>
    </View>
  );
}
```

### Step 10.3: Create barrel export

Create `klard-mobile/src/components/auth/password-strength-indicator/index.ts`:

```typescript
export { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
```

### Step 10.4: Commit

```bash
git add klard-mobile/src/components/auth/password-strength-indicator
git commit -m "feat(mobile): add password strength indicator component"
```

---

## Task 11: Mobile Terms Checkbox

**Files:**
- Create: `klard-mobile/src/components/auth/terms-checkbox/TermsCheckbox.tsx`
- Create: `klard-mobile/src/components/auth/terms-checkbox/terms-checkbox.styles.ts`
- Create: `klard-mobile/src/components/auth/terms-checkbox/index.ts`

### Step 11.1: Create styles

Create `klard-mobile/src/components/auth/terms-checkbox/terms-checkbox.styles.ts`:

```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    fontWeight: '600',
  },
  error: {
    fontSize: 14,
    marginTop: 8,
  },
});
```

### Step 11.2: Create component

Create `klard-mobile/src/components/auth/terms-checkbox/TermsCheckbox.tsx`:

```typescript
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useThemeColors } from '@/hooks';
import { t } from '@/lib/i18n';
import { styles } from './terms-checkbox.styles';

interface TermsCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  error?: string;
  disabled?: boolean;
}

export function TermsCheckbox({
  value,
  onValueChange,
  error,
  disabled,
}: TermsCheckboxProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => onValueChange(!value)}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: value, disabled }}
        accessibilityLabel={t('auth.signup.termsLabel')}
      >
        <View
          style={[
            styles.checkbox,
            {
              borderColor: error ? colors.accentError : colors.border,
              backgroundColor: value ? colors.primary : 'transparent',
            },
          ]}
        >
          {value && (
            <Text style={[styles.checkmark, { color: colors.primaryForeground }]}>
              ✓
            </Text>
          )}
        </View>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            I agree to the{' '}
            <Text
              style={[styles.link, { color: colors.primary }]}
              onPress={() => {
                // Placeholder - will open actual terms page later
              }}
            >
              {t('auth.signup.termsLink')}
            </Text>
            {' '}and{' '}
            <Text
              style={[styles.link, { color: colors.primary }]}
              onPress={() => {
                // Placeholder - will open actual privacy page later
              }}
            >
              {t('auth.signup.privacyLink')}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
      {error && (
        <Text style={[styles.error, { color: colors.errorForeground }]}>
          {error}
        </Text>
      )}
    </View>
  );
}
```

### Step 11.3: Create barrel export

Create `klard-mobile/src/components/auth/terms-checkbox/index.ts`:

```typescript
export { TermsCheckbox } from './TermsCheckbox';
```

### Step 11.4: Commit

```bash
git add klard-mobile/src/components/auth/terms-checkbox
git commit -m "feat(mobile): add terms checkbox component"
```

---

## Task 12: Mobile Signup Form

**Files:**
- Create: `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`
- Create: `klard-mobile/src/components/auth/signup-form/signup-form.styles.ts`
- Create: `klard-mobile/src/components/auth/signup-form/index.ts`
- Modify: `klard-mobile/src/components/auth/index.ts`

### Step 12.1: Create styles

Create `klard-mobile/src/components/auth/signup-form/signup-form.styles.ts`:

```typescript
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  form: {
    width: '100%',
  },
  fieldSpacer: {
    height: 16,
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  trustContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
});
```

### Step 12.2: Create SignupForm component

Create `klard-mobile/src/components/auth/signup-form/SignupForm.tsx`:

```typescript
import { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { SignupSchema, type SignupInput } from '@klard-apps/commons';
import { signUp } from '@/lib/auth-client';
import { useThemeColors } from '@/hooks';
import { useAuthUIStore } from '@/stores';
import { typography } from '@/styles';
import { t } from '@/lib/i18n';
import { InputField } from '../input-field';
import { PasswordStrengthIndicator } from '../password-strength-indicator';
import { TermsCheckbox } from '../terms-checkbox';
import { SocialButtons } from '../social-buttons';
import { ErrorBanner } from '../error-banner';
import { styles } from './signup-form.styles';

export function SignupForm() {
  const router = useRouter();
  const colors = useThemeColors();
  const [passwordValue, setPasswordValue] = useState('');

  const {
    formState: uiState,
    errorMessage,
    setSubmitting,
    setError,
    clearError,
  } = useAuthUIStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const isSubmitting = uiState === 'submitting';

  async function onSubmit(data: SignupInput) {
    try {
      setSubmitting();

      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || t('auth.errors.signupFailed'));
      }

      router.replace('/(tabs)/onboarding');
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('auth.errors.unexpectedError')
      );
    }
  }

  function handleSocialError(error: string) {
    setError(error);
  }

  return (
    <View style={styles.container}>
      {errorMessage && (
        <ErrorBanner message={errorMessage} onDismiss={clearError} />
      )}

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label={t('auth.signup.nameLabel')}
              placeholder={t('auth.signup.namePlaceholder')}
              autoCapitalize="words"
              autoComplete="name"
              error={errors.name?.message}
              editable={!isSubmitting}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View style={styles.fieldSpacer} />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label={t('auth.signup.emailLabel')}
              placeholder={t('auth.signup.emailPlaceholder')}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email?.message}
              editable={!isSubmitting}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View style={styles.fieldSpacer} />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <InputField
                label={t('auth.signup.passwordLabel')}
                placeholder={t('auth.signup.passwordPlaceholder')}
                isPassword
                autoComplete="new-password"
                error={errors.password?.message}
                editable={!isSubmitting}
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setPasswordValue(text);
                }}
                value={value}
              />
              <PasswordStrengthIndicator password={passwordValue} />
            </View>
          )}
        />

        <View style={styles.fieldSpacer} />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label={t('auth.signup.confirmPasswordLabel')}
              placeholder={t('auth.signup.confirmPasswordPlaceholder')}
              isPassword
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              editable={!isSubmitting}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <View style={styles.fieldSpacer} />

        <Controller
          control={control}
          name="agreeToTerms"
          render={({ field: { onChange, value } }) => (
            <TermsCheckbox
              value={value}
              onValueChange={onChange}
              error={errors.agreeToTerms?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={[
            styles.submitButton,
            {
              backgroundColor: colors.primary,
              opacity: isSubmitting ? 0.5 : 1,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={t('auth.signup.submitButton')}
          accessibilityState={{ disabled: isSubmitting }}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={[typography.button, { color: colors.primaryForeground }]}>
              {t('auth.signup.submitButton')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, typography.bodySmall, { color: colors.textTertiary }]}>
          {t('auth.signup.orContinueWith')}
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      <View style={styles.loginContainer}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          {t('auth.signup.haveAccount')}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(auth)/login')}
          accessibilityRole="link"
          accessibilityLabel={t('auth.signup.signIn')}
        >
          <Text style={[typography.label, { color: colors.primary }]}>
            {t('auth.signup.signIn')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.trustContainer}>
        <Text style={[typography.bodySmall, { color: colors.textTertiary }]}>
          🔒 {t('auth.signup.trustElement')}
        </Text>
      </View>
    </View>
  );
}
```

### Step 12.3: Create barrel export

Create `klard-mobile/src/components/auth/signup-form/index.ts`:

```typescript
export { SignupForm } from './SignupForm';
```

### Step 12.4: Update auth components index

Modify `klard-mobile/src/components/auth/index.ts` - add:

```typescript
export { SignupForm } from './signup-form';
export { PasswordStrengthIndicator } from './password-strength-indicator';
export { TermsCheckbox } from './terms-checkbox';
```

### Step 12.5: Commit

```bash
git add klard-mobile/src/components/auth/signup-form klard-mobile/src/components/auth/index.ts
git commit -m "feat(mobile): add signup form component"
```

---

## Task 13: Mobile Signup Screen

**Files:**
- Modify: `klard-mobile/src/app/(auth)/signup.tsx`

### Step 13.1: Update signup screen

Replace contents of `klard-mobile/src/app/(auth)/signup.tsx`:

```typescript
import { SafeAreaView, KeyboardAvoidingView, ScrollView, View, Text, Platform } from 'react-native';
import { useThemeColors } from '@/hooks';
import { SignupForm } from '@/components/auth/signup-form';
import { t } from '@/lib/i18n';
import { typography } from '@/styles';
import { styles } from './login.styles'; // Reuse login styles

export default function SignupScreen() {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={[styles.logo, { backgroundColor: colors.primary }]}>
              <Text style={[styles.logoText, { color: colors.primaryForeground }]}>K</Text>
            </View>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[typography.h1, { color: colors.foreground }]}>
              {t('auth.signup.title')}
            </Text>
            <Text style={[typography.body, styles.subtitle, { color: colors.textSecondary }]}>
              {t('auth.signup.subtitle')}
            </Text>
          </View>

          {/* Signup Form */}
          <SignupForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
```

### Step 13.2: Test mobile signup

```bash
cd klard-mobile && pnpm start
```

Test on iOS simulator or Android emulator:
- Form renders correctly
- Password strength indicator works
- Validation shows errors
- Social buttons appear

### Step 13.3: Commit

```bash
git add klard-mobile/src/app/\(auth\)/signup.tsx
git commit -m "feat(mobile): implement signup screen"
```

---

## Task 14: Web Onboarding Placeholder

**Files:**
- Create: `klard-web/src/app/onboarding/page.tsx`

### Step 14.1: Create onboarding placeholder

Create `klard-web/src/app/onboarding/page.tsx`:

```typescript
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Welcome | Klard',
  description: 'Complete your Klard setup',
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-3xl font-semibold text-foreground mb-4">
          Welcome to Klard!
        </h1>
        <p className="text-muted-foreground mb-8">
          Onboarding flow coming soon...
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
```

### Step 14.2: Commit

```bash
git add klard-web/src/app/onboarding
git commit -m "feat(web): add onboarding placeholder page"
```

---

## Task 15: Final Integration Testing

### Step 15.1: Test web signup E2E

1. Start web dev server: `cd klard-web && pnpm dev`
2. Navigate to `http://localhost:3000/signup`
3. Test validation errors (empty fields, mismatched passwords)
4. Test password strength indicator
5. Test successful signup (requires backend)
6. Verify redirect to `/onboarding`

### Step 15.2: Test mobile signup E2E

1. Start mobile: `cd klard-mobile && pnpm start`
2. Navigate to signup screen
3. Test same scenarios as web
4. Verify redirect to onboarding

### Step 15.3: Test login still works

1. Web: Navigate to `/login`, test login flow
2. Mobile: Navigate to login screen, test login flow

### Step 15.4: Final commit

```bash
git add .
git commit -m "feat: complete signup implementation for web and mobile"
```

---

## Summary

**Files Created:**
- `commons/src/utils/password-strength.ts`
- `commons/src/utils/index.ts`
- `commons/src/utils/__tests__/password-strength.test.ts`
- `commons/src/validation/__tests__/auth.test.ts`
- `klard-web/src/components/ui/password-strength-indicator.tsx`
- `klard-web/src/components/ui/terms-checkbox.tsx`
- `klard-web/src/components/auth/signup-form.tsx`
- `klard-web/src/app/(auth)/signup/page.tsx`
- `klard-web/src/app/onboarding/page.tsx`
- `klard-mobile/src/stores/auth-ui-store.ts`
- `klard-mobile/src/stores/index.ts`
- `klard-mobile/src/components/auth/password-strength-indicator/*`
- `klard-mobile/src/components/auth/terms-checkbox/*`
- `klard-mobile/src/components/auth/signup-form/*`

**Files Modified:**
- `commons/src/validation/auth.ts`
- `commons/src/locales/en.ts`
- `commons/src/index.ts`
- `klard-mobile/src/components/auth/login-form/LoginForm.tsx`
- `klard-mobile/src/components/auth/index.ts`
- `klard-mobile/src/hooks/index.ts`
- `klard-mobile/src/app/(auth)/signup.tsx`

**Files Deleted:**
- `klard-mobile/src/hooks/useLoginForm.ts`

**Commits:** 15 incremental commits following TDD
