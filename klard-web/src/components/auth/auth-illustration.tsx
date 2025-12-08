import { KlardLogo } from '@/components/ui/klard-icon';

export function AuthIllustration() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-[#F8FAFC] dark:from-[#0F172A] dark:to-[#1E293B] p-12">
      {/* Geometric shapes */}
      <div className="relative w-80 h-80 mb-12">
        {/* Large teal circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[var(--primary)]/10 blur-xl" />

        {/* Floating shapes */}
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Circle */}
          <circle
            cx="160"
            cy="100"
            r="60"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Square rotated */}
          <rect
            x="200"
            y="160"
            width="80"
            height="80"
            fill="var(--secondary)"
            opacity="0.15"
            transform="rotate(15 240 200)"
            rx="8"
          />

          {/* Triangle */}
          <polygon
            points="60,220 100,140 140,220"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            opacity="0.4"
          />

          {/* Small circles */}
          <circle cx="80" cy="80" r="8" fill="var(--primary)" opacity="0.3" />
          <circle cx="260" cy="120" r="6" fill="var(--secondary)" opacity="0.4" />
          <circle cx="180" cy="260" r="10" fill="var(--primary)" opacity="0.2" />

          {/* Lines */}
          <line
            x1="40"
            y1="160"
            x2="100"
            y2="160"
            stroke="var(--primary)"
            strokeWidth="2"
            opacity="0.3"
          />
          <line
            x1="220"
            y1="280"
            x2="280"
            y2="280"
            stroke="var(--secondary)"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Logo and tagline */}
      <KlardLogo className="mb-6" />
      <p className="text-lg text-[var(--text-secondary)] font-medium tracking-wide">
        Track. Detect. Protect.
      </p>
    </div>
  );
}
