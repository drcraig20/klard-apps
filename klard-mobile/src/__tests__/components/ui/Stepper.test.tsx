/**
 * Tests for Stepper Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Stepper } from '@/components/ui/Stepper';

// Mock hooks
jest.mock('@/hooks', () => ({
  useThemeColors: () => ({
    primary: '#0D7C7A',
    muted: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    background: '#FFFFFF',
  }),
}));

const mockSteps = [
  { label: 'Step 1', description: 'First step' },
  { label: 'Step 2', description: 'Second step' },
  { label: 'Step 3', description: 'Third step' },
];

describe('Stepper', () => {
  describe('Rendering', () => {
    it('should render stepper container', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      expect(screen.getByTestId('stepper-container')).toBeTruthy();
    });

    it('should render all step labels', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      expect(screen.getByText('Step 1')).toBeTruthy();
      expect(screen.getByText('Step 2')).toBeTruthy();
      expect(screen.getByText('Step 3')).toBeTruthy();
    });

    it('should render step descriptions when provided', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      expect(screen.getByText('First step')).toBeTruthy();
    });

    it('should return null for empty steps', () => {
      const { queryByTestId } = render(<Stepper steps={[]} currentStep={0} />);

      expect(queryByTestId('stepper-container')).toBeNull();
    });
  });

  describe('Step States', () => {
    it('should mark completed steps', () => {
      render(<Stepper steps={mockSteps} currentStep={2} />);

      const completedSteps = screen.getAllByTestId('step-completed');
      expect(completedSteps).toHaveLength(2);
    });

    it('should mark active step', () => {
      render(<Stepper steps={mockSteps} currentStep={1} />);

      expect(screen.getByTestId('step-active')).toBeTruthy();
    });

    it('should show step numbers for pending steps', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      expect(screen.getByText('2')).toBeTruthy();
      expect(screen.getByText('3')).toBeTruthy();
    });

    it('should respect explicit status prop', () => {
      const stepsWithStatus = [
        { label: 'Step 1', status: 'upcoming' as const },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ];
      render(<Stepper steps={stepsWithStatus} currentStep={2} />);

      // Step 1 should be pending (explicit status) despite currentStep=2
      const pendingStep = screen.getByTestId('step-pending');
      expect(pendingStep).toBeTruthy();
      // Check it contains the number 1 (step number)
      expect(screen.getByText('1')).toBeTruthy();
    });
  });

  describe('Orientations', () => {
    it('should render horizontal by default', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      const container = screen.getByTestId('stepper-container');
      // Style is an array in React Native - check the first element
      const style = Array.isArray(container.props.style)
        ? container.props.style[0]
        : container.props.style;
      expect(style).toMatchObject({ flexDirection: 'row' });
    });

    it('should render vertical when orientation is vertical', () => {
      render(<Stepper steps={mockSteps} currentStep={0} orientation="vertical" />);

      const container = screen.getByTestId('stepper-container');
      // Style is an array in React Native - check the first element
      const style = Array.isArray(container.props.style)
        ? container.props.style[0]
        : container.props.style;
      expect(style).toMatchObject({ flexDirection: 'column' });
    });
  });

  describe('Connectors', () => {
    it('should render connectors between steps', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      const connectors = screen.getAllByTestId('step-connector');
      expect(connectors).toHaveLength(2);
    });

    it('should not render connectors for single step', () => {
      render(<Stepper steps={[{ label: 'Only Step' }]} currentStep={0} />);

      expect(screen.queryAllByTestId('step-connector')).toHaveLength(0);
    });
  });

  describe('Accessibility', () => {
    it('should have progressbar role on container', () => {
      render(<Stepper steps={mockSteps} currentStep={1} />);

      const container = screen.getByTestId('stepper-container');
      expect(container.props.accessibilityRole).toBe('progressbar');
    });

    it('should have correct accessibility value', () => {
      render(<Stepper steps={mockSteps} currentStep={1} />);

      const container = screen.getByTestId('stepper-container');
      expect(container.props.accessibilityValue).toEqual({
        now: 2,
        min: 1,
        max: 3,
        text: 'Step 2 of 3',
      });
    });

    it('should have selected state on current step', () => {
      render(<Stepper steps={mockSteps} currentStep={1} />);

      const activeStep = screen.getByTestId('step-active');
      expect(activeStep.props.accessibilityState).toMatchObject({ selected: true });
    });
  });

  describe('Edge Cases', () => {
    it('should handle single step', () => {
      render(<Stepper steps={[{ label: 'Only Step' }]} currentStep={0} />);

      expect(screen.getByText('Only Step')).toBeTruthy();
      expect(screen.queryAllByTestId('step-connector')).toHaveLength(0);
    });

    it('should handle all steps completed', () => {
      render(<Stepper steps={mockSteps} currentStep={3} />);

      const completedSteps = screen.getAllByTestId('step-completed');
      expect(completedSteps).toHaveLength(3);
    });

    it('should mark all steps completed when currentStep exceeds bounds', () => {
      render(<Stepper steps={mockSteps} currentStep={10} />);

      const completedSteps = screen.getAllByTestId('step-completed');
      expect(completedSteps).toHaveLength(3);
    });
  });
});
