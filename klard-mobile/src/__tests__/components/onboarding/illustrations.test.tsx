import React from 'react';
import { render } from '@testing-library/react-native';
import {
  TrackIllustration,
  ProtectIllustration,
  SaveIllustration,
  BurnerCardIllustration
} from '@/components/onboarding/illustrations';
import { mockLightColors } from '@/__tests__/__mocks__/theme';

// Mock ThemeContext - inline mock to avoid Jest hoisting issues
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    colors: mockLightColors,
    isDark: false,
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
  }),
  useThemeColors: () => mockLightColors,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('Onboarding Illustrations', () => {
  describe('TrackIllustration', () => {
    it('should render without error', () => {
      const { getByLabelText } = render(<TrackIllustration />);

      const illustration = getByLabelText('Floating subscription cards showing Netflix, Spotify, and a generic service');
      expect(illustration).toBeTruthy();
    });

    it('should render with custom dimensions', () => {
      const { getByLabelText } = render(<TrackIllustration width={300} height={250} />);

      const illustration = getByLabelText('Floating subscription cards showing Netflix, Spotify, and a generic service');
      expect(illustration).toBeTruthy();
    });
  });

  describe('ProtectIllustration', () => {
    it('should render without error', () => {
      const { getByLabelText } = render(<ProtectIllustration />);

      const illustration = getByLabelText('Credit card protected by a shield with teal glow');
      expect(illustration).toBeTruthy();
    });

    it('should render with custom dimensions', () => {
      const { getByLabelText } = render(<ProtectIllustration width={300} height={250} />);

      const illustration = getByLabelText('Credit card protected by a shield with teal glow');
      expect(illustration).toBeTruthy();
    });
  });

  describe('SaveIllustration', () => {
    it('should render without error', () => {
      const { getByLabelText } = render(<SaveIllustration />);

      const illustration = getByLabelText('Upward trending arrow with dollar signs showing savings growth');
      expect(illustration).toBeTruthy();
    });

    it('should render with custom dimensions', () => {
      const { getByLabelText } = render(<SaveIllustration width={300} height={250} />);

      const illustration = getByLabelText('Upward trending arrow with dollar signs showing savings growth');
      expect(illustration).toBeTruthy();
    });
  });

  describe('BurnerCardIllustration', () => {
    it('should render without error', () => {
      const { getByLabelText } = render(<BurnerCardIllustration />);

      const illustration = getByLabelText('Virtual BurnerCard with shield protection blocking unwanted charges');
      expect(illustration).toBeTruthy();
    });

    it('should render with custom dimensions', () => {
      const { getByLabelText } = render(<BurnerCardIllustration width={300} height={250} />);

      const illustration = getByLabelText('Virtual BurnerCard with shield protection blocking unwanted charges');
      expect(illustration).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('TrackIllustration should have accessibility label', () => {
      const { getByLabelText } = render(<TrackIllustration />);

      expect(getByLabelText('Floating subscription cards showing Netflix, Spotify, and a generic service')).toBeTruthy();
    });

    it('ProtectIllustration should have accessibility label', () => {
      const { getByLabelText } = render(<ProtectIllustration />);

      expect(getByLabelText('Credit card protected by a shield with teal glow')).toBeTruthy();
    });

    it('SaveIllustration should have accessibility label', () => {
      const { getByLabelText } = render(<SaveIllustration />);

      expect(getByLabelText('Upward trending arrow with dollar signs showing savings growth')).toBeTruthy();
    });

    it('BurnerCardIllustration should have accessibility label', () => {
      const { getByLabelText } = render(<BurnerCardIllustration />);

      expect(getByLabelText('Virtual BurnerCard with shield protection blocking unwanted charges')).toBeTruthy();
    });
  });
});
