# klard-auth

Authentication backend for Klard. Handles user registration, authentication, and session management using **better-auth** with PostgreSQL.

## Features

- **7 Authentication Methods**
  - Email/Password (8-128 char passwords)
  - Magic Link (15-minute expiry)
  - Email OTP (6-digit, 10-minute expiry)
  - OAuth (Google, GitHub, Apple)
  - Account Linking
  - Bearer Token (for mobile)
  - JWT/JWKS (RS256)

- **Session Management**
  - 5-day session expiration
  - 24-hour sliding window refresh
  - Cookie caching for performance

- **Security**
  - Rate limiting per endpoint
  - CORS with trusted origins
  - Helmet security headers

## Requirements

- Node.js >= 20.0.0
- PostgreSQL database
- pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Create .env file (see Environment Variables below)

# Start development server
pnpm dev
```

Server runs at `http://localhost:3050`

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Signing secret (min 32 chars) |
| `BETTER_AUTH_URL` | Auth server URL (default: `http://localhost:3050`) |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins |

### OAuth (Optional)

| Variable | Provider |
|----------|----------|
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub OAuth |
| `APPLE_CLIENT_ID`, `APPLE_CLIENT_SECRET` | Apple OAuth |

### Rate Limiting

| Variable | Default | Description |
|----------|---------|-------------|
| `RATE_LIMIT_ENABLED` | `true` | Enable rate limiting |
| `RATE_LIMIT_WINDOW` | `60` | Window in seconds |
| `RATE_LIMIT_MAX` | `100` | Max requests per window |

## Scripts

```bash
pnpm dev           # Start dev server with hot reload
pnpm build         # Build for production
pnpm start         # Run production build
pnpm test          # Run tests
pnpm test:watch    # Tests in watch mode
pnpm typecheck     # TypeScript type checking
pnpm lint          # Run Biome linter
pnpm lint:fix      # Auto-fix lint issues
pnpm check         # Run all checks (typecheck + lint + test)
```

## Tech Stack

- **Express 5** - Web framework
- **better-auth** - Authentication with magic link, OTP, OAuth
- **PostgreSQL** - Database (via pg)
- **TypeScript** - Strict mode enabled
- **Biome** - Linting and formatting
- **Vitest** - Testing

## Project Structure

```
src/
├── index.ts        # Server entry point
├── app.ts          # Express app factory
├── config/         # Environment configuration
├── exceptions/     # Error handling system
├── lib/            # better-auth setup
└── services/       # Business logic (email)

tests/
├── unit/           # Unit tests
└── integration/    # API tests
```

## API Endpoints

All auth routes are prefixed with `/api/auth/`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/sign-up/email` | POST | Register with email/password |
| `/sign-in/email` | POST | Login with email/password |
| `/sign-in/magic-link` | POST | Send magic link email |
| `/sign-in/email-otp` | POST | Send OTP code |
| `/verify-email-otp` | POST | Verify OTP code |
| `/sign-out` | POST | End session |
| `/session` | GET | Get current session |

See `/api/auth/reference` for OpenAPI documentation.

## Related Documentation

- See `CLAUDE.md` for AI assistant guidelines and detailed patterns
- See root `CLAUDE.md` for monorepo-wide conventions