<!-- Last Updated: 2025-12-30 | klard-mobile -->

Expert in TypeScript, React Native 0.83, Expo 54, Expo Router 6.

> **Prerequisites:** Read root `CLAUDE.md` first for shared patterns, versions, auth architecture, state management, and design tokens.

## Context7 MCP

Fetch docs before implementing: `mcp__context7__resolve-library-id` → `mcp__context7__query-docs`

Required for: Expo SDK 54, React Native 0.83, Expo Router 6, better-auth/expo.

---

## MANDATORY: Expo SDK First

| Instead of (React Native) | Use (Expo SDK) |
|--------------------------|----------------|
| `react-native` Linking | `expo-linking` |
| `react-native` Image | `expo-image` |
| `react-native-async-storage` | `expo-secure-store` (sensitive data) |
| `react-native-permissions` | `expo-permissions` |
| `react-native-fs` | `expo-file-system` |
| `react-native-camera` | `expo-camera` |
| `react-native-device-info` | `expo-device` |
| `react-native-localize` | `expo-localization` |

Only use React Native core when Expo SDK lacks equivalent functionality.

---

## Expo Router Patterns

```
app/
├── _layout.tsx          # Root layout with providers
├── index.tsx            # Home/entry screen
├── (auth)/              # Auth route group
│   ├── _layout.tsx      # Auth-specific layout
│   └── login.tsx
├── (tabs)/              # Tab navigation group
│   ├── _layout.tsx      # Tab bar configuration
│   └── home.tsx
└── [id].tsx             # Dynamic route
```

Use `useRouter()` and `useLocalSearchParams()` hooks.

---

## SVA Styling System

**This app uses Style Variance Authority (SVA), NOT Tailwind.**

```typescript
// Usage
import { useThemeColors } from "@/hooks/useThemeColors";
import { buttonStyles } from "./Button.styles";

function Button({ variant = "primary", size = "md" }) {
  const { isDark } = useThemeColors();
  const styles = buttonStyles(isDark, { variant, size });
  return <Pressable style={styles.container}>...</Pressable>;
}
```

```typescript
// Creating styles - Component.styles.ts
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
      primary: (isDark) => ({ /* styles */ }),
      secondary: (isDark) => ({ /* styles */ }),
    },
  },
});
```

Colors: `src/styles/colors/` (palette.ts, semantic.ts, light.ts, dark.ts)

---

## Theme System

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

Full color reference: `docs/design/tokens-reference.md`

---

## Component Structure

```
components/ui/Button/
├── Button.tsx           # Component
├── button.styles.ts     # SVA styles (kebab-case)
├── button.constants.ts  # Variants (optional)
└── index.ts             # Re-export
```

| File Type | Convention |
|-----------|------------|
| Folder | PascalCase |
| Component | PascalCase.tsx |
| Styles | kebab-case.styles.ts |
| Stories | kebab-case.stories.tsx |

---

## Haptic Feedback

```typescript
import { useHaptics } from "@/hooks/useHaptics";

function Button({ onPress }) {
  const { light, medium, success, error, warning, selection, heavy, rigid, soft } = useHaptics();

  const handlePress = () => {
    light();
    onPress?.();
  };
  return <Pressable onPress={handlePress}>...</Pressable>;
}
```

---

## Authentication (Mobile-Specific)

```typescript
import { authClient } from "@/lib/auth-client";

await authClient.signIn.magicLink({ email });
const session = await authClient.getSession();
await authClient.signOut();
```

Deep link callbacks: `klard://auth/callback` (iOS/Android)

---

## Testing

```bash
pnpm test                           # Run all
pnpm test -- --watch               # Watch mode
pnpm test -- --coverage            # Coverage
pnpm test -- src/__tests__/Button  # Single test
```

---

## Storybook

```bash
pnpm storybook           # localhost:6007
pnpm storybook:build     # Build static
```

---

## Safe Area

```typescript
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// In _layout.tsx
<SafeAreaProvider>
  <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
    <Slot />
  </SafeAreaView>
</SafeAreaProvider>
```

---

## i18n

```typescript
import { i18n } from "@/lib/i18n";
<Text>{i18n.t("welcome.title")}</Text>
```

Reference: `src/lib/i18n.ts`, `src/locales/`

---

## Performance

- Use `FlatList`/`SectionList` for lists (never `ScrollView` + `map()`)
- Memoize with `useMemo`, wrap handlers with `useCallback`
- Use `expo-image` for optimized image loading
