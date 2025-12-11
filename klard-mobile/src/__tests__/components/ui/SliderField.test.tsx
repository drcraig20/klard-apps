/**
 * Tests for SliderField Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { SliderField } from '@/components/ui/SliderField';
import { Platform } from 'react-native';

// Mock @expo/ui/swift-ui
jest.mock('@expo/ui/swift-ui', () => ({
  Slider: jest.fn(({ value, onValueChange }) => {
    const React = require('react');
    const { View } = require('react-native');
    return <View testID="slider-ios" />;
  }),
  Host: jest.fn(({ children, style }) => {
    const React = require('react');
    const { View } = require('react-native');
    return (
      <View testID="host" style={style}>
        {children}
      </View>
    );
  }),
}));

// Mock @react-native-community/slider
jest.mock('@react-native-community/slider', () => {
  const React = require('react');
  const { View } = require('react-native');
  return jest.fn(({ value, testID }) => (
    <View testID={testID || 'slider-android'} />
  ));
});

// Mock hooks
jest.mock('@/hooks', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    muted: '#E2E8F0',
    textSecondary: '#64748B',
  }),
}));

function setPlatform(os: 'ios' | 'android') {
  Object.defineProperty(Platform, 'OS', {
    value: os,
    configurable: true,
  });
  jest.spyOn(Platform, 'select').mockImplementation((obj: Record<string, unknown>) => obj[os]);
}

describe('SliderField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setPlatform('ios');
  });

  describe('Rendering', () => {
    it('should render slider field container', () => {
      const onChange = jest.fn();
      render(<SliderField value={50} onChange={onChange} />);

      expect(screen.getByTestId('slider-field-container')).toBeTruthy();
    });

    it('should render iOS Host component on iOS', () => {
      const onChange = jest.fn();
      render(<SliderField value={50} onChange={onChange} />);

      expect(screen.getByTestId('host')).toBeTruthy();
    });

    it('should have adjustable accessibility role', () => {
      const onChange = jest.fn();
      render(<SliderField value={50} onChange={onChange} />);

      const container = screen.getByTestId('slider-field-container');
      expect(container.props.accessibilityRole).toBe('adjustable');
    });
  });

  describe('Labels', () => {
    it('should display label when provided', () => {
      const onChange = jest.fn();
      render(<SliderField value={50} onChange={onChange} label="Volume" />);

      expect(screen.getByText('Volume')).toBeTruthy();
    });

    it('should display value when showValue is true', () => {
      const onChange = jest.fn();
      render(<SliderField value={75} onChange={onChange} showValue />);

      expect(screen.getByText('75')).toBeTruthy();
    });

    it('should display both label and value', () => {
      const onChange = jest.fn();
      render(
        <SliderField
          value={50}
          onChange={onChange}
          label="Brightness"
          showValue
        />,
      );

      expect(screen.getByText('Brightness')).toBeTruthy();
      expect(screen.getByText('50')).toBeTruthy();
    });
  });

  describe('Android Platform', () => {
    beforeEach(() => {
      setPlatform('android');
    });

    it('should use community slider on Android', () => {
      const onChange = jest.fn();
      render(<SliderField value={50} onChange={onChange} />);

      // On Android, should render community slider
      expect(screen.getByTestId('slider-android')).toBeTruthy();
    });
  });
});
