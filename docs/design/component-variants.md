# Component Variants Documentation

This document describes the shared and platform-specific component variants used across the Klard applications.

## Button Component

### Shared Variants (Web + Mobile)

These variants are available on both `klard-web` and `klard-mobile`:

| Variant | Description | Usage |
|---------|-------------|-------|
| `default` | Standard button with primary colors | General actions |
| `primary` | Alias for default | Primary CTAs |
| `destructive` | Red/danger styling | Destructive actions (delete, remove) |
| `outline` | Transparent with border | Secondary actions |
| `secondary` | Secondary color palette | Alternative actions |
| `ghost` | No background until hover | Subtle actions, icon buttons |
| `link` | Text-only with underline on hover | Navigation-style buttons |
| `klard` | Gradient with glow effects | Primary brand CTAs |
| `burn` | Success-colored with glow | "Burn" card actions |

### Web-Only Variants

These variants are only available in `klard-web`:

| Variant | Description | Reason |
|---------|-------------|--------|
| `social` | OAuth provider buttons (Google, GitHub, Apple) | Mobile uses native authentication sheets |

#### Why `social` is Web-Only

The `social` button variant is intentionally excluded from mobile because:

1. **Native Authentication Sheets**: Mobile platforms (iOS and Android) provide native authentication experiences via Apple Sign-In and Google Sign-In SDKs. These native sheets:
   - Provide better security (credential isolation)
   - Offer familiar UX that users trust
   - Handle biometric authentication automatically
   - Reduce phishing risk

2. **Different UX Patterns**: On mobile, social authentication flows are triggered through native APIs that present system-level UI, not custom buttons. The user interaction model is fundamentally different.

3. **Platform Guidelines**: Both Apple and Google recommend/require using their native sign-in buttons and flows for mobile apps.

### Size Variants

Available on both platforms:

| Size | Height | Usage |
|------|--------|-------|
| `sm` | 32px (h-8) | Compact spaces, inline actions |
| `md` / `default` | 40px (h-10) | Standard buttons |
| `lg` | 48px (h-12) | Primary CTAs, hero sections |
| `icon` | 40x40px | Icon-only buttons |
| `icon-sm` | 32x32px | Small icon buttons |
| `icon-lg` | 40x40px | Large icon buttons |

## Adding New Variants

When adding new button variants:

1. Consider if the variant should be shared or platform-specific
2. Document the variant in this file
3. Add appropriate comments in the styles file explaining platform decisions
4. Ensure consistent naming between web and mobile where applicable
