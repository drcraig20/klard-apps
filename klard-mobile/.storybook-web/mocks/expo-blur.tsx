/**
 * expo-blur mock for Storybook web environment
 *
 * Renders a View with CSS backdrop-filter blur effect.
 */

import React from 'react';
import { View, type ViewStyle } from 'react-native';

interface BlurViewProps {
  children?: React.ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default' | 'extraLight' | 'regular' | 'prominent' | 'systemUltraThinMaterial' | 'systemThinMaterial' | 'systemMaterial' | 'systemThickMaterial' | 'systemChromeMaterial' | 'systemUltraThinMaterialLight' | 'systemThinMaterialLight' | 'systemMaterialLight' | 'systemThickMaterialLight' | 'systemChromeMaterialLight' | 'systemUltraThinMaterialDark' | 'systemThinMaterialDark' | 'systemMaterialDark' | 'systemThickMaterialDark' | 'systemChromeMaterialDark';
  style?: ViewStyle;
  blurReductionFactor?: number;
  experimentalBlurMethod?: 'none' | 'dimezisBlurView';
}

export const BlurView: React.FC<BlurViewProps> = ({
  children,
  intensity = 50,
  tint = 'default',
  style,
}) => {
  // Determine background color based on tint
  let backgroundColor: string;
  switch (tint) {
    case 'dark':
    case 'systemUltraThinMaterialDark':
    case 'systemThinMaterialDark':
    case 'systemMaterialDark':
    case 'systemThickMaterialDark':
    case 'systemChromeMaterialDark':
      backgroundColor = `rgba(0, 0, 0, ${intensity / 200})`;
      break;
    case 'light':
    case 'extraLight':
    case 'systemUltraThinMaterialLight':
    case 'systemThinMaterialLight':
    case 'systemMaterialLight':
    case 'systemThickMaterialLight':
    case 'systemChromeMaterialLight':
      backgroundColor = `rgba(255, 255, 255, ${intensity / 200})`;
      break;
    case 'regular':
    case 'prominent':
    case 'systemUltraThinMaterial':
    case 'systemThinMaterial':
    case 'systemMaterial':
    case 'systemThickMaterial':
    case 'systemChromeMaterial':
    default:
      backgroundColor = `rgba(128, 128, 128, ${intensity / 200})`;
      break;
  }

  const blurAmount = Math.max(0, intensity / 5);

  return (
    <View
      style={[
        style,
        {
          backgroundColor,
          // @ts-expect-error - Web-specific style properties
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default BlurView;
