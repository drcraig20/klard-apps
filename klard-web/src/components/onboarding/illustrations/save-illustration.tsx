interface IllustrationProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export function SaveIllustration({ theme = 'dark', className }: IllustrationProps) {
  const successColor = theme === 'dark' ? '#10B981' : '#059669';
  const backgroundColor = theme === 'dark' ? '#0F172A' : '#FFFFFF';
  const accentColor = theme === 'dark' ? '#15B5B0' : '#0D7C7A';

  return (
    <svg
      width={280}
      height={200}
      viewBox="0 0 280 200"
      role="img"
      aria-label="Upward trending arrow showing savings with dollar signs"
      className={className}
    >
      <defs>
        {/* Success glow effect */}
        <filter id="success-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Green gradient for arrow */}
        <linearGradient id="arrow-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={successColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={successColor} stopOpacity="1" />
        </linearGradient>

        {/* Teal to green gradient for path */}
        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={successColor} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="280" height="200" fill={backgroundColor} opacity="0" />

      {/* Trend line path - upward curve */}
      <g opacity="0.8">
        <path
          d="M 30,150 Q 80,140 100,110 T 140,80 T 180,50 T 220,30"
          stroke="url(#path-gradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Data points along the trend */}
      <circle cx="30" cy="150" r="5" fill={accentColor} opacity="0.6" />
      <circle cx="100" cy="110" r="5" fill={accentColor} opacity="0.7" />
      <circle cx="140" cy="80" r="5" fill={successColor} opacity="0.7" />
      <circle cx="180" cy="50" r="5" fill={successColor} opacity="0.8" />
      <circle cx="220" cy="30" r="6" fill={successColor} filter="url(#success-glow)" />

      {/* Upward arrow - main focal point */}
      <g transform="translate(220, 30)" filter="url(#success-glow)">
        {/* Arrow background circle */}
        <circle
          cx="0"
          cy="0"
          r="28"
          fill={successColor}
          opacity="0.2"
        />

        {/* Arrow shaft */}
        <rect
          x="-4"
          y="-5"
          width="8"
          height="35"
          rx="4"
          fill="url(#arrow-gradient)"
        />

        {/* Arrow head */}
        <path
          d="M 0,-15 L 12,0 L 0,-8 L -12,0 Z"
          fill={successColor}
        />
      </g>

      {/* Dollar signs - floating around */}
      <g opacity="0.7" filter="url(#success-glow)">
        {/* Large dollar sign - top left */}
        <text
          x="50"
          y="50"
          fontSize="32"
          fontWeight="700"
          fill={successColor}
        >
          $
        </text>

        {/* Medium dollar sign - middle */}
        <text
          x="130"
          y="130"
          fontSize="24"
          fontWeight="600"
          fill={successColor}
          opacity="0.8"
        >
          $
        </text>

        {/* Small dollar sign - bottom right */}
        <text
          x="240"
          y="160"
          fontSize="20"
          fontWeight="600"
          fill={successColor}
          opacity="0.6"
        >
          $
        </text>
      </g>

      {/* Savings badge/tag - bottom left */}
      <g transform="translate(35, 170)">
        {/* Badge background */}
        <rect
          x="0"
          y="0"
          width="65"
          height="24"
          rx="12"
          fill={successColor}
          opacity="0.2"
        />
        <rect
          x="1"
          y="1"
          width="63"
          height="22"
          rx="11"
          fill={successColor}
          opacity="0.3"
        />

        {/* Badge text */}
        <text
          x="32.5"
          y="16"
          fontSize="11"
          fontWeight="700"
          fill={successColor}
          textAnchor="middle"
        >
          SAVED
        </text>
      </g>

      {/* Percentage indicator - top right */}
      <g transform="translate(245, 85)">
        {/* Percentage background */}
        <circle
          cx="0"
          cy="0"
          r="18"
          fill={successColor}
          opacity="0.15"
        />

        {/* Percentage text */}
        <text
          x="0"
          y="5"
          fontSize="14"
          fontWeight="700"
          fill={successColor}
          textAnchor="middle"
        >
          +25%
        </text>
      </g>

      {/* Decorative sparkle effects */}
      <g opacity="0.4">
        {/* Top sparkle */}
        <path
          d="M 200,20 L 202,25 L 207,27 L 202,29 L 200,34 L 198,29 L 193,27 L 198,25 Z"
          fill={successColor}
        />

        {/* Bottom sparkle */}
        <path
          d="M 150,165 L 152,170 L 157,172 L 152,174 L 150,179 L 148,174 L 143,172 L 148,170 Z"
          fill={successColor}
        />

        {/* Right sparkle - smaller */}
        <path
          d="M 265,120 L 266,123 L 269,124 L 266,125 L 265,128 L 264,125 L 261,124 L 264,123 Z"
          fill={successColor}
        />
      </g>
    </svg>
  );
}
