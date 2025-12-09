'use client';

import { useState, useCallback } from 'react';
import { useOnboarding } from '@/hooks/use-onboarding';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

// Onboarding slides data (OCP: extend by adding data)
const slides = [
  {
    id: 1,
    icon: '📊',
    headline: 'All Your Subscriptions, One Place',
    body: 'See Netflix, Spotify, and every recurring charge at a glance. Never lose track again.',
    accentColor: 'text-primary',
  },
  {
    id: 2,
    icon: '🔔',
    headline: 'Catch Price Increases Instantly',
    body: 'Get alerted the moment a service raises prices. Compare alternatives before you overpay.',
    accentColor: 'text-warning',
  },
  {
    id: 3,
    icon: '🛡️',
    headline: 'Block Unwanted Charges',
    body: 'Create BurnerCards that auto-lock after free trials. No more surprise renewals.',
    accentColor: 'text-primary',
  },
  {
    id: 4,
    icon: '💰',
    headline: 'Watch Your Savings Grow',
    body: 'Track every blocked charge and cancelled subscription. See your total savings in real-time.',
    accentColor: 'text-success',
  },
];

export default function OnboardingPage() {
  const { isPending: authPending } = useAuthRedirect({
    requireAuth: true,
    skipOnboardingCheck: true,
  });
  const { isPending, isUpdating, completeOnboarding, skipOnboarding } = useOnboarding();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastSlide = currentIndex === slides.length - 1;
  const currentSlide = slides[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex]);

  const handleButtonClick = useCallback(async () => {
    if (isLastSlide) {
      await completeOnboarding();
    } else {
      handleNext();
    }
  }, [isLastSlide, completeOnboarding, handleNext]);

  const handleSkip = useCallback(async () => {
    await skipOnboarding();
  }, [skipOnboarding]);

  if (authPending || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip button */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          onClick={handleSkip}
          disabled={isUpdating}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Decorative gradient orb */}
        <div
          className={cn(
            'absolute w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none',
            currentSlide.accentColor === 'text-primary' && 'bg-primary',
            currentSlide.accentColor === 'text-warning' && 'bg-warning',
            currentSlide.accentColor === 'text-success' && 'bg-success'
          )}
          style={{ top: '15%' }}
        />

        {/* Icon */}
        <div className="relative mb-12">
          <div className="w-28 h-28 rounded-3xl bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-border/50 flex items-center justify-center shadow-lg">
            <span className="text-6xl">{currentSlide.icon}</span>
          </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {currentSlide.headline}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {currentSlide.body}
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="pb-12 px-6">
        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="max-w-xs mx-auto">
          <Button
            variant="klard"
            size="lg"
            onClick={handleButtonClick}
            disabled={isUpdating}
            className="w-full"
          >
            {isUpdating ? (
              <LoadingSpinner size="sm" />
            ) : isLastSlide ? (
              'Get Started'
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}