/**
 * Tests for ServiceLogo Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ServiceLogo } from '@/components/ui/ServiceLogo';

// Mock expo-image
jest.mock('expo-image', () => ({
  Image: jest.fn(({ testID, style, accessibilityLabel }) => {
    const React = require('react');
    const { View } = require('react-native');
    return <View testID={testID} style={style} accessibilityLabel={accessibilityLabel} />;
  }),
}));

// Mock hooks
jest.mock('@/hooks', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    muted: '#F1F5F9',
  }),
}));

describe('ServiceLogo', () => {
  const mockService = {
    name: 'Netflix',
    logoUrl: 'https://example.com/netflix-logo.png',
  };

  const mockServiceNoLogo = {
    name: 'Spotify',
  };

  describe('Rendering', () => {
    it('should render service logo container', () => {
      render(<ServiceLogo service={mockServiceNoLogo} size="md" />);

      expect(screen.getByTestId('service-logo-container')).toBeTruthy();
    });

    it('should render fallback with first character of service name when no logo', () => {
      render(<ServiceLogo service={mockServiceNoLogo} size="md" />);

      expect(screen.getByText('S')).toBeTruthy();
    });

    it('should have accessibility label with service name', () => {
      render(<ServiceLogo service={mockService} size="md" />);

      const container = screen.getByTestId('service-logo-container');
      expect(container.props.accessibilityLabel).toBe('Netflix logo');
    });

    it('should have image accessibility role', () => {
      render(<ServiceLogo service={mockService} size="md" />);

      const container = screen.getByTestId('service-logo-container');
      expect(container.props.accessibilityRole).toBe('image');
    });
  });

  describe('Sizes', () => {
    it('should apply xs dimensions (24px)', () => {
      render(<ServiceLogo service={mockServiceNoLogo} size="xs" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 24,
        height: 24,
      });
    });

    it('should apply sm dimensions (32px)', () => {
      render(<ServiceLogo service={mockServiceNoLogo} size="sm" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 32,
        height: 32,
      });
    });

    it('should apply md dimensions (40px)', () => {
      render(<ServiceLogo service={mockServiceNoLogo} size="md" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 40,
        height: 40,
      });
    });

    it('should apply lg dimensions (48px)', () => {
      render(<ServiceLogo service={mockServiceNoLogo} size="lg" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 48,
        height: 48,
      });
    });
  });

  describe('Fallback Generation', () => {
    it('should uppercase the first character for fallback', () => {
      render(<ServiceLogo service={{ name: 'hulu' }} size="md" />);

      expect(screen.getByText('H')).toBeTruthy();
    });
  });

  describe('Shape', () => {
    it('should always render as circle (borderRadius = dimension / 2)', () => {
      render(<ServiceLogo service={mockServiceNoLogo} size="md" />);

      const container = screen.getByTestId('avatar-container');
      // md = 40px, so borderRadius should be 20
      expect(container.props.style.borderRadius).toBe(20);
    });
  });

  describe('Image', () => {
    it('should render image when service has logoUrl', () => {
      render(<ServiceLogo service={mockService} size="md" />);

      expect(screen.getByTestId('avatar-image')).toBeTruthy();
    });

    it('should not render fallback when logoUrl is provided', () => {
      render(<ServiceLogo service={mockService} size="md" />);

      expect(screen.queryByText('N')).toBeNull();
    });
  });
});