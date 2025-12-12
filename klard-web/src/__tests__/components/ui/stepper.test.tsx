/**
 * Tests for Stepper Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, step states, orientations, accessibility
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper } from '@/components/ui/stepper';

const mockSteps = [
  { label: 'Step 1', description: 'First step' },
  { label: 'Step 2', description: 'Second step' },
  { label: 'Step 3', description: 'Third step' },
];

describe('Stepper', () => {
  describe('Rendering', () => {
    it('should render stepper container with list role', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      const stepper = screen.getByRole('list');
      expect(stepper).toBeInTheDocument();
      expect(stepper).toHaveAttribute('aria-label', 'Progress');
    });

    it('should render all step labels', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('should render step descriptions', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      expect(screen.getByText('First step')).toBeInTheDocument();
    });

    it('should render with data-slot attribute', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={0} />);

      const stepper = container.querySelector('[data-slot="stepper"]');
      expect(stepper).toBeInTheDocument();
    });
  });

  describe('Step States', () => {
    it('should mark completed steps with checkmark', () => {
      render(<Stepper steps={mockSteps} currentStep={2} />);

      const completedSteps = screen.getAllByTestId('step-completed');
      expect(completedSteps).toHaveLength(2);
    });

    it('should mark active step with ring and data-state', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={1} />);

      const activeStep = container.querySelector('[data-state="current"]');
      expect(activeStep).toBeInTheDocument();
      expect(activeStep?.className).toMatch(/ring-4/);
    });

    it('should mark pending steps with number', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should show step 1 as active when currentStep is 0', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={0} />);

      const activeStep = container.querySelector('[data-state="current"]');
      expect(activeStep).toHaveTextContent('1');
    });

    it('should respect explicit status prop', () => {
      const stepsWithStatus = [
        { label: 'Step 1', status: 'upcoming' as const },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ];
      const { container } = render(<Stepper steps={stepsWithStatus} currentStep={2} />);

      const upcomingStep = container.querySelector('[data-state="upcoming"]');
      expect(upcomingStep).toHaveTextContent('1');
    });
  });

  describe('Orientations', () => {
    it('should render horizontal by default', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={0} />);

      const stepper = container.querySelector('[data-slot="stepper"]');
      expect(stepper?.className).toMatch(/flex-row/);
    });

    it('should render vertical when orientation is vertical', () => {
      const { container } = render(
        <Stepper steps={mockSteps} currentStep={0} orientation="vertical" />
      );

      const stepper = container.querySelector('[data-slot="stepper"]');
      expect(stepper?.className).toMatch(/flex-col/);
    });
  });

  describe('Connectors', () => {
    it('should render connectors between steps in horizontal mode', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={0} />);

      const connectors = container.querySelectorAll('[data-slot="connector"]');
      expect(connectors).toHaveLength(2); // 3 steps = 2 connectors
    });

    it('should style completed connectors with teal', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={2} />);

      const connectors = container.querySelectorAll('[data-slot="connector"]');
      expect(connectors[0]?.className).toMatch(/bg-teal-600/);
      expect(connectors[1]?.className).toMatch(/bg-teal-600/);
    });

    it('should not render connector after last step', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={0} />);

      const items = container.querySelectorAll('[role="listitem"]');
      const lastItem = items[items.length - 1];
      const connector = lastItem?.querySelector('[data-slot="connector"]');
      expect(connector).toBeNull();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-current on active step', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={1} />);

      const activeStep = container.querySelector('[aria-current="step"]');
      expect(activeStep).toBeInTheDocument();
    });

    it('should have proper step list semantics', () => {
      render(<Stepper steps={mockSteps} currentStep={0} />);

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();

      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(3);
    });

    it('should use custom ariaLabel when provided', () => {
      render(<Stepper steps={mockSteps} currentStep={0} ariaLabel="Checkout progress" />);

      const list = screen.getByRole('list');
      expect(list).toHaveAttribute('aria-label', 'Checkout progress');
    });

    it('should hide icons from screen readers', () => {
      const { container } = render(<Stepper steps={mockSteps} currentStep={1} />);

      const icon = container.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className', () => {
      const { container } = render(
        <Stepper steps={mockSteps} currentStep={0} className="custom-class" />
      );

      const stepper = container.querySelector('[data-slot="stepper"]');
      expect(stepper).toHaveClass('custom-class');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single step', () => {
      const { container } = render(<Stepper steps={[{ label: 'Only Step' }]} currentStep={0} />);

      expect(screen.getByText('Only Step')).toBeInTheDocument();
      const connectors = container.querySelectorAll('[data-slot="connector"]');
      expect(connectors).toHaveLength(0);
    });

    it('should handle all steps completed', () => {
      render(<Stepper steps={mockSteps} currentStep={3} />);

      const completedSteps = screen.getAllByTestId('step-completed');
      expect(completedSteps).toHaveLength(3);
    });

    it('should mark all steps completed when currentStep exceeds bounds', () => {
      render(<Stepper steps={mockSteps} currentStep={10} />);

      // When currentStep is beyond the array, all steps should be completed
      const completedSteps = screen.getAllByTestId('step-completed');
      expect(completedSteps).toHaveLength(3);
    });

    it('should return null for empty steps array', () => {
      const { container } = render(<Stepper steps={[]} currentStep={0} />);

      expect(container.querySelector('[data-slot="stepper"]')).toBeNull();
    });
  });
});
