/**
 * Tests for Button Component
 *
 * These tests verify:
 * 1. Renders with all variants (primary, secondary, outline, ghost, destructive, link, klard, social)
 * 2. Renders with all sizes (sm, md, lg, icon variants)
 * 3. Loading state shows spinner and hides children
 * 4. Icon positioning (left/right)
 * 5. Full width styling
 * 6. Disabled state when loading or explicitly disabled
 * 7. Edge cases and accessibility
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  describe('Rendering', () => {
    it('should render with children text', () => {
      render(<Button>Click Me</Button>);

      expect(screen.getByRole('button', { name: 'Click Me' })).toBeTruthy();
    });

    it('should render as a button element by default', () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should have data-slot attribute', () => {
      render(<Button>Button</Button>);

      const button = screen.getByRole('button');
      expect(button.getAttribute('data-slot')).toBe('button');
    });
  });

  describe('Variants', () => {
    const variants = [
      'default',
      'primary',
      'destructive',
      'outline',
      'secondary',
      'ghost',
      'link',
      'klard',
      'social',
    ] as const;

    variants.forEach((variant) => {
      it(`should render ${variant} variant without error`, () => {
        render(<Button variant={variant}>{variant} Button</Button>);

        expect(screen.getByRole('button', { name: `${variant} Button` })).toBeTruthy();
      });
    });

    it('should apply default variant when none specified', () => {
      render(<Button>Default</Button>);

      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-primary');
    });

    it('should apply primary variant (alias for default)', () => {
      render(<Button variant="primary">Primary</Button>);

      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-primary');
    });
  });

  describe('Sizes', () => {
    const sizes = ['default', 'md', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'] as const;

    sizes.forEach((size) => {
      it(`should render ${size} size without error`, () => {
        render(<Button size={size}>{size}</Button>);

        expect(screen.getByRole('button')).toBeTruthy();
      });
    });

    it('should apply md size (alias for default)', () => {
      const { rerender } = render(<Button size="default">Default</Button>);
      const defaultButton = screen.getByRole('button');
      const defaultClasses = defaultButton.className;

      rerender(<Button size="md">Medium</Button>);
      const mdButton = screen.getByRole('button');

      // Both should have h-9 class
      expect(defaultClasses).toContain('h-9');
      expect(mdButton.className).toContain('h-9');
    });
  });

  describe('Loading State', () => {
    it('should show spinner when loading', () => {
      render(<Button loading>Loading</Button>);

      // Loader2 from lucide-react renders as an SVG with animate-spin
      const button = screen.getByRole('button');
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeTruthy();
    });

    it('should hide children when loading', () => {
      render(<Button loading>Hidden Text</Button>);

      expect(screen.queryByText('Hidden Text')).toBeNull();
    });

    it('should be disabled when loading', () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should hide icon when loading', () => {
      const icon = <span data-testid="test-icon">Icon</span>;
      render(
        <Button loading icon={icon}>
          Loading
        </Button>
      );

      expect(screen.queryByTestId('test-icon')).toBeNull();
    });
  });

  describe('Icon Support', () => {
    it('should render icon on the left by default', () => {
      const icon = <span data-testid="left-icon">L</span>;
      render(<Button icon={icon}>With Icon</Button>);

      const button = screen.getByRole('button');
      expect(screen.getByTestId('left-icon')).toBeTruthy();

      // Icon should come before text in DOM
      const children = Array.from(button.childNodes);
      const iconIndex = children.findIndex((child) =>
        (child as Element).getAttribute?.('data-testid') === 'left-icon'
      );
      const textIndex = children.findIndex((child) =>
        child.textContent === 'With Icon'
      );

      expect(iconIndex).toBeLessThan(textIndex);
    });

    it('should render icon on the right when iconPosition is right', () => {
      const icon = <span data-testid="right-icon">R</span>;
      render(
        <Button icon={icon} iconPosition="right">
          With Icon
        </Button>
      );

      const button = screen.getByRole('button');
      expect(screen.getByTestId('right-icon')).toBeTruthy();

      // Icon should come after text in DOM
      const children = Array.from(button.childNodes);
      const iconIndex = children.findIndex((child) =>
        (child as Element).getAttribute?.('data-testid') === 'right-icon'
      );
      const textIndex = children.findIndex((child) =>
        child.textContent === 'With Icon'
      );

      expect(iconIndex).toBeGreaterThan(textIndex);
    });
  });

  describe('Full Width', () => {
    it('should apply w-full class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>);

      const button = screen.getByRole('button');
      expect(button.className).toContain('w-full');
    });

    it('should not apply w-full class by default', () => {
      render(<Button>Normal Width</Button>);

      const button = screen.getByRole('button');
      expect(button.className).not.toContain('w-full');
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should be disabled when loading is true', () => {
      render(<Button loading>Loading</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should be disabled when both disabled and loading are true', () => {
      render(
        <Button disabled loading>
          Both
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should have disabled opacity class', () => {
      render(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button.className).toContain('disabled:opacity-50');
    });
  });

  describe('Click Handling', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);

      fireEvent.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} loading>
          Loading
        </Button>
      );

      fireEvent.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('asChild', () => {
    it('should render children as slot when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );

      const link = screen.getByRole('link', { name: 'Link Button' });
      expect(link).toBeTruthy();
      expect(link.tagName).toBe('A');
      expect(link.getAttribute('href')).toBe('/test');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with default classes', () => {
      render(<Button className="custom-class">Custom</Button>);

      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
      expect(button.className).toContain('inline-flex'); // Default class
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      render(<Button>{''}</Button>);

      expect(screen.getByRole('button')).toBeTruthy();
    });

    it('should pass through additional props', () => {
      render(
        <Button type="submit" form="my-form">
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('submit');
      expect(button.getAttribute('form')).toBe('my-form');
    });

    it('should handle React node children', () => {
      render(
        <Button>
          <span>Complex</span> <strong>Children</strong>
        </Button>
      );

      expect(screen.getByText('Complex')).toBeTruthy();
      expect(screen.getByText('Children')).toBeTruthy();
    });
  });
});