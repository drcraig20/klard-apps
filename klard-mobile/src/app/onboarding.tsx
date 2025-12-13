import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useOnboarding } from '@/hooks/useOnboarding';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { Colors } from '@/styles/colors';

// Use dark theme colors (onboarding is always dark mode)
const colors = Colors.dark;

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