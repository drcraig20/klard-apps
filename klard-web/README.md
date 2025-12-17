# klard-web

Next.js 16 web application for Klard — a privacy-first subscription management platform.

## Features

- **App Router** with React Server Components
- **React 19** with React Compiler enabled
- **Tailwind CSS 4** with Klard design system
- **shadcn/ui** components with custom Klard variants
- **better-auth** for authentication (magic link, email OTP)
- **i18next** for internationalization
- **Vitest** for testing

## Quick Start

```bash
# From monorepo root
pnpm install
pnpm dev:web

# Or from this directory
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Run production build
pnpm lint         # Run ESLint
pnpm test         # Run tests (Vitest)
pnpm test:run     # Run tests once
```

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── (auth)/             # Auth route group (login, signup)
│   ├── (dashboard)/        # Protected route group
│   ├── layout.tsx          # Root layout with providers
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── auth/               # Auth-specific components
│   └── providers/          # Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and auth client
└── stores/                 # Zustand stores
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| React | React 19 + React Compiler |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui (Radix UI) |
| Auth | better-auth client |
| State | Zustand |
| i18n | i18next + react-i18next |
| Testing | Vitest + React Testing Library |

## Authentication

Uses `better-auth` client connecting to `klard-auth` service:

```typescript
import { useSession, signIn, signOut } from '@/lib/auth-client';

// Check auth state
const { data: session, isPending } = useSession();

// Sign in with magic link
await signIn.magicLink({ email: 'user@example.com' });
```

## Environment Variables

```bash
NEXT_PUBLIC_AUTH_URL=http://localhost:3050  # Auth server URL
```

## Adding Components

Install shadcn/ui components:

```bash
npx shadcn@latest add button input card
```

## Related Documentation

- See `AGENTS.md` for AI assistant guidelines and patterns
- See root `CLAUDE.md` for monorepo-wide conventions
- See `docs/design/Klard Design System.md` for design specs