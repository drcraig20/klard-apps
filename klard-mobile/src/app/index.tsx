import { useRouter } from 'expo-router';
import { OnboardingScreen } from '../components/onboarding';

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.replace('/(auth)/login');
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  return <OnboardingScreen onComplete={handleComplete} onSkip={handleSkip} />;
}
