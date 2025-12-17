# klard-mobile

React Native (Expo 54) mobile app for Klard — a privacy-first subscription management platform.

## Features

- **Expo SDK 54** with managed workflow
- **Expo Router 6** for file-based navigation
- **Custom SVA Styling** (Style Variance Authority) for theming
- **better-auth/expo** for mobile authentication
- **Haptic feedback** integration
- **i18n-js** for internationalization
- **Jest** for testing

## Quick Start

```bash
# From monorepo root
pnpm install
pnpm dev:mobile

# Or from this directory
pnpm start
```

Scan the QR code with Expo Go app to run on device.

## Scripts

```bash
pnpm start        # Start Expo dev server
pnpm android      # Run on Android emulator
pnpm ios          # Run on iOS simulator
pnpm test         # Run tests (Jest)
pnpm lint         # Run ESLint
```

## Project Structure

```
src/
├── app/                    # Expo Router pages
│   ├── (auth)/             # Auth route group
│   ├── (tabs)/             # Tab navigation group
│   ├── _layout.tsx         # Root layout
│   └── index.tsx           # Entry screen
├── components/
│   └── ui/                 # UI components (35+)
├── hooks/                  # Custom hooks
├── lib/                    # Auth client, utilities
├── stores/                 # Zustand stores
└── styles/                 # SVA styling system
    ├── sva.ts              # Style Variance Authority
    └── colors.ts           # Theme colors
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native 0.81 + Expo 54 |
| Navigation | Expo Router 6 |
| Styling | Custom SVA (not Tailwind) |
| Auth | better-auth/expo |
| State | Zustand + AsyncStorage |
| i18n | i18n-js + expo-localization |
| Testing | Jest + React Native Testing Library |

## SVA Styling System

This app uses a **custom Style Variance Authority** system, not Tailwind:

```typescript
import { useThemeColors } from "@/hooks/useThemeColors";
import { buttonStyles } from "./Button.styles";

function Button({ variant = "primary", size = "md" }) {
  const { isDark } = useThemeColors();
  const styles = buttonStyles(isDark, { variant, size });

  return <Pressable style={styles.container}>...</Pressable>;
}
```

## Theme Colors

Access theme colors via hook:

```typescript
import { useThemeColors } from "@/hooks/useThemeColors";

function MyComponent() {
  const { colors, isDark } = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground }}>Hello</Text>
    </View>
  );
}
```

## Authentication

Uses `better-auth/expo` connecting to `klard-auth` service:

```typescript
import { authClient } from "@/lib/auth-client";

// Sign in with magic link
await authClient.signIn.magicLink({ email });

// Get session
const session = await authClient.getSession();
```

## Haptic Feedback

Use the haptics hook for touch feedback:

```typescript
import { useHaptics } from "@/hooks/useHaptics";

function MyButton({ onPress }) {
  const { light } = useHaptics();

  const handlePress = () => {
    light(); // Trigger haptic
    onPress?.();
  };

  return <Pressable onPress={handlePress}>...</Pressable>;
}
```

## Environment Variables

Configure in `app.json` or `.env`:

```bash
EXPO_PUBLIC_AUTH_URL=http://localhost:3050
```

## Related Documentation

- See `AGENTS.md` for AI assistant guidelines and patterns
- See root `CLAUDE.md` for monorepo-wide conventions