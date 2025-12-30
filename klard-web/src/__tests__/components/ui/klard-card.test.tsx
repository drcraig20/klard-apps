/**
 * Tests for KlardCard Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, variants, padding, interaction, accessibility
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KlardCard } from '@/components/ui/klard-card';

describe('KlardCard', () => {
  describe('Rendering', () => {
    it('should render card with children', () => {
      render(<KlardCard>Card Content</KlardCard>);

      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should render as div by default', () => {
      render(<KlardCard data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.tagName).toBe('DIV');
    });

    it('should have data-slot attribute for styling', () => {
      render(<KlardCard data-testid="card">Content</KlardCard>);

      expect(screen.getByTestId('card')).toHaveAttribute('data-slot', 'klard-card');
    });
  });

  describe('Variants', () => {
    it('should apply default variant classes (border)', () => {
      render(<KlardCard data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.className).toContain('border');
    });

    it('should apply elevated variant classes (shadow)', () => {
      render(<KlardCard variant="elevated" data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      // Elevated variant uses CSS variable for shadow
      expect(card.className).toContain('shadow-');
    });

    it('should apply ghost variant classes (bg-transparent)', () => {
      render(<KlardCard variant="ghost" data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.className).toContain('bg-transparent');
    });

    it('should apply interactive variant classes (cursor-pointer)', () => {
      render(<KlardCard variant="interactive" data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.className).toContain('cursor-pointer');
    });
  });

  describe('Padding', () => {
    it('should apply md padding by default (p-4)', () => {
      render(<KlardCard data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-4');
    });

    it('should apply none padding (p-0)', () => {
      render(<KlardCard padding="none" data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-0');
    });

    it('should apply sm padding (p-3)', () => {
      render(<KlardCard padding="sm" data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-3');
    });

    it('should apply lg padding (p-6)', () => {
      render(<KlardCard padding="lg" data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-6');
    });
  });

  describe('Interactive Behavior', () => {
    it('should render as button when onPress is provided', () => {
      const handlePress = vi.fn();
      render(<KlardCard onPress={handlePress} data-testid="card">Clickable</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.tagName).toBe('BUTTON');
    });

    it('should call onPress when clicked', () => {
      const handlePress = vi.fn();
      render(<KlardCard onPress={handlePress} data-testid="card">Clickable</KlardCard>);

      fireEvent.click(screen.getByTestId('card'));
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', () => {
      const handlePress = vi.fn();
      render(<KlardCard onPress={handlePress} disabled data-testid="card">Disabled</KlardCard>);

      fireEvent.click(screen.getByTestId('card'));
      expect(handlePress).not.toHaveBeenCalled();
    });

    it('should apply disabled styles when disabled', () => {
      render(<KlardCard onPress={() => {}} disabled data-testid="card">Disabled</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card).toBeDisabled();
      expect(card.className).toContain('opacity-50');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with base styles', () => {
      render(<KlardCard className="custom-class" data-testid="card">Content</KlardCard>);

      const card = screen.getByTestId('card');
      expect(card.className).toContain('custom-class');
      expect(card.className).toContain('rounded-xl');
    });
  });

  describe('Accessibility', () => {
    it('should be focusable when interactive', () => {
      render(<KlardCard onPress={() => {}} data-testid="card">Interactive</KlardCard>);

      const card = screen.getByTestId('card');
      card.focus();
      expect(card).toHaveFocus();
    });
  });
});