
You are an expert developer proficient in TypeScript, React 19, Next.js 16, shadcn/ui, Tailwind CSS 4, better-auth, and Zustand.

## MANDATORY: Library Documentation via Context7 MCP

**BEFORE any planning, implementation, refactoring, or modification work**, you MUST use the Context7 MCP to fetch current documentation for any library you will use:

1. Call `mcp__context7__resolve-library-id` with the library name to get the Context7-compatible ID
2. Call `mcp__context7__get-library-docs` with that ID to fetch up-to-date documentation

This is NON-NEGOTIABLE. Do not proceed with any work until you have read the relevant library documentation. This applies to:
- Next.js (App Router, data fetching, routing)
- React and React hooks
- Tailwind CSS 4 and styling
- shadcn/ui components
- Zustand state management
- Zod validation
- better-auth client
- Any third-party library being used or added

**Why:** Library APIs change frequently. Using outdated patterns causes bugs and wasted effort.

> **Note:** See root `CLAUDE.md` for full Context7 MCP usage details.

---

## Tech Stack

| Category | Technology | Notes |
|----------|------------|-------|
| Framework | Next.js 16 | App Router, React Server Components |
| React | React 19 | With React Compiler enabled |
| Styling | Tailwind CSS 4 | CSS variables, design tokens |
| Components | shadcn/ui | Radix UI primitives + Klard customizations |
| Auth | better-auth | React client with useSession |
| State | Zustand | For UI state (forms, modals) |
| i18n | i18next + react-i18next | Multi-language support |
| Validation | Zod | Schema validation |

---

## App Router Patterns

### Route Structure

```
app/
├── layout.tsx              # Root layout (ThemeProvider, I18nProvider)
├── globals.css             # Global styles + Tailwind
├── (auth)/                 # Auth route group
│   ├── layout.tsx          # Auth layout (split-panel design)
│   ├── login/page.tsx      # Login page
│   ├── signup/page.tsx     # Signup page
│   └── verify/page.tsx     # Email verification
├── (dashboard)/            # Protected route group
│   ├── layout.tsx          # Dashboard layout (sidebar, nav)
│   └── page.tsx            # Dashboard home
└── onboarding/page.tsx     # Onboarding flow
```

### Key Patterns

**Route Groups** - `(name)/` for organization without URL impact:
```typescript
// app/(auth)/layout.tsx - Auth-specific layout
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <AuthIllustration />
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
```

**Root Layout** - Providers at the root:
```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Reference:** `src/app/layout.tsx`, `src/app/(auth)/layout.tsx`

---

## Authentication

### better-auth Client Setup

```typescript
// src/lib/auth-client.ts
import { createAuthClient } from 'better-auth/react';
import { magicLinkClient, inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  plugins: [
    magicLinkClient(),
    inferAdditionalFields({
      user: { hasOnboarded: { type: "boolean", required: false } },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
```

### useAuthRedirect Hook

Handles auth-based redirects with SOLID principles:

```typescript
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

// Protected page - requires auth
useAuthRedirect({ requireAuth: true });

// Guest-only page - redirects authenticated users
useAuthRedirect({ requireAuth: false });

// Onboarding page - skip onboarding check
useAuthRedirect({ requireAuth: true, skipOnboardingCheck: true });
```

### Auth Flow

1. User visits protected route → `useAuthRedirect` checks session
2. No session → redirect to `/login`
3. Session exists, not onboarded → redirect to `/onboarding`
4. Session exists, onboarded → allow access

**Reference:** `src/lib/auth-client.ts`, `src/hooks/use-auth-redirect.ts`

---

## Component Patterns

### shadcn/ui as Foundation

**MANDATORY:** Use shadcn/ui components for all UI elements. Install via CLI:

```bash
npx shadcn@latest add button input card alert checkbox
```

### Usage Guidelines

- **Always prefer shadcn/ui** over custom implementations
- **Customize via variants** - Extend for Klard-specific styles
- **Use `cn()` utility** from `@/lib/utils` for class merging
- **Maintain accessibility** - shadcn/ui is accessible by default

### Klard Button Variants

```tsx
// Primary CTA
<Button variant="klard" size="lg">Sign In</Button>

// Social OAuth buttons
<Button variant="social">
  <GoogleIcon /> Continue with Google
</Button>
```

### Component Customization

1. Modify component file in `src/components/ui/`
2. Use CSS variables from Klard design system (HSL format)
3. Extend variants rather than overriding base styles
4. Document custom variants added

**Reference:** `src/components/ui/button.tsx`, `src/lib/utils.ts`

### Component File Naming

| File Type | Convention | Example |
|-----------|------------|---------|
| Folder | kebab-case | `button/`, `alert-card/` |
| Component | kebab-case | `button.tsx`, `alert-card.tsx` |
| Styles | kebab-case | `button.styles.ts` |
| Stories | kebab-case | `button.stories.tsx` |
| Index | lowercase | `index.ts` |

---

## Form Handling

### react-hook-form + Zod Pattern

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginInput } from '@klard-apps/commons';

function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginInput) => {
    // Handle submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

### Field Components

Pre-built field components with consistent styling:
- `InputField` - Text inputs with labels
- `SelectField` - Dropdown selections
- `CheckboxField` - Checkbox with label

**Reference:** `src/components/ui/input-field.tsx`

---

## State Management

### Zustand for UI State

```typescript
// src/stores/auth-ui-store.ts
import { create } from 'zustand';

interface AuthUIState {
  email: string;
  setEmail: (email: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthUIStore = create<AuthUIState>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
```

### When to Use What

| Need | Solution |
|------|----------|
| Auth session | `useSession()` from better-auth |
| Form state | react-hook-form |
| Shared UI state | Zustand store |
| Server data | React Query (future) |

**Reference:** `src/stores/auth-ui-store.ts`

---

## Custom Hooks

All hooks follow SOLID principles with documented comments:

| Hook | Purpose | Location |
|------|---------|----------|
| `useAuthRedirect` | Auth-based navigation | `src/hooks/use-auth-redirect.ts` |
| `useAuthError` | Auth error formatting | `src/hooks/use-auth-error.ts` |
| `useOnboarding` | Onboarding flow state | `src/hooks/use-onboarding.ts` |
| `useMobile` | Mobile viewport detection | `src/hooks/use-mobile.ts` |
| `useDebounce` | Debounced values | `src/hooks/use-debounce.ts` |
| `useFormFieldIds` | Unique form field IDs | `src/hooks/use-form-field-ids.ts` |

### Hook Design Principles

```typescript
/**
 * Hook documentation with SOLID comments:
 *
 * SRP: Only handles redirect logic based on auth state
 * OCP: Extensible via options (routes are configurable)
 * DIP: All routes are injectable via options
 * ISP: Returns focused interface with only auth state info
 */
export function useAuthRedirect(options: AuthRedirectOptions = {}): AuthRedirectResult {
  // Implementation
}
```

**Reference:** `src/hooks/`

---

## Testing

### Stack

- **Framework:** Vitest
- **Library:** React Testing Library
- **Environment:** jsdom
- **Location:** `src/__tests__/`

### Running Tests

```bash
pnpm test:run           # Run all tests
pnpm test               # Watch mode
pnpm test -- --coverage # With coverage
```

### Test Pattern

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

**Reference:** `src/__tests__/`, `src/__tests__/setup.ts`

---

## Storybook

Component development and documentation using Storybook 10.

### Running Storybook

```bash
pnpm storybook           # Start at localhost:6006
pnpm storybook:build     # Build static storybook
```

### Writing Stories

```typescript
// button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'klard', children: 'Click me' },
};
```

**Reference:** `.storybook/`, `src/components/ui/*/*.stories.tsx`

---

## Code Style

- **TypeScript:** Strict mode, prefer interfaces over types
- **Components:** Functional only, named exports
- **Directories:** lowercase-kebab-case (`components/auth-wizard`)
- **Files:** lowercase-kebab-case for utilities, PascalCase for components
- **Imports:** Absolute `@/` paths, grouped logically

### Naming Conventions

```typescript
// State variables with descriptive prefixes
const isLoading = true;
const hasError = false;
const canSubmit = true;

// Event handlers
const handleSubmit = () => {};
const onValueChange = (value) => {};

// Function keyword for pure functions
function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
```

---

## UI and Styling

### Tailwind CSS 4

- Always read `docs/design/` when styling components
- Responsive-first approach (`sm:`, `md:`, `lg:` prefixes)
- Use CSS variables for design tokens
- Dark mode via `dark:` variant

### Design System Colors

```css
/* Primary teal palette */
--primary: #0D7C7A (light) / #15B5B0 (dark)
--background: #FFFFFF (light) / #0F172A (dark)
--foreground: #0F172A (light) / #F8FAFC (dark)
```

### Glassmorphism Pattern

```tsx
<div className="
  bg-[var(--card)]/80 backdrop-blur-[12px]
  border border-[var(--border)]
  rounded-[var(--radius-lg)]
  shadow-[0_2px_12px_rgba(15,23,42,0.08)]
">
  {children}
</div>
```

**Reference:** `docs/design/Klard Design System.md`

### Design Tokens Structure

The design system uses modular CSS files in `src/styles/`:

```
src/styles/
├── tokens/              # CSS custom properties
│   ├── animation.css    # Transition & animation tokens
│   ├── focus.css        # Focus ring styles
│   ├── glassmorphism.css # Glass effects
│   ├── radius.css       # Border radius scale
│   ├── shadows.css      # Shadow tokens
│   └── spacing.css      # Spacing scale
├── themes/              # Theme-specific colors
│   ├── light.css        # Light theme variables
│   └── dark.css         # Dark theme variables
├── components.css       # Component-specific styles
├── utilities.css        # Utility classes
└── index.ts             # TypeScript exports
```

Import order in `globals.css`:
```css
@import "tailwindcss";
@import "../styles/index.css";  /* Design system */
```

**Reference:** `src/styles/`, `docs/design/tokens-reference.md`

---

## Internationalization

### Setup

```typescript
// Already configured in app/layout.tsx via I18nProvider
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('welcome.title')}</h1>;
}
```

### Key Rules

- All user-facing text through i18next
- No hardcoded strings in components
- Support RTL where applicable

**Reference:** `src/components/providers/i18n-provider.tsx`

---

## Error Handling

- Guard early with early returns
- Handle errors at function start
- User-friendly error messages
- Use `useAuthError` hook for auth errors

```typescript
function handleSubmit(data: FormData) {
  // Guard clauses first
  if (!data.email) {
    setError('Email is required');
    return;
  }

  // Happy path
  try {
    await submitData(data);
  } catch (error) {
    setError(formatError(error));
  }
}
```

---

## Performance

- Use dynamic imports for code splitting
- Implement lazy loading for non-critical components
- Optimize images with Next.js Image component
- Minimize `useEffect` usage - prefer derived state