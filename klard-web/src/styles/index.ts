/**
 * Klard Design System - Web Styles Entry Point
 *
 * TypeScript types and CSS variable mappings matching mobile structure.
 * Actual values come from CSS variables defined in globals.css and tokens/.
 *
 * @see klard-mobile/src/styles/index.ts (mobile counterpart)
 * @see klard-web/src/styles/tokens/index.css (CSS token imports)
 * @see klard-web/src/app/globals.css (color and base tokens)
 * @see docs/design/tokens-reference.md (full documentation)
 *
 * SOLID Compliance:
 * - SRP: Type definitions and CSS variable mappings only
 * - OCP: Add new token types without modifying existing
 */

// =============================================================================
// RADIUS TOKENS
// =============================================================================

/** Radius token keys matching CSS variables */
export type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/** Component-specific radius keys */
export type ComponentRadiusToken = 'button' | 'card' | 'input' | 'modal' | 'toast' | 'badge';

// =============================================================================
// SHADOW TOKENS
// =============================================================================

/** Base shadow scale tokens */
export type ShadowToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';

/** Card-specific shadow tokens */
export type CardShadowToken = 'card' | 'cardSm' | 'cardMd' | 'cardLg' | 'cardElevated' | 'hero';

// =============================================================================
// GLOW TOKENS
// =============================================================================

/** Glow effect tokens for emphasis states */
export type GlowToken = 'primary' | 'success' | 'warning' | 'error';

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

/** Animation duration tokens */
export type DurationToken =
  | 'instant'
  | 'fastest'
  | 'faster'
  | 'fast'
  | 'normal'
  | 'default'
  | 'slow'
  | 'slower'
  | 'slowest';

/** Animation easing tokens */
export type EasingToken = 'default' | 'in' | 'out' | 'inOut' | 'bounce' | 'spring' | 'emphasized';

// =============================================================================
// GLASSMORPHISM TOKENS
// =============================================================================

/** Glass blur intensity tokens */
export type GlassBlurToken = 'default' | 'card' | 'modal' | 'nav' | 'subtle';

// =============================================================================
// SPACING TOKENS
// =============================================================================

/** Component spacing tokens */
export type SpacingToken = 'card' | 'cardSm' | 'cardLg' | 'sectionGap' | 'contentGap' | 'itemGap' | 'inlineGap';

// =============================================================================
// COLOR TOKENS
// =============================================================================

/** Semantic color tokens */
export type SemanticColorToken =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'muted'
  | 'destructive';

/** Surface color tokens */
export type SurfaceToken = 'surface' | 'surfaceStrong' | 'overlay' | 'overlaySoft' | 'overlayStrong';

/** Border color tokens */
export type BorderToken = 'default' | 'strong' | 'focus';

// =============================================================================
// CSS VARIABLE HELPERS
// =============================================================================

/**
 * Helper to construct CSS variable reference with rec- prefix
 * @param name - Variable name without prefix (e.g., 'radius-md')
 * @returns CSS var() reference (e.g., 'var(--rec-radius-md)')
 */
export const cssVar = (name: string): string => `var(--rec-${name})`;

/**
 * Helper to construct CSS variable reference without prefix
 * @param name - Full variable name (e.g., 'sidebar-foreground')
 * @returns CSS var() reference (e.g., 'var(--sidebar-foreground)')
 */
export const cssVarRaw = (name: string): string => `var(--${name})`;

// =============================================================================
// TOKEN TO CSS VARIABLE MAPPINGS
// =============================================================================

/** Radius token to CSS variable mapping */
export const radius = {
  none: 'var(--rec-radius-none, 0)',
  sm: 'var(--rec-radius-sm)',
  md: 'var(--rec-radius-md)',
  lg: 'var(--rec-radius-lg)',
  xl: 'var(--rec-radius-xl)',
  '2xl': 'var(--rec-radius-2xl)',
  full: 'var(--rec-radius-full)',
  default: 'var(--rec-radius-default)',
} as const;

/** Component radius token mapping */
export const componentRadius = {
  button: 'var(--rec-radius-button)',
  card: 'var(--rec-radius-card)',
  input: 'var(--rec-radius-input)',
  modal: 'var(--rec-radius-modal)',
  toast: 'var(--rec-radius-toast)',
  badge: 'var(--rec-radius-badge)',
} as const;

/** Shadow token to CSS variable mapping */
export const shadows = {
  none: 'none',
  xs: 'var(--rec-shadow-xs)',
  sm: 'var(--rec-shadow-sm)',
  md: 'var(--rec-shadow-md)',
  lg: 'var(--rec-shadow-lg)',
  xl: 'var(--rec-shadow-xl)',
  '2xl': 'var(--rec-shadow-2xl)',
  inner: 'var(--rec-shadow-inner)',
  card: 'var(--rec-shadow-card)',
  cardSm: 'var(--rec-shadow-card-sm)',
  cardMd: 'var(--rec-shadow-card-md)',
  cardLg: 'var(--rec-shadow-card-lg)',
  cardElevated: 'var(--rec-shadow-card-elevated)',
  hero: 'var(--rec-shadow-hero)',
} as const;

/** Glow effect token mapping */
export const glowEffects = {
  primary: 'var(--rec-glow-primary)',
  success: 'var(--rec-glow-success)',
  warning: 'var(--rec-glow-warning)',
  error: 'var(--rec-glow-error)',
} as const;

/** Animation duration token mapping */
export const duration = {
  instant: 'var(--rec-animate-duration-instant)',
  fastest: 'var(--rec-animate-duration-fastest)',
  faster: 'var(--rec-animate-duration-faster)',
  fast: 'var(--rec-animate-duration-fast)',
  normal: 'var(--rec-animate-duration-normal)',
  default: 'var(--rec-animate-duration-default)',
  slow: 'var(--rec-animate-duration-slow)',
  slower: 'var(--rec-animate-duration-slower)',
  slowest: 'var(--rec-animate-duration-slowest)',
} as const;

/** Animation easing token mapping */
export const easing = {
  default: 'var(--rec-animate-ease-default)',
  in: 'var(--rec-animate-ease-in)',
  out: 'var(--rec-animate-ease-out)',
  inOut: 'var(--rec-animate-ease-in-out)',
  bounce: 'var(--rec-animate-ease-bounce)',
  spring: 'var(--rec-animate-ease-spring)',
  emphasized: 'var(--rec-animate-ease-emphasized)',
} as const;

/** Glassmorphism blur token mapping */
export const glassmorphism = {
  blur: 'var(--rec-glass-blur)',
  blurCard: 'var(--rec-glass-blur-card)',
  blurModal: 'var(--rec-glass-blur-modal)',
  blurNav: 'var(--rec-glass-blur-nav)',
  blurSubtle: 'var(--rec-glass-blur-subtle)',
  borderWidth: 'var(--rec-glass-border-width)',
  borderColor: 'var(--rec-glass-border-color)',
} as const;

/** Spacing token mapping */
export const spacing = {
  card: 'var(--rec-spacing-card)',
  cardSm: 'var(--rec-spacing-card-sm)',
  cardLg: 'var(--rec-spacing-card-lg)',
  sectionGap: 'var(--rec-spacing-section-gap)',
  contentGap: 'var(--rec-spacing-content-gap)',
  itemGap: 'var(--rec-spacing-item-gap)',
  inlineGap: 'var(--rec-spacing-inline-gap)',
} as const;

/** Focus effect token mapping */
export const focusEffects = {
  ring: 'var(--rec-focus-ring)',
  ringColor: 'var(--rec-focus-ring-color)',
  ringBase: 'var(--rec-focus-ring-base)',
  ringWidth: 'var(--rec-focus-ring-width)',
  ringOffset: 'var(--rec-focus-ring-offset)',
} as const;

/** Semantic color token mapping */
export const colors = {
  primary: 'var(--rec-color-primary)',
  primaryForeground: 'var(--rec-color-primary-foreground)',
  secondary: 'var(--rec-color-secondary)',
  secondaryForeground: 'var(--rec-color-secondary-foreground)',
  success: 'var(--rec-color-success)',
  warning: 'var(--rec-color-warning)',
  error: 'var(--rec-color-error)',
  info: 'var(--rec-color-info)',
  infoForeground: 'var(--rec-color-info-foreground)',
  background: 'var(--rec-color-background)',
  foreground: 'var(--rec-color-foreground)',
  muted: 'var(--rec-color-muted)',
  mutedForeground: 'var(--rec-color-muted-foreground)',
  card: 'var(--rec-color-card)',
  cardForeground: 'var(--rec-color-card-foreground)',
  popover: 'var(--rec-color-popover)',
  popoverForeground: 'var(--rec-color-popover-foreground)',
  border: 'var(--rec-color-border)',
  borderStrong: 'var(--rec-color-border-strong)',
  borderFocus: 'var(--rec-color-border-focus)',
  input: 'var(--rec-color-input)',
  ring: 'var(--rec-color-ring)',
  destructive: 'var(--rec-color-destructive)',
  destructiveForeground: 'var(--rec-color-destructive-foreground)',
  surface: 'var(--rec-color-surface)',
  surfaceStrong: 'var(--rec-color-surface-strong)',
  overlay: 'var(--rec-color-overlay)',
  overlaySoft: 'var(--rec-color-overlay-soft)',
  overlayStrong: 'var(--rec-color-overlay-strong)',
} as const;

/** Gradient token mapping */
export const gradients = {
  primary: 'var(--rec-gradient-primary)',
  background: 'var(--rec-gradient-background)',
  success: 'var(--rec-gradient-success)',
  radialTop: 'var(--rec-radial-highlight-top)',
  radialBottom: 'var(--rec-radial-highlight-bottom)',
} as const;

// =============================================================================
// COMBINED TOKENS EXPORT
// =============================================================================

/**
 * Combined tokens object for programmatic access
 * Use this when you need to access multiple token categories
 */
export const tokens = {
  radius,
  componentRadius,
  shadows,
  glowEffects,
  duration,
  easing,
  glassmorphism,
  spacing,
  focusEffects,
  colors,
  gradients,
} as const;

// Type exports for the token objects
export type Radius = typeof radius;
export type ComponentRadius = typeof componentRadius;
export type Shadows = typeof shadows;
export type GlowEffects = typeof glowEffects;
export type Duration = typeof duration;
export type Easing = typeof easing;
export type Glassmorphism = typeof glassmorphism;
export type Spacing = typeof spacing;
export type FocusEffects = typeof focusEffects;
export type Colors = typeof colors;
export type Gradients = typeof gradients;
export type Tokens = typeof tokens;
