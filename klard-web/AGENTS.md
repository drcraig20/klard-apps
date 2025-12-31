<!-- Last Updated: 2025-12-30 | klard-web -->

Expert in TypeScript, React 19, Next.js 16, shadcn/ui, Tailwind CSS 4.

> **Prerequisites:** Read root `CLAUDE.md` first for shared patterns, versions, auth architecture, state management, and design tokens.

## Context7 MCP

```bash
mcp__context7__resolve-library-id  # Get library ID
mcp__context7__query-docs          # Fetch docs
```

**Required for:** Next.js, React, Tailwind CSS 4, shadcn/ui, Zustand, Zod, better-auth, react-hook-form.

---

## App Router Patterns

```
app/
├── layout.tsx              # Root (ThemeProvider, I18nProvider)
├── globals.css             # Global styles + Tailwind
├── (auth)/                 # Auth route group (split-panel layout)
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (dashboard)/            # Protected routes (sidebar layout)
└── onboarding/page.tsx
```

**Route Groups** - `(name)/` for layout isolation without URL impact.

**Reference:** `src/app/layout.tsx`, `src/app/(auth)/layout.tsx`

---

## shadcn/ui Components

```bash
npx shadcn@latest add button input card alert checkbox
```

- **Always prefer shadcn/ui** over custom implementations
- **Customize via variants** in `src/components/ui/`
- **Use `cn()` utility** from `@/lib/utils` for class merging

```tsx
<Button variant="klard" size="lg">Sign In</Button>
<Button variant="social"><GoogleIcon /> Continue with Google</Button>
```

---

## Form Handling

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginInput } from '@klard-apps/commons';

const form = useForm<LoginInput>({
  resolver: zodResolver(LoginSchema),
  defaultValues: { email: '', password: '' },
});
```

**Reference:** `src/components/ui/input-field.tsx`

---

## Custom Hooks

| Hook | Purpose |
|------|---------|
| `useAuthRedirect` | Auth-based navigation with onboarding check |
| `useAuthError` | Auth error formatting |
| `useOnboarding` | Onboarding flow state |
| `useMobile` | Mobile viewport detection |
| `useDebounce` | Debounced values |
| `useFormFieldIds` | Unique form field IDs |

---

## Testing

```bash
pnpm test:run           # Run all tests
pnpm test               # Watch mode
pnpm test -- --coverage # With coverage
```

---

## Storybook

```bash
pnpm storybook           # Start at localhost:6006
pnpm storybook:build     # Build static
```

---

## Styling

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

### Design Tokens Structure

```
src/styles/
├── tokens/           # animation, focus, glassmorphism, radius, shadows, spacing
├── themes/           # light.css, dark.css
├── components.css
└── utilities.css
```

**Reference:** `docs/design/tokens-reference.md`, `src/styles/`

---

## i18n

All user-facing text through `useTranslation()`. No hardcoded strings.

**Reference:** `src/components/providers/i18n-provider.tsx`

---

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Folder | kebab-case | `alert-card/` |
| Component | kebab-case | `alert-card.tsx` |
| Styles | kebab-case | `button.styles.ts` |
| Stories | kebab-case | `button.stories.tsx` |

---

## Performance

- Dynamic imports for code splitting
- Lazy loading for non-critical components
- Next.js Image for optimized images
- Minimize `useEffect` - prefer derived state
