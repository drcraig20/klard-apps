import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useOnboarding } from '@/hooks/useOnboarding';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';

// Klard Design System Colors
const colors = {
  background: '#0F172A',
  primary: '#15B5B0',
};

export default function OnboardingRoute() {
  const { isPending: authPending } = useAuthRedirect({
    requireAuth: true,
    skipOnboardingCheck: true,
  });
  const { isPending, completeOnboarding, skipOnboarding } = useOnboarding();

  if (authPending || isPending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <OnboardingScreen
      onComplete={completeOnboarding}
      onSkip={skipOnboarding}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});