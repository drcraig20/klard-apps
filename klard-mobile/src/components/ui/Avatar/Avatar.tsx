import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { useThemeColors } from '@/hooks';
import { styles, getContainerStyle } from './avatar.styles';

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
} as const;

const textStyleMap = {
  xs: styles.xsText,
  sm: styles.smText,
  md: styles.mdText,
  lg: styles.lgText,
  xl: styles.xlText,
} as const;

export type AvatarSize = keyof typeof sizeMap;
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size: AvatarSize;
  shape?: AvatarShape;
  style?: StyleProp<ViewStyle>;
}

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

export function Avatar({
  src,
  alt,
  fallback,
  size,
  shape = 'circle',
  style,
}: AvatarProps) {
  const colors = useThemeColors();
  const [hasError, setHasError] = useState(false);

  const dimension = sizeMap[size];
  const borderRadius = shape === 'circle' ? dimension / 2 : 8;
  const showFallback = !src || hasError;
  const dynamicContainerStyle = getContainerStyle(dimension, borderRadius, colors.muted);
  const containerStyle = StyleSheet.flatten([styles.container, dynamicContainerStyle, style]);

  return (
    <View
      testID="avatar-container"
      accessibilityLabel={alt}
      accessibilityRole="image"
      style={containerStyle}
    >
      {!showFallback ? (
        <Image
          testID="avatar-image"
          source={src}
          style={[styles.image, { borderRadius }]}
          contentFit="cover"
          placeholder={{ blurhash: BLURHASH }}
          transition={200}
          onError={() => setHasError(true)}
          accessibilityLabel={alt}
        />
      ) : (
        <View
          testID="avatar-fallback"
          style={[styles.fallback, { borderRadius }]}
        >
          <Text style={[styles.fallbackText, textStyleMap[size]]}>
            {fallback}
          </Text>
        </View>
      )}
    </View>
  );
}
