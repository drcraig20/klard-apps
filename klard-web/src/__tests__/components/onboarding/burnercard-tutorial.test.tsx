/**
 * Tests for BurnerCardTutorial Component
 *
 * These tests verify that the BurnerCard tutorial renders correctly,
 * displays all feature highlights, and handles button actions properly.
 *
 * Note: These tests require vitest and @testing-library/react to be installed.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BurnerCardTutorial } from '@/components/onboarding/burnercard-tutorial';
import { en } from '@klard-apps/commons';

describe('BurnerCardTutorial', () => {
  const mockOnComplete = vi.fn();
  const mockOnSkip = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render headline and body text', () => {
    render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.headline)
    ).toBeTruthy();
    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.body)
    ).toBeTruthy();
  });

  it('should render step indicator', () => {
    render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.stepIndicator)
    ).toBeTruthy();
  });

  it('should render 3 feature highlights', () => {
    render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    // Check all 3 feature titles
    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.features[0].title)
    ).toBeTruthy();
    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.features[1].title)
    ).toBeTruthy();
    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.features[2].title)
    ).toBeTruthy();

    // Check all 3 feature descriptions
    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.features[0].description)
    ).toBeTruthy();
    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.features[1].description)
    ).toBeTruthy();
    expect(
      screen.getByText(en.onboarding.burnerCardTutorial.features[2].description)
    ).toBeTruthy();
  });

  it('should render both CTA buttons', () => {
    render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    const createButton = screen.getByRole('button', {
      name: en.onboarding.burnerCardTutorial.buttons.createBurnerCard,
    });
    const exploreDashboardButton = screen.getByRole('button', {
      name: en.onboarding.burnerCardTutorial.buttons.exploreDashboard,
    });

    expect(createButton).toBeTruthy();
    expect(exploreDashboardButton).toBeTruthy();
  });

  it('should call onComplete when Create BurnerCard button is clicked', async () => {
    render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    const createButton = screen.getByRole('button', {
      name: en.onboarding.burnerCardTutorial.buttons.createBurnerCard,
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onComplete when Explore Dashboard button is clicked', async () => {
    render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    const exploreDashboardButton = screen.getByRole('button', {
      name: en.onboarding.burnerCardTutorial.buttons.exploreDashboard,
    });
    fireEvent.click(exploreDashboardButton);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('should display Skip button', () => {
    render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    const skipButton = screen.getByRole('button', {
      name: en.onboarding.navigation.skip,
    });
    expect(skipButton).toBeTruthy();
  });

  it('should call onSkip when Skip button is clicked', async () => {
    render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    const skipButton = screen.getByRole('button', {
      name: en.onboarding.navigation.skip,
    });
    fireEvent.click(skipButton);

    await waitFor(() => {
      expect(mockOnSkip).toHaveBeenCalledTimes(1);
    });
  });

  it('should disable buttons when isUpdating is true', () => {
    render(
      <BurnerCardTutorial
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isUpdating={true}
      />
    );

    const createButton = screen.getByRole('button', {
      name: en.onboarding.burnerCardTutorial.buttons.createBurnerCard,
    });
    const exploreDashboardButton = screen.getByRole('button', {
      name: en.onboarding.burnerCardTutorial.buttons.exploreDashboard,
    });
    const skipButton = screen.getByRole('button', {
      name: en.onboarding.navigation.skip,
    });

    expect(createButton.hasAttribute('disabled')).toBe(true);
    expect(exploreDashboardButton.hasAttribute('disabled')).toBe(true);
    expect(skipButton.hasAttribute('disabled')).toBe(true);
  });

  it('should show loading spinner when isUpdating is true', () => {
    const { container } = render(
      <BurnerCardTutorial
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isUpdating={true}
      />
    );

    // LoadingSpinner renders an SVG with specific classes
    const spinner = container.querySelector('svg.animate-spin');
    expect(spinner).toBeTruthy();
  });

  it('should render BurnerCard illustration', () => {
    const { container } = render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    // Check that an SVG element is present (from the illustration)
    const svg = container.querySelector('svg[aria-label="Credit card blocking unauthorized charges"]');
    expect(svg).toBeTruthy();
  });

  it('should render feature icons (Shield, Clock, DollarSign)', () => {
    const { container } = render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    // All lucide-react icons render as SVG elements
    const icons = container.querySelectorAll('svg.lucide');
    // We should have at least 3 icons (one for each feature)
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });

  it('should render glassmorphism card for features', () => {
    const { container } = render(
      <BurnerCardTutorial onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    // Check for glassmorphism classes
    const glassCard = container.querySelector('.backdrop-blur-xl');
    expect(glassCard).toBeTruthy();
  });
});
