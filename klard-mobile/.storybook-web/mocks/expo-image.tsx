/**
 * expo-image mock for Storybook web environment
 *
 * Wraps React Native Image component with expo-image API.
 */

import React from 'react';
import { Image as RNImage, type ImageStyle, type ImageResizeMode } from 'react-native';

export type ImageSource = string | number | { uri: string; width?: number; height?: number; headers?: Record<string, string> };

export type ImageContentFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export type ImageContentPosition = 'center' | 'top' | 'right' | 'bottom' | 'left' | 'top center' | 'top right' | 'top left' | 'right center' | 'right top' | 'right bottom' | 'bottom center' | 'bottom right' | 'bottom left' | 'left center' | 'left top' | 'left bottom';

export interface ImageProps {
  source?: ImageSource;
  style?: ImageStyle;
  contentFit?: ImageContentFit;
  contentPosition?: ImageContentPosition;
  placeholder?: ImageSource;
  placeholderContentFit?: ImageContentFit;
  transition?: number | { duration?: number; effect?: string; timing?: string };
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk';
  priority?: 'low' | 'normal' | 'high';
  onLoad?: (event: { source: { width: number; height: number; url: string } }) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: { error: string }) => void;
  recyclingKey?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  alt?: string;
  blurRadius?: number;
  tintColor?: string;
}

function contentFitToResizeMode(contentFit: ImageContentFit): ImageResizeMode {
  switch (contentFit) {
    case 'cover':
      return 'cover';
    case 'contain':
    case 'scale-down':
      return 'contain';
    case 'fill':
      return 'stretch';
    case 'none':
      return 'center';
    default:
      return 'cover';
  }
}

function normalizeSource(source?: ImageSource): { uri: string } | number | undefined {
  if (!source) return undefined;
  if (typeof source === 'number') return source;
  if (typeof source === 'string') return { uri: source };
  return source;
}

interface ImageComponent extends React.FC<ImageProps> {
  prefetch: (url: string) => Promise<boolean>;
  clearDiskCache: () => Promise<boolean>;
  clearMemoryCache: () => Promise<boolean>;
}

const ImageComponent: React.FC<ImageProps> = ({
  source,
  style,
  contentFit = 'cover',
  onLoad,
  onLoadStart,
  onLoadEnd,
  onError,
  accessible,
  accessibilityLabel,
  alt,
  blurRadius,
  tintColor,
}) => {
  const resizeMode = contentFitToResizeMode(contentFit);
  const normalizedSource = normalizeSource(source);

  return (
    <RNImage
      source={normalizedSource}
      style={[style, tintColor ? { tintColor } : undefined]}
      resizeMode={resizeMode}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      onLoad={onLoad ? () => {
        onLoad({
          source: {
            width: 0,
            height: 0,
            url: typeof source === 'string' ? source : (source as { uri: string })?.uri || '',
          },
        });
      } : undefined}
      onError={onError ? () => onError({ error: 'Image load failed' }) : undefined}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || alt}
      blurRadius={blurRadius}
    />
  );
};

// Create the Image component with static methods
export const Image = ImageComponent as ImageComponent;

// Static methods
Image.prefetch = async (_url: string): Promise<boolean> => {
  return true;
};

Image.clearDiskCache = async (): Promise<boolean> => {
  return true;
};

Image.clearMemoryCache = async (): Promise<boolean> => {
  return true;
};

export default Image;
