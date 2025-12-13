import React from 'react';
import Svg, { Path, Rect, G, Defs, LinearGradient, Stop, Circle, Polygon } from 'react-native-svg';

interface IllustrationProps {
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

export function SaveIllustration({
  theme = 'dark',
  width = 280,
  height = 200
}: Readonly<IllustrationProps>) {
  const primaryColor = theme === 'dark' ? '#15B5B0' : '#0D7C7A';
  const successColor = theme === 'dark' ? '#10B981' : '#059669';
  const bgColor = theme === 'dark' ? '#0F172A' : '#FFFFFF';

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 280 200"
      accessibilityLabel="Upward trending arrow with dollar signs showing savings growth"
    >
      <Defs>
        {/* Success glow gradient */}
        <LinearGradient id="successGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={successColor} stopOpacity="0.4" />
          <Stop offset="100%" stopColor={successColor} stopOpacity="0.1" />
        </LinearGradient>

        {/* Arrow gradient */}
        <LinearGradient id="arrowGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
          <Stop offset="50%" stopColor={successColor} stopOpacity="0.9" />
          <Stop offset="100%" stopColor={successColor} stopOpacity="1" />
        </LinearGradient>

        {/* Coin gradient */}
        <LinearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={successColor} stopOpacity="1" />
          <Stop offset="100%" stopColor={successColor} stopOpacity="0.7" />
        </LinearGradient>
      </Defs>

      {/* Background success glow */}
      <Circle
        cx="140"
        cy="100"
        r="90"
        fill="url(#successGlow)"
        opacity="0.3"
      />

      {/* Graph baseline */}
      <G opacity="0.2">
        <Rect x="40" y="160" width="200" height="1" fill={theme === 'dark' ? '#F8FAFC' : '#0F172A'} />
        <Rect x="40" y="60" width="1" height="100" fill={theme === 'dark' ? '#F8FAFC' : '#0F172A'} />
      </G>

      {/* Trend line path */}
      <Path
        d="M 50 150 L 90 130 L 130 110 L 170 70 L 210 40"
        fill="none"
        stroke="url(#arrowGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data points */}
      <G>
        <Circle cx="50" cy="150" r="5" fill={primaryColor} opacity="0.6" />
        <Circle cx="90" cy="130" r="5" fill={primaryColor} opacity="0.7" />
        <Circle cx="130" cy="110" r="5" fill={successColor} opacity="0.8" />
        <Circle cx="170" cy="70" r="5" fill={successColor} opacity="0.9" />
        <Circle cx="210" cy="40" r="6" fill={successColor} />
        {/* Glow on final point */}
        <Circle cx="210" cy="40" r="10" fill={successColor} opacity="0.3" />
      </G>

      {/* Upward arrow head */}
      <G transform="translate(210, 40)">
        <Polygon
          points="0,-15 -8,0 8,0"
          fill={successColor}
        />
        <Polygon
          points="0,-15 -8,0 8,0"
          fill={successColor}
          opacity="0.4"
          scale="1.3"
        />
      </G>

      {/* Dollar signs floating up */}
      <G opacity="0.7">
        {/* Bottom dollar sign */}
        <G transform="translate(60, 140)">
          <Rect x="-1" y="0" width="2" height="20" fill={successColor} />
          <Path
            d="M -6 5 L 6 5 C 8 5, 8 8, 6 10 L -6 10 C -8 10, -8 13, -6 15 L 6 15"
            fill="none"
            stroke={successColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>

        {/* Middle dollar sign */}
        <G transform="translate(140, 90)" opacity="0.8">
          <Rect x="-1" y="0" width="2" height="20" fill={successColor} />
          <Path
            d="M -6 5 L 6 5 C 8 5, 8 8, 6 10 L -6 10 C -8 10, -8 13, -6 15 L 6 15"
            fill="none"
            stroke={successColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>

        {/* Top dollar sign */}
        <G transform="translate(190, 50)" opacity="0.9">
          <Rect x="-1" y="0" width="2" height="20" fill={successColor} />
          <Path
            d="M -6 5 L 6 5 C 8 5, 8 8, 6 10 L -6 10 C -8 10, -8 13, -6 15 L 6 15"
            fill="none"
            stroke={successColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>
      </G>

      {/* Savings coins */}
      <G>
        {/* Left coin */}
        <G transform="translate(30, 170)">
          <Circle cx="0" cy="0" r="12" fill="url(#coinGradient)" />
          <Circle cx="0" cy="0" r="10" fill="none" stroke={successColor} strokeWidth="1.5" opacity="0.5" />
          <Rect x="-1" y="-6" width="2" height="12" fill={bgColor} opacity="0.8" />
          <Rect x="-5" y="-1" width="10" height="2" fill={bgColor} opacity="0.8" />
        </G>

        {/* Right coin */}
        <G transform="translate(250, 160)">
          <Circle cx="0" cy="0" r="14" fill="url(#coinGradient)" />
          <Circle cx="0" cy="0" r="12" fill="none" stroke={successColor} strokeWidth="1.5" opacity="0.5" />
          <Rect x="-1" y="-7" width="2" height="14" fill={bgColor} opacity="0.8" />
          <Rect x="-6" y="-1" width="12" height="2" fill={bgColor} opacity="0.8" />
        </G>

        {/* Small coin accent */}
        <G transform="translate(220, 150)">
          <Circle cx="0" cy="0" r="8" fill="url(#coinGradient)" opacity="0.7" />
          <Rect x="-0.5" y="-4" width="1" height="8" fill={bgColor} opacity="0.8" />
          <Rect x="-3" y="-0.5" width="6" height="1" fill={bgColor} opacity="0.8" />
        </G>
      </G>

      {/* Sparkles around top of arrow */}
      <G opacity="0.6">
        <Path d="M 225 30 L 227 35 L 232 33 L 228 38 L 233 40 L 227 41 L 228 46 L 225 41 L 220 43 L 223 38 L 218 36 L 223 35 Z" fill={successColor} />
        <Path d="M 200 20 L 201 23 L 204 22 L 202 25 L 205 26 L 201 27 L 202 30 L 200 27 L 197 28 L 199 25 L 196 24 L 199 23 Z" fill={successColor} />
        <Path d="M 235 50 L 236 52 L 238 51 L 237 54 L 240 55 L 237 56 L 237 59 L 235 56 L 232 57 L 234 54 L 231 53 L 234 52 Z" fill={primaryColor} />
      </G>

      {/* Percentage badge */}
      <G transform="translate(110, 30)">
        <Rect
          x="0"
          y="0"
          width="50"
          height="24"
          fill={successColor}
          rx="12"
          opacity="0.9"
        />
        <Rect
          x="0"
          y="0"
          width="50"
          height="24"
          fill="none"
          stroke={successColor}
          strokeWidth="1"
          rx="12"
          opacity="0.3"
        />
        {/* Minus sign */}
        <Rect x="10" y="11" width="8" height="2" fill="#FFFFFF" rx="1" />
        {/* Percentage symbol */}
        <G transform="translate(22, 7)">
          <Circle cx="0" cy="0" r="2" fill="#FFFFFF" />
          <Path d="M 1 1 L 10 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <Circle cx="11" cy="15" r="2" fill="#FFFFFF" />
        </G>
      </G>
    </Svg>
  );
}
