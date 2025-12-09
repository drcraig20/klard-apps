import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState, useEffect } from 'react';
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
import { router } from 'expo-router';
import { en } from '@klard-apps/commons';
import {
  TrackIllustration,
  ProtectIllustration,
  SaveIllustration,
} from './illustrations';

// Klard Design System Colors
const colors = {
  background: '#0F172A',
  backgroundElevated: '#1E293B',
  primary: '#15B5B0',
  primaryDark: '#0D7C7A',
  foreground: '#F8FAFC',
  muted: '#94A3B8',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  border: 'rgba(148, 163, 184, 0.12)',
  glassBg: 'rgba(30, 41, 59, 0.6)',
};

// Slide data (OCP: Extend by adding data, not modifying code)
const slides = [
  {
    id: 'track',
    headline: en.onboarding.welcome.slides.track.headline,
    body: en.onboarding.welcome.slides.track.body,
    Illustration: TrackIllustration,
    accentColor: colors.primary,
  },
  {
    id: 'protect',
    headline: en.onboarding.welcome.slides.protect.headline,
    body: en.onboarding.welcome.slides.protect.body,
    Illustration: ProtectIllustration,
    accentColor: colors.primary,
  },
  {
    id: 'save',
    headline: en.onboarding.welcome.slides.save.headline,
    body: en.onboarding.welcome.slides.save.body,
    Illustration: SaveIllustration,
    accentColor: colors.success,
  },
];

// Single Slide Component (SRP: Renders one slide only)
interface OnboardingSlideProps {
  slide: (typeof slides)[0];
  index: number;
  scrollX: Animated.Value;
  screenWidth: number;
  screenHeight: number;
}

function OnboardingSlide({
  slide,
  index,
  scrollX,
  screenWidth,
  screenHeight,
}: OnboardingSlideProps) {
  const inputRange = [
    (index - 1) * screenWidth,
    index * screenWidth,
    (index + 1) * screenWidth,
  ];

  // Icon animations (scale + rotate based on scroll)
  const iconScale = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  const iconRotate = scrollX.interpolate({
    inputRange,
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  // Content animations (opacity + translateY based on scroll)
  const contentOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const contentTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [50, 0, 50],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.slide, { width: screenWidth }]}>
      {/* Decorative gradient orb */}
      <View
        style={[
          styles.gradientOrb,
          { backgroundColor: slide.accentColor, top: screenHeight * 0.15 },
        ]}
      />

      {/* Illustration with native blur effect */}
      <Animated.View
        style={[
          styles.iconWrapper,
          { transform: [{ scale: iconScale }, { rotate: iconRotate }] },
        ]}
      >
        <BlurView intensity={40} tint="dark" style={styles.iconGlass}>
          <slide.Illustration theme="dark" width={200} height={140} />
        </BlurView>
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={[
          styles.contentContainer,
          { opacity: contentOpacity, transform: [{ translateY: contentTranslateY }] },
        ]}
      >
        <Text style={styles.headline}>{slide.headline}</Text>
        <Text style={styles.body}>{slide.body}</Text>
      </Animated.View>
    </View>
  );
}

// Pagination Dot (SRP: Renders one dot only)
interface PaginationDotProps {
  index: number;
  scrollX: Animated.Value;
  screenWidth: number;
}

function PaginationDot({ index, scrollX, screenWidth }: PaginationDotProps) {
  const inputRange = [
    (index - 1) * screenWidth,
    index * screenWidth,
    (index + 1) * screenWidth,
  ];

  const dotWidth = scrollX.interpolate({
    inputRange,
    outputRange: [8, 32, 8],
    extrapolate: 'clamp',
  });

  const dotOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 1, 0.4],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        { backgroundColor: colors.primary, width: dotWidth, opacity: dotOpacity },
      ]}
    />
  );
}

interface OnboardingScreenProps {
  onSkip: () => void;
}

// Main Onboarding Component (SRP: Orchestrates onboarding flow)
export function OnboardingScreen({ onSkip }: OnboardingScreenProps) {
  // Use reactive dimensions hook instead of static Dimensions.get()
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // React Native Animated values
  const scrollX = useRef(new Animated.Value(0)).current;
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

  // Handle scroll to update current index
  const handleScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / screenWidth);
      if (index !== currentIndex && index >= 0 && index < slides.length) {
        setCurrentIndex(index);
      }
    },
    [currentIndex, screenWidth]
  );

  const goToNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, screenWidth]);

  const isLastSlide = currentIndex === slides.length - 1;

  // Haptic feedback handlers with spring animations
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

  const handleButtonPress = useCallback(() => {
    if (isLastSlide) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.push('/onboarding-subscription');
    } else {
      goToNext();
    }
  }, [isLastSlide, goToNext]);

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

      {/* Slides */}
      <Animated.ScrollView
        ref={scrollViewRef as React.RefObject<ScrollView>}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {slides.map((slide, index) => (
          <OnboardingSlide
            key={slide.id}
            slide={slide}
            index={index}
            scrollX={scrollX}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
          />
        ))}
      </Animated.ScrollView>

      {/* Bottom section: pagination + button */}
      <Animated.View
        style={[
          styles.bottomSection,
          { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] },
        ]}
      >
        {/* Pagination dots */}
        <View style={styles.pagination}>
          {slides.map((slide) => (
            <PaginationDot
              key={slide.id}
              index={slides.indexOf(slide)}
              scrollX={scrollX}
              screenWidth={screenWidth}
            />
          ))}
        </View>

        {/* CTA Button */}
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
          <Pressable
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
            onPress={handleButtonPress}
            style={styles.buttonPressable}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>
                {isLastSlide ? en.onboarding.navigation.getStarted : en.onboarding.navigation.next}
              </Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
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
  },
  slide: {
    // width is set dynamically via screenWidth prop
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 200,
  },
  gradientOrb: {
    position: 'absolute',
    // top is set dynamically via screenHeight prop
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.15,
    transform: [{ scale: 1.5 }],
  },
  iconWrapper: {
    marginBottom: 48,
  },
  iconGlass: {
    width: 220,
    height: 160,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    // Native blur handles glassmorphism
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    paddingHorizontal: 10,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
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
    maxWidth: 320,
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
  bottomSection: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 320,
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
    borderRadius: 9999, // Full pill
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    letterSpacing: 0.3,
  },
});