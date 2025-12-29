/**
 * @expo/vector-icons mock for Storybook web environment
 *
 * Renders placeholder boxes for icons since actual icon fonts aren't loaded.
 */

import React from 'react';
import { View, Text, type ViewStyle, type TextStyle } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle | TextStyle;
}

// Create a generic icon component that shows a placeholder
const createIconComponent = (iconSetName: string): React.FC<IconProps> => {
  const IconComponent: React.FC<IconProps> = ({
    name,
    size = 24,
    color = '#000',
    style,
  }) => {
    // Show icon name in development for debugging
    const showLabel = size >= 20;

    return (
      <View
        style={[
          {
            width: size,
            height: size,
            backgroundColor: `${color}20`, // 20% opacity of the color
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          },
          style as ViewStyle,
        ]}
        accessibilityLabel={`${iconSetName} ${name} icon`}
        accessibilityRole="image"
      >
        {showLabel && (
          <Text
            style={{
              fontSize: Math.max(8, size / 4),
              color: color,
              textAlign: 'center',
              opacity: 0.6,
            }}
            numberOfLines={1}
          >
            {name.substring(0, 3)}
          </Text>
        )}
      </View>
    );
  };

  IconComponent.displayName = iconSetName;
  return IconComponent;
};

// Export all icon sets from @expo/vector-icons
export const Ionicons = createIconComponent('Ionicons');
export const MaterialIcons = createIconComponent('MaterialIcons');
export const MaterialCommunityIcons = createIconComponent('MaterialCommunityIcons');
export const FontAwesome = createIconComponent('FontAwesome');
export const FontAwesome5 = createIconComponent('FontAwesome5');
export const FontAwesome6 = createIconComponent('FontAwesome6');
export const Feather = createIconComponent('Feather');
export const AntDesign = createIconComponent('AntDesign');
export const Entypo = createIconComponent('Entypo');
export const EvilIcons = createIconComponent('EvilIcons');
export const Fontisto = createIconComponent('Fontisto');
export const Foundation = createIconComponent('Foundation');
export const Octicons = createIconComponent('Octicons');
export const SimpleLineIcons = createIconComponent('SimpleLineIcons');
export const Zocial = createIconComponent('Zocial');

// Create icon set helper (used for custom icon fonts)
export function createIconSet(
  _glyphMap: Record<string, number>,
  fontFamily: string,
  _fontFile?: string
): React.FC<IconProps> {
  return createIconComponent(fontFamily);
}

export function createIconSetFromFontello(
  _config: object,
  fontFamily: string,
  _fontFile?: string
): React.FC<IconProps> {
  return createIconComponent(fontFamily);
}

export function createIconSetFromIcoMoon(
  _config: object,
  fontFamily: string,
  _fontFile?: string
): React.FC<IconProps> {
  return createIconComponent(fontFamily);
}

export function createMultiStyleIconSet(
  _styles: Record<string, object>,
  _options?: object
): React.FC<IconProps & { iconStyle?: string }> {
  return createIconComponent('MultiStyle');
}

export default {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Feather,
  AntDesign,
  Entypo,
  EvilIcons,
  Fontisto,
  Foundation,
  Octicons,
  SimpleLineIcons,
  Zocial,
  createIconSet,
  createIconSetFromFontello,
  createIconSetFromIcoMoon,
  createMultiStyleIconSet,
};
