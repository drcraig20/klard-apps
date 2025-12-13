interface IllustrationProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export function ProtectIllustration({ theme = 'dark', className }: Readonly<IllustrationProps>) {
  const primaryColor = theme === 'dark' ? '#15B5B0' : '#0D7C7A';
  const backgroundColor = theme === 'dark' ? '#0F172A' : '#FFFFFF';
  const cardGradientStart = theme === 'dark' ? '#1E293B' : '#F1F5F9';
  const cardGradientEnd = theme === 'dark' ? '#0F172A' : '#E2E8F0';
  const textColor = theme === 'dark' ? '#F8FAFC' : '#0F172A';

  return (
    <svg
      width={280}
      height={200}
      viewBox="0 0 280 200"
      role="img"
      aria-label="Credit card protected by a security shield"
      className={className}
    >
      <defs>
        {/* Teal glow effect */}
        <filter id="protect-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Card gradient */}
        <linearGradient id="card-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={cardGradientStart} />
          <stop offset="100%" stopColor={cardGradientEnd} />
        </linearGradient>

        {/* Teal gradient for shield */}
        <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="280" height="200" fill={backgroundColor} opacity="0" />

      {/* Credit Card - centered and slightly tilted */}
      <g transform="translate(40, 60) rotate(-5)">
        {/* Card shadow */}
        <rect
          x="3"
          y="3"
          width="200"
          height="120"
          rx="12"
          fill="#000000"
          opacity="0.3"
        />

        {/* Card body */}
        <rect
          x="0"
          y="0"
          width="200"
          height="120"
          rx="12"
          fill="url(#card-gradient)"
          stroke={theme === 'dark' ? 'rgba(248, 250, 252, 0.15)' : 'rgba(15, 23, 42, 0.15)'}
          strokeWidth="1.5"
        />

        {/* Card chip */}
        <rect
          x="20"
          y="35"
          width="35"
          height="28"
          rx="4"
          fill={theme === 'dark' ? '#64748B' : '#94A3B8'}
          opacity="0.7"
        />
        <rect
          x="24"
          y="39"
          width="27"
          height="20"
          rx="2"
          fill={theme === 'dark' ? '#475569' : '#CBD5E1'}
          opacity="0.5"
        />

        {/* Card number (dots representing digits) */}
        <g opacity="0.6">
          <circle cx="20" cy="75" r="3" fill={textColor} />
          <circle cx="32" cy="75" r="3" fill={textColor} />
          <circle cx="44" cy="75" r="3" fill={textColor} />
          <circle cx="56" cy="75" r="3" fill={textColor} />

          <circle cx="75" cy="75" r="3" fill={textColor} />
          <circle cx="87" cy="75" r="3" fill={textColor} />
          <circle cx="99" cy="75" r="3" fill={textColor} />
          <circle cx="111" cy="75" r="3" fill={textColor} />

          <circle cx="130" cy="75" r="3" fill={textColor} />
          <circle cx="142" cy="75" r="3" fill={textColor} />
          <circle cx="154" cy="75" r="3" fill={textColor} />
          <circle cx="166" cy="75" r="3" fill={textColor} />
        </g>

        {/* Cardholder name placeholder */}
        <rect x="20" y="95" width="80" height="6" rx="3" fill={textColor} opacity="0.4" />

        {/* Expiry date placeholder */}
        <rect x="20" y="106" width="35" height="5" rx="2.5" fill={textColor} opacity="0.3" />
      </g>

      {/* Shield icon - overlaid on top with glow */}
      <g transform="translate(140, 30)" filter="url(#protect-glow)">
        {/* Shield background circle for emphasis */}
        <circle
          cx="0"
          cy="0"
          r="45"
          fill={primaryColor}
          opacity="0.15"
        />

        {/* Shield shape */}
        <path
          d="M 0,-35
             C 20,-35 30,-30 30,-20
             L 30,10
             C 30,25 15,35 0,45
             C -15,35 -30,25 -30,10
             L -30,-20
             C -30,-30 -20,-35 0,-35 Z"
          fill="url(#shield-gradient)"
          stroke={primaryColor}
          strokeWidth="2"
        />

        {/* Shield inner highlight */}
        <path
          d="M 0,-30
             C 17,-30 25,-26 25,-18
             L 25,8
             C 25,21 12,30 0,38
             C -12,30 -25,21 -25,8
             L -25,-18
             C -25,-26 -17,-30 0,-30 Z"
          fill={primaryColor}
          opacity="0.3"
        />

        {/* Checkmark inside shield */}
        <path
          d="M -12,0 L -5,10 L 15,-12"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Decorative security elements - lock icons */}
      <g opacity="0.2">
        <circle cx="30" cy="30" r="4" fill={primaryColor} />
        <rect x="28" y="32" width="4" height="5" rx="1" fill={primaryColor} />

        <circle cx="250" cy="170" r="3" fill={primaryColor} />
        <rect x="248.5" y="171.5" width="3" height="4" rx="0.75" fill={primaryColor} />
      </g>
    </svg>
  );
}
