import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Welcome | Klard',
  description: 'Complete your Klard setup',
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-3xl font-semibold text-foreground mb-4">
          Welcome to Klard!
        </h1>
        <p className="text-muted-foreground mb-8">
          Onboarding flow coming soon...
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}