// klard-mobile/src/styles/sva.ts
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Colors, ThemeColors } from './colors';

type Style = ViewStyle | TextStyle | ImageStyle;
type StyleDef<T extends Style = Style> = T | ((colors: ThemeColors) => T);

export interface SVAConfig<
  V extends Record<string, Record<string, StyleDef>> = Record<string, Record<string, StyleDef>>
> {
  /** Base styles applied to all variants */
  base?: StyleDef;
  /** Variant definitions */
  variants?: V;
  /** Styles applied when multiple variants match */
  compoundVariants?: Array<
    { [K in keyof V]?: keyof V[K] } & { style: StyleDef }
  >;
  /** Default variant values */
  defaultVariants?: { [K in keyof V]?: keyof V[K] };
}

export type VariantProps<C extends SVAConfig> = C['variants'] extends Record<string, Record<string, StyleDef>>
  ? { [K in keyof C['variants']]?: keyof C['variants'][K] }
  : Record<string, never>;

interface CompiledStyles {
  base?: Style;
  variants?: Record<string, Record<string, Style>>;
  compoundVariants?: Array<{ style: Style } & Record<string, unknown>>;
}

/**
 * Style Variance Authority for React Native
 * Pre-computes themed styles at import time for optimal performance
 *
 * @example
 * const buttonStyles = sva({
 *   base: { padding: 16 },
 *   variants: {
 *     variant: {
 *       primary: (colors) => ({ backgroundColor: colors.primary }),
 *     },
 *   },
 * });
 *
 * // In component:
 * const styles = buttonStyles(isDark, { variant: 'primary' });
 */
export function sva<V extends Record<string, Record<string, StyleDef>>>(
  config: SVAConfig<V>
) {
  // Pre-compile both themes at module load
  const compiled = {
    light: compileConfig(config, Colors.light),
    dark: compileConfig(config, Colors.dark),
  };

  // Return selector function
  return function selectStyles(
    isDark: boolean,
    props?: { [K in keyof V]?: keyof V[K] }
  ): Style[] {
    const theme = isDark ? compiled.dark : compiled.light;
    const result: Style[] = [];

    // 1. Add base styles
    if (theme.base) {
      result.push(theme.base);
    }

    // 2. Add variant styles
    if (config.variants && theme.variants) {
      for (const variantKey of Object.keys(config.variants)) {
        const selected = props?.[variantKey] ?? config.defaultVariants?.[variantKey];
        if (selected && theme.variants[variantKey]?.[selected as string]) {
          result.push(theme.variants[variantKey][selected as string]);
        }
      }
    }

    // 3. Add compound variant styles
    if (theme.compoundVariants) {
      for (const compound of theme.compoundVariants) {
        const { style, ...conditions } = compound;
        const matches = Object.entries(conditions).every(
          ([key, value]) => (props?.[key] ?? config.defaultVariants?.[key]) === value
        );
        if (matches) {
          result.push(style as Style);
        }
      }
    }

    return result;
  };
}

function compileConfig<V extends Record<string, Record<string, StyleDef>>>(
  config: SVAConfig<V>,
  colors: ThemeColors
): CompiledStyles {
  const resolve = (def: StyleDef): Style =>
    typeof def === 'function' ? def(colors) : def;

  const compiled: CompiledStyles = {};

  // Compile base
  if (config.base) {
    compiled.base = resolve(config.base);
  }

  // Compile variants
  if (config.variants) {
    compiled.variants = {};
    for (const [variantKey, variantValues] of Object.entries(config.variants)) {
      compiled.variants[variantKey] = {};
      for (const [valueName, styleDef] of Object.entries(variantValues as Record<string, StyleDef>)) {
        compiled.variants[variantKey][valueName] = resolve(styleDef);
      }
    }
  }

  // Compile compound variants
  if (config.compoundVariants) {
    compiled.compoundVariants = config.compoundVariants.map(({ style, ...conditions }) => ({
      ...conditions,
      style: resolve(style),
    }));
  }

  return compiled;
}