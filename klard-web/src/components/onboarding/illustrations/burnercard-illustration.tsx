interface IllustrationProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export function BurnerCardIllustration({ theme = 'dark', className }: Readonly<IllustrationProps>) {
  const primaryColor = theme === 'dark' ? '#15B5B0' : '#0D7C7A';
  const backgroundColor = theme === 'dark' ? '#0F172A' : '#FFFFFF';
  const cardGradientStart = theme === 'dark' ? '#1E293B' : '#F1F5F9';
  const cardGradientEnd = theme === 'dark' ? '#0F172A' : '#E2E8F0';
  const dangerColor = theme === 'dark' ? '#EF4444' : '#DC2626';
  const textColor = theme === 'dark' ? '#F8FAFC' : '#0F172A';

  return (
    <svg
      width={280}
      height={200}
      viewBox="0 0 280 200"
      role="img"
      aria-label="Credit card blocking unauthorized charges"
      className={className}
    >
      <defs>
        {/* Teal glow effect for card */}
        <filter id="burnercard-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Card gradient */}
        <linearGradient id="burnercard-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.7" />
        </linearGradient>

        {/* Danger gradient for blocked charge */}
        <radialGradient id="danger-gradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor={dangerColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={dangerColor} stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="280" height="200" fill={backgroundColor} opacity="0" />

      {/* Credit Card - centered with glow */}
      <g transform="translate(40, 50)" filter="url(#burnercard-glow)">
        {/* Card shadow */}
        <rect
          x="3"
          y="3"
          width="200"
          height="120"
          rx="12"
          fill="#000000"
          opacity="0.2"
        />

        {/* Card body with teal gradient */}
        <rect
          x="0"
          y="0"
          width="200"
          height="120"
          rx="12"
          fill="url(#burnercard-gradient)"
          stroke={primaryColor}
          strokeWidth="2"
        />

        {/* "BURNER" text label */}
        <text
          x="20"
          y="30"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="bold"
          fontFamily="Inter, sans-serif"
          letterSpacing="2"
        >
          BURNER
        </text>

        {/* Card chip */}
        <rect
          x="20"
          y="45"
          width="35"
          height="28"
          rx="4"
          fill="#FFFFFF"
          opacity="0.3"
        />
        <rect
          x="24"
          y="49"
          width="27"
          height="20"
          rx="2"
          fill="#FFFFFF"
          opacity="0.2"
        />

        {/* Card number (dots representing digits) */}
        <g opacity="0.8">
          <circle cx="20" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="32" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="44" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="56" cy="85" r="3" fill="#FFFFFF" />

          <circle cx="75" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="87" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="99" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="111" cy="85" r="3" fill="#FFFFFF" />

          <circle cx="130" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="142" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="154" cy="85" r="3" fill="#FFFFFF" />
          <circle cx="166" cy="85" r="3" fill="#FFFFFF" />
        </g>

        {/* Expiry date */}
        <text
          x="20"
          y="108"
          fill="#FFFFFF"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          opacity="0.7"
        >
          EXP: 12/24
        </text>

        {/* Limit indicator */}
        <text
          x="150"
          y="108"
          fill="#FFFFFF"
          fontSize="10"
          fontFamily="Inter, sans-serif"
          opacity="0.7"
          textAnchor="end"
        >
          $50.00
        </text>
      </g>

      {/* Blocked charge indicator - X icon with danger glow */}
      <g transform="translate(140, 30)">
        {/* Danger glow circle */}
        <circle
          cx="0"
          cy="0"
          r="40"
          fill="url(#danger-gradient)"
        />

        {/* White background circle */}
        <circle
          cx="0"
          cy="0"
          r="28"
          fill="#FFFFFF"
        />

        {/* Red X icon */}
        <g stroke={dangerColor} strokeWidth="5" strokeLinecap="round">
          <line x1="-12" y1="-12" x2="12" y2="12" />
          <line x1="12" y1="-12" x2="-12" y2="12" />
        </g>

        {/* "BLOCKED" label below */}
        <text
          x="0"
          y="50"
          fill={dangerColor}
          fontSize="11"
          fontWeight="bold"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
          letterSpacing="1"
        >
          BLOCKED
        </text>
      </g>

      {/* Decorative security elements - small shields */}
      <g opacity="0.15">
        <path
          d="M 25,25 L 30,25 L 30,30 C 30,33 27.5,35 25,37 C 22.5,35 20,33 20,30 L 20,25 Z"
          fill={primaryColor}
        />
        <path
          d="M 250,165 L 255,165 L 255,170 C 255,173 252.5,175 250,177 C 247.5,175 245,173 245,170 L 245,165 Z"
          fill={primaryColor}
        />
      </g>

      {/* Animated pulse ring (optional - shows blocking action) */}
      <circle
        cx="140"
        cy="30"
        r="35"
        fill="none"
        stroke={dangerColor}
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}
