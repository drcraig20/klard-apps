/**
 * Tests for Avatar Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, sizes, shapes, fallback, accessibility
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from '@/components/ui/avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('should render fallback text when no src provided', () => {
      render(<Avatar alt="John Doe" fallback="JD" size="md" />);

      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should render with data-slot attribute for avatar root', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="md" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
    });

    it('should render with data-slot attribute for fallback', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="md" />
      );

      const fallback = container.querySelector('[data-slot="avatar-fallback"]');
      expect(fallback).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply xs size classes', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="xs" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-6/);
      expect(avatar?.className).toMatch(/w-6/);
    });

    it('should apply sm size classes', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="sm" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-8/);
      expect(avatar?.className).toMatch(/w-8/);
    });

    it('should apply md size classes', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="md" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-10/);
      expect(avatar?.className).toMatch(/w-10/);
    });

    it('should apply lg size classes', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="lg" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-12/);
      expect(avatar?.className).toMatch(/w-12/);
    });

    it('should apply xl size classes', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="xl" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toMatch(/h-16/);
      expect(avatar?.className).toMatch(/w-16/);
    });
  });

  describe('Shape', () => {
    it('should render circle shape by default (rounded-full)', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="md" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toContain('rounded-full');
      expect(avatar?.className).not.toContain('rounded-lg');
    });

    it('should render square shape when specified (rounded-lg)', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="md" shape="square" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toContain('rounded-lg');
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

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'John Doe');
    });
  });

  describe('Klard Design System', () => {
    it('should apply teal-100 background to fallback', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="md" />
      );

      const fallback = container.querySelector('[data-slot="avatar-fallback"]');
      expect(fallback?.className).toContain('bg-teal-100');
    });

    it('should apply teal-700 text color to fallback', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="md" />
      );

      const fallback = container.querySelector('[data-slot="avatar-fallback"]');
      expect(fallback?.className).toContain('text-teal-700');
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with default classes', () => {
      const { container } = render(
        <Avatar alt="User" fallback="U" size="md" className="custom-class" />
      );

      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar?.className).toContain('custom-class');
      expect(avatar?.className).toContain('rounded-full');
    });
  });
});
