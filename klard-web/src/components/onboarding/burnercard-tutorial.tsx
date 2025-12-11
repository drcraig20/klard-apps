'use client';

import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';
import { en } from '@klard-apps/commons';
import { BurnerCardIllustration } from '@/components/onboarding/illustrations';
import { Shield, Clock, DollarSign } from 'lucide-react';

interface BurnerCardTutorialProps {
  onComplete: () => void | Promise<void>;
  onSkip: () => void | Promise<void>;
  isUpdating?: boolean;
}

/**
 * Feature data structure
 *
 * OCP: Extend by adding more features to the array without modifying component logic
 */
interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

/**
 * BurnerCardTutorial Component
 *
 * Displays the second onboarding screen introducing BurnerCard functionality.
 * Shows features in a glassmorphism card with icon highlights.
 *
 * SRP: Manages BurnerCard tutorial display and completion only
 * OCP: Accepts features data as prop for extensibility
 * LSP: Works with any feature data matching the Feature interface
 * ISP: Focused props interface with only needed callbacks
 * DIP: Depends on abstract onComplete/onSkip callbacks, not concrete implementations
 */
export function BurnerCardTutorial({
  onComplete,
  onSkip,
  isUpdating = false,
}: BurnerCardTutorialProps) {
  // Default features data (OCP: extend by passing custom features)
  const features: Feature[] = [
    {
      id: 'block-renewals',
      icon: Shield,
      title: en.onboarding.burnerCardTutorial.features[0].title,
      description: en.onboarding.burnerCardTutorial.features[0].description,
    },
    {
      id: 'expiry-rules',
      icon: Clock,
      title: en.onboarding.burnerCardTutorial.features[1].title,
      description: en.onboarding.burnerCardTutorial.features[1].description,
    },
    {
      id: 'spending-limits',
      icon: DollarSign,
      title: en.onboarding.burnerCardTutorial.features[2].title,
      description: en.onboarding.burnerCardTutorial.features[2].description,
    },
  ];

  const handleCreateBurnerCard = useCallback(async () => {
    await onComplete();
  }, [onComplete]);

  const handleExploreDashboard = useCallback(async () => {
    await onComplete();
  }, [onComplete]);

  const handleSkip = useCallback(async () => {
    await onSkip();
  }, [onSkip]);

  const primaryLabel = en.onboarding.burnerCardTutorial.buttons.createBurnerCard;
  const secondaryLabel = en.onboarding.burnerCardTutorial.buttons.exploreDashboard;

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
        {/* Step indicator */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground font-medium">
            {en.onboarding.burnerCardTutorial.stepIndicator}
          </p>
        </div>

        {/* Decorative gradient orb */}
        <div
          className="absolute w-72 h-72 rounded-full bg-primary opacity-15 blur-3xl pointer-events-none"
          style={{ top: '15%' }}
        />

        {/* Illustration */}
        <div className="relative mb-8">
          <BurnerCardIllustration className="w-[280px] h-[200px]" />
        </div>

        {/* Content */}
        <div className="text-center max-w-md mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {en.onboarding.burnerCardTutorial.headline}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {en.onboarding.burnerCardTutorial.body}
          </p>
        </div>

        {/* Features glassmorphism card */}
        <div className="w-full max-w-md">
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-6 space-y-4">
            {features.map((feature) => (
              <FeatureItem
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section - CTA buttons */}
      <div className="pb-12 px-6">
        <div className="max-w-md mx-auto space-y-3">
          {/* Primary CTA */}
          <Button
            variant="klard"
            size="lg"
            onClick={handleCreateBurnerCard}
            disabled={isUpdating}
            className="w-full"
            aria-label={primaryLabel}
          >
            {isUpdating ? (
              <>
                <LoadingSpinner size="sm" aria-hidden="true" />
                <span className="sr-only">{primaryLabel}</span>
              </>
            ) : (
              primaryLabel
            )}
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="outline"
            size="lg"
            onClick={handleExploreDashboard}
            disabled={isUpdating}
            className="w-full"
            aria-label={secondaryLabel}
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * FeatureItem Component
 *
 * Displays a single feature with icon, title, and description.
 *
 * SRP: Renders individual feature item only
 */
interface FeatureItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4">
      {/* Icon with teal accent */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
