# Login Screen Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement login screens for web (Next.js) and mobile (React Native/Expo) with email/password, magic link, Google, and Apple authentication via better-auth.

**Architecture:** Shared Zod validation schemas in commons package. Web uses split-screen layout with glassmorphism form card. Mobile uses single-column centered layout. Both platforms use better-auth client for authentication.

**Tech Stack:** Next.js 16, React Native 0.81, Expo 54, better-auth, Zod 4, react-hook-form, Tailwind CSS 4

---

## Phase 1: Commons (Shared Validation Schemas)

### Task 1.1: Add Auth Validation Schemas

**Files:**
- Create: `commons/src/validation/auth.ts`
- Modify: `commons/src/validation/index.ts`

**Step 1: Create auth validation schemas**

Create file `commons/src/validation/auth.ts`:

```typescript
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional().default(false),
});

export const MagicLinkSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type MagicLinkInput = z.infer<typeof MagicLinkSchema>;

export function validateLogin(data: unknown) {
  return LoginSchema.safeParse(data);
}

export function validateMagicLink(data: unknown) {
  return MagicLinkSchema.safeParse(data);
}
```

**Step 2: Export from validation index**

Modify `commons/src/validation/index.ts`:

```typescript
export * from './subscription';
export * from './user';
export * from './auth';
```

**Step 3: Build commons package**

Run: `cd commons && pnpm build`

Expected: Build succeeds with no errors

**Step 4: Commit**

```bash
git add commons/src/validation/auth.ts commons/src/validation/index.ts
git commit -m "feat(commons): add auth validation schemas for login and magic link"
```

---

## Phase 2: Web - Foundation

### Task 2.1: Install Web Dependencies

**Files:**
- Modify: `klard-web/package.json`

**Step 1: Install react-hook-form and resolver**

Run: `cd klard-web && pnpm add react-hook-form @hookform/resolvers`

Expected: Packages added to dependencies

**Step 2: Install lucide-react for icons**

Run: `cd klard-web && pnpm add lucide-react`

Expected: Package added to dependencies

**Step 3: Commit**

```bash
git add klard-web/package.json klard-web/pnpm-lock.yaml
git commit -m "chore(klard-web): add react-hook-form, resolvers, and lucide-react"
```

---

### Task 2.2: Update Global CSS with Klard Design Tokens

**Files:**
- Modify: `klard-web/src/app/globals.css`

**Step 1: Replace globals.css with Klard design tokens**

Replace contents of `klard-web/src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  /* Primary Colors - Light Theme */
  --primary: #0D7C7A;
  --primary-foreground: #FFFFFF;

  /* Secondary Colors */
  --secondary: #15B5B0;
  --secondary-foreground: #FFFFFF;

  /* Accent Colors */
  --accent-success: #059669;
  --accent-warning: #D97706;
  --accent-error: #DC2626;

  /* Neutral Colors */
  --background: #FFFFFF;
  --foreground: #0F172A;
  --muted: #F1F5F9;
  --muted-foreground: #64748B;

  /* Card Colors */
  --card: #FFFFFF;
  --card-foreground: #0F172A;

  /* Border & Input */
  --border: rgba(148, 163, 184, 0.2);
  --input: #F8FAFC;
  --ring: #0D7C7A;

  /* Text Colors */
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-tertiary: #64748B;
  --text-disabled: #94A3B8;

  /* Error Colors */
  --error-background: #FEF2F2;
  --error-foreground: #991B1B;
  --error-border: #FECACA;

  /* Radius */
  --radius-sm: 8px;
  --radius-default: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;
}

[data-theme="dark"] {
  /* Primary Colors - Dark Theme */
  --primary: #15B5B0;
  --primary-foreground: #FFFFFF;

  /* Secondary Colors */
  --secondary: #0D7C7A;
  --secondary-foreground: #F8FAFC;

  /* Accent Colors */
  --accent-success: #10B981;
  --accent-warning: #F59E0B;
  --accent-error: #EF4444;

  /* Neutral Colors */
  --background: #0F172A;
  --foreground: #F8FAFC;
  --muted: #1E293B;
  --muted-foreground: #94A3B8;

  /* Card Colors */
  --card: #1E293B;
  --card-foreground: #F8FAFC;

  /* Border & Input */
  --border: rgba(148, 163, 184, 0.12);
  --input: #1E293B;
  --ring: #15B5B0;

  /* Text Colors */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;
  --text-disabled: #475569;

  /* Error Colors */
  --error-background: rgba(239, 68, 68, 0.1);
  --error-foreground: #EF4444;
  --error-border: rgba(239, 68, 68, 0.3);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Primary Colors - Dark Theme */
    --primary: #15B5B0;
    --primary-foreground: #FFFFFF;
    --secondary: #0D7C7A;
    --secondary-foreground: #F8FAFC;
    --accent-success: #10B981;
    --accent-warning: #F59E0B;
    --accent-error: #EF4444;
    --background: #0F172A;
    --foreground: #F8FAFC;
    --muted: #1E293B;
    --muted-foreground: #94A3B8;
    --card: #1E293B;
    --card-foreground: #F8FAFC;
    --border: rgba(148, 163, 184, 0.12);
    --input: #1E293B;
    --ring: #15B5B0;
    --text-primary: #F8FAFC;
    --text-secondary: #94A3B8;
    --text-tertiary: #64748B;
    --text-disabled: #475569;
    --error-background: rgba(239, 68, 68, 0.1);
    --error-foreground: #EF4444;
    --error-border: rgba(239, 68, 68, 0.3);
  }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-accent-success: var(--accent-success);
  --color-accent-warning: var(--accent-warning);
  --color-accent-error: var(--accent-error);
  --font-sans: 'Inter', system-ui, sans-serif;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: 'Inter', system-ui, sans-serif;
}
```

**Step 2: Verify CSS loads without errors**

Run: `cd klard-web && pnpm dev`

Expected: Dev server starts without CSS errors

**Step 3: Commit**

```bash
git add klard-web/src/app/globals.css
git commit -m "style(klard-web): add Klard design system CSS tokens"
```

---

### Task 2.3: Create Auth Client

**Files:**
- Create: `klard-web/src/lib/auth-client.ts`

**Step 1: Create auth client file**

Create file `klard-web/src/lib/auth-client.ts`:

```typescript
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3001',
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;
```

**Step 2: Create environment example file**

Create file `klard-web/.env.example`:

```bash
# Auth API URL
NEXT_PUBLIC_AUTH_URL=http://localhost:3001
```

**Step 3: Commit**

```bash
git add klard-web/src/lib/auth-client.ts klard-web/.env.example
git commit -m "feat(klard-web): add better-auth client configuration"
```

---

## Phase 3: Web - Components

### Task 3.1: Create Input Field Component

**Files:**
- Create: `klard-web/src/components/ui/input-field.tsx`

**Step 1: Create input field component**

Create file `klard-web/src/components/ui/input-field.tsx`:

```typescript
'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField({ label, error, icon, type, className = '', ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full h-12 px-4 ${icon ? 'pl-11' : ''} ${isPassword ? 'pr-11' : ''}
              bg-[var(--input)] text-[var(--foreground)]
              border rounded-[var(--radius-default)]
              placeholder:text-[var(--muted-foreground)]
              focus:outline-none focus:ring-[3px] focus:ring-[var(--ring)]/40
              transition-all duration-150
              ${error
                ? 'border-[var(--accent-error)] focus:ring-[var(--accent-error)]/40'
                : 'border-[var(--border)] hover:border-[var(--border)]/50'
              }
              ${className}
            `}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p
            id={`${props.id}-error`}
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

**Step 2: Commit**

```bash
git add klard-web/src/components/ui/input-field.tsx
git commit -m "feat(klard-web): add InputField component with error states"
```

---

### Task 3.2: Create Social Buttons Component

**Files:**
- Create: `klard-web/src/components/auth/social-buttons.tsx`

**Step 1: Create social buttons component**

Create file `klard-web/src/components/auth/social-buttons.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth-client';

interface SocialButtonsProps {
  disabled?: boolean;
  onError?: (error: string) => void;
}

export function SocialButtons({ disabled, onError }: SocialButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  async function handleSocialLogin(provider: 'google' | 'apple') {
    try {
      setLoadingProvider(provider);
      await signIn.social({ provider });
    } catch {
      onError?.(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => handleSocialLogin('google')}
        disabled={disabled || loadingProvider !== null}
        className="
          flex-1 h-12 flex items-center justify-center gap-2
          bg-transparent border border-[var(--border)] rounded-[var(--radius-default)]
          text-[var(--foreground)] font-medium
          hover:border-[var(--border)]/50 hover:bg-[var(--muted)]/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-150
        "
      >
        {loadingProvider === 'google' ? (
          <LoadingSpinner />
        ) : (
          <GoogleIcon />
        )}
        <span>Google</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin('apple')}
        disabled={disabled || loadingProvider !== null}
        className="
          flex-1 h-12 flex items-center justify-center gap-2
          bg-transparent border border-[var(--border)] rounded-[var(--radius-default)]
          text-[var(--foreground)] font-medium
          hover:border-[var(--border)]/50 hover:bg-[var(--muted)]/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-150
        "
      >
        {loadingProvider === 'apple' ? (
          <LoadingSpinner />
        ) : (
          <AppleIcon />
        )}
        <span>Apple</span>
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
```

**Step 2: Commit**

```bash
git add klard-web/src/components/auth/social-buttons.tsx
git commit -m "feat(klard-web): add SocialButtons component for Google/Apple login"
```

---

### Task 3.3: Create Auth Illustration Component

**Files:**
- Create: `klard-web/src/components/auth/auth-illustration.tsx`

**Step 1: Create auth illustration component**

Create file `klard-web/src/components/auth/auth-illustration.tsx`:

```typescript
import { KlardLogo } from '@/components/ui/klard-icon';

export function AuthIllustration() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-[#F8FAFC] dark:from-[#0F172A] dark:to-[#1E293B] p-12">
      {/* Geometric shapes */}
      <div className="relative w-80 h-80 mb-12">
        {/* Large teal circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[var(--primary)]/10 blur-xl" />

        {/* Floating shapes */}
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Circle */}
          <circle
            cx="160"
            cy="100"
            r="60"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Square rotated */}
          <rect
            x="200"
            y="160"
            width="80"
            height="80"
            fill="var(--secondary)"
            opacity="0.15"
            transform="rotate(15 240 200)"
            rx="8"
          />

          {/* Triangle */}
          <polygon
            points="60,220 100,140 140,220"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            opacity="0.4"
          />

          {/* Small circles */}
          <circle cx="80" cy="80" r="8" fill="var(--primary)" opacity="0.3" />
          <circle cx="260" cy="120" r="6" fill="var(--secondary)" opacity="0.4" />
          <circle cx="180" cy="260" r="10" fill="var(--primary)" opacity="0.2" />

          {/* Lines */}
          <line
            x1="40"
            y1="160"
            x2="100"
            y2="160"
            stroke="var(--primary)"
            strokeWidth="2"
            opacity="0.3"
          />
          <line
            x1="220"
            y1="280"
            x2="280"
            y2="280"
            stroke="var(--secondary)"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Logo and tagline */}
      <KlardLogo className="mb-6" />
      <p className="text-lg text-[var(--text-secondary)] font-medium tracking-wide">
        Track. Detect. Protect.
      </p>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add klard-web/src/components/auth/auth-illustration.tsx
git commit -m "feat(klard-web): add AuthIllustration component with geometric shapes"
```

---

### Task 3.4: Create Login Form Component

**Files:**
- Create: `klard-web/src/components/auth/login-form.tsx`

**Step 1: Create login form component**

Create file `klard-web/src/components/auth/login-form.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle, CheckCircle, X } from 'lucide-react';
import { LoginSchema, MagicLinkSchema, type LoginInput, type MagicLinkInput } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
import { InputField } from '@/components/ui/input-field';
import { SocialButtons } from './social-buttons';
import { KlardLogo } from '@/components/ui/klard-icon';
import Link from 'next/link';

type FormState = 'idle' | 'submitting' | 'magicLinkSent' | 'error';

export function LoginForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [magicLinkEmail, setMagicLinkEmail] = useState<string | null>(null);

  const {
    register,
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

  async function onSubmit(data: LoginInput) {
    try {
      setFormState('submitting');
      setErrorMessage(null);

      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Invalid email or password');
      }

      // Check if user needs onboarding
      const user = result.data?.user;
      if (user && (!user.onboardingComplete)) {
        router.push('/onboarding');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }

  async function handleMagicLink() {
    const email = getValues('email');
    const validation = MagicLinkSchema.safeParse({ email });

    if (!validation.success) {
      setErrorMessage('Please enter a valid email to receive a magic link');
      setFormState('error');
      return;
    }

    try {
      setFormState('submitting');
      setErrorMessage(null);

      await signIn.magicLink({
        email: validation.data.email,
      });

      setMagicLinkEmail(email);
      setFormState('magicLinkSent');
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send magic link'
      );
    }
  }

  function dismissError() {
    setErrorMessage(null);
    setFormState('idle');
  }

  function handleSocialError(error: string) {
    setErrorMessage(error);
    setFormState('error');
  }

  const isSubmitting = formState === 'submitting';

  if (formState === 'magicLinkSent') {
    return (
      <div className="w-full max-w-md mx-auto p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-success)]/10 flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-[var(--accent-success)]" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            Check your email
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            We sent a login link to <strong>{magicLinkEmail}</strong>
          </p>
          <button
            onClick={() => setFormState('idle')}
            className="text-[var(--primary)] font-medium hover:underline"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Logo */}
      <div className="flex justify-center mb-8 md:hidden">
        <KlardLogo />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-semibold text-[var(--foreground)] mb-2">
          Welcome back
        </h1>
        <p className="text-[var(--text-secondary)]">
          Sign in to your account
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div
          className="mb-6 p-4 rounded-[var(--radius-default)] bg-[var(--error-background)] border border-[var(--error-border)] flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-[var(--error-foreground)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--error-foreground)] flex-1">
            {errorMessage}
          </p>
          <button
            onClick={dismissError}
            className="text-[var(--error-foreground)] hover:opacity-70"
            aria-label="Dismiss error"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={20} />}
          error={errors.email?.message}
          disabled={isSubmitting}
          {...register('email')}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Lock size={20} />}
          error={errors.password?.message}
          disabled={isSubmitting}
          {...register('password')}
        />

        {/* Remember me & Magic link */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)]"
              disabled={isSubmitting}
              {...register('rememberMe')}
            />
            <span className="text-sm text-[var(--text-secondary)]">
              Remember me
            </span>
          </label>

          <button
            type="button"
            onClick={handleMagicLink}
            disabled={isSubmitting}
            className="text-sm font-medium text-[var(--primary)] hover:underline disabled:opacity-50"
          >
            Sign in with email link
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full h-12 rounded-[var(--radius-default)]
            bg-gradient-to-br from-[var(--primary)] to-[#0A5F5D] dark:from-[var(--primary)] dark:to-[var(--secondary)]
            text-white font-semibold
            shadow-[0_0_20px_rgba(13,124,122,0.3)] dark:shadow-[0_0_24px_rgba(21,181,176,0.35)]
            hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150
            flex items-center justify-center gap-2
          "
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[var(--card)] text-[var(--text-tertiary)]">
            or continue with
          </span>
        </div>
      </div>

      {/* Social buttons */}
      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      {/* Sign up link */}
      <p className="mt-8 text-center text-sm text-[var(--text-secondary)]">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="font-medium text-[var(--primary)] hover:underline"
        >
          Sign up
        </Link>
      </p>

      {/* Trust element */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[var(--text-tertiary)]">
        <Lock size={14} />
        <span>Privacy-first. No bank access required.</span>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add klard-web/src/components/auth/login-form.tsx
git commit -m "feat(klard-web): add LoginForm component with all auth methods"
```

---

## Phase 4: Web - Pages

### Task 4.1: Create Auth Layout

**Files:**
- Create: `klard-web/src/app/(auth)/layout.tsx`

**Step 1: Create auth layout with split-screen**

Create directory and file `klard-web/src/app/(auth)/layout.tsx`:

```typescript
import { AuthIllustration } from '@/components/auth/auth-illustration';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left panel - Illustration (hidden on mobile) */}
      <AuthIllustration />

      {/* Right panel - Form */}
      <div className="flex items-center justify-center bg-[var(--card)] p-4">
        <div
          className="
            w-full max-w-md
            md:bg-[var(--card)]/80 md:backdrop-blur-[12px]
            md:border md:border-[var(--border)]
            md:rounded-[var(--radius-lg)]
            md:shadow-[0_2px_12px_rgba(15,23,42,0.08)]
            dark:md:bg-[rgba(30,41,59,0.6)]
            dark:md:shadow-[0_4px_16px_rgba(0,0,0,0.1)]
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add klard-web/src/app/\(auth\)/layout.tsx
git commit -m "feat(klard-web): add split-screen auth layout"
```

---

### Task 4.2: Create Login Page

**Files:**
- Create: `klard-web/src/app/(auth)/login/page.tsx`

**Step 1: Create login page**

Create directory and file `klard-web/src/app/(auth)/login/page.tsx`:

```typescript
import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Klard account to manage your subscriptions.',
};

export default function LoginPage() {
  return <LoginForm />;
}
```

**Step 2: Verify page loads**

Run: `cd klard-web && pnpm dev`

Open: `http://localhost:3000/login`

Expected: Login page renders with split-screen layout

**Step 3: Commit**

```bash
git add klard-web/src/app/\(auth\)/login/page.tsx
git commit -m "feat(klard-web): add login page"
```

---

## Phase 5: Mobile - Foundation

### Task 5.1: Install Mobile Dependencies

**Files:**
- Modify: `klard-mobile/package.json`

**Step 1: Install react-hook-form and resolver**

Run: `cd klard-mobile && pnpm add react-hook-form @hookform/resolvers`

Expected: Packages added to dependencies

**Step 2: Commit**

```bash
git add klard-mobile/package.json klard-mobile/pnpm-lock.yaml
git commit -m "chore(klard-mobile): add react-hook-form and resolvers"
```

---

### Task 5.2: Create Mobile Auth Client

**Files:**
- Create: `klard-mobile/src/lib/auth-client.ts`

**Step 1: Create auth client file**

Create file `klard-mobile/src/lib/auth-client.ts`:

```typescript
import { createAuthClient } from '@better-auth/expo';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_AUTH_URL || 'http://localhost:3001',
  storage: SecureStore,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;
```

**Step 2: Create env example**

Create file `klard-mobile/.env.example`:

```bash
# Auth API URL
EXPO_PUBLIC_AUTH_URL=http://localhost:3001
```

**Step 3: Commit**

```bash
git add klard-mobile/src/lib/auth-client.ts klard-mobile/.env.example
git commit -m "feat(klard-mobile): add better-auth/expo client configuration"
```

---

### Task 5.3: Create Mobile Design Tokens

**Files:**
- Create: `klard-mobile/src/constants/colors.ts`

**Step 1: Create colors constants**

Create file `klard-mobile/src/constants/colors.ts`:

```typescript
export const Colors = {
  light: {
    primary: '#0D7C7A',
    primaryForeground: '#FFFFFF',
    secondary: '#15B5B0',
    secondaryForeground: '#FFFFFF',
    accentSuccess: '#059669',
    accentWarning: '#D97706',
    accentError: '#DC2626',
    background: '#FFFFFF',
    foreground: '#0F172A',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    border: 'rgba(148, 163, 184, 0.2)',
    input: '#F8FAFC',
    ring: '#0D7C7A',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#64748B',
    textDisabled: '#94A3B8',
    errorBackground: '#FEF2F2',
    errorForeground: '#991B1B',
    errorBorder: '#FECACA',
  },
  dark: {
    primary: '#15B5B0',
    primaryForeground: '#FFFFFF',
    secondary: '#0D7C7A',
    secondaryForeground: '#F8FAFC',
    accentSuccess: '#10B981',
    accentWarning: '#F59E0B',
    accentError: '#EF4444',
    background: '#0F172A',
    foreground: '#F8FAFC',
    muted: '#1E293B',
    mutedForeground: '#94A3B8',
    card: '#1E293B',
    cardForeground: '#F8FAFC',
    border: 'rgba(148, 163, 184, 0.12)',
    input: '#1E293B',
    ring: '#15B5B0',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    textDisabled: '#475569',
    errorBackground: 'rgba(239, 68, 68, 0.1)',
    errorForeground: '#EF4444',
    errorBorder: 'rgba(239, 68, 68, 0.3)',
  },
} as const;

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light;
```

**Step 2: Create colors index export**

Create file `klard-mobile/src/constants/index.ts`:

```typescript
export * from './colors';
```

**Step 3: Commit**

```bash
git add klard-mobile/src/constants/colors.ts klard-mobile/src/constants/index.ts
git commit -m "feat(klard-mobile): add Klard design system color tokens"
```

---

## Phase 6: Mobile - Components

### Task 6.1: Create Mobile Input Field

**Files:**
- Create: `klard-mobile/src/components/auth/input-field.tsx`

**Step 1: Create input field component**

Create file `klard-mobile/src/components/auth/input-field.tsx`:

```typescript
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  TextInputProps,
} from 'react-native';
import { Colors } from '@/constants/colors';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export function InputField({
  label,
  error,
  icon,
  isPassword,
  style,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.input,
            borderColor: error
              ? colors.accentError
              : isFocused
              ? colors.ring
              : colors.border,
            borderWidth: isFocused ? 2 : 1,
          },
        ]}
      >
        {icon && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            { color: colors.foreground },
            icon && styles.inputWithIcon,
            isPassword && styles.inputWithToggle,
            style,
          ]}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Text style={{ color: colors.mutedForeground }}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: colors.errorForeground }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    height: 48,
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  inputWithToggle: {
    paddingRight: 60,
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  error: {
    fontSize: 14,
    marginTop: 8,
  },
});
```

**Step 2: Commit**

```bash
git add klard-mobile/src/components/auth/input-field.tsx
git commit -m "feat(klard-mobile): add InputField component"
```

---

### Task 6.2: Create Mobile Social Buttons

**Files:**
- Create: `klard-mobile/src/components/auth/social-buttons.tsx`

**Step 1: Create social buttons component**

Create file `klard-mobile/src/components/auth/social-buttons.tsx`:

```typescript
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { signIn } from '@/lib/auth-client';

interface SocialButtonsProps {
  disabled?: boolean;
  onError?: (error: string) => void;
}

export function SocialButtons({ disabled, onError }: SocialButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  async function handleSocialLogin(provider: 'google' | 'apple') {
    try {
      setLoadingProvider(provider);
      await signIn.social({ provider });
    } catch {
      onError?.(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setLoadingProvider(null);
    }
  }

  const isDisabled = disabled || loadingProvider !== null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleSocialLogin('google')}
        disabled={isDisabled}
        style={[
          styles.button,
          {
            borderColor: colors.border,
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
      >
        {loadingProvider === 'google' ? (
          <ActivityIndicator size="small" color={colors.foreground} />
        ) : (
          <Text style={[styles.buttonText, { color: colors.foreground }]}>
            Google
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleSocialLogin('apple')}
        disabled={isDisabled}
        style={[
          styles.button,
          {
            borderColor: colors.border,
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
      >
        {loadingProvider === 'apple' ? (
          <ActivityIndicator size="small" color={colors.foreground} />
        ) : (
          <Text style={[styles.buttonText, { color: colors.foreground }]}>
            Apple
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
```

**Step 2: Commit**

```bash
git add klard-mobile/src/components/auth/social-buttons.tsx
git commit -m "feat(klard-mobile): add SocialButtons component"
```

---

### Task 6.3: Create Mobile Login Form

**Files:**
- Create: `klard-mobile/src/components/auth/login-form.tsx`

**Step 1: Create login form component**

Create file `klard-mobile/src/components/auth/login-form.tsx`:

```typescript
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { LoginSchema, MagicLinkSchema, type LoginInput } from '@klard-apps/commons';
import { signIn } from '@/lib/auth-client';
import { Colors } from '@/constants/colors';
import { InputField } from './input-field';
import { SocialButtons } from './social-buttons';

type FormState = 'idle' | 'submitting' | 'magicLinkSent' | 'error';

export function LoginForm() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [magicLinkEmail, setMagicLinkEmail] = useState<string | null>(null);

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

  async function onSubmit(data: LoginInput) {
    try {
      setFormState('submitting');
      setErrorMessage(null);

      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Invalid email or password');
      }

      const user = result.data?.user;
      if (user && !user.onboardingComplete) {
        router.replace('/onboarding');
      } else {
        router.replace('/(tabs)/dashboard');
      }
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }

  async function handleMagicLink() {
    const email = getValues('email');
    const validation = MagicLinkSchema.safeParse({ email });

    if (!validation.success) {
      setErrorMessage('Please enter a valid email to receive a magic link');
      setFormState('error');
      return;
    }

    try {
      setFormState('submitting');
      setErrorMessage(null);

      await signIn.magicLink({
        email: validation.data.email,
      });

      setMagicLinkEmail(email);
      setFormState('magicLinkSent');
    } catch (error) {
      setFormState('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send magic link'
      );
    }
  }

  function handleSocialError(error: string) {
    setErrorMessage(error);
    setFormState('error');
  }

  const isSubmitting = formState === 'submitting';

  if (formState === 'magicLinkSent') {
    return (
      <View style={styles.successContainer}>
        <View
          style={[
            styles.successIcon,
            { backgroundColor: colors.accentSuccess + '1A' },
          ]}
        >
          <Text style={{ color: colors.accentSuccess, fontSize: 32 }}>✓</Text>
        </View>
        <Text style={[styles.successTitle, { color: colors.foreground }]}>
          Check your email
        </Text>
        <Text style={[styles.successText, { color: colors.textSecondary }]}>
          We sent a login link to {magicLinkEmail}
        </Text>
        <TouchableOpacity onPress={() => setFormState('idle')}>
          <Text style={[styles.backLink, { color: colors.primary }]}>
            Back to login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Error Banner */}
      {errorMessage && (
        <View
          style={[
            styles.errorBanner,
            {
              backgroundColor: colors.errorBackground,
              borderColor: colors.errorBorder,
            },
          ]}
        >
          <Text style={[styles.errorText, { color: colors.errorForeground }]}>
            {errorMessage}
          </Text>
          <TouchableOpacity onPress={() => setErrorMessage(null)}>
            <Text style={{ color: colors.errorForeground }}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Form */}
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Email"
              placeholder="you@example.com"
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

        <View style={{ height: 20 }} />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Password"
              placeholder="Enter your password"
              isPassword
              autoComplete="password"
              error={errors.password?.message}
              editable={!isSubmitting}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        {/* Remember me & Magic link */}
        <View style={styles.optionsRow}>
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => onChange(!value)}
                style={styles.checkboxContainer}
                disabled={isSubmitting}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: colors.border,
                      backgroundColor: value ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {value && (
                    <Text style={{ color: colors.primaryForeground }}>✓</Text>
                  )}
                </View>
                <Text style={[styles.checkboxLabel, { color: colors.textSecondary }]}>
                  Remember me
                </Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={handleMagicLink}
            disabled={isSubmitting}
          >
            <Text style={[styles.magicLink, { color: colors.primary }]}>
              Sign in with email link
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit button */}
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
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={[styles.submitText, { color: colors.primaryForeground }]}>
              Sign In
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.textTertiary }]}>
          or continue with
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      {/* Social buttons */}
      <SocialButtons disabled={isSubmitting} onError={handleSocialError} />

      {/* Sign up link */}
      <View style={styles.signupContainer}>
        <Text style={[styles.signupText, { color: colors.textSecondary }]}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={[styles.signupLink, { color: colors.primary }]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Trust element */}
      <View style={styles.trustContainer}>
        <Text style={[styles.trustText, { color: colors.textTertiary }]}>
          🔒 Privacy-first. No bank access required.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  backLink: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
  },
  form: {
    marginBottom: 32,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  magicLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  trustContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  trustText: {
    fontSize: 12,
  },
});
```

**Step 2: Create auth components index**

Create file `klard-mobile/src/components/auth/index.ts`:

```typescript
export * from './input-field';
export * from './social-buttons';
export * from './login-form';
```

**Step 3: Commit**

```bash
git add klard-mobile/src/components/auth/login-form.tsx klard-mobile/src/components/auth/index.ts
git commit -m "feat(klard-mobile): add LoginForm component"
```

---

## Phase 7: Mobile - Screen

### Task 7.1: Update Login Screen

**Files:**
- Modify: `klard-mobile/src/app/(auth)/login.tsx`

**Step 1: Replace login screen with full implementation**

Replace contents of `klard-mobile/src/app/(auth)/login.tsx`:

```typescript
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.logoText, { color: colors.primary }]}>
              Klard
            </Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.foreground }]}>
              Welcome back
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign in to your account
            </Text>
          </View>

          {/* Form */}
          <LoginForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});
```

**Step 2: Verify screen loads**

Run: `cd klard-mobile && pnpm dev`

Expected: Login screen renders with form, social buttons, and styling

**Step 3: Commit**

```bash
git add klard-mobile/src/app/\(auth\)/login.tsx
git commit -m "feat(klard-mobile): implement full login screen"
```

---

## Phase 8: Final Verification

### Task 8.1: Build All Packages

**Step 1: Build commons**

Run: `cd commons && pnpm build`

Expected: Build succeeds

**Step 2: Build web**

Run: `cd klard-web && pnpm build`

Expected: Build succeeds with no errors

**Step 3: Run lint**

Run: `pnpm lint`

Expected: No lint errors

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete login screen implementation for web and mobile"
```

---

## Summary

**Total Tasks:** 17
**Total Commits:** ~15

**What was built:**
1. Shared auth validation schemas in commons
2. Web login page with split-screen layout, glassmorphism card
3. Mobile login screen with native styling
4. Email/password, magic link, Google, Apple auth methods
5. Full Klard design system integration
6. Error handling and loading states
7. Accessibility support