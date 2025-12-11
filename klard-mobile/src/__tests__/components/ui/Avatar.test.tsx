/**
 * Tests for Avatar Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Avatar } from '@/components/ui/Avatar';

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

describe('Avatar', () => {
  describe('Rendering', () => {
    it('should render avatar container', () => {
      render(<Avatar alt="John Doe" fallback="JD" size="md" />);

      expect(screen.getByTestId('avatar-container')).toBeTruthy();
    });

    it('should render fallback text when no src provided', () => {
      render(<Avatar alt="John Doe" fallback="JD" size="md" />);

      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('should have accessibility label', () => {
      render(<Avatar alt="John Doe" fallback="JD" size="md" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.accessibilityLabel).toBe('John Doe');
    });

    it('should have image accessibility role', () => {
      render(<Avatar alt="John Doe" fallback="JD" size="md" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.accessibilityRole).toBe('image');
    });
  });

  describe('Sizes', () => {
    it('should apply xs dimensions (24px)', () => {
      render(<Avatar alt="User" fallback="U" size="xs" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 24,
        height: 24,
      });
    });

    it('should apply sm dimensions (32px)', () => {
      render(<Avatar alt="User" fallback="U" size="sm" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 32,
        height: 32,
      });
    });

    it('should apply md dimensions (40px)', () => {
      render(<Avatar alt="User" fallback="U" size="md" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 40,
        height: 40,
      });
    });

    it('should apply lg dimensions (48px)', () => {
      render(<Avatar alt="User" fallback="U" size="lg" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 48,
        height: 48,
      });
    });

    it('should apply xl dimensions (64px)', () => {
      render(<Avatar alt="User" fallback="U" size="xl" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style).toMatchObject({
        width: 64,
        height: 64,
      });
    });
  });

  describe('Shape', () => {
    it('should apply circle border radius by default (half of dimension)', () => {
      render(<Avatar alt="User" fallback="U" size="md" />);

      const container = screen.getByTestId('avatar-container');
      // md = 40px, so borderRadius should be 20
      expect(container.props.style.borderRadius).toBe(20);
    });

    it('should apply square border radius when specified (8px)', () => {
      render(<Avatar alt="User" fallback="U" size="md" shape="square" />);

      const container = screen.getByTestId('avatar-container');
      expect(container.props.style.borderRadius).toBe(8);
    });
  });

  describe('Image', () => {
    it('should render image when src is provided', () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="John Doe"
          fallback="JD"
          size="md"
        />
      );

      expect(screen.getByTestId('avatar-image')).toBeTruthy();
    });

    it('should not render fallback when src is provided', () => {
      render(
        <Avatar
          src="https://example.com/avatar.jpg"
          alt="John Doe"
          fallback="JD"
          size="md"
        />
      );

      expect(screen.queryByText('JD')).toBeNull();
    });
  });
});
