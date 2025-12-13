import React from 'react';
import {
  View,
  Text,
  Pressable,
  useColorScheme,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {
  containerStyles,
  labelStyles,
  valueStyles,
  trendValueStyles,
  iconContainerStyles,
  getTrendColor,
  trendIconNames,
  sizeConfig,
  layoutStyles,
} from './stat-card.styles';

export interface StatCardProps {
  /** Label describing the metric */
  label: string;
  /** The metric value to display */
  value: string | number;
  /** Optional trend indicator */
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Click handler - makes card interactive */
  onClick?: () => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Muted tone for non-primary stats */
  muted?: boolean;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

export function StatCard({
  label,
  value,
  trend,
  icon,
  onClick,
  size = 'md',
  muted = false,
  style,
  testID,
}: StatCardProps) {
  const isDark = useColorScheme() === 'dark';
  const isClickable = !!onClick;
  const sizeStyles = sizeConfig[size];

  const handlePress = async () => {
    if (onClick) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onClick();
    }
  };

  const Container = isClickable ? Pressable : View;
  const containerProps = isClickable
    ? {
        onPress: handlePress,
        style: ({ pressed }: { pressed: boolean }) => [
          containerStyles(isDark, { pressed: pressed ? 'true' : undefined, muted: muted ? 'true' : undefined }),
          { padding: sizeStyles.padding },
          style,
        ],
      }
    : {
        style: [
          containerStyles(isDark, { muted: muted ? 'true' : undefined }),
          { padding: sizeStyles.padding },
          style,
        ],
      };

  return (
    <Container testID={testID} accessibilityRole={isClickable ? 'button' : undefined} {...containerProps}>
      <View style={layoutStyles.content}>
        <Text style={[labelStyles(isDark, { muted: muted ? 'true' : undefined }), { fontSize: sizeStyles.fontSize }]}>
          {label}
        </Text>
        <Text style={[valueStyles(isDark, { muted: muted ? 'true' : undefined }), { fontSize: sizeStyles.valueFontSize }]}>
          {value}
        </Text>
        {trend && (
          <View style={layoutStyles.trendContainer} testID="trend-container">
            <Ionicons
              name={trendIconNames[trend.direction]}
              size={sizeStyles.iconSize}
              color={getTrendColor(trend.direction, isDark)}
            />
            <Text
              style={[
                trendValueStyles(isDark, { direction: trend.direction }),
                { fontSize: sizeStyles.fontSize },
              ]}
            >
              {trend.value}
            </Text>
          </View>
        )}
      </View>
      {icon && (
        <View style={[iconContainerStyles(isDark), {
          width: sizeStyles.iconSize * 3,
          height: sizeStyles.iconSize * 3,
          borderRadius: sizeStyles.iconSize * 1.5,
        }]} testID="icon-container">
          {icon}
        </View>
      )}
    </Container>
  );
}
