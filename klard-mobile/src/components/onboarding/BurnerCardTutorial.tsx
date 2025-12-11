import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useEffect } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { en } from '@klard-apps/commons';
import { BurnerCardIllustration } from './illustrations';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Colors } from '@/styles/colors';

// Use dark theme colors (onboarding is always dark mode)
const colors = {
  ...Colors.dark,
  primaryDark: Colors.dark.secondary,
  backgroundElevated: Colors.dark.muted,
  glassBg: 'rgba(30, 41, 59, 0.6)',
};

// Feature data (OCP: Extend by adding data, not modifying code)
type FeatureCopy = { title: string; description: string };
const features: FeatureCopy[] = en.onboarding.burnerCardTutorial.features.map(
  (feature) => ({ ...feature })
);

// Feature Icon Component (SRP: Renders feature icon only)
interface FeatureIconProps {
  index: number;
}

function FeatureIcon({ index }: FeatureIconProps) {
  // Different icons for each feature
  const iconPaths = [
    // Block icon (circle with X)
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
    // Clock/Timer icon
    'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    // Limit/Cap icon
    'M7 10l5 5 5-5z',
  ];

  return (
    <View style={styles.featureIconWrapper}>
      <View style={[styles.featureIconBg, { backgroundColor: colors.primary }]}>
        <Text style={styles.featureIconText}>
          {index === 0 ? '🚫' : index === 1 ? '⏰' : '💰'}
        </Text>
      </View>
    </View>
  );
}

// Feature Row Component (SRP: Renders one feature row)
interface FeatureRowProps {
  feature: FeatureCopy;
  index: number;
}

function FeatureRow({ feature, index }: FeatureRowProps) {
  return (
    <View style={styles.featureRow}>
      <FeatureIcon index={index} />
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </View>
  );
}

interface BurnerCardTutorialProps {
  onSkip: () => void;
}

// Main BurnerCard Tutorial Component (SRP: Orchestrates tutorial screen)
export function BurnerCardTutorial({ onSkip }: BurnerCardTutorialProps) {
  const { width: screenWidth } = useWindowDimensions();
  const { completeOnboarding, isUpdating } = useOnboarding();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Entry animations on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideUpAnim]);

  // Haptic feedback handlers
  const onButtonPressIn = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.spring(buttonScale, {
      toValue: 0.95,
      friction: 8,
      tension: 300,
      useNativeDriver: true,
    }).start();
  }, [buttonScale]);

  const onButtonPressOut = useCallback(() => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 8,
      tension: 300,
      useNativeDriver: true,
    }).start();
  }, [buttonScale]);

  const handleSkip = useCallback(() => {
    Haptics.selectionAsync();
    onSkip();
  }, [onSkip]);

  const handleCreateBurnerCard = useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await completeOnboarding();
  }, [completeOnboarding]);

  const handleExploreDashboard = useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await completeOnboarding();
  }, [completeOnboarding]);

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

      {/* Skip button */}
      <Animated.View style={[styles.skipContainer, { opacity: fadeAnim }]}>
        <Pressable onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>{en.onboarding.navigation.skip}</Text>
        </Pressable>
      </Animated.View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] },
          ]}
        >
          {/* Step Indicator */}
          <Text style={styles.stepIndicator}>
            {en.onboarding.burnerCardTutorial.stepIndicator}
          </Text>

          {/* Illustration */}
          <View style={styles.illustrationWrapper}>
            <BurnerCardIllustration theme="dark" width={200} height={140} />
          </View>

          {/* Headline */}
          <Text style={styles.headline}>{en.onboarding.burnerCardTutorial.headline}</Text>

          {/* Body */}
          <Text style={styles.body}>{en.onboarding.burnerCardTutorial.body}</Text>

          {/* Feature Highlights (Glassmorphism) */}
          <BlurView intensity={40} tint="dark" style={styles.featuresCard}>
            {features.map((feature, index) => (
              <FeatureRow key={index} feature={feature} index={index} />
            ))}
          </BlurView>
        </Animated.View>
      </ScrollView>

      {/* Bottom CTAs */}
      <Animated.View
        style={[
          styles.bottomSection,
          { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] },
        ]}
      >
        {/* Primary CTA */}
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
          <Pressable
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
            onPress={handleCreateBurnerCard}
            disabled={isUpdating}
            style={styles.buttonPressable}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>
                {en.onboarding.burnerCardTutorial.buttons.createBurnerCard}
              </Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Secondary CTA */}
        <Pressable
          onPress={handleExploreDashboard}
          disabled={isUpdating}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            {en.onboarding.burnerCardTutorial.buttons.exploreDashboard}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 100,
    paddingBottom: 220,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  skipContainer: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    color: colors.muted,
    fontWeight: '500',
  },
  stepIndicator: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: '500',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  illustrationWrapper: {
    marginBottom: 32,
  },
  headline: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  body: {
    fontSize: 17,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  featuresCard: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureIconWrapper: {
    marginRight: 16,
  },
  featureIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.2,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
    paddingTop: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 16,
    // Teal glow effect
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 12,
  },
  buttonPressable: {
    width: '100%',
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
    letterSpacing: 0.3,
  },
});
