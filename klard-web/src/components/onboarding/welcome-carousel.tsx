'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';
import { en } from '@klard-apps/commons';
import {
  TrackIllustration,
  ProtectIllustration,
  SaveIllustration,
} from '@/components/onboarding/illustrations';

/**
 * Slide data structure
 *
 * OCP: Extend by adding more slides to the array without modifying component logic
 */
interface Slide {
  id: string;
  headline: string;
  body: string;
  Illustration: React.ComponentType<{ theme?: 'light' | 'dark'; className?: string }>;
  accentColor: 'primary' | 'success';
}

interface WelcomeCarouselProps {
  slides?: Slide[];
  onComplete: () => void | Promise<void>;
  onSkip: () => void | Promise<void>;
  isUpdating?: boolean;
}

/**
 * WelcomeCarousel Component
 *
 * Displays a multi-slide carousel introducing users to Klard's core features.
 * Uses SVG illustrations and i18n strings from commons package.
 *
 * SRP: Manages carousel state and navigation only
 * OCP: Accepts slides data as prop for extensibility
 * LSP: Works with any slide data matching the Slide interface
 * ISP: Focused props interface with only needed callbacks
 * DIP: Depends on abstract onComplete/onSkip callbacks, not concrete implementations
 */
export function WelcomeCarousel({
  slides: slidesProp,
  onComplete,
  onSkip,
  isUpdating = false,
}: WelcomeCarouselProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default slides data (OCP: extend by passing custom slides)
  const defaultSlides: Slide[] = [
    {
      id: 'track',
      headline: en.onboarding.welcome.slides.track.headline,
      body: en.onboarding.welcome.slides.track.body,
      Illustration: TrackIllustration,
      accentColor: 'primary',
    },
    {
      id: 'protect',
      headline: en.onboarding.welcome.slides.protect.headline,
      body: en.onboarding.welcome.slides.protect.body,
      Illustration: ProtectIllustration,
      accentColor: 'primary',
    },
    {
      id: 'save',
      headline: en.onboarding.welcome.slides.save.headline,
      body: en.onboarding.welcome.slides.save.body,
      Illustration: SaveIllustration,
      accentColor: 'success',
    },
  ];

  const slides = slidesProp || defaultSlides;
  const isLastSlide = currentIndex === slides.length - 1;
  const currentSlide = slides[currentIndex];
  const ctaLabel = isLastSlide
    ? en.onboarding.navigation.getStarted
    : en.onboarding.navigation.next;

  const handleNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, slides.length]);

  const handleButtonClick = useCallback(async () => {
    if (isLastSlide) {
      // Navigate to add-subscription instead of completing onboarding
      router.push('/onboarding/add-subscription');
    } else {
      handleNext();
    }
  }, [isLastSlide, handleNext, router]);

  const handleSkip = useCallback(async () => {
    await onSkip();
  }, [onSkip]);

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
          {en.onboarding.navigation.skip}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Decorative gradient orb */}
        <div
          className={cn(
            'absolute w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none',
            currentSlide.accentColor === 'primary' && 'bg-primary',
            currentSlide.accentColor === 'success' && 'bg-success'
          )}
          style={{ top: '15%' }}
        />

        {/* Illustration */}
        <div className="relative mb-12">
          <currentSlide.Illustration className="w-[280px] h-[200px]" />
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
            aria-label={ctaLabel}
          >
            {isUpdating ? (
              <>
                <LoadingSpinner size="sm" aria-hidden="true" />
                <span className="sr-only">{ctaLabel}</span>
              </>
            ) : isLastSlide ? (
              en.onboarding.navigation.getStarted
            ) : (
              en.onboarding.navigation.next
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
