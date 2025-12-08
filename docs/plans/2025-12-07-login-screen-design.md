# Login Screen Design

**Date:** 2025-12-07
**Status:** Approved
**Platforms:** Web (Next.js) + Mobile (React Native/Expo)

---

## Overview

Implement a login screen for both web and mobile platforms with the following authentication methods:
- Email/Password
- Magic Link (replaces "Forgot password?")
- Google OAuth
- Apple OAuth

All authentication handled via better-auth library connected to the existing klard-auth backend.

---

## Decisions

| Decision | Choice |
|----------|--------|
| Branding | Klard logo + "Track. Detect. Protect." tagline |
| Auth methods | Email/Password, Magic Link, Google, Apple (all via better-auth) |
| Magic Link | Replaces "Forgot password?" link |
| Illustration (web) | CSS/SVG geometric shapes + Klard logo on left panel |
| Backend URL | Environment variables (`NEXT_PUBLIC_AUTH_URL`, `EXPO_PUBLIC_AUTH_URL`) |
| Post-login redirect | New users → onboarding, returning users → dashboard |
| Form validation | Zod schemas (shared via commons) + react-hook-form |

---

## Architecture

### File Structure

```
commons/src/
└── validation/
    └── auth.ts                 # LoginSchema, MagicLinkSchema

klard-web/src/
├── app/(auth)/
│   ├── layout.tsx              # Split-screen auth layout
│   └── login/
│       └── page.tsx            # Login page
├── components/auth/
│   ├── login-form.tsx          # Form with all login methods
│   ├── social-buttons.tsx      # Google/Apple OAuth buttons
│   ├── auth-illustration.tsx   # Left panel SVG + branding
│   └── input-field.tsx         # Styled input with icon prefix
└── lib/
    └── auth-client.ts          # better-auth client config

klard-mobile/src/
├── app/(auth)/
│   └── login.tsx               # Login screen
├── components/auth/
│   ├── login-form.tsx          # Form component (RN)
│   ├── social-buttons.tsx      # Google/Apple buttons (RN)
│   └── input-field.tsx         # TextInput with icon prefix
└── lib/
    └── auth-client.ts          # better-auth/expo client config
```

---

## Web Layout

### Desktop (>= 768px) — Split Screen

```
┌─────────────────────────────────────────────────────────────┐
│  LEFT 50%                    │  RIGHT 50%                   │
│  ─────────────────────────── │  ───────────────────────────│
│                              │                              │
│  Gradient background         │  Form Card (glassmorphism)   │
│  (#FFFFFF → #F8FAFC)         │  ┌─────────────────────┐     │
│                              │  │  [Klard Logo]       │     │
│  ┌──────────────┐            │  │                     │     │
│  │ Geometric    │            │  │  Welcome back       │     │
│  │ SVG shapes   │            │  │  Sign in to your    │     │
│  │ (teal/navy)  │            │  │  account            │     │
│  └──────────────┘            │  │                     │     │
│                              │  │  [Email input]      │     │
│  [Klard Logo]                │  │  [Password input]   │     │
│                              │  │                     │     │
│  "Track. Detect. Protect."   │  │  ☐ Remember me      │     │
│                              │  │  Sign in with email │     │
│                              │  │  link →             │     │
│                              │  │                     │     │
│                              │  │  [Sign In Button]   │     │
│                              │  │                     │     │
│                              │  │  ── or continue ──  │     │
│                              │  │                     │     │
│                              │  │  [Google] [Apple]   │     │
│                              │  │                     │     │
│                              │  │  Don't have account?│     │
│                              │  │  Sign up            │     │
│                              │  │                     │     │
│                              │  │  🔒 Privacy-first   │     │
│                              │  └─────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)

- Left panel hidden
- Form card centered, full-width with 16px padding
- Same form content, stacked vertically

---

## Mobile Layout (React Native)

```
┌─────────────────────────┐
│      Status Bar         │
├─────────────────────────┤
│                         │
│      [Klard Logo]       │
│                         │
│     Welcome back        │
│  Sign in to your account│
│                         │
│  ┌───────────────────┐  │
│  │ ✉  Email          │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ 🔒 Password    👁  │  │
│  └───────────────────┘  │
│                         │
│  ☐ Remember me          │
│     Sign in with email  │
│     link →              │
│                         │
│  ┌───────────────────┐  │
│  │     Sign In       │  │
│  └───────────────────┘  │
│                         │
│  ─── or continue with ──│
│                         │
│  [Google]    [Apple]    │
│                         │
│  Don't have an account? │
│        Sign up          │
│                         │
│  🔒 Privacy-first. No   │
│  bank access required.  │
│                         │
└─────────────────────────┘
```

Key mobile considerations:
- SafeAreaView for notch/status bar
- KeyboardAvoidingView for keyboard handling
- expo-secure-store for token persistence (via better-auth/expo)

---

## Authentication Flow

### Auth Client Setup

```typescript
// Web: klard-web/src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
});

// Mobile: klard-mobile/src/lib/auth-client.ts
import { createAuthClient } from "better-auth/expo";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_AUTH_URL,
});
```

### Login Methods

| Method | API Call |
|--------|----------|
| Email/Password | `authClient.signIn.email({ email, password })` |
| Magic Link | `authClient.signIn.magicLink({ email })` |
| Google | `authClient.signIn.social({ provider: "google" })` |
| Apple | `authClient.signIn.social({ provider: "apple" })` |

### Form States

| State | UI Behavior |
|-------|-------------|
| `idle` | Default form, all inputs enabled |
| `submitting` | Spinner in button, inputs disabled |
| `error` | Error banner visible, field errors inline |
| `magicLinkSent` | Success message: "Check your email for the login link" |
| `success` | Redirect to dashboard or onboarding |

### Post-Login Redirect

```typescript
function onLoginSuccess(user: User) {
  if (user.isNewUser || !user.onboardingComplete) {
    router.push("/onboarding"); // or router.replace for mobile
  } else {
    router.push("/dashboard");
  }
}
```

---

## Validation

### Shared Schemas (commons)

```typescript
// commons/src/validation/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const magicLinkSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type MagicLinkInput = z.infer<typeof magicLinkSchema>;
```

### Client-Side Behavior

- Validate on blur (field loses focus)
- Validate on submit
- Show inline errors below each field
- Red border + error message for invalid fields

### Server-Side Errors

| Error | Display |
|-------|---------|
| Invalid credentials | Banner: "Invalid email or password" |
| Account not found | Banner: "No account found with this email" |
| Rate limited | Banner: "Too many attempts. Try again later." |
| Network error | Banner: "Connection failed. Check your internet." |
| OAuth cancelled | Dismissable toast (not blocking) |

---

## Styling Specification

### Form Card (Glassmorphism)

| Theme | Property | Value |
|-------|----------|-------|
| Light | Background | `rgba(255, 255, 255, 0.8)` |
| Light | Backdrop blur | `12px` |
| Light | Border | `1px solid rgba(148, 163, 184, 0.2)` |
| Light | Shadow | `0 2px 12px rgba(15, 23, 42, 0.08)` |
| Light | Border radius | `24px` |
| Dark | Background | `rgba(30, 41, 59, 0.6)` |
| Dark | Backdrop blur | `12px` |
| Dark | Border | `1px solid rgba(148, 163, 184, 0.12)` |
| Dark | Shadow | `0 4px 16px rgba(0, 0, 0, 0.1)` |

### Input Fields

| Theme | Property | Value |
|-------|----------|-------|
| Light | Background | `#F8FAFC` |
| Light | Border | `rgba(148, 163, 184, 0.2)` |
| Light | Text | `#0F172A` |
| Light | Placeholder | `#64748B` |
| Dark | Background | `#1E293B` |
| Dark | Border | `rgba(148, 163, 184, 0.12)` |
| Dark | Text | `#F8FAFC` |
| Dark | Placeholder | `#94A3B8` |
| Both | Border radius | `12px` |
| Both | Padding | `16px` with `40px` left for icon |

### Primary Button ("Sign In")

| Theme | Property | Value |
|-------|----------|-------|
| Light | Background | `linear-gradient(135deg, #0D7C7A, #0A5F5D)` |
| Light | Glow | `0 0 20px rgba(13, 124, 122, 0.3)` |
| Dark | Background | `linear-gradient(135deg, #15B5B0, #0D7C7A)` |
| Dark | Glow | `0 0 24px rgba(21, 181, 176, 0.35)` |
| Both | Text | `#FFFFFF` |
| Both | Border radius | `12px` |
| Both | Height | `48px` |

### Social Buttons

| Theme | Property | Value |
|-------|----------|-------|
| Light | Background | `transparent` |
| Light | Border | `1px solid rgba(148, 163, 184, 0.2)` |
| Light | Text | `#0F172A` |
| Dark | Background | `transparent` |
| Dark | Border | `1px solid rgba(148, 163, 184, 0.12)` |
| Dark | Text | `#F8FAFC` |
| Both | Border radius | `12px` |

### Error States

| Theme | Property | Value |
|-------|----------|-------|
| Light | Banner Background | `#FEF2F2` |
| Light | Banner Text | `#991B1B` |
| Light | Banner Border | `#FECACA` |
| Light | Field Border | `#DC2626` |
| Dark | Banner Background | `rgba(239, 68, 68, 0.1)` |
| Dark | Banner Text | `#EF4444` |
| Dark | Banner Border | `rgba(239, 68, 68, 0.3)` |
| Dark | Field Border | `#EF4444` |

### Focus Ring

| Theme | Value |
|-------|-------|
| Light | `0 0 0 3px rgba(13, 124, 122, 0.4)` |
| Dark | `0 0 0 3px rgba(21, 181, 176, 0.5)` |

### Typography

| Element | Size | Weight | Color (Light / Dark) |
|---------|------|--------|---------------------|
| H1 "Welcome back" | `32px` | Semi-bold | `#0F172A` / `#F8FAFC` |
| Subheading | `16px` | Regular | `#475569` / `#94A3B8` |
| Labels | `14px` | Medium | `#475569` / `#94A3B8` |
| Links | `14px` | Medium | `#0D7C7A` / `#15B5B0` |
| Trust caption | `12px` | Regular | `#64748B` / `#94A3B8` |

### Animation

| Property | Value |
|----------|-------|
| Transition | `300ms ease-in-out` |
| Error shake | `150ms` |
| Loading spinner | `continuous rotation` |

---

## Implementation Order

### Phase 1: Commons (shared validation)

1. Add `loginSchema` and `magicLinkSchema` to `commons/src/validation/auth.ts`
2. Export types from commons index
3. Build commons package

### Phase 2: Web (klard-web)

1. Install dependencies: `react-hook-form`, `@hookform/resolvers`
2. Create auth client (`lib/auth-client.ts`)
3. Create auth layout (`app/(auth)/layout.tsx`) — split-screen
4. Create components:
   - `auth-illustration.tsx` — SVG shapes + logo + tagline
   - `input-field.tsx` — styled input with icon, error state
   - `social-buttons.tsx` — Google/Apple buttons
   - `login-form.tsx` — form logic, validation, submission
5. Create login page (`app/(auth)/login/page.tsx`)

### Phase 3: Mobile (klard-mobile)

1. Install dependencies: `react-hook-form`, `@hookform/resolvers`
2. Create auth client (`lib/auth-client.ts`)
3. Create components:
   - `input-field.tsx` — RN TextInput with icon, error state
   - `social-buttons.tsx` — Google/Apple buttons (RN)
   - `login-form.tsx` — form logic (RN)
4. Update login screen (`app/(auth)/login.tsx`)

---

## Dependencies

### Web (klard-web)

```bash
pnpm add react-hook-form @hookform/resolvers
```

### Mobile (klard-mobile)

```bash
pnpm add react-hook-form @hookform/resolvers
```

---

## Environment Variables

### Web (.env.local)

```
NEXT_PUBLIC_AUTH_URL=https://auth.klard.app
```

### Mobile (.env)

```
EXPO_PUBLIC_AUTH_URL=https://auth.klard.app
```

---

## Accessibility

- All inputs have associated labels
- Error messages linked via `aria-describedby`
- Invalid fields marked with `aria-invalid="true"`
- Focus ring visible on all interactive elements
- Color + icon + text for error states (never color alone)
- Respects `prefers-reduced-motion` for animations
