/**
 * Tests for WelcomeCarousel Component
 *
 * These tests verify that the welcome carousel renders correctly with 3 slides,
 * handles navigation properly, and displays the correct content and buttons.
 *
 * Note: These tests require vitest and @testing-library/react to be installed.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WelcomeCarousel } from '@/components/onboarding/welcome-carousel';
import { en } from '@klard-apps/commons';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('WelcomeCarousel', () => {
  const mockOnComplete = vi.fn();
  const mockOnSkip = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render 3 slides with correct content', () => {
    const { container } = render(
      <WelcomeCarousel onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    // Check that the first slide content is visible
    expect(
      screen.getByText(en.onboarding.welcome.slides.track.headline)
    ).toBeTruthy();
    expect(
      screen.getByText(en.onboarding.welcome.slides.track.body)
    ).toBeTruthy();

    // Check that 3 pagination dots are present
    const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');
    expect(dots.length).toBe(3);
  });

  it('should show correct active state on pagination dots', () => {
    const { container } = render(
      <WelcomeCarousel onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');

    // First dot should be active (w-8 class)
    expect(dots[0].className).toContain('w-8');
    expect(dots[0].className).toContain('bg-primary');

    // Other dots should be inactive (w-2 class)
    expect(dots[1].className).toContain('w-2');
    expect(dots[2].className).toContain('w-2');
  });

  it('should advance slides when Next button is clicked', async () => {
    render(<WelcomeCarousel onComplete={mockOnComplete} onSkip={mockOnSkip} />);

    // First slide should be visible
    expect(
      screen.getByText(en.onboarding.welcome.slides.track.headline)
    ).toBeTruthy();

    // Click Next button
    const nextButton = screen.getByRole('button', {
      name: en.onboarding.navigation.next,
    });
    fireEvent.click(nextButton);

    // Second slide should now be visible
    await waitFor(() => {
      expect(
        screen.getByText(en.onboarding.welcome.slides.protect.headline)
      ).toBeTruthy();
      expect(
        screen.getByText(en.onboarding.welcome.slides.protect.body)
      ).toBeTruthy();
    });
  });

  it('should show Get Started button on last slide', async () => {
    render(<WelcomeCarousel onComplete={mockOnComplete} onSkip={mockOnSkip} />);

    // Click Next twice to get to the last slide
    const nextButton = screen.getByRole('button', {
      name: en.onboarding.navigation.next,
    });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByText(en.onboarding.welcome.slides.protect.headline)
      ).toBeTruthy();
    });

    fireEvent.click(nextButton);

    // Last slide should show "Get Started" button
    await waitFor(() => {
      expect(
        screen.getByText(en.onboarding.welcome.slides.save.headline)
      ).toBeTruthy();

      const getStartedButton = screen.getByRole('button', {
        name: en.onboarding.navigation.getStarted,
      });
      expect(getStartedButton).toBeTruthy();
    });
  });

  it('should display Skip button', () => {
    render(<WelcomeCarousel onComplete={mockOnComplete} onSkip={mockOnSkip} />);

    const skipButton = screen.getByRole('button', {
      name: en.onboarding.navigation.skip,
    });
    expect(skipButton).toBeTruthy();
  });

  it('should call onSkip when Skip button is clicked', async () => {
    render(<WelcomeCarousel onComplete={mockOnComplete} onSkip={mockOnSkip} />);

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
      <WelcomeCarousel
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isUpdating={true}
      />
    );

    const nextButton = screen.getByRole('button', {
      name: en.onboarding.navigation.next,
    });
    const skipButton = screen.getByRole('button', {
      name: en.onboarding.navigation.skip,
    });

    expect(nextButton.hasAttribute('disabled')).toBe(true);
    expect(skipButton.hasAttribute('disabled')).toBe(true);
  });

  it('should allow direct navigation by clicking pagination dots', async () => {
    const { container } = render(
      <WelcomeCarousel onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    // First slide should be visible
    expect(
      screen.getByText(en.onboarding.welcome.slides.track.headline)
    ).toBeTruthy();

    // Click the third pagination dot
    const dots = container.querySelectorAll('button[aria-label^="Go to slide"]');
    fireEvent.click(dots[2]);

    // Third slide should now be visible
    await waitFor(() => {
      expect(
        screen.getByText(en.onboarding.welcome.slides.save.headline)
      ).toBeTruthy();
      expect(
        screen.getByText(en.onboarding.welcome.slides.save.body)
      ).toBeTruthy();
    });
  });

  it('should render SVG illustrations', () => {
    const { container } = render(
      <WelcomeCarousel onComplete={mockOnComplete} onSkip={mockOnSkip} />
    );

    // Check that an SVG element is present (from the illustration)
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should accept custom slides prop', () => {
    const customSlides = [
      {
        id: 'custom',
        headline: 'Custom Headline',
        body: 'Custom body text',
        Illustration: () => <div data-testid="custom-illustration">Custom</div>,
        accentColor: 'primary' as const,
      },
    ];

    render(
      <WelcomeCarousel
        slides={customSlides}
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
      />
    );

    expect(screen.getByText('Custom Headline')).toBeTruthy();
    expect(screen.getByText('Custom body text')).toBeTruthy();
    expect(screen.getByTestId('custom-illustration')).toBeTruthy();
  });
});
