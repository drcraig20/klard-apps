import React from 'react';
import Svg, { Path, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

interface IllustrationProps {
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

export function TrackIllustration({
  theme = 'dark',
  width = 280,
  height = 200
}: Readonly<IllustrationProps>) {
  const primaryColor = theme === 'dark' ? '#15B5B0' : '#0D7C7A';
  const cardBg = theme === 'dark' ? '#1E293B' : '#FFFFFF';
  const borderColor = theme === 'dark' ? '#334155' : '#E2E8F0';

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 280 200"
      accessibilityLabel="Floating subscription cards showing Netflix, Spotify, and a generic service"
    >
      <Defs>
        {/* Teal glow gradient */}
        <LinearGradient id="tealGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
          <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.1" />
        </LinearGradient>

        {/* Card shadow gradient */}
        <LinearGradient id="cardShadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
        </LinearGradient>
      </Defs>

      {/* Background subtle glow */}
      <Rect
        x="40"
        y="20"
        width="200"
        height="160"
        fill="url(#tealGlow)"
        rx="20"
        opacity="0.3"
      />

      {/* Left Card (Netflix - red accent) */}
      <G transform="translate(30, 60) rotate(-8, 50, 35)">
        {/* Card shadow */}
        <Rect
          x="2"
          y="2"
          width="90"
          height="60"
          fill="#000000"
          opacity="0.15"
          rx="8"
        />
        {/* Card background */}
        <Rect
          x="0"
          y="0"
          width="90"
          height="60"
          fill={cardBg}
          stroke={borderColor}
          strokeWidth="1.5"
          rx="8"
        />
        {/* Netflix color bar */}
        <Rect
          x="0"
          y="0"
          width="90"
          height="8"
          fill="#E50914"
          rx="8"
        />
        {/* Logo placeholder */}
        <Rect
          x="10"
          y="20"
          width="30"
          height="12"
          fill="#E50914"
          opacity="0.3"
          rx="2"
        />
        {/* Price tag */}
        <Rect
          x="50"
          y="40"
          width="30"
          height="10"
          fill={primaryColor}
          opacity="0.2"
          rx="2"
        />
      </G>

      {/* Center Card (Spotify - green accent) */}
      <G transform="translate(95, 40)">
        {/* Card shadow */}
        <Rect
          x="2"
          y="2"
          width="90"
          height="60"
          fill="#000000"
          opacity="0.15"
          rx="8"
        />
        {/* Card background */}
        <Rect
          x="0"
          y="0"
          width="90"
          height="60"
          fill={cardBg}
          stroke={borderColor}
          strokeWidth="1.5"
          rx="8"
        />
        {/* Spotify color bar */}
        <Rect
          x="0"
          y="0"
          width="90"
          height="8"
          fill="#1DB954"
          rx="8"
        />
        {/* Logo placeholder */}
        <Rect
          x="10"
          y="20"
          width="30"
          height="12"
          fill="#1DB954"
          opacity="0.3"
          rx="2"
        />
        {/* Price tag */}
        <Rect
          x="50"
          y="40"
          width="30"
          height="10"
          fill={primaryColor}
          opacity="0.2"
          rx="2"
        />
        {/* Highlight glow */}
        <Rect
          x="0"
          y="0"
          width="90"
          height="60"
          fill={primaryColor}
          opacity="0.05"
          rx="8"
        />
      </G>

      {/* Right Card (Generic - teal accent) */}
      <G transform="translate(160, 80) rotate(8, 50, 35)">
        {/* Card shadow */}
        <Rect
          x="2"
          y="2"
          width="90"
          height="60"
          fill="#000000"
          opacity="0.15"
          rx="8"
        />
        {/* Card background */}
        <Rect
          x="0"
          y="0"
          width="90"
          height="60"
          fill={cardBg}
          stroke={borderColor}
          strokeWidth="1.5"
          rx="8"
        />
        {/* Klard color bar */}
        <Rect
          x="0"
          y="0"
          width="90"
          height="8"
          fill={primaryColor}
          rx="8"
        />
        {/* Logo placeholder */}
        <Rect
          x="10"
          y="20"
          width="30"
          height="12"
          fill={primaryColor}
          opacity="0.3"
          rx="2"
        />
        {/* Price tag */}
        <Rect
          x="50"
          y="40"
          width="30"
          height="10"
          fill={primaryColor}
          opacity="0.2"
          rx="2"
        />
      </G>

      {/* Floating dots for depth */}
      <G opacity="0.4">
        <Rect x="50" y="30" width="4" height="4" fill={primaryColor} rx="2" />
        <Rect x="220" y="50" width="3" height="3" fill={primaryColor} rx="1.5" />
        <Rect x="70" y="150" width="3" height="3" fill={primaryColor} rx="1.5" />
        <Rect x="200" y="170" width="4" height="4" fill={primaryColor} rx="2" />
      </G>
    </Svg>
  );
}
