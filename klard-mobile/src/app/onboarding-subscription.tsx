import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { SubscriptionForm } from '@/components/onboarding/SubscriptionForm';

// Klard Design System Colors
const colors = {
  background: '#0F172A',
  backgroundElevated: '#1E293B',
};

/**
 * Screen 6: Add Subscription - Onboarding flow
 *
 * User can select a popular service from grid and fill out subscription details,
 * or skip to proceed to the burner card tutorial.
 *
 * Navigation flow:
 * - From: /onboarding (welcome carousel)
 * - To: /onboarding-burnercard (step 2 of 2)
 */
export default function OnboardingSubscriptionScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background gradient */}
      <LinearGradient
        colors={[colors.background, colors.backgroundElevated, colors.background]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <SubscriptionForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
