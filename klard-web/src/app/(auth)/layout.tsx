import { AuthIllustration } from '@/components/auth/auth-illustration';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left panel - Illustration (hidden on mobile) */}
      <AuthIllustration />

      {/* Right panel - Form */}
      <div className="flex items-center justify-center bg-[var(--card)] p-4">
        <div
          className="
            w-full max-w-md
            md:bg-[var(--card)]/80 md:backdrop-blur-[12px]
            md:border md:border-[var(--border)]
            md:rounded-[var(--radius-lg)]
            md:shadow-[0_2px_12px_rgba(15,23,42,0.08)]
            dark:md:bg-[rgba(30,41,59,0.6)]
            dark:md:shadow-[0_4px_16px_rgba(0,0,0,0.1)]
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
