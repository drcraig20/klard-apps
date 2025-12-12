import React from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { styles } from './stat-card.styles';
import { trendConfig, sizeConfig } from './stat-card.constants';

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
          styles.container,
          { padding: sizeStyles.padding },
          pressed && styles.pressed,
          muted && styles.muted,
          style,
        ],
      }
    : {
        style: [
          styles.container,
          { padding: sizeStyles.padding },
          muted && styles.muted,
          style,
        ],
      };

  return (
    <Container testID={testID} accessibilityRole={isClickable ? 'button' : undefined} {...containerProps}>
      <View style={styles.content}>
        <Text style={[styles.label, { fontSize: sizeStyles.fontSize }, muted && styles.mutedText]}>
          {label}
        </Text>
        <Text style={[styles.value, { fontSize: sizeStyles.valueFontSize }, muted && styles.mutedText]}>
          {value}
        </Text>
        {trend && (
          <View style={styles.trendContainer} testID="trend-container">
            <Ionicons
              name={trendConfig[trend.direction].iconName}
              size={sizeStyles.iconSize}
              color={trendConfig[trend.direction].color}
            />
            <Text
              style={[
                styles.trendValue,
                { fontSize: sizeStyles.fontSize },
                { color: trendConfig[trend.direction].color },
              ]}
            >
              {trend.value}
            </Text>
          </View>
        )}
      </View>
      {icon && (
        <View style={[styles.iconContainer, {
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
