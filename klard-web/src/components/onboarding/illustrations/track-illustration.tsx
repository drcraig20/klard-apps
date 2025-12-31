'use client';

import { useTheme } from 'next-themes';

interface IllustrationProps {
  className?: string;
}

export function TrackIllustration({ className }: Readonly<IllustrationProps>) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Theme-aware colors
  const colors = {
    primary: isDark ? '#15B5B0' : '#0D7C7A',
    background: isDark ? '#0F172A' : '#FFFFFF',
    foreground: isDark ? '#F8FAFC' : '#0F172A',
    surface: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.8)',
  };

  // Derive card background with opacity from the surface color
  const cardBorderColor = `color-mix(in srgb, ${colors.foreground} 10%, transparent)`;

  return (
    <svg
      width={280}
      height={200}
      viewBox="0 0 280 200"
      role="img"
      aria-label="Floating subscription cards showing Netflix, Spotify, and other services"
      className={className}
    >
      <defs>
        {/* Glassmorphism blur effect */}
        <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
        </filter>

        {/* Teal glow effect */}
        <filter id="teal-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background gradient */}
      <rect width="280" height="200" fill={colors.background} opacity="0" />

      {/* Card 1 - Netflix (Left, rotated -10deg) */}
      <g transform="translate(40, 60) rotate(-10)">
        {/* Card shadow */}
        <rect
          x="2"
          y="2"
          width="70"
          height="100"
          rx="8"
          fill="#000000"
          opacity="0.2"
        />
        {/* Card body with glassmorphism */}
        <rect
          x="0"
          y="0"
          width="70"
          height="100"
          rx="8"
          fill={colors.surface}
          stroke={cardBorderColor}
          strokeWidth="1"
          style={{ backdropFilter: 'blur(12px)' }}
        />
        {/* Netflix logo area (red accent) - intentionally hardcoded brand color */}
        <rect
          x="8"
          y="8"
          width="54"
          height="30"
          rx="4"
          fill="#E50914"
        />
        {/* Card details - lines */}
        <rect x="8" y="46" width="40" height="4" rx="2" fill={colors.foreground} opacity="0.6" />
        <rect x="8" y="56" width="30" height="4" rx="2" fill={colors.foreground} opacity="0.4" />
        {/* Price */}
        <text x="8" y="80" fontSize="16" fontWeight="600" fill={colors.foreground}>$15</text>
        <text x="8" y="92" fontSize="10" fill={colors.foreground} opacity="0.6">/mo</text>
      </g>

      {/* Card 2 - Spotify (Center, slightly elevated) */}
      <g transform="translate(105, 30) rotate(5)" filter="url(#teal-glow)">
        {/* Card shadow */}
        <rect
          x="2"
          y="2"
          width="70"
          height="100"
          rx="8"
          fill="#000000"
          opacity="0.2"
        />
        {/* Card body */}
        <rect
          x="0"
          y="0"
          width="70"
          height="100"
          rx="8"
          fill={colors.surface}
          stroke={colors.primary}
          strokeWidth="2"
          style={{ backdropFilter: 'blur(12px)' }}
        />
        {/* Spotify logo area (green accent) - intentionally hardcoded brand color */}
        <rect
          x="8"
          y="8"
          width="54"
          height="30"
          rx="4"
          fill="#1DB954"
        />
        {/* Card details */}
        <rect x="8" y="46" width="40" height="4" rx="2" fill={colors.foreground} opacity="0.6" />
        <rect x="8" y="56" width="35" height="4" rx="2" fill={colors.foreground} opacity="0.4" />
        {/* Price */}
        <text x="8" y="80" fontSize="16" fontWeight="600" fill={colors.foreground}>$11</text>
        <text x="8" y="92" fontSize="10" fill={colors.foreground} opacity="0.6">/mo</text>
      </g>

      {/* Card 3 - Generic service (Right, rotated 8deg) */}
      <g transform="translate(170, 70) rotate(8)">
        {/* Card shadow */}
        <rect
          x="2"
          y="2"
          width="70"
          height="100"
          rx="8"
          fill="#000000"
          opacity="0.2"
        />
        {/* Card body */}
        <rect
          x="0"
          y="0"
          width="70"
          height="100"
          rx="8"
          fill={colors.surface}
          stroke={cardBorderColor}
          strokeWidth="1"
          style={{ backdropFilter: 'blur(12px)' }}
        />
        {/* Generic service logo area (teal accent) */}
        <rect
          x="8"
          y="8"
          width="54"
          height="30"
          rx="4"
          fill={colors.primary}
          opacity="0.8"
        />
        {/* Card details */}
        <rect x="8" y="46" width="45" height="4" rx="2" fill={colors.foreground} opacity="0.6" />
        <rect x="8" y="56" width="25" height="4" rx="2" fill={colors.foreground} opacity="0.4" />
        {/* Price */}
        <text x="8" y="80" fontSize="16" fontWeight="600" fill={colors.foreground}>$9</text>
        <text x="8" y="92" fontSize="10" fill={colors.foreground} opacity="0.6">/mo</text>
      </g>

      {/* Floating dots for depth effect */}
      <circle cx="260" cy="40" r="3" fill={colors.primary} opacity="0.3" />
      <circle cx="20" cy="160" r="2" fill={colors.primary} opacity="0.4" />
      <circle cx="250" cy="180" r="2.5" fill={colors.primary} opacity="0.35" />
    </svg>
  );
}
