import { router } from 'expo-router';
import { BurnerCardTutorial } from '@/components/onboarding';

/**
 * Onboarding BurnerCard Tutorial Screen Route
 *
 * Explains BurnerCards feature with glassmorphism UI and allows user to:
 * 1. Create their first BurnerCard (navigates to dashboard)
 * 2. Explore dashboard first (navigates to dashboard)
 *
 * Features:
 * - Step indicator (Step 2 of 2)
 * - BurnerCard illustration with shield
 * - Glassmorphism feature highlights using BlurView
 * - Haptic feedback on interactions
 * - Completes onboarding flow
 *
 * Navigation flow:
 * - From: /onboarding-subscription
 * - To: /(tabs)/dashboard (after completeOnboarding)
 *
 * SRP: Renders BurnerCard tutorial screen only
 * DIP: Delegates logic to BurnerCardTutorial component
 */
export default function OnboardingBurnerCardScreen() {
  const handleSkip = () => {
    router.replace('/(tabs)/dashboard');
  };

  return <BurnerCardTutorial onSkip={handleSkip} />;
}
