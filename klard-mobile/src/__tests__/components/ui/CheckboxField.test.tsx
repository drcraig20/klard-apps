import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { CheckboxField } from '@/components/ui/CheckboxField';

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

// Mock hooks module to avoid expo-router dependency
jest.mock('@/hooks', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    foreground: '#0F172A',
    textSecondary: '#64748B',
  }),
}));

describe('CheckboxField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkbox without label', () => {
    const onChange = jest.fn();
    render(<CheckboxField checked={false} onChange={onChange} />);

    // expo-checkbox renders with testID
    expect(screen.getByTestId('checkbox')).toBeTruthy();
  });

  it('renders checkbox with label', () => {
    const onChange = jest.fn();
    render(
      <CheckboxField
        checked={false}
        onChange={onChange}
        label="Accept terms"
      />
    );

    expect(screen.getByText('Accept terms')).toBeTruthy();
  });

  it('renders checkbox with label and description', () => {
    const onChange = jest.fn();
    render(
      <CheckboxField
        checked={false}
        onChange={onChange}
        label="Accept terms"
        description="You must accept to continue"
      />
    );

    expect(screen.getByText('Accept terms')).toBeTruthy();
    expect(screen.getByText('You must accept to continue')).toBeTruthy();
  });

  it('calls onChange when pressed', async () => {
    const onChange = jest.fn();
    render(<CheckboxField checked={false} onChange={onChange} />);

    const pressable = screen.getByTestId('checkbox-pressable');
    fireEvent.press(pressable);

    // Wait for async haptic feedback to complete before onChange is called
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<CheckboxField checked={false} onChange={onChange} disabled />);

    const pressable = screen.getByTestId('checkbox-pressable');
    fireEvent.press(pressable);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('triggers haptic feedback on change', async () => {
    const Haptics = require('expo-haptics');
    const onChange = jest.fn();
    render(<CheckboxField checked={false} onChange={onChange} />);

    const pressable = screen.getByTestId('checkbox-pressable');
    fireEvent.press(pressable);

    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('has correct accessibility role', () => {
    const onChange = jest.fn();
    render(
      <CheckboxField
        checked={false}
        onChange={onChange}
        label="Accept terms"
      />
    );

    const pressable = screen.getByTestId('checkbox-pressable');
    expect(pressable.props.accessibilityRole).toBe('checkbox');
  });

  it('has correct accessibility state', () => {
    const onChange = jest.fn();
    render(
      <CheckboxField
        checked={true}
        onChange={onChange}
        disabled={true}
      />
    );

    const pressable = screen.getByTestId('checkbox-pressable');
    expect(pressable.props.accessibilityState).toEqual({ checked: true, disabled: true });
  });
});
