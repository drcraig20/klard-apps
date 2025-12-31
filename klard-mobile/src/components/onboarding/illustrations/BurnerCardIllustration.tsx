import React from 'react';
import Svg, { Path, Rect, G, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { useTheme } from '@/contexts/ThemeContext';

interface IllustrationProps {
  width?: number;
  height?: number;
}

export function BurnerCardIllustration({
  width = 200,
  height = 140
}: Readonly<IllustrationProps>) {
  const { colors, isDark } = useTheme();
  const primaryColor = colors.primary;
  const cardBg = colors.card;
  const borderColor = colors.border;
  const errorColor = colors.error;
  // Gradient end color for card background
  const cardGradientEnd = colors.surface3;
  // Color for magnetic strip
  const magneticStripColor = isDark ? '#000000' : colors.textTertiary;
  // Card number/text fill color
  const cardTextColor = colors.foreground;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 200 140"
      accessibilityLabel="Virtual BurnerCard with shield protection blocking unwanted charges"
    >
      <Defs>
        {/* Teal glow gradient */}
        <LinearGradient id="burnerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
          <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.1" />
        </LinearGradient>

        {/* Card gradient */}
        <LinearGradient id="burnerCardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={cardBg} stopOpacity="1" />
          <Stop offset="100%" stopColor={cardGradientEnd} stopOpacity="1" />
        </LinearGradient>

        {/* Shield gradient */}
        <LinearGradient id="burnerShieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.6" />
        </LinearGradient>

        {/* Block indicator gradient */}
        <LinearGradient id="blockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={errorColor} stopOpacity="0.9" />
          <Stop offset="100%" stopColor={errorColor} stopOpacity="0.6" />
        </LinearGradient>
      </Defs>

      {/* Background glow */}
      <Circle
        cx="100"
        cy="70"
        r="60"
        fill="url(#burnerGlow)"
        opacity="0.3"
      />

      {/* Credit Card */}
      <G transform="translate(30, 30)">
        {/* Card shadow */}
        <Rect
          x="2"
          y="2"
          width="140"
          height="88"
          fill="#000000"
          opacity="0.2"
          rx="10"
        />
        {/* Card background */}
        <Rect
          x="0"
          y="0"
          width="140"
          height="88"
          fill="url(#burnerCardGradient)"
          stroke={borderColor}
          strokeWidth="1.5"
          rx="10"
        />
        {/* Chip */}
        <Rect
          x="15"
          y="24"
          width="28"
          height="22"
          fill={primaryColor}
          opacity="0.3"
          rx="3"
        />
        {/* Magnetic strip */}
        <Rect
          x="0"
          y="35"
          width="140"
          height="16"
          fill={magneticStripColor}
          opacity="0.2"
        />
        {/* Card number placeholders */}
        <G opacity="0.4">
          <Rect x="15" y="58" width="24" height="6" fill={cardTextColor} rx="1.5" />
          <Rect x="43" y="58" width="24" height="6" fill={cardTextColor} rx="1.5" />
          <Rect x="71" y="58" width="24" height="6" fill={cardTextColor} rx="1.5" />
          <Rect x="99" y="58" width="24" height="6" fill={cardTextColor} rx="1.5" />
        </G>
        {/* Expiry and CVV placeholders */}
        <G opacity="0.3">
          <Rect x="15" y="72" width="16" height="5" fill={cardTextColor} rx="1" />
          <Rect x="109" y="72" width="16" height="5" fill={cardTextColor} rx="1" />
        </G>
      </G>

      {/* Shield Icon (centered on card) */}
      <G transform="translate(80, 15)">
        {/* Shield outer glow */}
        <Path
          d="M 20 0 L 35 7 L 35 24 C 35 35, 20 42, 20 42 C 20 42, 5 35, 5 24 L 5 7 Z"
          fill={primaryColor}
          opacity="0.2"
          scale="1.1"
          transform="translate(-1, -0.5)"
        />
        {/* Shield main shape */}
        <Path
          d="M 20 0 L 35 7 L 35 24 C 35 35, 20 42, 20 42 C 20 42, 5 35, 5 24 L 5 7 Z"
          fill="url(#burnerShieldGradient)"
          stroke={primaryColor}
          strokeWidth="1.5"
        />
        {/* Shield highlight */}
        <Path
          d="M 20 3 L 31 8 L 31 24 C 31 33, 20 38, 20 38 C 20 38, 9 33, 9 24 L 9 8 Z"
          fill={primaryColor}
          opacity="0.3"
        />
        {/* Checkmark */}
        <Path
          d="M 14 20 L 18 25 L 28 13"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      {/* Blocked Charge Indicator (bottom right) */}
      <G transform="translate(140, 95)">
        {/* Block circle background */}
        <Circle
          cx="20"
          cy="20"
          r="18"
          fill="url(#blockGradient)"
          opacity="0.9"
        />
        {/* Block circle border */}
        <Circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke={errorColor}
          strokeWidth="1.5"
        />
        {/* X mark (blocked) */}
        <Path
          d="M 14 14 L 26 26 M 26 14 L 14 26"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </G>

      {/* Floating particles */}
      <G opacity="0.5">
        <Circle cx="20" cy="25" r="2" fill={primaryColor} />
        <Circle cx="180" cy="30" r="1.5" fill={primaryColor} />
        <Circle cx="25" cy="120" r="1.5" fill={primaryColor} />
        <Circle cx="170" cy="110" r="2" fill={errorColor} />
      </G>
    </Svg>
  );
}
