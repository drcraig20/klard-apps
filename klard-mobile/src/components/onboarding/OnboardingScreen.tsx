import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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

// Slide data
const slides = [
  {
    id: 1,
    icon: '📊',
    headline: 'All Your Subscriptions,\nOne Place',
    body: 'See Netflix, Spotify, and every recurring charge at a glance. Never lose track again.',
    accentColor: colors.primary,
  },
  {
    id: 2,
    icon: '🔔',
    headline: 'Catch Price\nIncreases Instantly',
    body: 'Get alerted the moment a service raises prices. Compare alternatives before you overpay.',
    accentColor: colors.warning,
  },
  {
    id: 3,
    icon: '🛡️',
    headline: 'Block Unwanted\nCharges',
    body: 'Create BurnerCards that auto-lock after free trials. No more surprise renewals.',
    accentColor: colors.primary,
  },
  {
    id: 4,
    icon: '💰',
    headline: 'Watch Your\nSavings Grow',
    body: 'Track every blocked charge and cancelled subscription. See your total savings in real-time.',
    accentColor: colors.success,
  },
];

// Single Slide Component
function OnboardingSlide({
  slide,
  index,
  scrollX,
}: {
  slide: (typeof slides)[0];
  index: number;
  scrollX: Animated.Value;
}) {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [50, 0, 50],
    extrapolate: 'clamp',
  });

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

  return (
    <View style={styles.slide}>
      {/* Decorative gradient orb */}
      <View style={[styles.gradientOrb, { backgroundColor: slide.accentColor }]} />

      {/* Icon */}
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            transform: [{ scale: iconScale }, { rotate: iconRotate }],
          },
        ]}
      >
        <LinearGradient
          colors={[colors.glassBg, 'rgba(30, 41, 59, 0.3)']}
          style={styles.iconGlass}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.iconEmoji}>{slide.icon}</Text>
        </LinearGradient>
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.headline}>{slide.headline}</Text>
        <Text style={styles.body}>{slide.body}</Text>
      </Animated.View>
    </View>
  );
}

// Pagination Dot
function PaginationDot({
  index,
  scrollX,
}: {
  index: number;
  scrollX: Animated.Value;
}) {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const width = scrollX.interpolate({
    inputRange,
    outputRange: [8, 32, 8],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 1, 0.4],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width,
          opacity,
          backgroundColor: colors.primary,
        },
      ]}
    />
  );
}

interface OnboardingScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

// Main Onboarding Component
export function OnboardingScreen({ onComplete, onSkip }: OnboardingScreenProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Fade in animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entry animations
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
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / SCREEN_WIDTH);
        if (index !== currentIndex && index >= 0 && index < slides.length) {
          setCurrentIndex(index);
        }
      },
    }
  );

  const goToNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex]);

  const isLastSlide = currentIndex === slides.length - 1;

  const onButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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
      <Animated.View
        style={[
          styles.skipContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Pressable onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </Animated.View>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {slides.map((slide, index) => (
          <OnboardingSlide key={slide.id} slide={slide} index={index} scrollX={scrollX} />
        ))}
      </ScrollView>

      {/* Bottom section: pagination + button */}
      <Animated.View
        style={[
          styles.bottomSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }],
          },
        ]}
      >
        {/* Pagination dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <PaginationDot key={index} index={index} scrollX={scrollX} />
          ))}
        </View>

        {/* CTA Button */}
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
          <Pressable
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
            onPress={isLastSlide ? onComplete : goToNext}
            style={styles.buttonPressable}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>{isLastSlide ? 'Get Started' : 'Next'}</Text>
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
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 200,
  },
  gradientOrb: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.15,
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
    width: 120,
    height: 120,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    // Glassmorphism shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  iconEmoji: {
    fontSize: 56,
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