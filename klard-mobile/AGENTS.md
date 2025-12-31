<!-- Last Updated: 2025-12-30 | Applies to: klard-mobile package -->

You are an expert in TypeScript, React Native, Expo 54, and Mobile UI development.

## MANDATORY: Library Documentation via Context7 MCP

Before any implementation work, fetch current library documentation:

1. `mcp__context7__resolve-library-id` → get library ID
2. `mcp__context7__query-docs` → fetch documentation

**Required for:** Expo SDK 54, React Native 0.83, Expo Router 6, Zustand, better-auth/expo.

> See root `CLAUDE.md` for full Context7 usage details and skill activation requirements.

---

## MANDATORY: Expo SDK First

**ALWAYS prefer Expo SDK packages over React Native core imports:**

| Instead of (React Native) | Use (Expo SDK) |
|--------------------------|----------------|
| `react-native` Linking | `expo-linking` |
| `react-native` Image | `expo-image` |
| `react-native-async-storage` | `expo-secure-store` (for sensitive data) |
| `react-native-permissions` | `expo-permissions` |
| `react-native-fs` | `expo-file-system` |
| `react-native-camera` | `expo-camera` |
| `react-native-device-info` | `expo-device` |
| `react-native-localize` | `expo-localization` |

**Only use React Native core when:**
1. Expo SDK has no equivalent package
2. The Expo package lacks required functionality
3. Explicit documentation states React Native is required

**Why:** Expo SDK packages are optimized for Expo managed workflow, have better TypeScript support, and receive coordinated updates.

---

## Tech Stack

| Category | Technology | Notes |
|----------|------------|-------|
| Framework | React Native 0.83 + Expo 54 | Managed workflow |
| Navigation | Expo Router 6 | File-based routing (NOT react-navigation) |
| Styling | Custom SVA System | Style Variance Authority (NOT Tailwind/styled-components) |
| Auth | better-auth/expo | Platform-specific auth client |
| i18n | i18n-js + expo-localization | Multi-language support |
| State | Zustand | With AsyncStorage persistence |

---

## Expo Router Patterns

**File-based routing in `app/` directory:**

```
app/
├── _layout.tsx          # Root layout with providers
├── index.tsx            # Home/entry screen
├── (auth)/              # Auth route group
│   ├── _layout.tsx      # Auth-specific layout
│   ├── login.tsx        # Login screen
│   └── register.tsx     # Register screen
├── (tabs)/              # Tab navigation group
│   ├── _layout.tsx      # Tab bar configuration
│   ├── home.tsx         # Home tab
│   └── settings.tsx     # Settings tab
└── [id].tsx             # Dynamic route
```

**Key patterns:**
- Route groups `(name)/` for logical organization without affecting URL
- `_layout.tsx` for shared navigation structure
- Dynamic routes with `[param].tsx`
- Use `useRouter()` and `useLocalSearchParams()` hooks

**Reference:** `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`

---

## SVA Styling System

**CRITICAL: This app uses a custom Style Variance Authority (SVA) system, NOT Tailwind or styled-components.**

### How SVA Works

Pre-compiled style objects for light/dark themes with variant support:

```typescript
// Usage pattern
import { useThemeColors } from "@/hooks/useThemeColors";
import { buttonStyles } from "./Button.styles";

function Button({ variant = "primary", size = "md" }) {
  const { isDark } = useThemeColors();
  const styles = buttonStyles(isDark, { variant, size });

  return <Pressable style={styles.container}>...</Pressable>;
}
```

### SVA Function Signature

```typescript
sva(isDark: boolean, options: { variant?: string; size?: string }): StyleSheet
```

### Creating New Styles

```typescript
// Component.styles.ts
import { createSVA } from "@/styles/sva";
import { colors } from "@/styles/colors";

export const componentStyles = createSVA({
  base: (isDark) => ({
    container: {
      backgroundColor: isDark ? colors.dark.background : colors.light.background,
    },
  }),
  variants: {
    variant: {
      primary: (isDark) => ({ /* primary styles */ }),
      secondary: (isDark) => ({ /* secondary styles */ }),
    },
    size: {
      sm: () => ({ /* small size */ }),
      md: () => ({ /* medium size */ }),
    },
  },
});
```

**Reference:** `src/styles/sva.ts`, `src/styles/colors.ts`

### Color System Structure

Colors are organized in `src/styles/colors/`:

```
src/styles/colors/
├── palette.ts    # Raw color values (hex codes)
├── semantic.ts   # Semantic mappings (success, error, etc.)
├── light.ts      # Light theme color set
├── dark.ts       # Dark theme color set
└── index.ts      # Unified exports
```

Import pattern:
```typescript
import { lightColors, darkColors } from "@/styles/colors";
// or
import { Colors } from "@/styles/colors";
const theme = Colors[isDark ? 'dark' : 'light'];
```

---

## Theme System

### useThemeColors Hook

Primary hook for accessing theme colors:

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

### Color Tokens

120+ color tokens per theme. Key semantic tokens:

| Token | Usage |
|-------|-------|
| `primary` | CTAs, interactive elements |
| `background` | Base backgrounds |
| `foreground` | Primary text |
| `success` | Positive states |
| `error` | Error states |
| `muted` | Secondary backgrounds |

> **Full color reference:** See `docs/design/tokens-reference.md` for complete light/dark hex values.

**Reference:** `src/hooks/useThemeColors.ts`, `src/styles/colors/`

### ThemeContext Provider

For components needing theme context without hooks:

```typescript
// src/contexts/ThemeContext.tsx
import { ThemeContext, useTheme } from "@/contexts";

// In _layout.tsx - wrap app with provider
<ThemeContext.Provider value={{ isDark, toggleTheme }}>
  {children}
</ThemeContext.Provider>

// In components - use context or hook
const { isDark } = useTheme();
```

**Reference:** `src/contexts/ThemeContext.tsx`

---

## Component Patterns

### File Structure

```
components/ui/Button/
├── Button.tsx           # Component implementation
├── Button.styles.ts     # SVA styles
├── Button.constants.ts  # Variants, sizes (optional)
└── index.ts             # Re-export
```

### Component File Naming

| File Type | Convention | Example |
|-----------|------------|---------|
| Folder | PascalCase | `Button/`, `AlertCard/` |
| Component | PascalCase | `Button.tsx`, `AlertCard.tsx` |
| Styles | kebab-case | `button.styles.ts` |
| Stories | kebab-case | `button.stories.tsx` |
| Index | lowercase | `index.ts` |

Note: Styles files use kebab-case for cross-platform alignment with web.

### 35+ UI Components

Located in `src/components/ui/`:
- **Inputs:** Button, TextInput, Checkbox, Switch, SelectDropdown
- **Display:** Card, Badge, Avatar, ProgressBar
- **Feedback:** Toast, Modal, BottomSheet, Skeleton
- **Navigation:** TabBar, Header, BackButton
- **Layout:** Container, Divider, SafeAreaWrapper

### Haptic Feedback Integration

All interactive components should include haptic feedback:

```typescript
import { useHaptics } from "@/hooks/useHaptics";

function Button({ onPress }) {
  const { light, medium } = useHaptics();

  const handlePress = () => {
    light(); // Trigger haptic
    onPress?.();
  };

  return <Pressable onPress={handlePress}>...</Pressable>;
}
```

### Accessibility Props Pattern

```typescript
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Submit form"
  accessibilityHint="Submits your registration"
  accessibilityState={{ disabled: isLoading }}
>
  ...
</Pressable>
```

**Reference:** `src/components/ui/Button/`

---

## Haptic Feedback

### useHaptics Hook

9 feedback types for different interactions:

```typescript
import { useHaptics } from "@/hooks/useHaptics";

function MyComponent() {
  const haptics = useHaptics();

  // Available methods:
  haptics.light();      // Light tap - buttons, toggles
  haptics.medium();     // Medium tap - selections
  haptics.heavy();      // Heavy tap - significant actions
  haptics.success();    // Success notification
  haptics.warning();    // Warning notification
  haptics.error();      // Error notification
  haptics.selection();  // Selection change
  haptics.rigid();      // Rigid impact
  haptics.soft();       // Soft impact
}
```

**Reference:** `src/hooks/useHaptics.ts`

---

## Authentication

### better-auth/expo Client

```typescript
import { authClient } from "@/lib/auth-client";

// Sign in with magic link
await authClient.signIn.magicLink({ email });

// Get current session
const session = await authClient.getSession();

// Sign out
await authClient.signOut();
```

### Platform-Specific URLs

The auth client automatically handles platform-specific callback URLs:
- iOS: `klard://auth/callback`
- Android: `klard://auth/callback`
- Dev: Uses Expo proxy

**Reference:** `src/lib/auth-client.ts`

---

## State Management

### Zustand with AsyncStorage

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSubscriptionStore = create(
  persist(
    (set) => ({
      subscriptions: [],
      addSubscription: (sub) => set((s) => ({
        subscriptions: [...s.subscriptions, sub]
      })),
    }),
    {
      name: "subscription-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

**Reference:** `src/stores/subscriptionStore.ts`

---

## Custom Hooks

All hooks follow SOLID principles with documented comments:

| Hook | Purpose |
|------|---------|
| `useThemeColors` | Theme colors and dark mode detection |
| `useHaptics` | Haptic feedback triggers |
| `useKeyboard` | Keyboard visibility and height |
| `useRefreshControl` | Pull-to-refresh logic |
| `useDebounce` | Debounced values |

**Reference:** `src/hooks/`

---

## Testing

### Stack
- **Framework:** Jest + jest-expo
- **Library:** React Native Testing Library
- **Location:** `src/__tests__/`

### Running Tests

```bash
pnpm test                           # Run all tests
pnpm test -- --watch               # Watch mode
pnpm test -- --coverage            # With coverage
pnpm test -- src/__tests__/Button  # Single test
```

### Test Pattern

```typescript
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Button onPress={onPress}>Click me</Button>
    );

    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

**Reference:** `src/__tests__/`, `jest.setup.ts`

---

## Storybook

React Native component development using Storybook with react-native-web.

### Running Storybook

```bash
pnpm storybook           # Start at localhost:6007
pnpm storybook:build     # Build static storybook
```

Stories use react-native-web for browser rendering.

**Reference:** `.storybook-web/`, `src/components/ui/*/*.stories.tsx`

---

## Code Style

- **TypeScript:** Strict mode, prefer interfaces over types
- **Components:** Functional only, named exports
- **Directories:** lowercase-kebab-case
- **Files:** PascalCase for components, camelCase for utilities
- **Imports:** Absolute `@/` paths, grouped by type

### Naming Conventions

```typescript
// Variables with state
const isLoading = true;
const hasError = false;
const canSubmit = true;

// Event handlers
const handlePress = () => {};
const onValueChange = (value) => {};

// Hooks
const useThemeColors = () => {};
const useHaptics = () => {};
```

---

## Internationalization

### Setup

```typescript
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
```

### Usage

```typescript
import { i18n } from "@/lib/i18n";

function WelcomeScreen() {
  return <Text>{i18n.t("welcome.title")}</Text>;
}
```

**Reference:** `src/lib/i18n.ts`, `src/locales/`

---

## Performance Guidelines

- Use `FlatList`/`SectionList` for lists, never `ScrollView` with `map()`
- Memoize expensive computations with `useMemo`
- Wrap event handlers in `useCallback` when passed as props
- Use `expo-image` for optimized image loading
- Profile with React DevTools and Expo performance tools

---

## Safe Area Management

```typescript
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// In _layout.tsx
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

Use `edges` prop to control which edges apply safe area insets.