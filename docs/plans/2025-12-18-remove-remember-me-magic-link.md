# Remove Remember Me & Magic Link Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove "Remember Me" checkbox and "Magic Link" passwordless authentication from web, mobile, and auth packages.

**Architecture:** This is a removal/cleanup task that touches 4 packages (commons, klard-auth, klard-web, klard-mobile). We remove in dependency order: auth backend first (stops functionality), then clients (web/mobile), then shared code (commons) last. Tests are removed alongside their implementations.

**Tech Stack:** TypeScript, React, React Native, Express, better-auth, Zod, Vitest, Jest

---

## Summary of Changes

| Package | Files Modified | Files Deleted |
|---------|---------------|---------------|
| klard-auth | 2 | 0 |
| klard-web | 4 | 1 |
| klard-mobile | 5 | 1 directory (3 files) |
| commons | 2 | 0 |

**Total: 13 files modified, 4 files deleted**

---

## Task 1: Remove Magic Link from klard-auth

**Files:**
- Modify: `klard-auth/src/lib/auth.ts`
- Modify: `klard-auth/tests/integration/auth.test.ts`

### Step 1.1: Remove magicLink import and plugin from auth.ts

**File:** `klard-auth/src/lib/auth.ts`

Remove `magicLink` from import (line 4):
```typescript
// BEFORE
import { bearer, emailOTP, jwt, magicLink, openAPI } from "better-auth/plugins";

// AFTER
import { bearer, emailOTP, jwt, openAPI } from "better-auth/plugins";
```

Remove magicLink plugin configuration (lines 171-181):
```typescript
// DELETE THIS BLOCK
// Magic link for passwordless sign-in
magicLink({
  sendMagicLink: async ({ email, url }) => {
    await sendEmail({
      to: email,
      subject: "Sign in to Klard",
      text: `Click to sign in: ${url}`,
      html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
    });
  },
  expiresIn: 60 * 15, // 15 minutes
}),
```

### Step 1.2: Run typecheck to verify auth changes

Run: `pnpm --filter klard-auth exec tsc --noEmit`
Expected: No errors

### Step 1.3: Remove magic link integration tests

**File:** `klard-auth/tests/integration/auth.test.ts`

Remove the entire "Passwordless / Magic Link" describe block (lines ~372-415):
```typescript
// DELETE THIS ENTIRE BLOCK
describe("Passwordless / Magic Link", () => {
  it("should send magic link email", async () => {
    // ... test content
  });

  it("should include expiring token in magic link", async () => {
    // ... test content
  });
});

describe("GET /api/auth/magic-link/verify", () => {
  it("should reject invalid magic link token", async () => {
    // ... test content
  });
});
```

### Step 1.4: Run auth tests to verify removal

Run: `pnpm --filter klard-auth test`
Expected: All remaining tests pass

### Step 1.5: Commit auth changes

```bash
git add klard-auth/src/lib/auth.ts klard-auth/tests/integration/auth.test.ts
git commit -m "feat(auth): remove magic link plugin and tests"
```

---

## Task 2: Remove Magic Link from klard-web

**Files:**
- Modify: `klard-web/src/lib/auth-client.ts`
- Modify: `klard-web/src/components/auth/login-form.tsx`
- Modify: `klard-web/src/stores/auth-ui-store.ts`
- Delete: `klard-web/src/components/auth/magic-link-success.tsx`
- Modify: `klard-web/src/components/auth/__tests__/login-form.test.tsx`

### Step 2.1: Remove magicLinkClient from auth-client.ts

**File:** `klard-web/src/lib/auth-client.ts`

Remove import (line 2):
```typescript
// BEFORE
import { magicLinkClient, inferAdditionalFields } from 'better-auth/client/plugins';

// AFTER
import { inferAdditionalFields } from 'better-auth/client/plugins';
```

Remove plugin from array (line 8):
```typescript
// BEFORE
plugins: [
  magicLinkClient(),
  inferAdditionalFields({
    user: { hasOnboarded: { type: "boolean", required: false } },
  }),
],

// AFTER
plugins: [
  inferAdditionalFields({
    user: { hasOnboarded: { type: "boolean", required: false } },
  }),
],
```

### Step 2.2: Remove magic link state from auth-ui-store.ts

**File:** `klard-web/src/stores/auth-ui-store.ts`

Remove `'magicLinkSent'` from FormState type (line 3):
```typescript
// BEFORE
type FormState = 'login' | 'magicLinkSent';

// AFTER
type FormState = 'login';
```

Remove `magicLinkEmail` from state interface (line 8):
```typescript
// DELETE
magicLinkEmail: string | null;
```

Remove `setMagicLinkSent` from actions interface (line 13):
```typescript
// DELETE
setMagicLinkSent: (email: string) => void;
```

Remove initial state for magicLinkEmail (line 22):
```typescript
// DELETE
magicLinkEmail: null,
```

Remove `setMagicLinkSent` implementation (lines 33-36):
```typescript
// DELETE
setMagicLinkSent: (email) => set({
  uiState: 'magicLinkSent',
  magicLinkEmail: email,
}),
```

### Step 2.3: Delete magic-link-success.tsx component

**File:** `klard-web/src/components/auth/magic-link-success.tsx`

Run: `rm klard-web/src/components/auth/magic-link-success.tsx`

### Step 2.4: Remove magic link from login-form.tsx

**File:** `klard-web/src/components/auth/login-form.tsx`

Remove MagicLinkSuccess import (line 14):
```typescript
// DELETE
import { MagicLinkSuccess } from './magic-link-success';
```

Remove MagicLinkSchema import (part of line 9):
```typescript
// BEFORE
import { LoginSchema, MagicLinkSchema, type LoginInput } from '@klard-apps/commons';

// AFTER
import { LoginSchema, type LoginInput } from '@klard-apps/commons';
```

Remove magicLinkEmail and setMagicLinkSent from store destructuring (around line 42):
```typescript
// BEFORE
const { uiState, setUiState, magicLinkEmail, setMagicLinkSent } = useAuthUIStore();

// AFTER
const { uiState, setUiState } = useAuthUIStore();
```

Remove entire handleMagicLink function (lines 95-125):
```typescript
// DELETE THIS ENTIRE FUNCTION
const handleMagicLink = async () => {
  // ... entire function body
};
```

Remove MagicLinkSent conditional rendering (lines 134-135):
```typescript
// DELETE
if (uiState === 'magicLinkSent') {
  return <MagicLinkSuccess email={magicLinkEmail!} onBack={() => setUiState('login')} />;
}
```

Remove the comment and Magic link button section (around line 185 and 200):
```typescript
// DELETE THIS COMMENT
{/* Remember me & Magic link */}

// DELETE THE MAGIC LINK BUTTON (around line 200)
<Button
  type="button"
  variant="outline"
  onClick={handleMagicLink}
  disabled={isSubmitting}
>
  {t('auth.login.magicLinkButton')}
</Button>
```

### Step 2.5: Update login-form tests

**File:** `klard-web/src/components/auth/__tests__/login-form.test.tsx`

Remove mock for signIn.magicLink (line 12):
```typescript
// DELETE
magicLink: vi.fn(),
```

Remove any tests that reference magic link functionality.

### Step 2.6: Run web typecheck

Run: `pnpm --filter klard-web exec tsc --noEmit`
Expected: No errors

### Step 2.7: Run web tests

Run: `pnpm --filter klard-web test --run`
Expected: All tests pass

### Step 2.8: Commit web magic link removal

```bash
git add -A klard-web/
git commit -m "feat(web): remove magic link authentication"
```

---

## Task 3: Remove Remember Me from klard-web

**Files:**
- Modify: `klard-web/src/components/auth/login-form.tsx`

### Step 3.1: Remove rememberMe from login-form.tsx

**File:** `klard-web/src/components/auth/login-form.tsx`

Remove rememberMe from form defaultValues (line 55):
```typescript
// BEFORE
defaultValues: {
  email: '',
  password: '',
  rememberMe: false,
},

// AFTER
defaultValues: {
  email: '',
  password: '',
},
```

Remove rememberMe watch (line 59):
```typescript
// DELETE
const rememberMe = watch('rememberMe');
```

Remove CheckboxField for remember me (lines 187-191):
```typescript
// DELETE
<CheckboxField
  checked={rememberMe}
  onChange={(checked) => setValue('rememberMe', checked)}
  label={t('auth.login.rememberMe')}
  disabled={isSubmitting}
/>
```

### Step 3.2: Run web typecheck

Run: `pnpm --filter klard-web exec tsc --noEmit`
Expected: No errors

### Step 3.3: Run web tests

Run: `pnpm --filter klard-web test --run`
Expected: All tests pass

### Step 3.4: Commit web remember me removal

```bash
git add klard-web/src/components/auth/login-form.tsx
git commit -m "feat(web): remove remember me checkbox from login"
```

---

## Task 4: Remove Magic Link from klard-mobile

**Files:**
- Modify: `klard-mobile/src/lib/auth-client.ts`
- Modify: `klard-mobile/src/components/auth/login-form/LoginForm.tsx`
- Modify: `klard-mobile/src/stores/auth-ui-store.ts`
- Modify: `klard-mobile/src/components/auth/index.ts`
- Delete: `klard-mobile/src/components/auth/magic-link-sent/` (entire directory)
- Modify: `klard-mobile/src/components/auth/login-form/__tests__/LoginForm.test.tsx`
- Modify: `klard-mobile/jest.setup.ts`

### Step 4.1: Remove magicLinkClient from mobile auth-client.ts

**File:** `klard-mobile/src/lib/auth-client.ts`

Remove magicLinkClient import (line 2):
```typescript
// BEFORE
import { magicLinkClient } from "better-auth/client/plugins";

// AFTER (remove the import entirely if nothing else from that path)
```

Remove magicLinkClient() from plugins array (line 34):
```typescript
// DELETE from plugins array
magicLinkClient(),
```

### Step 4.2: Remove magic link state from mobile auth-ui-store.ts

**File:** `klard-mobile/src/stores/auth-ui-store.ts`

Remove `'magicLinkSent'` from FormState type (line 3):
```typescript
// BEFORE
type FormState = 'login' | 'magicLinkSent';

// AFTER
type FormState = 'login';
```

Remove `magicLinkEmail` from state (line 8):
```typescript
// DELETE
magicLinkEmail: string | null;
```

Remove `setMagicLinkSent` from actions (line 13):
```typescript
// DELETE
setMagicLinkSent: (email: string) => void;
```

Remove initial state (line 22):
```typescript
// DELETE
magicLinkEmail: null,
```

Remove implementation (lines 34-39):
```typescript
// DELETE
setMagicLinkSent: (email) => set({
  uiState: 'magicLinkSent',
  magicLinkEmail: email,
}),
```

### Step 4.3: Delete magic-link-sent component directory

Run: `rm -rf klard-mobile/src/components/auth/magic-link-sent`

### Step 4.4: Remove MagicLinkSent export from auth/index.ts

**File:** `klard-mobile/src/components/auth/index.ts`

Remove export (line 4):
```typescript
// DELETE
export { MagicLinkSent } from './magic-link-sent';
```

### Step 4.5: Remove magic link from mobile LoginForm.tsx

**File:** `klard-mobile/src/components/auth/login-form/LoginForm.tsx`

Remove MagicLinkSchema import (line 8):
```typescript
// BEFORE
import { LoginSchema, MagicLinkSchema, type LoginInput } from '@klard-apps/commons';

// AFTER
import { LoginSchema, type LoginInput } from '@klard-apps/commons';
```

Remove MagicLinkSent import (line 16):
```typescript
// DELETE
import { MagicLinkSent } from '../magic-link-sent';
```

Remove 'magicLink' from PendingOperation type (line 22):
```typescript
// BEFORE
type PendingOperation = 'login' | 'magicLink' | null;

// AFTER
type PendingOperation = 'login' | null;
```

Remove magicLinkEmail and setMagicLinkSent from store destructuring (lines 33, 35):
```typescript
// DELETE these from the destructuring
magicLinkEmail,
setMagicLinkSent,
```

Remove entire handleMagicLink function (lines 114-157):
```typescript
// DELETE THIS ENTIRE FUNCTION
const handleMagicLink = async () => {
  // ... entire function body
};
```

Remove magicLink retry handling (line 197):
```typescript
// DELETE this case from the retry handler
if (pendingOperation === 'magicLink') {
  await handleMagicLink();
}
```

Remove MagicLinkSent conditional rendering (lines 210-211):
```typescript
// DELETE
if (uiState === 'magicLinkSent') {
  return <MagicLinkSent email={magicLinkEmail!} onBack={() => setUiState('login')} />;
}
```

Remove Magic Link button (lines 274-282):
```typescript
// DELETE
<Button
  variant="outline"
  onPress={handleMagicLink}
  disabled={isSubmitting}
  accessibilityLabel={t('auth.login.magicLinkButton')}
>
  {t('auth.login.magicLinkButton')}
</Button>
```

### Step 4.6: Remove magic link mocks from jest.setup.ts

**File:** `klard-mobile/jest.setup.ts`

Remove magicLinkClient mock (line 133):
```typescript
// DELETE
magicLinkClient: jest.fn(() => ({})),
```

### Step 4.7: Update mobile LoginForm tests

**File:** `klard-mobile/src/components/auth/login-form/__tests__/LoginForm.test.tsx`

Remove MagicLinkSent mock (lines 58-64):
```typescript
// DELETE
jest.mock('../magic-link-sent', () => ({
  MagicLinkSent: jest.fn(() => null),
}));
```

Remove magicLinkEmail and setMagicLinkSent from store mocks:
```typescript
// DELETE from mock stores
magicLinkEmail: null,
setMagicLinkSent: jest.fn(),
```

Remove all magic link related tests:
- "should call shake() on magic link failure" (lines 180-210)
- "should call haptics.success() on successful magic link sent" (lines 706-729)
- "should NOT call haptics.success() on magic link failure" (lines 771-789)

Remove signIn.magicLink mock setup from tests.

### Step 4.8: Run mobile typecheck

Run: `pnpm --filter klard-mobile exec tsc --noEmit`
Expected: No errors

### Step 4.9: Run mobile tests

Run: `pnpm --filter klard-mobile test`
Expected: All tests pass

### Step 4.10: Commit mobile magic link removal

```bash
git add -A klard-mobile/
git commit -m "feat(mobile): remove magic link authentication"
```

---

## Task 5: Remove Remember Me from klard-mobile

**Files:**
- Modify: `klard-mobile/src/components/auth/login-form/LoginForm.tsx`

### Step 5.1: Remove rememberMe from mobile LoginForm.tsx

**File:** `klard-mobile/src/components/auth/login-form/LoginForm.tsx`

Remove rememberMe from form defaultValues (line 51):
```typescript
// BEFORE
defaultValues: {
  email: '',
  password: '',
  rememberMe: false,
},

// AFTER
defaultValues: {
  email: '',
  password: '',
},
```

Remove rememberMe Controller field (lines 262-270):
```typescript
// DELETE
<Controller
  control={control}
  name="rememberMe"
  render={({ field: { value, onChange } }) => (
    <CheckboxField
      checked={value}
      onChange={onChange}
      label={t('auth.login.rememberMe')}
      disabled={isSubmitting}
    />
  )}
/>
```

### Step 5.2: Run mobile typecheck

Run: `pnpm --filter klard-mobile exec tsc --noEmit`
Expected: No errors

### Step 5.3: Run mobile tests

Run: `pnpm --filter klard-mobile test`
Expected: All tests pass

### Step 5.4: Commit mobile remember me removal

```bash
git add klard-mobile/src/components/auth/login-form/LoginForm.tsx
git commit -m "feat(mobile): remove remember me checkbox from login"
```

---

## Task 6: Remove from commons (shared schemas & translations)

**Files:**
- Modify: `commons/src/validation/auth.ts`
- Modify: `commons/src/locales/en.ts`

### Step 6.1: Remove rememberMe from LoginSchema

**File:** `commons/src/validation/auth.ts`

Remove rememberMe field (line 6):
```typescript
// BEFORE
export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean(),
});

// AFTER
export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
```

### Step 6.2: Remove MagicLinkSchema and related exports

**File:** `commons/src/validation/auth.ts`

Remove MagicLinkSchema (lines 9-11):
```typescript
// DELETE
export const MagicLinkSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});
```

Remove MagicLinkInput type (line 14):
```typescript
// DELETE
export type MagicLinkInput = z.infer<typeof MagicLinkSchema>;
```

Remove validateMagicLink function (lines 20-22):
```typescript
// DELETE
export function validateMagicLink(data: unknown) {
  return MagicLinkSchema.safeParse(data);
}
```

### Step 6.3: Remove magic link and remember me translations

**File:** `commons/src/locales/en.ts`

Remove rememberMe translation (line 14):
```typescript
// DELETE
rememberMe: "Remember me",
```

Remove magicLinkButton translation (line 15):
```typescript
// DELETE
magicLinkButton: "Sign in with email link",
```

Remove entire magicLink section (lines 25-29):
```typescript
// DELETE
magicLink: {
  title: "Check your email",
  description: "We sent a login link to",
  backToLogin: "Back to login"
},
```

Remove magic link error messages (lines 64, 66):
```typescript
// DELETE
magicLinkFailed: "Failed to send magic link",
// DELETE
invalidEmailForMagicLink: "Please enter a valid email to receive a magic link",
```

### Step 6.4: Build commons

Run: `pnpm --filter @klard-apps/commons build`
Expected: Build succeeds

### Step 6.5: Commit commons changes

```bash
git add commons/src/validation/auth.ts commons/src/locales/en.ts
git commit -m "feat(commons): remove remember me and magic link schemas/translations"
```

---

## Task 7: Final Verification

### Step 7.1: Run full monorepo typecheck

Run: `pnpm exec tsc --build`
Expected: No errors across all packages

### Step 7.2: Run all tests

Run: `pnpm test`
Expected: All tests pass

### Step 7.3: Run linting

Run: `pnpm lint`
Expected: No lint errors

### Step 7.4: Manual smoke test (optional)

1. Start auth server: `pnpm dev:auth`
2. Start web app: `pnpm dev:web`
3. Navigate to login page
4. Verify:
   - No "Remember me" checkbox visible
   - No "Sign in with email link" button visible
   - Standard email/password login works

---

## Files Changed Summary

### Deleted Files (4)
- `klard-web/src/components/auth/magic-link-success.tsx`
- `klard-mobile/src/components/auth/magic-link-sent/MagicLinkSent.tsx`
- `klard-mobile/src/components/auth/magic-link-sent/magic-link-sent.styles.ts`
- `klard-mobile/src/components/auth/magic-link-sent/index.ts`

### Modified Files (9)
- `klard-auth/src/lib/auth.ts`
- `klard-auth/tests/integration/auth.test.ts`
- `klard-web/src/lib/auth-client.ts`
- `klard-web/src/stores/auth-ui-store.ts`
- `klard-web/src/components/auth/login-form.tsx`
- `klard-web/src/components/auth/__tests__/login-form.test.tsx`
- `klard-mobile/src/lib/auth-client.ts`
- `klard-mobile/src/stores/auth-ui-store.ts`
- `klard-mobile/src/components/auth/login-form/LoginForm.tsx`
- `klard-mobile/src/components/auth/login-form/__tests__/LoginForm.test.tsx`
- `klard-mobile/src/components/auth/index.ts`
- `klard-mobile/jest.setup.ts`
- `commons/src/validation/auth.ts`
- `commons/src/locales/en.ts`

---

## Rollback Plan

If issues arise, revert the commits:
```bash
git log --oneline -7  # Find commit hashes
git revert <commit-hash>  # Revert specific commits
```

Or reset to before the changes:
```bash
git reset --hard HEAD~7  # Reset last 7 commits (DESTRUCTIVE)
```
