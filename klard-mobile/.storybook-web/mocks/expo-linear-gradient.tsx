/**
 * expo-linear-gradient mock for Storybook web environment
 *
 * Renders a View with CSS linear-gradient background.
 */

import React from 'react';
import { View, type ViewStyle } from 'react-native';

interface LinearGradientProps {
  children?: React.ReactNode;
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: ViewStyle;
}

export const LinearGradient: React.FC<LinearGradientProps> = ({
  children,
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  locations,
  style,
}) => {
  // Convert start/end points to CSS gradient direction
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI) + 90;

  // Build color stops with optional locations
  const colorStops = colors.map((color, index) => {
    if (locations && locations[index] !== undefined) {
      return `${color} ${locations[index] * 100}%`;
    }
    return color;
  }).join(', ');

  const gradient = `linear-gradient(${angle}deg, ${colorStops})`;

  return (
    <View
      style={[
        style,
        // @ts-expect-error - Web-specific style property
        { backgroundImage: gradient },
      ]}
    >
      {children}
    </View>
  );
};

export default LinearGradient;
