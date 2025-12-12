import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

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

const trendConfig = {
  up: {
    iconName: 'trending-up' as const,
    color: '#059669', // green-600 (light) / #10B981 (dark - handled via theme)
  },
  down: {
    iconName: 'trending-down' as const,
    color: '#DC2626', // red-600 (light) / #EF4444 (dark - handled via theme)
  },
  neutral: {
    iconName: 'remove' as const,
    color: '#64748B', // slate-500 (light) / #CBD5E1 (dark - handled via theme)
  },
} as const;

const sizeConfig = {
  sm: { padding: 12, fontSize: 14, valueFontSize: 18, iconSize: 16 },
  md: { padding: 16, fontSize: 16, valueFontSize: 24, iconSize: 18 },
  lg: { padding: 20, fontSize: 18, valueFontSize: 28, iconSize: 20 },
};

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    backgroundColor: '#FFFFFF', // Light mode
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.08)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pressed: {
    borderColor: '#0D7C7A', // primary accent
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  muted: {
    opacity: 0.75,
    borderColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  label: {
    color: '#475569', // muted text (light)
    fontWeight: '400',
  },
  value: {
    color: '#0F172A', // foreground (light)
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  mutedText: {
    opacity: 0.7,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trendValue: {
    fontWeight: '500',
  },
  iconContainer: {
    backgroundColor: '#CCFBF1', // teal-100 (light)
    alignItems: 'center',
    justifyContent: 'center',
  },
});
