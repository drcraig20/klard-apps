/**
 * Tests for SliderField Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: rendering, value changes, labels, accessibility
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SliderField } from '@/components/ui/slider-field';

// Provide ResizeObserver for Radix Slider in JSDOM
if (!global.ResizeObserver) {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Provide minimal ResizeObserver for Radix slider in JSDOM
// @ts-ignore
global.ResizeObserver = global.ResizeObserver || ResizeObserver;

describe('SliderField', () => {
  describe('Rendering', () => {
    it('should render slider element', () => {
      const onChange = vi.fn();
      render(<SliderField value={50} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
    });

    it('should render with wrapper containing space-y-2 class', () => {
      const onChange = vi.fn();
      const { container } = render(
        <SliderField value={50} onChange={onChange} />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('space-y-2');
    });
  });

  describe('Labels', () => {
    it('should display label when provided', () => {
      const onChange = vi.fn();
      render(<SliderField value={50} onChange={onChange} label="Volume" />);

      expect(screen.getByText('Volume')).toBeInTheDocument();
    });

    it('should display value when showValue is true', () => {
      const onChange = vi.fn();
      render(<SliderField value={75} onChange={onChange} showValue />);

      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('should display both label and value', () => {
      const onChange = vi.fn();
      render(
        <SliderField
          value={50}
          onChange={onChange}
          label="Brightness"
          showValue
        />,
      );

      expect(screen.getByText('Brightness')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('should not display label row when no label or showValue', () => {
      const onChange = vi.fn();
      render(<SliderField value={50} onChange={onChange} />);

      expect(screen.queryByText('50')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-valuemin', () => {
      const onChange = vi.fn();
      render(<SliderField value={50} onChange={onChange} min={0} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax', () => {
      const onChange = vi.fn();
      render(<SliderField value={50} onChange={onChange} max={100} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have aria-valuenow', () => {
      const onChange = vi.fn();
      render(<SliderField value={75} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '75');
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styling when disabled', () => {
      const onChange = vi.fn();
      const { container } = render(
        <SliderField value={50} onChange={onChange} disabled />,
      );

      const sliderRoot = container.querySelector('[data-disabled]');
      expect(sliderRoot).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should merge custom className', () => {
      const onChange = vi.fn();
      const { container } = render(
        <SliderField value={50} onChange={onChange} className="custom-class" />,
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });
});
