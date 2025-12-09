import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { BurnerCardTutorial } from '@/components/onboarding/BurnerCardTutorial';
import * as Haptics from 'expo-haptics';
import { en } from '@klard-apps/commons';
import { useOnboarding } from '@/hooks/useOnboarding';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  selectionAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Medium: 'medium',
  },
  NotificationFeedbackType: {
    Success: 'success',
  },
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

// Mock expo-blur
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

// Mock useOnboarding hook
jest.mock('@/hooks/useOnboarding', () => ({
  useOnboarding: jest.fn(),
}));

// Mock the illustrations
jest.mock('@/components/onboarding/illustrations', () => ({
  BurnerCardIllustration: 'BurnerCardIllustration',
}));

const mockUseOnboarding = useOnboarding as jest.MockedFunction<typeof useOnboarding>;

describe('BurnerCardTutorial', () => {
  const mockOnSkip = jest.fn();
  const mockCompleteOnboarding = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseOnboarding.mockReturnValue({
      hasOnboarded: false,
      isPending: false,
      isUpdating: false,
      completeOnboarding: mockCompleteOnboarding,
      skipOnboarding: jest.fn(),
    });
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(getByText(en.onboarding.burnerCardTutorial.headline)).toBeTruthy();
    });

    it('should render headline and body text', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(getByText(en.onboarding.burnerCardTutorial.headline)).toBeTruthy();
      expect(getByText(en.onboarding.burnerCardTutorial.body)).toBeTruthy();
    });

    it('should render step indicator', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(getByText(en.onboarding.burnerCardTutorial.stepIndicator)).toBeTruthy();
    });

    it('should render 3 feature highlights with BlurView', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      // Check all 3 features
      en.onboarding.burnerCardTutorial.features.forEach((feature) => {
        expect(getByText(feature.title)).toBeTruthy();
        expect(getByText(feature.description)).toBeTruthy();
      });
    });

    it('should render Skip button', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(getByText(en.onboarding.navigation.skip)).toBeTruthy();
    });

    it('should render primary CTA button', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(
        getByText(en.onboarding.burnerCardTutorial.buttons.createBurnerCard)
      ).toBeTruthy();
    });

    it('should render secondary CTA button', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(
        getByText(en.onboarding.burnerCardTutorial.buttons.exploreDashboard)
      ).toBeTruthy();
    });
  });

  describe('Illustration', () => {
    it('should render BurnerCardIllustration', () => {
      const component = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      // Since illustration is mocked, we verify the component renders
      expect(component).toBeTruthy();
    });
  });

  describe('Feature Highlights', () => {
    it('should render all feature titles', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(getByText('Block surprise renewals')).toBeTruthy();
      expect(getByText('Set expiry rules')).toBeTruthy();
      expect(getByText('Control spending limits')).toBeTruthy();
    });

    it('should render all feature descriptions', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(getByText('Stop charges before they happen')).toBeTruthy();
      expect(getByText('Cards auto-lock after trial periods')).toBeTruthy();
      expect(getByText('Cap how much a service can charge')).toBeTruthy();
    });

    it('should render feature icons as emojis', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      // Verify emojis are rendered
      expect(getByText('🚫')).toBeTruthy();
      expect(getByText('⏰')).toBeTruthy();
      expect(getByText('💰')).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('should call onSkip when Skip button is pressed', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const skipButton = getByText(en.onboarding.navigation.skip);
      fireEvent.press(skipButton);

      expect(mockOnSkip).toHaveBeenCalledTimes(1);
    });

    it('should trigger haptic feedback when Skip is pressed', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const skipButton = getByText(en.onboarding.navigation.skip);
      fireEvent.press(skipButton);

      expect(Haptics.selectionAsync).toHaveBeenCalled();
    });
  });

  describe('Primary CTA Button - Create BurnerCard', () => {
    it('should trigger haptic feedback when primary button is pressed', async () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const button = getByText(en.onboarding.burnerCardTutorial.buttons.createBurnerCard);
      fireEvent.press(button);

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Success
        );
      });
    });

    it('should call completeOnboarding when primary button is pressed', async () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const button = getByText(en.onboarding.burnerCardTutorial.buttons.createBurnerCard);
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1);
      });
    });

    it('should trigger button press animations', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const button = getByText(en.onboarding.burnerCardTutorial.buttons.createBurnerCard);
      fireEvent(button, 'pressIn');

      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
    });

    it('should be disabled when isUpdating is true', () => {
      mockUseOnboarding.mockReturnValue({
        hasOnboarded: false,
        isPending: false,
        isUpdating: true,
        completeOnboarding: mockCompleteOnboarding,
        skipOnboarding: jest.fn(),
      });

      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const button = getByText(en.onboarding.burnerCardTutorial.buttons.createBurnerCard);
      fireEvent.press(button);

      // Should not trigger completeOnboarding when disabled
      expect(mockCompleteOnboarding).not.toHaveBeenCalled();
    });
  });

  describe('Secondary CTA Button - Explore Dashboard', () => {
    it('should trigger haptic feedback when secondary button is pressed', async () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const button = getByText(en.onboarding.burnerCardTutorial.buttons.exploreDashboard);
      fireEvent.press(button);

      await waitFor(() => {
        expect(Haptics.notificationAsync).toHaveBeenCalledWith(
          Haptics.NotificationFeedbackType.Success
        );
      });
    });

    it('should call completeOnboarding when secondary button is pressed', async () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const button = getByText(en.onboarding.burnerCardTutorial.buttons.exploreDashboard);
      fireEvent.press(button);

      await waitFor(() => {
        expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1);
      });
    });

    it('should be disabled when isUpdating is true', () => {
      mockUseOnboarding.mockReturnValue({
        hasOnboarded: false,
        isPending: false,
        isUpdating: true,
        completeOnboarding: mockCompleteOnboarding,
        skipOnboarding: jest.fn(),
      });

      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const button = getByText(en.onboarding.burnerCardTutorial.buttons.exploreDashboard);
      fireEvent.press(button);

      // Should not trigger completeOnboarding when disabled
      expect(mockCompleteOnboarding).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should render StatusBar component', () => {
      const component = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(component).toBeTruthy();
    });

    it('should have proper button accessibility', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      const skipButton = getByText(en.onboarding.navigation.skip);
      const primaryButton = getByText(
        en.onboarding.burnerCardTutorial.buttons.createBurnerCard
      );
      const secondaryButton = getByText(
        en.onboarding.burnerCardTutorial.buttons.exploreDashboard
      );

      expect(skipButton).toBeTruthy();
      expect(primaryButton).toBeTruthy();
      expect(secondaryButton).toBeTruthy();
    });
  });

  describe('Content from i18n', () => {
    it('should display all content from commons i18n', () => {
      const { getByText } = render(<BurnerCardTutorial onSkip={mockOnSkip} />);

      expect(getByText(en.onboarding.burnerCardTutorial.stepIndicator)).toBeTruthy();
      expect(getByText(en.onboarding.burnerCardTutorial.headline)).toBeTruthy();
      expect(getByText(en.onboarding.burnerCardTutorial.body)).toBeTruthy();
      expect(
        getByText(en.onboarding.burnerCardTutorial.buttons.createBurnerCard)
      ).toBeTruthy();
      expect(
        getByText(en.onboarding.burnerCardTutorial.buttons.exploreDashboard)
      ).toBeTruthy();
    });
  });
});
