# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MANDATORY: Library Documentation via Context7 MCP

**BEFORE any planning, implementation, refactoring, or modification work**, you MUST use the Context7 MCP to fetch current documentation for any library you will use:

1. Call `mcp__context7__resolve-library-id` with the library name to get the Context7-compatible ID
2. Call `mcp__context7__get-library-docs` with that ID to fetch up-to-date documentation

This is NON-NEGOTIABLE. Applies to: better-auth, Express 5, pg (PostgreSQL), Zod.

> **Note:** See root `CLAUDE.md` for full Context7 MCP usage and skill activation requirements.

---

## MANDATORY: Skill Evaluation

Before implementation work, evaluate available skills per root `CLAUDE.md` requirements.

## MANDATORY: SOLID Principles

All code must follow SOLID principles. Use `Skill(solid-design-principles)` for implementation guidance.

---

## Commands

```bash
pnpm dev              # Start dev server with hot reload
pnpm build            # TypeScript compilation to build/
pnpm start            # Run production build
pnpm typecheck        # Type checking only
pnpm lint             # Biome linter
pnpm lint:fix         # Auto-fix lint issues
pnpm test             # Run all tests (vitest run)
pnpm test:watch       # Tests in watch mode (vitest)
pnpm test:coverage    # Run tests with coverage
pnpm test -- tests/unit/config.test.ts  # Run single test file
pnpm check            # Run typecheck + lint + test
```

---

## Architecture

**Express 5 auth service** using better-auth with PostgreSQL. Acts as resource server for klard-api.

### Entry Points

- `src/index.ts` - Server bootstrap with graceful shutdown
- `src/app.ts` - Express app factory with middleware stack

### Middleware Stack (Order Critical!)

```typescript
// Middleware applied in this order:
1. helmet()           // Security headers
2. compression()      // Response compression
3. cors()             // CORS with trustedOrigins
4. rateLimiter        // Global rate limiting
5. auth.handler       // better-auth routes (/api/auth/*)
6. errorHandler       // KlardExceptionHandler
```

**Reference:** `src/app.ts`

---

## Authentication Features

### 7 Auth Methods

| Method | Plugin | Configuration |
|--------|--------|---------------|
| **Email/Password** | Core | 8-128 char passwords |
| **Magic Link** | `magicLink()` | 15-minute expiry |
| **Email OTP** | `emailOTP()` | 6-digit, 10-minute, 3 attempts |
| **OAuth** | Core | Google, GitHub, Apple (conditional) |
| **Account Linking** | Core | Auto-link trusted providers |
| **Bearer Token** | `bearer()` | Mobile API auth |
| **JWT/JWKS** | `jwt()` | RS256, 30-day rotation |

### Auth Setup

```typescript
// src/lib/auth.ts
export const auth = betterAuth({
  database: new Pool({ connectionString: config.databaseUrl }),
  baseURL: config.betterAuthUrl,
  secret: config.betterAuthSecret,

  emailAndPassword: { enabled: true, minPasswordLength: 8 },

  socialProviders: {
    google: { clientId, clientSecret },  // If credentials present
    github: { clientId, clientSecret },
    apple: { clientId, clientSecret },
  },

  plugins: [
    expo(),           // Mobile support
    openAPI(),        // API documentation
    emailOTP({ ... }),
    magicLink({ ... }),
    jwt({ ... }),
    bearer(),
  ],
});
```

**Reference:** `src/lib/auth.ts`

---

## Session Management

```typescript
session: {
  expiresIn: 60 * 60 * 24 * 5,  // 5 days
  updateAge: 60 * 60 * 24,      // 24-hour sliding window
  cookieCache: {
    enabled: true,
    maxAge: 60 * 5,              // 5-minute cache
  },
}
```

### How Sliding Window Works

1. User authenticates → session created (5-day expiry)
2. User active within 24 hours → expiry extended
3. User inactive for 5 days → session expires
4. Cookie cached for 5 minutes to reduce DB queries

---

## Rate Limiting

### Global Limits

```typescript
rateLimit: {
  enabled: true,          // RATE_LIMIT_ENABLED env
  storage: "database",
  window: 60,             // 60 seconds
  max: 100,               // 100 requests per window
}
```

### Endpoint-Specific Limits

| Endpoint | Window | Max Requests |
|----------|--------|--------------|
| `/sign-in/email` | 10s | 5 |
| `/sign-up/email` | 60s | 3 |
| `/forgot-password` | 60s | 3 |
| `/two-factor/verify` | 10s | 3 |

**Configuration:** All limits configurable via environment variables.

**Reference:** `src/config/index.ts`

---

## Configuration

### Required Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `BETTER_AUTH_SECRET` | Signing secret (min 32 chars) | Required |
| `BETTER_AUTH_URL` | Auth server base URL | `http://localhost:3050` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | None |

### OAuth (Optional - Only Enabled if Present)

| Variable | Provider |
|----------|----------|
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth |
| `APPLE_CLIENT_ID`, `APPLE_CLIENT_SECRET` | Apple OAuth |

### OTP Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `OTP_LENGTH` | 6 | OTP digit count |
| `OTP_EXPIRES_IN` | 600 | Expiry in seconds (10 min) |
| `OTP_MAX_ATTEMPTS` | 3 | Max verification attempts |

### JWT Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_ALGORITHM` | RS256 | Signing algorithm |
| `JWT_ROTATION_INTERVAL` | 30 days | Key rotation period |
| `JWT_GRACE_PERIOD` | 7 days | Old key validity |

**Reference:** `src/config/index.ts`

---

## Email Service

### Current Implementation (Development)

```typescript
// src/services/email.ts
export async function sendEmail(options: EmailOptions): Promise<void> {
  // Development: logs to console
  console.log(`[Email] To: ${options.to}, Subject: ${options.subject}`);
}
```

### Email Types

| Type | Subject | Trigger |
|------|---------|---------|
| Email OTP (sign-in) | "Your Klard sign-in code" | OTP login |
| Email OTP (verify) | "Verify your Klard email" | Email verification |
| Email OTP (reset) | "Reset your Klard password" | Password reset |
| Magic Link | "Sign in to Klard" | Passwordless login |

**Reference:** `src/services/email.ts`

---

## Exception System

Typed exception handling with structured error responses:

### Components

1. **KlardExceptionType** - Static definitions with HTTP status, error code, log/alert levels, lookup code, and message template with `{0}` placeholders
2. **KlardException** - Runtime exception carrying a type, formats message with positional args
3. **KlardExceptionFactory** - Creates exceptions: `KlardExceptionFactory.create(KlardExceptionType.INVALID_REQUEST, "details")`
4. **KlardErrorResponse** - JSON response DTO with `error`, `errorDescription`, `lookupCode`, `status`, `timestamp`
5. **KlardExceptionHandler** - Express middleware mapping exceptions to responses

### Lookup Codes

Lookup codes use prefix `010.` for this service (for tracing across microservices).

**Reference:** `src/exceptions/`

---

## Testing

### Stack

- **Framework:** Vitest
- **Integration:** supertest
- **Location:** `tests/unit/`, `tests/integration/`

### Running Tests

```bash
pnpm test                              # All tests (vitest run)
pnpm test:watch                        # Watch mode (vitest)
pnpm test:coverage                     # With coverage
pnpm test -- tests/unit/config.test.ts # Single file
```

### Test Patterns

```typescript
// Unit test example
import { describe, it, expect, vi } from 'vitest';
import { config } from '../src/config';

describe('Config', () => {
  it('parses allowed origins', () => {
    process.env.ALLOWED_ORIGINS = 'http://localhost:3000,http://localhost:3001';
    expect(config.allowedOrigins).toEqual([
      'http://localhost:3000',
      'http://localhost:3001'
    ]);
  });
});

// Integration test example
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';

describe('Health endpoint', () => {
  it('returns 200', async () => {
    const app = createApp();
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });
});
```

**Reference:** `tests/unit/`, `tests/integration/`

---

## Code Style

- **Biome** for linting/formatting (double quotes, semicolons, 2-space indent, 100 char lines)
- **TypeScript strict mode** with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- **Named exports** preferred over default exports
- **Early returns** for guard clauses

### File Structure

```
src/
├── index.ts        # Entry point
├── app.ts          # Express app factory
├── config/         # Environment configuration
├── exceptions/     # Error handling system
├── lib/            # better-auth setup
└── services/       # Business logic (email)

tests/
├── unit/           # Unit tests
└── integration/    # API tests
```