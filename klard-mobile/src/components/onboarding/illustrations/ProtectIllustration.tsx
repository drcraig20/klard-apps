import React from 'react';
import Svg, { Path, Rect, G, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';

interface IllustrationProps {
  width?: number;
  height?: number;
}

export function ProtectIllustration({
  width = 280,
  height = 200
}: Readonly<IllustrationProps>) {
  const { colors } = useTheme();
  const primaryColor = colors.primary;
  const cardBg = colors.card;
  const borderColor = colors.border;
  const shieldColor = primaryColor;
  // Gradient end color for card background
  const cardGradientEnd = colors.surface3;
  // Color for magnetic strip (use textTertiary for both themes for consistency)
  const magneticStripColor = colors.textTertiary;
  // Card number/text fill color
  const cardTextColor = colors.foreground;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 280 200"
      accessibilityLabel="Credit card protected by a shield with teal glow"
    >
      <Defs>
        {/* Teal glow gradient */}
        <LinearGradient id="protectGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
          <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.1" />
        </LinearGradient>

        {/* Shield gradient */}
        <LinearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.6" />
        </LinearGradient>

        {/* Card gradient */}
        <LinearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={cardBg} stopOpacity="1" />
          <Stop offset="100%" stopColor={cardGradientEnd} stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* Background glow circles */}
      <Circle
        cx="140"
        cy="100"
        r="80"
        fill="url(#protectGlow)"
        opacity="0.3"
      />
      <Circle
        cx="140"
        cy="100"
        r="60"
        fill="url(#protectGlow)"
        opacity="0.2"
      />

      {/* Credit Card */}
      <G transform="translate(50, 70)">
        {/* Card shadow */}
        <Rect
          x="3"
          y="3"
          width="180"
          height="110"
          fill="#000000"
          opacity="0.2"
          rx="12"
        />
        {/* Card background */}
        <Rect
          x="0"
          y="0"
          width="180"
          height="110"
          fill="url(#cardGradient)"
          stroke={borderColor}
          strokeWidth="2"
          rx="12"
        />
        {/* Chip */}
        <Rect
          x="20"
          y="30"
          width="35"
          height="28"
          fill={primaryColor}
          opacity="0.3"
          rx="4"
        />
        {/* Magnetic strip suggestion */}
        <Rect
          x="0"
          y="45"
          width="180"
          height="20"
          fill={magneticStripColor}
          opacity="0.2"
        />
        {/* Card number placeholders */}
        <G opacity="0.4">
          <Rect x="20" y="75" width="30" height="8" fill={cardTextColor} rx="2" />
          <Rect x="55" y="75" width="30" height="8" fill={cardTextColor} rx="2" />
          <Rect x="90" y="75" width="30" height="8" fill={cardTextColor} rx="2" />
          <Rect x="125" y="75" width="30" height="8" fill={cardTextColor} rx="2" />
        </G>
        {/* Expiry and CVV placeholders */}
        <G opacity="0.3">
          <Rect x="20" y="92" width="20" height="6" fill={cardTextColor} rx="1" />
          <Rect x="140" y="92" width="20" height="6" fill={cardTextColor} rx="1" />
        </G>
      </G>

      {/* Shield Icon */}
      <G transform="translate(110, 40)">
        {/* Shield outer glow */}
        <Path
          d="M 30 0 L 50 10 L 50 35 C 50 50, 30 60, 30 60 C 30 60, 10 50, 10 35 L 10 10 Z"
          fill={primaryColor}
          opacity="0.2"
          scale="1.1"
          transform="translate(-1.5, -1)"
        />
        {/* Shield main shape */}
        <Path
          d="M 30 0 L 50 10 L 50 35 C 50 50, 30 60, 30 60 C 30 60, 10 50, 10 35 L 10 10 Z"
          fill="url(#shieldGradient)"
          stroke={primaryColor}
          strokeWidth="2"
        />
        {/* Shield highlight */}
        <Path
          d="M 30 5 L 45 12 L 45 35 C 45 47, 30 55, 30 55 C 30 55, 15 47, 15 35 L 15 12 Z"
          fill={primaryColor}
          opacity="0.3"
        />
        {/* Checkmark */}
        <Path
          d="M 22 28 L 27 35 L 40 20"
          fill="none"
          stroke={colors.primaryForeground}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      {/* Floating security particles */}
      <G opacity="0.5">
        <Circle cx="40" cy="50" r="3" fill={primaryColor} />
        <Circle cx="240" cy="60" r="2.5" fill={primaryColor} />
        <Circle cx="60" cy="180" r="2" fill={primaryColor} />
        <Circle cx="220" cy="170" r="3" fill={primaryColor} />
        <Circle cx="250" cy="120" r="2" fill={primaryColor} />
      </G>

      {/* Lock indicators */}
      <G opacity="0.3">
        <Rect x="30" y="40" width="6" height="8" fill={primaryColor} rx="1" />
        <Rect x="30" y="44" width="6" height="6" fill={primaryColor} rx="1" />

        <Rect x="244" y="140" width="6" height="8" fill={primaryColor} rx="1" />
        <Rect x="244" y="144" width="6" height="6" fill={primaryColor} rx="1" />
      </G>
    </Svg>
  );
}
