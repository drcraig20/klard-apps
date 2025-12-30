/**
 * Tests for HealthIndicator Component
 *
 * TDD: Write failing tests first, then implement to pass.
 * Tests verify: status rendering, colors, labels, glow effects, sizes, accessibility
 *
 * SOLID Compliance:
 * - SRP: Component only renders health indicator UI
 * - OCP: Extend via status variants, not modification
 * - DIP: Depends on design token abstractions
 */

import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe, toHaveNoViolations } from "jest-axe"
import { HealthIndicator } from "@/components/ui/health-indicator"

expect.extend(toHaveNoViolations)

describe("HealthIndicator", () => {
  describe("Rendering", () => {
    it("should render with data-testid attribute", () => {
      render(<HealthIndicator status="healthy" />)

      expect(screen.getByTestId("health-indicator")).toBeInTheDocument()
    })

    it("should render dot with data-testid attribute", () => {
      render(<HealthIndicator status="healthy" />)

      expect(screen.getByTestId("health-indicator-dot")).toBeInTheDocument()
    })

    it("should render as a span element by default", () => {
      render(<HealthIndicator status="healthy" />)

      const indicator = screen.getByTestId("health-indicator")
      expect(indicator.tagName).toBe("SPAN")
    })
  })

  describe("Status: forgotten", () => {
    it("should render forgotten status with error/red color classes", () => {
      render(<HealthIndicator status="forgotten" />)

      const indicator = screen.getByTestId("health-indicator")
      expect(indicator.className).toMatch(/text-error|red/)
    })

    it("should show 'Forgotten?' label when showLabel is true (default)", () => {
      render(<HealthIndicator status="forgotten" />)

      expect(screen.getByText("Forgotten?")).toBeInTheDocument()
    })

    it("should apply red glow effect on dot", () => {
      render(<HealthIndicator status="forgotten" />)

      const dot = screen.getByTestId("health-indicator-dot")
      expect(dot.className).toMatch(/shadow|glow/)
    })
  })

  describe("Status: price-increased", () => {
    it("should render price-increased status with warning/amber color classes", () => {
      render(<HealthIndicator status="price-increased" />)

      const indicator = screen.getByTestId("health-indicator")
      expect(indicator.className).toMatch(/text-warning|amber/)
    })

    it("should show 'Price went up' label when showLabel is true (default)", () => {
      render(<HealthIndicator status="price-increased" />)

      expect(screen.getByText("Price went up")).toBeInTheDocument()
    })

    it("should apply amber glow effect on dot", () => {
      render(<HealthIndicator status="price-increased" />)

      const dot = screen.getByTestId("health-indicator-dot")
      expect(dot.className).toMatch(/shadow|glow/)
    })
  })

  describe("Status: healthy", () => {
    it("should render healthy status with success/green color classes", () => {
      render(<HealthIndicator status="healthy" />)

      const indicator = screen.getByTestId("health-indicator")
      expect(indicator.className).toMatch(/text-success|green/)
    })

    it("should show 'All good' label when showLabel is true (default)", () => {
      render(<HealthIndicator status="healthy" />)

      expect(screen.getByText("All good")).toBeInTheDocument()
    })

    it("should apply green glow effect on dot", () => {
      render(<HealthIndicator status="healthy" />)

      const dot = screen.getByTestId("health-indicator-dot")
      expect(dot.className).toMatch(/shadow|glow/)
    })
  })

  describe("Label Visibility", () => {
    it("should show label by default (showLabel=true)", () => {
      render(<HealthIndicator status="healthy" />)

      expect(screen.getByText("All good")).toBeInTheDocument()
    })

    it("should hide label when showLabel is false", () => {
      render(<HealthIndicator status="healthy" showLabel={false} />)

      expect(screen.queryByText("All good")).not.toBeInTheDocument()
    })

    it("should hide forgotten label when showLabel is false", () => {
      render(<HealthIndicator status="forgotten" showLabel={false} />)

      expect(screen.queryByText("Forgotten?")).not.toBeInTheDocument()
    })

    it("should hide price-increased label when showLabel is false", () => {
      render(<HealthIndicator status="price-increased" showLabel={false} />)

      expect(screen.queryByText("Price went up")).not.toBeInTheDocument()
    })

    it("should still show dot when label is hidden", () => {
      render(<HealthIndicator status="healthy" showLabel={false} />)

      expect(screen.getByTestId("health-indicator-dot")).toBeInTheDocument()
    })
  })

  describe("Sizes", () => {
    it("should apply md size by default", () => {
      render(<HealthIndicator status="healthy" />)

      const dot = screen.getByTestId("health-indicator-dot")
      expect(dot.className).toMatch(/w-2\.5|h-2\.5|size-2\.5/)
    })

    it("should apply sm size when specified", () => {
      render(<HealthIndicator status="healthy" size="sm" />)

      const dot = screen.getByTestId("health-indicator-dot")
      expect(dot.className).toMatch(/w-2|h-2|size-2/)
    })

    it("should apply md size when specified", () => {
      render(<HealthIndicator status="healthy" size="md" />)

      const dot = screen.getByTestId("health-indicator-dot")
      expect(dot.className).toMatch(/w-2\.5|h-2\.5|size-2\.5/)
    })
  })

  describe("Glow Effects", () => {
    it("should have glow shadow on forgotten status dot", () => {
      render(<HealthIndicator status="forgotten" />)

      const dot = screen.getByTestId("health-indicator-dot")
      // Glow effect should include shadow CSS
      expect(dot.className).toMatch(/shadow/)
    })

    it("should have glow shadow on price-increased status dot", () => {
      render(<HealthIndicator status="price-increased" />)

      const dot = screen.getByTestId("health-indicator-dot")
      expect(dot.className).toMatch(/shadow/)
    })

    it("should have glow shadow on healthy status dot", () => {
      render(<HealthIndicator status="healthy" />)

      const dot = screen.getByTestId("health-indicator-dot")
      expect(dot.className).toMatch(/shadow/)
    })
  })

  describe("Custom className", () => {
    it("should merge custom className with default classes", () => {
      render(<HealthIndicator status="healthy" className="custom-class" />)

      const indicator = screen.getByTestId("health-indicator")
      expect(indicator.className).toContain("custom-class")
      expect(indicator.className).toContain("inline-flex") // Default class
    })
  })

  describe("Accessibility", () => {
    it("should have accessible status description", () => {
      render(<HealthIndicator status="healthy" />)

      const indicator = screen.getByTestId("health-indicator")
      // Should have aria-label or text content for screen readers
      expect(
        indicator.getAttribute("aria-label") ||
        indicator.textContent
      ).toBeTruthy()
    })

    it("should communicate forgotten status to screen readers", () => {
      render(<HealthIndicator status="forgotten" />)

      expect(screen.getByText("Forgotten?")).toBeInTheDocument()
    })
  })

  describe("Edge Cases", () => {
    it("should render all three statuses without error", () => {
      const { rerender } = render(<HealthIndicator status="healthy" />)
      expect(screen.getByTestId("health-indicator")).toBeInTheDocument()

      rerender(<HealthIndicator status="forgotten" />)
      expect(screen.getByTestId("health-indicator")).toBeInTheDocument()

      rerender(<HealthIndicator status="price-increased" />)
      expect(screen.getByTestId("health-indicator")).toBeInTheDocument()
    })

    it("should pass through additional props", () => {
      render(
        <HealthIndicator
          status="healthy"
          data-custom="value"
          id="my-indicator"
        />
      )

      const indicator = screen.getByTestId("health-indicator")
      expect(indicator.getAttribute("data-custom")).toBe("value")
      expect(indicator.getAttribute("id")).toBe("my-indicator")
    })
  })

  describe("Accessibility (jest-axe)", () => {
    it("should have no accessibility violations for healthy status", async () => {
      const { container } = render(<HealthIndicator status="healthy" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations for forgotten status", async () => {
      const { container } = render(<HealthIndicator status="forgotten" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations for price-increased status", async () => {
      const { container } = render(<HealthIndicator status="price-increased" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it("should have no accessibility violations when label is hidden", async () => {
      const { container } = render(<HealthIndicator status="healthy" showLabel={false} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
